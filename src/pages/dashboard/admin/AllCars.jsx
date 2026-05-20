import React, { useState } from 'react';
import { cars, users } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Trash2, Star } from 'lucide-react';

export default function AllCars() {
  const [, forceUpdate] = useState(0);
  const allCars = cars;

  const handleRemove = (id) => {
    const idx = cars.findIndex(c => c.id === id);
    if (idx !== -1) cars.splice(idx, 1);
    forceUpdate(n => n + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">All Cars ({allCars.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCars.map(car => {
          const owner = users.find(u => u.id === car.ownerId);
          return (
            <div key={car.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700">
              <img src={car.images[0]} alt={car.make} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold dark:text-white">{car.make} {car.model}</h3>
                  <div className="flex items-center gap-1 text-sm"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{car.rating}</div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{car.year} - {car.type} - {car.location}</p>
                <p className="text-xs text-gray-400 mt-1">Owner: {owner?.name}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${car.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{car.status}</span>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleRemove(car.id)}><Trash2 className="h-4 w-4 mr-1" />Remove</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
