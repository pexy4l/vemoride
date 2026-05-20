import React from 'react';
import { bookings, cars, users } from '@/data/dummy';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  declined: 'bg-red-100 text-red-800',
  started: 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-100 text-gray-800',
};

export default function AllBookings() {
  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">All Bookings ({bookings.length})</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700"><tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
          </tr></thead>
          <tbody className="divide-y dark:divide-gray-700">
            {bookings.map(b => {
              const car = cars.find(c => c.id === b.carId);
              const customer = users.find(u => u.id === b.customerId);
              const owner = users.find(u => u.id === b.ownerId);
              return (
                <tr key={b.id}>
                  <td className="px-4 py-3 text-sm dark:text-white">{car?.make} {car?.model}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{customer?.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{owner?.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{b.pickupDate} - {b.returnDate}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[b.status] || 'bg-gray-100 text-gray-700'}`}>{b.status}</span></td>
                  <td className="px-4 py-3 text-sm font-medium text-right dark:text-white">₦{b.totalPrice.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {bookings.length === 0 && <p className="text-center py-8 text-gray-500">No bookings.</p>}
      </div>
    </div>
  );
}
