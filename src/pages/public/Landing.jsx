import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cars } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar, Star, Filter } from 'lucide-react';

export default function Landing() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [transmissionFilter, setTransmissionFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [driverFilter, setDriverFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    let result = cars.filter(c => c.status === 'available');
    if (location) result = result.filter(c => c.location.toLowerCase().includes(location.toLowerCase()));
    if (date) result = result.filter(c => !c.availability.blockedDates.includes(date));
    if (typeFilter !== 'all') result = result.filter(c => c.type === typeFilter);
    if (transmissionFilter !== 'all') result = result.filter(c => c.transmission === transmissionFilter);
    if (priceFilter === 'low') result = result.filter(c => c.pricing.daily < 80000);
    else if (priceFilter === 'mid') result = result.filter(c => c.pricing.daily >= 80000 && c.pricing.daily < 130000);
    else if (priceFilter === 'high') result = result.filter(c => c.pricing.daily >= 130000);
    if (driverFilter === 'with') result = result.filter(c => c.withDriver);
    else if (driverFilter === 'self') result = result.filter(c => c.selfDrive);
    return result;
  }, [location, date, typeFilter, transmissionFilter, priceFilter, driverFilter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/vemoride.svg" alt="VemoRide" className="h-8 w-8" />
            <span className="font-bold text-lg dark:text-white">VemoRide</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link to="/register"><Button size="sm" className="bg-brand hover:bg-brand-dark">Register</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero + Search */}
      <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find your perfect ride in Lagos</h1>
          <p className="text-lg text-white/80 mb-8">Rent cars from trusted owners, with or without a driver</p>
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input className="pl-9" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input type="date" className="pl-9" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </div>
              <Button className="bg-brand hover:bg-brand-dark w-full" onClick={() => setShowFilters(!showFilters)}><Filter className="h-4 w-4 mr-2" />Filters</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger><SelectValue placeholder="Car Type" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="Sedan">Sedan</SelectItem><SelectItem value="SUV">SUV</SelectItem><SelectItem value="Van">Van</SelectItem></SelectContent>
            </Select>
            <Select value={transmissionFilter} onValueChange={setTransmissionFilter}>
              <SelectTrigger><SelectValue placeholder="Transmission" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="Automatic">Automatic</SelectItem><SelectItem value="Manual">Manual</SelectItem></SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger><SelectValue placeholder="Price" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Prices</SelectItem><SelectItem value="low">Under ₦80k/day</SelectItem><SelectItem value="mid">₦80k - ₦130k/day</SelectItem><SelectItem value="high">Above ₦130k/day</SelectItem></SelectContent>
            </Select>
            <Select value={driverFilter} onValueChange={setDriverFilter}>
              <SelectTrigger><SelectValue placeholder="Driver" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="with">With Driver</SelectItem><SelectItem value="self">Self Drive</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Cars Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Available Cars</h2>
          <span className="text-sm text-gray-500">{filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} found</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <Link key={car.id} to={`/car/${car.id}`} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold dark:text-white">{car.make} {car.model}</h3>
                  <div className="flex items-center gap-1 text-sm"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /><span className="dark:text-gray-300">{car.rating}</span></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{car.year} - {car.type} - {car.seats} seats - {car.transmission}</p>
                <div className="flex items-center justify-between">
                  <div><span className="text-xl font-bold text-brand">₦{car.pricing.daily.toLocaleString()}</span><span className="text-sm text-gray-500">/day</span></div>
                </div>
                <div className="flex gap-2 mt-2">
                  {car.withDriver && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">With Driver</span>}
                  {car.selfDrive && <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">Self Drive</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filteredCars.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-12">No cars match your filters.</p>}
      </section>
    </div>
  );
}
