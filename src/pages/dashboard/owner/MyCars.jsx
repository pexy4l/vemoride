import React, { useState } from 'react';
import { cars } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';

export default function MyCars() {
  const { user } = useAuth();
  const [myCars, setMyCars] = useState(cars.filter(c => c.ownerId === user?.id));
  const [editing, setEditing] = useState(null);

  const handleSave = (data) => {
    if (editing) {
      const idx = cars.findIndex(c => c.id === editing.id);
      if (idx !== -1) Object.assign(cars[idx], data);
      setMyCars(cars.filter(c => c.ownerId === user?.id));
    } else {
      const newCar = { ...data, id: `c${Date.now()}`, ownerId: user.id, rating: 0, trips: 0, status: 'available', availability: { blockedDates: [], maintenance: false } };
      cars.push(newCar);
      setMyCars(cars.filter(c => c.ownerId === user?.id));
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    const idx = cars.findIndex(c => c.id === id);
    if (idx !== -1) cars.splice(idx, 1);
    setMyCars(cars.filter(c => c.ownerId === user?.id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">My Cars</h1>
        <Dialog><DialogTrigger asChild><Button className="bg-brand hover:bg-brand-dark" onClick={() => setEditing(null)}><Plus className="h-4 w-4 mr-2" />Add Car</Button></DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Add Car</DialogTitle></DialogHeader><CarForm onSave={handleSave} /></DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myCars.map(car => (
          <div key={car.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700">
            <img src={car.images[0]} alt={car.make} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold dark:text-white">{car.make} {car.model}</h3>
                <div className="flex items-center gap-1 text-sm"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{car.rating}</div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{car.year} - {car.type} - {car.seats} seats</p>
              <p className="text-brand font-bold mt-2">₦{car.pricing.daily.toLocaleString()}/day</p>
              <div className="flex items-center justify-between mt-3">
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${car.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{car.status}</span>
                <div className="flex gap-1">
                  <Dialog><DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => setEditing(car)}><Edit className="h-4 w-4" /></Button></DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Edit Car</DialogTitle></DialogHeader><CarForm onSave={handleSave} initial={car} /></DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(car.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CarForm({ onSave, initial }) {
  const [form, setForm] = useState({
    make: '', model: '', year: 2024, type: 'Sedan', transmission: 'Automatic', seats: 5,
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'],
    description: '', location: '', withDriver: true, selfDrive: true, assignedDriverId: null,
    pricing: { daily: 50000, weekly: 300000, monthly: 1000000, weekend: 60000, discount2Days: 5, discount7Days: 10, discount30Days: 15 },
    features: [],
    ...initial,
  });
  const [featureInput, setFeatureInput] = useState('');

  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };
  const setField = (k, v) => setForm({ ...form, [k]: v });
  const setPricing = (k, v) => setForm({ ...form, pricing: { ...form.pricing, [k]: Number(v) } });

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Make</Label><Input value={form.make} onChange={e => setField('make', e.target.value)} required /></div>
        <div><Label>Model</Label><Input value={form.model} onChange={e => setField('model', e.target.value)} required /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><Label>Year</Label><Input type="number" value={form.year} onChange={e => setField('year', +e.target.value)} /></div>
        <div><Label>Type</Label><Input value={form.type} onChange={e => setField('type', e.target.value)} /></div>
        <div><Label>Seats</Label><Input type="number" value={form.seats} onChange={e => setField('seats', +e.target.value)} /></div>
      </div>
      <div><Label>Location</Label><Input value={form.location} onChange={e => setField('location', e.target.value)} placeholder="e.g. Lagos Island" /></div>
      <div><Label>Car Images</Label><ImageUploader images={form.images} onChange={imgs => setField('images', imgs)} /></div>
      <div><Label>Description</Label><Input value={form.description} onChange={e => setField('description', e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Daily (₦)</Label><Input type="number" value={form.pricing.daily} onChange={e => setPricing('daily', e.target.value)} /></div>
        <div><Label>Weekly (₦)</Label><Input type="number" value={form.pricing.weekly} onChange={e => setPricing('weekly', e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Monthly (₦)</Label><Input type="number" value={form.pricing.monthly} onChange={e => setPricing('monthly', e.target.value)} /></div>
        <div><Label>Weekend (₦)</Label><Input type="number" value={form.pricing.weekend} onChange={e => setPricing('weekend', e.target.value)} /></div>
      </div>
      <div>
        <Label>Features (e.g. AC, Bluetooth)</Label>
        <div className="flex gap-2 mt-1">
          <Input value={featureInput} onChange={e => setFeatureInput(e.target.value)} placeholder="Add feature" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (featureInput.trim()) { setForm({...form, features: [...(form.features || []), featureInput.trim()]}); setFeatureInput(''); } } }} />
          <Button type="button" variant="outline" onClick={() => { if (featureInput.trim()) { setForm({...form, features: [...(form.features || []), featureInput.trim()]}); setFeatureInput(''); } }}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {(form.features || []).map((f, i) => (
            <span key={i} className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-full flex items-center gap-1">{f}<button type="button" onClick={() => setForm({...form, features: form.features.filter((_, j) => j !== i)})} className="text-brand/60 hover:text-brand">&times;</button></span>
          ))}
        </div>
      </div>
      <Button type="submit" className="w-full bg-brand hover:bg-brand-dark">{initial ? 'Update' : 'Add'} Car</Button>
    </form>
  );
}
