import React, { useState } from 'react';
import { drivers, cars } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Star } from 'lucide-react';

export default function Drivers() {
  const { user } = useAuth();
  const [myDrivers, setMyDrivers] = useState(drivers.filter(d => d.ownerId === user?.id));
  const myCars = cars.filter(c => c.ownerId === user?.id);

  const handleAdd = (data) => {
    const newDriver = { ...data, id: `d${Date.now()}`, ownerId: user.id, rating: 0, trips: 0 };
    drivers.push(newDriver);
    setMyDrivers(drivers.filter(d => d.ownerId === user?.id));
  };

  const handleDelete = (id) => {
    const idx = drivers.findIndex(d => d.id === id);
    if (idx !== -1) drivers.splice(idx, 1);
    setMyDrivers(drivers.filter(d => d.ownerId === user?.id));
  };

  const handleAssign = (driverId, carId) => {
    const car = cars.find(c => c.id === carId);
    if (car) car.assignedDriverId = driverId;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Drivers</h1>
        <Dialog><DialogTrigger asChild><Button className="bg-brand hover:bg-brand-dark"><Plus className="h-4 w-4 mr-2" />Add Driver</Button></DialogTrigger>
          <DialogContent><DialogHeader><DialogTitle>Add Driver</DialogTitle></DialogHeader><DriverForm onSave={handleAdd} /></DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myDrivers.map(driver => (
          <div key={driver.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold text-lg">{driver.name.charAt(0)}</div>
              <div>
                <h3 className="font-bold dark:text-white">{driver.name}</h3>
                <p className="text-sm text-gray-500">{driver.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{driver.rating}</span>
              <span>{driver.trips} trips</span>
            </div>
            <div className="mb-3">
              <Label className="text-xs">Assign to car</Label>
              <select className="w-full mt-1 p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm" onChange={e => handleAssign(driver.id, e.target.value)} defaultValue="">
                <option value="">Select car...</option>
                {myCars.map(c => <option key={c.id} value={c.id}>{c.make} {c.model}</option>)}
              </select>
            </div>
            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(driver.id)}><Trash2 className="h-4 w-4 mr-1" />Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DriverForm({ onSave }) {
  const [form, setForm] = useState({ name: '', phone: '' });
  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div><Label>Full Name</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
      <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
      <Button type="submit" className="w-full bg-brand hover:bg-brand-dark">Add Driver</Button>
    </form>
  );
}
