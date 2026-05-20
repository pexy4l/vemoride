import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Calendar, LogIn, LogOut, Upload } from 'lucide-react';
import { signIn, signOut, checkSession } from '@/store/authSlice';
import {
  useGetCarsQuery, useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation,
  useGetBookingsQuery, useUpdateBookingStatusMutation,
  useGetBlockedDatesQuery, useBlockDateMutation, useUnblockDateMutation,
  useGetPremiumCarsQuery, useCreatePremiumCarMutation, useDeletePremiumCarMutation,
} from '@/store/apiSlice';
import { api } from '@/lib/api';

const Admin = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading, error: authError } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: cars = [] } = useGetCarsQuery(undefined, { skip: !user });
  const { data: bookings = [] } = useGetBookingsQuery(undefined, { skip: !user });
  const { data: blockedDates = [] } = useGetBlockedDatesQuery(undefined, { skip: !user });
  const { data: premiumCars = [] } = useGetPremiumCarsQuery(undefined, { skip: !user });

  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const [blockDate] = useBlockDateMutation();
  const [unblockDate] = useUnblockDateMutation();
  const [createPremiumCar] = useCreatePremiumCarMutation();
  const [deletePremiumCar] = useDeletePremiumCarMutation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [selectedCarForCalendar, setSelectedCarForCalendar] = useState(null);
  const [newBlockedDate, setNewBlockedDate] = useState('');

  useEffect(() => { dispatch(checkSession()); }, [dispatch]);

  useEffect(() => {
    if (authError) toast({ variant: 'destructive', title: 'Sign in Failed', description: authError });
  }, [authError, toast]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
  };

  const handleLogout = () => dispatch(signOut());

  const handleSaveCar = async (carData, imageFile) => {
    let imageUrl = carData.images?.[0] || null;
    if (imageFile) {
      try { imageUrl = await api.uploadFile('car_images', imageFile); }
      catch (err) { toast({ title: 'Image Upload Failed', description: err.message, variant: 'destructive' }); return; }
    }
    if (!imageUrl) { toast({ title: 'Missing Image', description: 'Please provide an image.', variant: 'destructive' }); return; }

    try {
      const finalData = { ...carData, images: [imageUrl] };
      if (isEditMode && currentCar) {
        await updateCar({ id: currentCar.id, ...finalData }).unwrap();
        toast({ title: 'Car Updated' });
      } else {
        await createCar(finalData).unwrap();
        toast({ title: 'Car Added' });
      }
    } catch (err) { toast({ title: 'Save Failed', description: err.data?.error, variant: 'destructive' }); }
    setIsEditMode(false);
    setCurrentCar(null);
  };

  const handleDeleteCar = async (id) => {
    try { await deleteCar(id).unwrap(); toast({ title: 'Car Deleted' }); }
    catch (err) { toast({ title: 'Delete Failed', description: err.data?.error, variant: 'destructive' }); }
  };

  const handleBlockDate = async (carId) => {
    if (!newBlockedDate) return;
    try { await blockDate({ car_id: carId, blocked_date: newBlockedDate }).unwrap(); toast({ title: 'Date Blocked' }); setNewBlockedDate(''); }
    catch (err) { toast({ title: 'Block Failed', description: err.data?.error, variant: 'destructive' }); }
  };

  const handleUnblockDate = async (id) => {
    try { await unblockDate(id).unwrap(); toast({ title: 'Date Unblocked' }); }
    catch (err) { toast({ title: 'Unblock Failed', description: err.data?.error, variant: 'destructive' }); }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try { await updateBookingStatus({ id, status }).unwrap(); toast({ title: 'Status Updated' }); }
    catch (err) { toast({ title: 'Update Failed', description: err.data?.error, variant: 'destructive' }); }
  };

  const handleAddPremiumCar = async (carData, imageFile) => {
    let imageUrl = carData.image;
    if (imageFile) {
      try { imageUrl = await api.uploadFile('premium_car_images', imageFile); }
      catch (err) { toast({ title: 'Upload Failed', description: err.message, variant: 'destructive' }); return; }
    }
    if (!imageUrl) { toast({ title: 'Missing Image', variant: 'destructive' }); return; }
    try { await createPremiumCar({ ...carData, image: imageUrl }).unwrap(); toast({ title: 'Premium Car Added' }); }
    catch (err) { toast({ title: 'Add Failed', description: err.data?.error, variant: 'destructive' }); }
  };

  const handleDeletePremiumCar = async (id) => {
    try { await deletePremiumCar(id).unwrap(); toast({ title: 'Premium Car Removed' }); }
    catch (err) { toast({ title: 'Delete Failed', description: err.data?.error, variant: 'destructive' }); }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;

  if (!user) {
    return (
      <>
        <Helmet><title>Admin Login - PK Cars Hire</title></Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full space-y-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
            <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-sm" onSubmit={handleLogin}>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" /></div>
              <div><Label htmlFor="password">Password</Label><Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/></div>
              <Button type="submit" className="w-full"><LogIn className="h-5 w-5 mr-2" /> Sign in</Button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Admin Dashboard - PK Cars Hire</title></Helmet>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" /> Logout</Button>
          </div>

          <Tabs defaultValue="inventory" className="space-y-6">
            <TabsList>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="premium-fleet">Premium Fleet</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Car Inventory</h2>
                <Dialog onOpenChange={(open) => !open && setCurrentCar(null)}>
                  <DialogTrigger asChild><Button className="bg-brand hover:bg-brand-dark" onClick={() => setIsEditMode(false)}><Plus className="h-4 w-4 mr-2" /> Add Car</Button></DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{isEditMode ? 'Edit Car' : 'Add New Car'}</DialogTitle></DialogHeader><CarForm onSave={handleSaveCar} initialData={currentCar} /></DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                  <div key={car.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h3 className="text-xl font-bold mb-2">{car.make} {car.model}</h3>
                    <p className="text-gray-600 mb-2">{car.year} • {car.type}</p>
                    <p className="text-2xl font-bold text-brand mb-4">₦{car.daily_rate.toLocaleString()}/day</p>
                    <div className="mb-4"><span className={`px-3 py-1 rounded-full text-sm ${car.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{car.status}</span></div>
                    <div className="flex gap-2">
                      <Dialog onOpenChange={(open) => !open && setCurrentCar(null)}>
                        <DialogTrigger asChild><Button variant="outline" size="sm" onClick={() => { setIsEditMode(true); setCurrentCar(car); }}><Edit className="h-4 w-4 mr-1" /> Edit</Button></DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Edit Car</DialogTitle></DialogHeader><CarForm onSave={handleSaveCar} initialData={car} /></DialogContent>
                      </Dialog>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteCar(car.id)}><Trash2 className="h-4 w-4 mr-1" /> Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="premium-fleet" className="space-y-6">
              <h2 className="text-2xl font-bold">Homepage Premium Fleet</h2>
              <Dialog><DialogTrigger asChild><Button className="bg-brand hover:bg-brand-dark"><Plus className="h-4 w-4 mr-2" /> Add Premium Car</Button></DialogTrigger>
                <DialogContent><DialogHeader><DialogTitle>Add New Premium Car</DialogTitle></DialogHeader><PremiumCarForm onSave={handleAddPremiumCar} /></DialogContent>
              </Dialog>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumCars.map(car => (
                  <div key={car.id} className="bg-white p-6 rounded-lg shadow-sm relative">
                    <img src={car.image} alt={car.alt} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                    <Button variant="destructive" size="sm" className="absolute top-4 right-4" onClick={() => handleDeletePremiumCar(car.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="availability" className="space-y-6">
              <h2 className="text-2xl font-bold">Manage Availability</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cars.map(car => (
                  <div key={car.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-4">{car.make} {car.model}</h3>
                    <div className="mb-4">
                      <Label>Block Date</Label>
                      <div className="flex gap-2">
                        <Input type="date" value={selectedCarForCalendar === car.id ? newBlockedDate : ''} onChange={(e) => { setSelectedCarForCalendar(car.id); setNewBlockedDate(e.target.value); }} min={new Date().toISOString().split('T')[0]}/>
                        <Button onClick={() => handleBlockDate(car.id)} className="bg-brand hover:bg-brand-dark"><Calendar className="h-4 w-4 mr-2" /> Block</Button>
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Blocked Dates</Label>
                      <div className="space-y-2">
                        {blockedDates.filter(d => d.car_id === car.id).map(date => (
                          <div key={date.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span>{new Date(date.blocked_date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</span>
                            <Button variant="ghost" size="sm" onClick={() => handleUnblockDate(date.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        ))}
                      </div>
                      {blockedDates.filter(d => d.car_id === car.id).length === 0 && <p className="text-gray-500 text-sm">No blocked dates</p>}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <h2 className="text-2xl font-bold">Booking Requests</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden"><div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50"><tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr></thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map(booking => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{booking.car_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{booking.full_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(booking.pickup_date).toLocaleDateString()} - {new Date(booking.return_date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm"><div>{booking.phone}</div><div className="text-gray-500">{booking.email}</div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : booking.status === 'Declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{booking.status}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Select value={booking.status} onValueChange={(value) => handleUpdateBookingStatus(booking.id, value)}>
                            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Confirmed">Confirmed</SelectItem><SelectItem value="Declined">Declined</SelectItem></SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {bookings.length === 0 && <div className="text-center py-12 text-gray-500">No bookings yet</div>}
              </div></div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

const CarForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    make: '', model: '', year: new Date().getFullYear(), type: 'Sedan', transmission: 'Automatic', seats: 5, luggage: 3, daily_rate: 15000, airport_pickup: true, status: 'Available', images: [''], description: '', ...initialData
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.images?.[0] || null);

  const handleFileChange = (e) => { const file = e.target.files[0]; if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); } };
  const handleSubmit = (e) => { e.preventDefault(); const { id, created_at, ...saveData } = formData; onSave(saveData, imageFile); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Make *</Label><Input value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} required /></div>
        <div><Label>Model *</Label><Input value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} required /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Year *</Label><Input type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} required /></div>
        <div><Label>Type *</Label><Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Sedan">Sedan</SelectItem><SelectItem value="SUV">SUV</SelectItem><SelectItem value="Van">Van</SelectItem></SelectContent></Select></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><Label>Transmission *</Label><Select value={formData.transmission} onValueChange={(value) => setFormData({...formData, transmission: value})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Automatic">Automatic</SelectItem><SelectItem value="Manual">Manual</SelectItem></SelectContent></Select></div>
        <div><Label>Seats *</Label><Input type="number" value={formData.seats} onChange={(e) => setFormData({...formData, seats: parseInt(e.target.value)})} required /></div>
        <div><Label>Luggage *</Label><Input type="number" value={formData.luggage} onChange={(e) => setFormData({...formData, luggage: parseInt(e.target.value)})} required /></div>
      </div>
      <div><Label>Daily Rate (NGN) *</Label><Input type="number" value={formData.daily_rate} onChange={(e) => setFormData({...formData, daily_rate: parseInt(e.target.value)})} required /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Status *</Label><Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Available">Available</SelectItem><SelectItem value="Unavailable">Unavailable</SelectItem></SelectContent></Select></div>
        <div><Label>Airport Pickup *</Label><Select value={formData.airport_pickup.toString()} onValueChange={(value) => setFormData({...formData, airport_pickup: value === 'true'})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="true">Yes</SelectItem><SelectItem value="false">No</SelectItem></SelectContent></Select></div>
      </div>
      <div>
        <Label>Car Image *</Label>
        <div className="mt-2 flex items-center gap-4">
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />}
          <Input id="image-upload" type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="hidden" />
          <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload').click()}><Upload className="h-4 w-4 mr-2" />{imageFile ? 'Change Image' : 'Upload Image'}</Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Or paste image URL below (upload takes priority).</p>
        <Input value={formData.images[0]} onChange={(e) => { setFormData({...formData, images: [e.target.value]}); if (!imageFile) setImagePreview(e.target.value); }} placeholder="https://..." />
      </div>
      <div><Label>Description *</Label><Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows={3} /></div>
      <Button type="submit" className="w-full bg-brand hover:bg-brand-dark">{initialData ? 'Update Car' : 'Add Car'}</Button>
    </form>
  );
};

const PremiumCarForm = ({ onSave }) => {
  const [formData, setFormData] = useState({ name: '', alt: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => { const file = e.target.files[0]; if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); } };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData, imageFile); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><Label>Car Name *</Label><Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required /></div>
      <div><Label>Alt Text *</Label><Input value={formData.alt} onChange={(e) => setFormData({...formData, alt: e.target.value})} required placeholder="e.g. White Toyota Prado" /></div>
      <div>
        <Label>Car Image *</Label>
        <div className="mt-2 flex items-center gap-4">
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />}
          <Input id="premium-image-upload" type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="hidden" />
          <Button type="button" variant="outline" onClick={() => document.getElementById('premium-image-upload').click()}><Upload className="h-4 w-4 mr-2" />{imageFile ? 'Change Image' : 'Upload Image'}</Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Or paste image URL below (upload takes priority).</p>
        <Input value={formData.image} onChange={(e) => { setFormData({...formData, image: e.target.value}); if (!imageFile) setImagePreview(e.target.value); }} placeholder="https://..." />
      </div>
      <Button type="submit" className="w-full bg-brand hover:bg-brand-dark">Add Premium Car</Button>
    </form>
  );
};

export default Admin;
