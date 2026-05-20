import React, { useState } from 'react';
import { users, cars } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export default function Approvals() {
  const [, forceUpdate] = useState(0);

  const pendingOwners = users.filter(u => u.role === 'drivercarowner' && u.approved === false);
  const pendingCars = cars.filter(c => c.approved === false);

  const approveOwner = (id) => { const u = users.find(x => x.id === id); if (u) u.approved = true; forceUpdate(n => n + 1); };
  const rejectOwner = (id) => { const idx = users.findIndex(x => x.id === id); if (idx !== -1) users.splice(idx, 1); forceUpdate(n => n + 1); };
  const approveCar = (id) => { const c = cars.find(x => x.id === id); if (c) c.approved = true; forceUpdate(n => n + 1); };
  const rejectCar = (id) => { const idx = cars.findIndex(x => x.id === id); if (idx !== -1) cars.splice(idx, 1); forceUpdate(n => n + 1); };

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Approvals</h1>

      <div className="mb-8">
        <h2 className="text-lg font-bold dark:text-white mb-3">Pending Owner Accounts ({pendingOwners.length})</h2>
        {pendingOwners.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">No pending owner approvals.</p>
        ) : (
          <div className="space-y-3">
            {pendingOwners.map(u => (
              <div key={u.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex items-center gap-4">
                <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold">{u.name.charAt(0)}</div>
                <div className="flex-1"><p className="font-medium dark:text-white">{u.name}</p><p className="text-sm text-gray-500">{u.email}</p></div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => approveOwner(u.id)}><Check className="h-4 w-4 mr-1" />Approve</Button>
                  <Button size="sm" variant="destructive" onClick={() => rejectOwner(u.id)}><X className="h-4 w-4 mr-1" />Reject</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold dark:text-white mb-3">Pending Car Listings ({pendingCars.length})</h2>
        {pendingCars.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">No pending car approvals.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingCars.map(car => {
              const owner = users.find(u => u.id === car.ownerId);
              return (
                <div key={car.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700">
                  <img src={car.images[0]} alt={car.make} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold dark:text-white">{car.make} {car.model}</h3>
                    <p className="text-sm text-gray-500">{car.year} - {car.type} - Owner: {owner?.name}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => approveCar(car.id)}><Check className="h-4 w-4 mr-1" />Approve</Button>
                      <Button size="sm" variant="destructive" onClick={() => rejectCar(car.id)}><X className="h-4 w-4 mr-1" />Reject</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
