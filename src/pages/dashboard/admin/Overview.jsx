import React from 'react';
import { users, cars, bookings, drivers } from '@/data/dummy';
import { Users, Car, ClipboardList, TrendingUp, UserCheck, AlertTriangle } from 'lucide-react';

export default function AdminOverview() {
  const customers = users.filter(u => u.role === 'customer');
  const owners = users.filter(u => u.role === 'drivercarowner');
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const totalRevenue = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed').reduce((s, b) => s + b.totalPrice, 0);

  const stats = [
    { label: 'Customers', value: customers.length, icon: Users, color: 'text-blue-600' },
    { label: 'Partners', value: owners.length, icon: UserCheck, color: 'text-brand' },
    { label: 'Total Cars', value: cars.length, icon: Car, color: 'text-purple-600' },
    { label: 'Total Bookings', value: bookings.length, icon: ClipboardList, color: 'text-orange-600' },
    { label: 'Pending Bookings', value: pendingBookings.length, icon: AlertTriangle, color: 'text-yellow-600' },
    { label: 'Platform Revenue', value: `₦${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-green-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
            <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-500">{s.label}</span><s.icon className={`h-5 w-5 ${s.color}`} /></div>
            <p className="text-2xl font-bold dark:text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
          <h2 className="font-bold dark:text-white mb-3">Recent Bookings</h2>
          {bookings.slice(0, 5).map(b => {
            const car = cars.find(c => c.id === b.carId);
            const customer = users.find(u => u.id === b.customerId);
            return (
              <div key={b.id} className="flex justify-between items-center py-2 border-b dark:border-gray-700 last:border-0">
                <div><p className="text-sm font-medium dark:text-white">{car?.make} {car?.model}</p><p className="text-xs text-gray-500">{customer?.name} - {b.pickupDate}</p></div>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{b.status}</span>
              </div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
          <h2 className="font-bold dark:text-white mb-3">Drivers ({drivers.length})</h2>
          {drivers.map(d => {
            const owner = users.find(u => u.id === d.ownerId);
            return (
              <div key={d.id} className="flex items-center gap-3 py-2 border-b dark:border-gray-700 last:border-0">
                <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center text-brand text-sm font-bold">{d.name.charAt(0)}</div>
                <div className="flex-1"><p className="text-sm font-medium dark:text-white">{d.name}</p><p className="text-xs text-gray-500">Owner: {owner?.name}</p></div>
                <span className="text-xs text-gray-500">★ {d.rating}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
