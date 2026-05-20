import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';
import { useGetAvailableCarsQuery, useGetBlockedDatesForCarQuery, useCreateBookingMutation } from '@/store/apiSlice';

const Booking = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    car_id: searchParams.get('car') || '',
    pickup_date: '', pickup_time: '', return_date: '', return_time: '',
    pickup_location: '', full_name: '', email: '', phone: '', notes: ''
  });

  const { data: cars = [] } = useGetAvailableCarsQuery();
  const { data: blockedDates = [] } = useGetBlockedDatesForCarQuery(formData.car_id, { skip: !formData.car_id });
  const [createBooking] = useCreateBookingMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCar = cars.find(car => car.id === formData.car_id);
    if (!selectedCar) {
      toast({ title: 'Error', description: 'Please select a car', variant: 'destructive' });
      return;
    }

    const carBlockedDates = blockedDates.map(d => d.blocked_date);
    const pickupDate = new Date(formData.pickup_date);
    const returnDate = new Date(formData.return_date);
    for (let d = new Date(pickupDate); d <= returnDate; d.setDate(d.getDate() + 1)) {
      if (carBlockedDates.includes(d.toISOString().split('T')[0])) {
        toast({ title: 'Dates Unavailable', description: 'This car is not available for the selected dates.', variant: 'destructive' });
        return;
      }
    }

    try {
      await createBooking({ ...formData, car_name: `${selectedCar.make} ${selectedCar.model}` }).unwrap();
      setShowConfirmation(true);
      setFormData({ car_id: '', pickup_date: '', pickup_time: '', return_date: '', return_time: '', pickup_location: '', full_name: '', email: '', phone: '', notes: '' });
      toast({ title: 'Booking Submitted!', description: 'We will call you shortly to confirm availability.' });
    } catch (error) {
      toast({ title: 'Booking Failed', description: error.data?.error || 'Something went wrong', variant: 'destructive' });
    }
  };

  if (showConfirmation) {
    return (
      <>
        <Helmet><title>Booking Confirmed - VemoRide</title></Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="h-10 w-10 text-green-600" /></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Request Submitted!</h1>
            <p className="text-gray-600 mb-6">Thank you for your booking request. VemoRide will call you back shortly to confirm availability and finalize your reservation.</p>
            <Button onClick={() => setShowConfirmation(false)} className="bg-brand hover:bg-brand-dark">Make Another Booking</Button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book a Car - VemoRide</title>
        <meta name="description" content="Book your car rental in Lagos with VemoRide." />
      </Helmet>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Car</h1>
            <p className="text-xl text-gray-600 mb-8">Fill out the form below and we'll call you to confirm availability</p>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm space-y-6">
              <div>
                <Label htmlFor="car_id">Select Car *</Label>
                <Select value={formData.car_id} onValueChange={(value) => setFormData({...formData, car_id: value})} required>
                  <SelectTrigger id="car_id"><SelectValue placeholder="Choose a car" /></SelectTrigger>
                  <SelectContent>{cars.map(car => <SelectItem key={car.id} value={car.id}>{car.make} {car.model} - ₦{car.daily_rate.toLocaleString()}/day</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="pickup_date">Pickup Date *</Label><Input id="pickup_date" type="date" value={formData.pickup_date} onChange={(e) => setFormData({...formData, pickup_date: e.target.value})} required min={new Date().toISOString().split('T')[0]} /></div>
                <div><Label htmlFor="pickup_time">Pickup Time *</Label><Input id="pickup_time" type="time" value={formData.pickup_time} onChange={(e) => setFormData({...formData, pickup_time: e.target.value})} required /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="return_date">Return Date *</Label><Input id="return_date" type="date" value={formData.return_date} onChange={(e) => setFormData({...formData, return_date: e.target.value})} required min={formData.pickup_date || new Date().toISOString().split('T')[0]} /></div>
                <div><Label htmlFor="return_time">Return Time *</Label><Input id="return_time" type="time" value={formData.return_time} onChange={(e) => setFormData({...formData, return_time: e.target.value})} required /></div>
              </div>
              <div>
                <Label htmlFor="pickup_location">Pickup Location *</Label>
                <Select value={formData.pickup_location} onValueChange={(value) => setFormData({...formData, pickup_location: value})} required>
                  <SelectTrigger id="pickup_location"><SelectValue placeholder="Choose pickup location" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lagos Airport">Lagos Airport (Murtala Muhammed International)</SelectItem>
                    <SelectItem value="Medina Estate Office">Medina Estate Office, Gbagada</SelectItem>
                    <SelectItem value="Other in Lagos">Other Location in Lagos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="full_name">Full Name *</Label><Input id="full_name" type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} required placeholder="Enter your full name" /></div>
              <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="your@email.com" /></div>
              <div><Label htmlFor="phone">Phone Number *</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required placeholder="+234 808 740 1435" /></div>
              <div><Label htmlFor="notes">Additional Notes (Optional)</Label><Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Any special requests or questions?" rows={4} /></div>
              <Button type="submit" size="lg" className="w-full bg-brand hover:bg-brand-dark">Submit Booking Request</Button>
              <p className="text-sm text-gray-600 text-center">* Required fields. We'll call you to confirm availability and payment details.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Booking;
