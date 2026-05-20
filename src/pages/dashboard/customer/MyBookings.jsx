import React from 'react';
import { bookings, cars } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  declined: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  started: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  completed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

export default function MyBookings() {
  const { user } = useAuth();
  const myBookings = bookings.filter(b => b.customerId === user?.id);

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">My Bookings</h1>

      {myBookings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No bookings yet. Browse cars to make your first booking.</p>
      ) : (
        <div className="space-y-4">
          {myBookings.map(booking => {
            const car = cars.find(c => c.id === booking.carId);
            return (
              <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border dark:border-gray-700 flex gap-4">
                <img src={car?.images[0]} alt={car?.make} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold dark:text-white">{car?.make} {car?.model}</h3>
                      <p className="text-sm text-gray-500">{booking.pickupDate} to {booking.returnDate}</p>
                      <p className="text-sm text-gray-500">{booking.pickupLocation} → {booking.dropoffLocation}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[booking.status]}`}>{booking.status}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-brand font-bold">₦{booking.totalPrice.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">{booking.withDriver ? 'With driver' : 'Self drive'}</span>
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
