import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cars, bookings } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function BookingRequest() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === id);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    pickupDate: '', returnDate: '', pickupLocation: '', dropoffLocation: '', withDriver: true,
  });

  if (!car) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900"><p className="dark:text-white">Car not found</p></div>;

  const days = form.pickupDate && form.returnDate
    ? Math.max(1, Math.ceil((new Date(form.returnDate) - new Date(form.pickupDate)) / (1000 * 60 * 60 * 24)))
    : 0;

  let discount = 0;
  if (days >= 30) discount = car.pricing.discount30Days;
  else if (days >= 7) discount = car.pricing.discount7Days;
  else if (days >= 2) discount = car.pricing.discount2Days;

  const basePrice = days * car.pricing.daily;
  const discountAmount = basePrice * (discount / 100);
  const totalPrice = basePrice - discountAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    bookings.push({
      id: `b${Date.now()}`, customerId: user.id, carId: car.id, ownerId: car.ownerId,
      driverId: form.withDriver ? car.assignedDriverId : null,
      pickupDate: form.pickupDate, returnDate: form.returnDate,
      pickupLocation: form.pickupLocation, dropoffLocation: form.dropoffLocation,
      status: 'pending', withDriver: form.withDriver, totalPrice, createdAt: new Date().toISOString().split('T')[0],
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="h-10 w-10 text-green-600" /></div>
          <h1 className="text-2xl font-bold dark:text-white mb-2">Booking Request Sent!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The car owner will review your request and respond shortly.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>Browse More</Button>
            <Button className="bg-brand hover:bg-brand-dark" onClick={() => navigate('/dashboard/bookings')}>My Bookings</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-600 dark:text-gray-300"><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="font-bold dark:text-white">Book {car.make} {car.model}</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          {/* Car summary */}
          <div className="flex gap-4 mb-6 pb-6 border-b dark:border-gray-700">
            <img src={car.images[0]} alt={car.make} className="w-24 h-24 object-cover rounded-lg" />
            <div>
              <h2 className="font-bold dark:text-white">{car.make} {car.model}</h2>
              <p className="text-sm text-gray-500">{car.year} - {car.type}</p>
              <p className="text-brand font-bold mt-1">₦{car.pricing.daily.toLocaleString()}/day</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Pickup Date</Label><Input type="date" value={form.pickupDate} onChange={e => setForm({...form, pickupDate: e.target.value})} required min={new Date().toISOString().split('T')[0]} /></div>
              <div><Label>Return Date</Label><Input type="date" value={form.returnDate} onChange={e => setForm({...form, returnDate: e.target.value})} required min={form.pickupDate || new Date().toISOString().split('T')[0]} /></div>
            </div>
            <div><Label>Pickup Location</Label><Input value={form.pickupLocation} onChange={e => setForm({...form, pickupLocation: e.target.value})} placeholder="e.g. Lagos Airport" required /></div>
            <div><Label>Drop-off Location</Label><Input value={form.dropoffLocation} onChange={e => setForm({...form, dropoffLocation: e.target.value})} placeholder="e.g. Victoria Island" required /></div>

            {car.withDriver && car.selfDrive && (
              <div>
                <Label>Driver Option</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button type="button" onClick={() => setForm({...form, withDriver: true})} className={`p-3 rounded-lg border-2 text-center text-sm ${form.withDriver ? 'border-brand bg-brand/5' : 'border-gray-200 dark:border-gray-600'}`}>
                    <p className="font-medium dark:text-white">With Driver</p>
                  </button>
                  <button type="button" onClick={() => setForm({...form, withDriver: false})} className={`p-3 rounded-lg border-2 text-center text-sm ${!form.withDriver ? 'border-brand bg-brand/5' : 'border-gray-200 dark:border-gray-600'}`}>
                    <p className="font-medium dark:text-white">Self Drive</p>
                  </button>
                </div>
              </div>
            )}

            {/* Price breakdown */}
            {days > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm dark:text-gray-300"><span>₦{car.pricing.daily.toLocaleString()} x {days} day{days > 1 ? 's' : ''}</span><span>₦{basePrice.toLocaleString()}</span></div>
                {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Discount ({discount}%)</span><span>-₦{discountAmount.toLocaleString()}</span></div>}
                <div className="flex justify-between font-bold dark:text-white border-t dark:border-gray-600 pt-2"><span>Total</span><span>₦{totalPrice.toLocaleString()}</span></div>
              </div>
            )}

            <Button type="submit" className="w-full bg-brand hover:bg-brand-dark py-6 text-lg">Submit Booking Request</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
