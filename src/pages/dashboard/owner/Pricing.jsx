import React, { useState } from 'react';
import { cars } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Copy } from 'lucide-react';

export default function Pricing() {
  const { user } = useAuth();
  const myCars = cars.filter(c => c.ownerId === user?.id);
  const [selected, setSelected] = useState([]);
  const [, forceUpdate] = useState(0);

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handleSave = (carId, pricing) => {
    const car = cars.find(c => c.id === carId);
    if (car) car.pricing = { ...car.pricing, ...pricing };
    forceUpdate(n => n + 1);
  };

  const handleBulkCopy = (sourceId) => {
    const source = cars.find(c => c.id === sourceId);
    if (!source) return;
    selected.forEach(id => {
      if (id !== sourceId) {
        const car = cars.find(c => c.id === id);
        if (car) car.pricing = { ...source.pricing };
      }
    });
    forceUpdate(n => n + 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Pricing Management</h1>
        {selected.length > 1 && (
          <Button variant="outline" size="sm" onClick={() => handleBulkCopy(selected[0])}>
            <Copy className="h-4 w-4 mr-2" />Copy pricing from first selected to others
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {myCars.map(car => (
          <PricingCard key={car.id} car={car} onSave={handleSave} selected={selected.includes(car.id)} onToggle={() => toggleSelect(car.id)} />
        ))}
      </div>
    </div>
  );
}

function PricingCard({ car, onSave, selected, onToggle }) {
  const [pricing, setPricing] = useState({ ...car.pricing });
  const setField = (k, v) => setPricing({ ...pricing, [k]: Number(v) });

  return (
    <div className={`bg-white dark:bg-gray-800 p-5 rounded-xl border ${selected ? 'border-brand' : 'dark:border-gray-700'}`}>
      <div className="flex items-center gap-3 mb-4">
        <input type="checkbox" checked={selected} onChange={onToggle} className="rounded" />
        <img src={car.images[0]} alt="" className="w-12 h-12 object-cover rounded" />
        <div><h3 className="font-bold dark:text-white">{car.make} {car.model}</h3><p className="text-xs text-gray-500">{car.year} - {car.type}</p></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div><Label className="text-xs">Daily (₦)</Label><Input type="number" value={pricing.daily} onChange={e => setField('daily', e.target.value)} /></div>
        <div><Label className="text-xs">Weekly (₦)</Label><Input type="number" value={pricing.weekly} onChange={e => setField('weekly', e.target.value)} /></div>
        <div><Label className="text-xs">Monthly (₦)</Label><Input type="number" value={pricing.monthly} onChange={e => setField('monthly', e.target.value)} /></div>
        <div><Label className="text-xs">Weekend (₦)</Label><Input type="number" value={pricing.weekend} onChange={e => setField('weekend', e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div><Label className="text-xs">2+ days (%)</Label><Input type="number" value={pricing.discount2Days} onChange={e => setField('discount2Days', e.target.value)} /></div>
        <div><Label className="text-xs">7+ days (%)</Label><Input type="number" value={pricing.discount7Days} onChange={e => setField('discount7Days', e.target.value)} /></div>
        <div><Label className="text-xs">30+ days (%)</Label><Input type="number" value={pricing.discount30Days} onChange={e => setField('discount30Days', e.target.value)} /></div>
      </div>
      <Button size="sm" className="bg-brand hover:bg-brand-dark" onClick={() => onSave(car.id, pricing)}><Save className="h-4 w-4 mr-1" />Save</Button>
    </div>
  );
}
