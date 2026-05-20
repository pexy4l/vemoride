import React, { useState } from 'react';
import { cars } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Plus, X } from 'lucide-react';

export default function Availability() {
  const { user } = useAuth();
  const myCars = cars.filter(c => c.ownerId === user?.id);
  const [selectedCar, setSelectedCar] = useState(myCars[0]?.id || '');
  const [newDate, setNewDate] = useState('');
  const [, forceUpdate] = useState(0);

  const car = cars.find(c => c.id === selectedCar);
  const today = new Date();
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const handleBlock = () => {
    if (!newDate || !car) return;
    if (!car.availability.blockedDates.includes(newDate)) car.availability.blockedDates.push(newDate);
    setNewDate('');
    forceUpdate(n => n + 1);
  };

  const handleUnblock = (date) => {
    if (!car) return;
    car.availability.blockedDates = car.availability.blockedDates.filter(d => d !== date);
    forceUpdate(n => n + 1);
  };

  const handleStatus = (status) => {
    if (!car) return;
    car.status = status;
    forceUpdate(n => n + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Availability Calendar</h1>

      <div className="mb-6">
        <Label>Select Car</Label>
        <Select value={selectedCar} onValueChange={setSelectedCar}>
          <SelectTrigger className="w-full md:w-64"><SelectValue /></SelectTrigger>
          <SelectContent>{myCars.map(c => <SelectItem key={c.id} value={c.id}>{c.make} {c.model}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {car && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
            <h2 className="font-bold dark:text-white mb-3 flex items-center gap-2"><CalendarDays className="h-5 w-5" />Next 30 Days</h2>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map(date => {
                const blocked = car.availability.blockedDates.includes(date);
                return (
                  <button key={date} onClick={() => blocked ? handleUnblock(date) : null} className={`p-2 text-center text-xs rounded ${blocked ? 'bg-red-100 dark:bg-red-900/30 text-red-600 cursor-pointer' : 'bg-green-50 dark:bg-green-900/20 text-green-700'}`} title={date}>
                    {new Date(date).getDate()}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-50 border rounded" />Available</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 border rounded" />Blocked (click to unblock)</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
              <h2 className="font-bold dark:text-white mb-3">Block a Date</h2>
              <div className="flex gap-2">
                <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} min={today.toISOString().split('T')[0]} />
                <Button onClick={handleBlock} className="bg-brand hover:bg-brand-dark"><Plus className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
              <h2 className="font-bold dark:text-white mb-3">Car Status</h2>
              <div className="grid grid-cols-2 gap-2">
                {['available', 'unavailable', 'booked', 'maintenance'].map(s => (
                  <button key={s} onClick={() => handleStatus(s)} className={`p-2 rounded-lg border text-sm capitalize ${car.status === s ? 'border-brand bg-brand/10 text-brand' : 'border-gray-200 dark:border-gray-600 dark:text-gray-300'}`}>{s}</button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
              <h2 className="font-bold dark:text-white mb-3">Blocked Dates</h2>
              {car.availability.blockedDates.length === 0 ? <p className="text-sm text-gray-500">No blocked dates</p> : (
                <div className="space-y-1">
                  {car.availability.blockedDates.map(d => (
                    <div key={d} className="flex justify-between items-center text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      <span className="dark:text-gray-300">{d}</span>
                      <button onClick={() => handleUnblock(d)}><X className="h-4 w-4 text-red-500" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
