import React from 'react';
import { cars, bookings, drivers } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { Car, ClipboardList, TrendingUp, Star } from 'lucide-react';

export default function OwnerOverview() {
  const { user } = useAuth();
  const myCars = cars.filter(c => c.ownerId === user?.id);
  const myBookings = bookings.filter(b => b.ownerId === user?.id);
  const myDrivers = drivers.filter(d => d.ownerId === user?.id);
  const activeBookings = myBookings.filter(b => b.status === 'confirmed' || b.status === 'started');
  const totalEarnings = myBookings.filter(b => b.status === 'confirmed' || b.status === 'completed').reduce((sum, b) => sum + b.totalPrice, 0);
  const avgRating = myCars.length ? (myCars.reduce((sum, c) => sum + c.rating, 0) / myCars.length).toFixed(1) : 0;

  const stats = [
    { label: 'Total Cars', value: myCars.length, icon: Car, color: 'text-brand' },
    { label: 'Active Bookings', value: activeBookings.length, icon: ClipboardList, color: 'text-blue-600' },
    { label: 'Total Earnings', value: `₦${totalEarnings.toLocaleString()}`, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Avg Rating', value: avgRating, icon: Star, color: 'text-yellow-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold dark:text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
          <h2 className="font-bold dark:text-white mb-3">Recent Bookings</h2>
          {myBookings.slice(0, 5).map(b => {
            const car = cars.find(c => c.id === b.carId);
            return (
              <div key={b.id} className="flex justify-between items-center py-2 border-b dark:border-gray-700 last:border-0">
                <div><p className="text-sm font-medium dark:text-white">{car?.make} {car?.model}</p><p className="text-xs text-gray-500">{b.pickupDate}</p></div>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{b.status}</span>
              </div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
          <h2 className="font-bold dark:text-white mb-3">My Drivers ({myDrivers.length})</h2>
          {myDrivers.map(d => (
            <div key={d.id} className="flex items-center gap-3 py-2 border-b dark:border-gray-700 last:border-0">
              <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center text-brand text-sm font-bold">{d.name.charAt(0)}</div>
              <div><p className="text-sm font-medium dark:text-white">{d.name}</p><p className="text-xs text-gray-500">{d.trips} trips - ★ {d.rating}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
