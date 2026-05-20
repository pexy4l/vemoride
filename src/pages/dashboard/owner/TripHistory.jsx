import React from 'react';
import { bookings, cars, users } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export default function TripHistory() {
  const { user } = useAuth();
  const completed = bookings.filter(b => b.ownerId === user?.id && b.status === 'completed');

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Trip History</h1>

      {completed.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No completed trips yet.</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700"><tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr></thead>
            <tbody className="divide-y dark:divide-gray-700">
              {completed.map(b => {
                const car = cars.find(c => c.id === b.carId);
                const customer = users.find(u => u.id === b.customerId);
                return (
                  <tr key={b.id}>
                    <td className="px-4 py-3 text-sm dark:text-white">{car?.make} {car?.model}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{customer?.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{b.pickupDate} - {b.returnDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{b.pickupLocation} → {b.dropoffLocation}</td>
                    <td className="px-4 py-3 text-sm font-medium text-right dark:text-white">₦{b.totalPrice.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
