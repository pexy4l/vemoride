import React, { useState } from 'react';
import { bookings, cars, users } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle, MapPin } from 'lucide-react';

export default function AssignedTrips() {
  const { user } = useAuth();
  const [, forceUpdate] = useState(0);
  const activeBookings = bookings.filter(b => b.ownerId === user?.id && (b.status === 'confirmed' || b.status === 'started'));

  const handleStart = (id) => {
    const b = bookings.find(x => x.id === id);
    if (b) b.status = 'started';
    forceUpdate(n => n + 1);
  };

  const handleComplete = (id) => {
    const b = bookings.find(x => x.id === id);
    if (b) b.status = 'completed';
    forceUpdate(n => n + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Assigned Trips</h1>

      {activeBookings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No active trips.</p>
      ) : (
        <div className="space-y-4">
          {activeBookings.map(b => {
            const car = cars.find(c => c.id === b.carId);
            const customer = users.find(u => u.id === b.customerId);
            return (
              <div key={b.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <img src={car?.images[0]} alt="" className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-bold dark:text-white">{car?.make} {car?.model}</h3>
                    <p className="text-sm text-gray-500">Customer: {customer?.name}</p>
                    <p className="text-sm text-gray-500">{b.pickupDate} to {b.returnDate}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1"><MapPin className="h-3 w-3" />{b.pickupLocation} → {b.dropoffLocation}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-brand font-bold">₦{b.totalPrice.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${b.status === 'started' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{b.status}</span>
                  </div>
                  <div className="flex gap-2">
                    {b.status === 'confirmed' && <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleStart(b.id)}><Play className="h-4 w-4 mr-1" />Start</Button>}
                    {b.status === 'started' && <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleComplete(b.id)}><CheckCircle className="h-4 w-4 mr-1" />Complete</Button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
