import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Settings } from 'lucide-react';
import { useGetCarsQuery } from '@/store/apiSlice';
import { useState } from 'react';

const Cars = () => {
  const { data: cars = [], isLoading } = useGetCarsQuery();
  const [typeFilter, setTypeFilter] = useState('all');
  const [transmissionFilter, setTransmissionFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const filteredCars = useMemo(() => {
    let filtered = cars;
    if (typeFilter !== 'all') filtered = filtered.filter(car => car.type === typeFilter);
    if (transmissionFilter !== 'all') filtered = filtered.filter(car => car.transmission === transmissionFilter);
    if (priceFilter !== 'all') {
      if (priceFilter === 'low') filtered = filtered.filter(car => car.daily_rate < 150000);
      else if (priceFilter === 'medium') filtered = filtered.filter(car => car.daily_rate >= 150000 && car.daily_rate < 200000);
      else if (priceFilter === 'high') filtered = filtered.filter(car => car.daily_rate >= 200000);
    }
    return filtered;
  }, [typeFilter, transmissionFilter, priceFilter, cars]);

  return (
    <>
      <Helmet>
        <title>Browse Our Fleet - VemoRide</title>
        <meta name="description" content="Browse our selection of quality rental cars in Lagos with VemoRide. Economy sedans, SUVs, and luxury vehicles available with airport pickup." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Fleet</h1>
            <p className="text-xl text-gray-600">Choose from our selection of well-maintained vehicles</p>
          </motion.div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-lg font-semibold mb-4">Filter Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="Sedan">Sedan</SelectItem><SelectItem value="SUV">SUV</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                <Select value={transmissionFilter} onValueChange={setTransmissionFilter}>
                  <SelectTrigger><SelectValue placeholder="All Transmissions" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Transmissions</SelectItem><SelectItem value="Automatic">Automatic</SelectItem><SelectItem value="Manual">Manual</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger><SelectValue placeholder="All Prices" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Prices</SelectItem><SelectItem value="low">Under ₦150,000/day</SelectItem><SelectItem value="medium">₦150,000 - ₦200,000/day</SelectItem><SelectItem value="high">Above ₦200,000/day</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-600">Loading cars...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <motion.div key={car.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{car.make} {car.model}</h3>
                      <p className="text-gray-600 mb-4">{car.year} • {car.type}</p>
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center"><Settings className="h-4 w-4 mr-1 text-gold" />{car.transmission}</div>
                        <div className="flex items-center"><Users className="h-4 w-4 mr-1 text-gold" />{car.seats} seats</div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-gold">₦{car.daily_rate.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">per day</p>
                        </div>
                        {car.status !== 'Available' && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Unavailable</span>}
                        {car.airport_pickup && car.status === 'Available' && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Airport Pickup</span>}
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1"><Link to={`/cars/${car.id}`}>View Details</Link></Button>
                        {car.status === 'Available' ? (
                          <Button asChild className="flex-1 bg-brand hover:bg-brand-dark"><Link to={`/booking?car=${car.id}`}>Book Now</Link></Button>
                        ) : (
                          <Button disabled className="flex-1">Unavailable</Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {filteredCars.length === 0 && <div className="text-center py-12"><p className="text-gray-600 text-lg">No cars match your filters. Try adjusting your search.</p></div>}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cars;
