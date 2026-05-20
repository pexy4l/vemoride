import React, { useState } from 'react';
import { bookings, cars, users } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export default function BookingRequests() {
  const { user } = useAuth();
  const [, forceUpdate] = useState(0);
  const myBookings = bookings.filter(b => b.ownerId === user?.id);
  const pending = myBookings.filter(b => b.status === 'pending');
  const others = myBookings.filter(b => b.status !== 'pending');

  const handleAccept = (id) => {
    const b = bookings.find(x => x.id === id);
    if (b) b.status = 'confirmed';
    forceUpdate(n => n + 1);
  };

  const handleDecline = (id) => {
    const b = bookings.find(x => x.id === id);
    if (b) b.status = 'declined';
    forceUpdate(n => n + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Booking Requests</h1>

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold dark:text-white mb-3 text-lg">Pending ({pending.length})</h2>
          <div className="space-y-3">
            {pending.map(b => {
              const car = cars.find(c => c.id === b.carId);
              const customer = users.find(u => u.id === b.customerId);
              return (
                <div key={b.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex flex-col md:flex-row md:items-center gap-4">
                  <img src={car?.images[0]} alt="" className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-medium dark:text-white">{car?.make} {car?.model}</p>
                    <p className="text-sm text-gray-500">Customer: {customer?.name}</p>
                    <p className="text-sm text-gray-500">{b.pickupDate} to {b.returnDate}</p>
                    <p className="text-sm text-gray-500">{b.pickupLocation} → {b.dropoffLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-brand font-bold">₦{b.totalPrice.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{b.withDriver ? 'With driver' : 'Self drive'}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAccept(b.id)}><Check className="h-4 w-4 mr-1" />Accept</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDecline(b.id)}><X className="h-4 w-4 mr-1" />Decline</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <h2 className="font-bold dark:text-white mb-3 text-lg">All Requests</h2>
      <div className="space-y-2">
        {others.map(b => {
          const car = cars.find(c => c.id === b.carId);
          return (
            <div key={b.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700 flex items-center gap-3">
              <img src={car?.images[0]} alt="" className="w-10 h-10 object-cover rounded" />
              <div className="flex-1"><p className="text-sm font-medium dark:text-white">{car?.make} {car?.model}</p><p className="text-xs text-gray-500">{b.pickupDate} - ₦{b.totalPrice.toLocaleString()}</p></div>
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'declined' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{b.status}</span>
            </div>
          );
        })}
        {others.length === 0 && pending.length === 0 && <p className="text-gray-500">No booking requests yet.</p>}
      </div>
    </div>
  );
}
