import React from 'react';
import { bookings, cars } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, DollarSign } from 'lucide-react';

export default function Earnings() {
  const { user } = useAuth();
  const myBookings = bookings.filter(b => b.ownerId === user?.id && (b.status === 'confirmed' || b.status === 'completed'));
  const totalEarnings = myBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const thisMonth = myBookings.filter(b => b.pickupDate?.startsWith('2026-05'));
  const monthEarnings = thisMonth.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Earnings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
          <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-500">Total Earnings</span><TrendingUp className="h-5 w-5 text-green-600" /></div>
          <p className="text-2xl font-bold dark:text-white">₦{totalEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
          <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-500">This Month</span><DollarSign className="h-5 w-5 text-brand" /></div>
          <p className="text-2xl font-bold dark:text-white">₦{monthEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
          <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-500">Completed Trips</span><TrendingUp className="h-5 w-5 text-blue-600" /></div>
          <p className="text-2xl font-bold dark:text-white">{myBookings.length}</p>
        </div>
      </div>

      <h2 className="font-bold dark:text-white mb-3">Earnings Breakdown</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700"><tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
          </tr></thead>
          <tbody className="divide-y dark:divide-gray-700">
            {myBookings.map(b => {
              const car = cars.find(c => c.id === b.carId);
              return (
                <tr key={b.id}>
                  <td className="px-4 py-3 text-sm dark:text-white">{car?.make} {car?.model}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{b.pickupDate}</td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 capitalize">{b.status}</span></td>
                  <td className="px-4 py-3 text-sm font-medium text-right dark:text-white">₦{b.totalPrice.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {myBookings.length === 0 && <p className="text-center py-8 text-gray-500">No earnings yet.</p>}
      </div>
    </div>
  );
}
