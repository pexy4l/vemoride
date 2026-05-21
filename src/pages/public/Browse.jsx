import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cars } from '@/data/dummy';
import { statesLGA } from '@/data/statesLGA';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Heart, Sun, Moon, Globe, SlidersHorizontal } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Browse() {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toggleLang } = useLanguage();

  const [stateFilter, setStateFilter] = useState('');
  const [lgaFilter, setLgaFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [transmissionFilter, setTransmissionFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [featureFilter, setFeatureFilter] = useState('all');
  const [favourites, setFavourites] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const allFeatures = useMemo(() => [...new Set(cars.flatMap(c => c.features || []))].sort(), []);
  const lgasForState = useMemo(() => {
    if (!stateFilter) return [];
    const found = statesLGA.find(s => s.state === stateFilter);
    return found ? found.lgas : [];
  }, [stateFilter]);

  const filteredCars = useMemo(() => {
    let result = cars.filter(c => c.status === 'available');
    if (stateFilter) result = result.filter(c => c.location === stateFilter);
    if (lgaFilter) result = result.filter(c => c.lga === lgaFilter);
    if (typeFilter !== 'all') result = result.filter(c => c.type === typeFilter);
    if (transmissionFilter !== 'all') result = result.filter(c => c.transmission === transmissionFilter);
    if (priceFilter === 'low') result = result.filter(c => c.pricing.daily < 80000);
    else if (priceFilter === 'mid') result = result.filter(c => c.pricing.daily >= 80000 && c.pricing.daily < 130000);
    else if (priceFilter === 'high') result = result.filter(c => c.pricing.daily >= 130000);
    if (featureFilter !== 'all') result = result.filter(c => (c.features || []).includes(featureFilter));
    return result;
  }, [stateFilter, lgaFilter, typeFilter, transmissionFilter, priceFilter, featureFilter]);

  const toggleFav = (e, carId) => { e.preventDefault(); setFavourites(f => f.includes(carId) ? f.filter(id => id !== carId) : [...f, carId]); };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/vemoride4.svg" alt="VemoRide" className="h-10 w-10" />
            <span className="font-bold text-lg dark:text-white">Vemo<span className="text-brand">Ride</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
            <Button variant="ghost" size="icon" onClick={toggleLang}><Globe className="h-4 w-4" /></Button>
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:inline">{user?.name}</span>
                <Link to="/dashboard"><Button size="sm" variant="outline">Dashboard</Button></Link>
              </>
            ) : (
              <Link to="/login"><Button size="sm" className="bg-brand hover:bg-brand-dark">Sign In</Button></Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex-1">
        {/* Toggle filters on mobile */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold dark:text-white">Browse Cars</h1>
          <Button variant="outline" size="sm" className="md:hidden" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal className="h-4 w-4 mr-1" />Filters</Button>
        </div>

        {/* Filters */}
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 border dark:border-gray-700 mb-6 ${showFilters ? '' : 'hidden md:block'}`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Select value={stateFilter} onValueChange={(v) => { setStateFilter(v === 'all' ? '' : v); setLgaFilter(''); }}>
              <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><SelectValue placeholder="State" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {statesLGA.map(s => <SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={lgaFilter || 'all'} onValueChange={(v) => setLgaFilter(v === 'all' ? '' : v)} disabled={!stateFilter}>
              <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><SelectValue placeholder="LGA" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All LGAs</SelectItem>
                {lgasForState.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="Sedan">Sedan</SelectItem><SelectItem value="SUV">SUV</SelectItem><SelectItem value="Van">Van</SelectItem></SelectContent>
            </Select>

            <Select value={transmissionFilter} onValueChange={setTransmissionFilter}>
              <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><SelectValue placeholder="Transmission" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="Automatic">Automatic</SelectItem><SelectItem value="Manual">Manual</SelectItem></SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><SelectValue placeholder="Price" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Prices</SelectItem><SelectItem value="low">Under ₦80k/day</SelectItem><SelectItem value="mid">₦80k-₦130k/day</SelectItem><SelectItem value="high">Above ₦130k/day</SelectItem></SelectContent>
            </Select>

            <Select value={featureFilter} onValueChange={setFeatureFilter}>
              <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><SelectValue placeholder="Features" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Features</SelectItem>{allFeatures.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-gray-500 mb-4">{filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <Link key={car.id} to={`/car/${car.id}`} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
              <button onClick={(e) => toggleFav(e, car.id)} className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full">
                <Heart className={`h-4 w-4 ${favourites.includes(car.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
              <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold dark:text-white">{car.make} {car.model}</h3>
                  <div className="flex items-center gap-1 text-sm"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /><span className="dark:text-gray-300">{car.rating}</span></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{car.year} - {car.type} - {car.seats} seats</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mb-2"><MapPin className="h-3 w-3" />{car.lga}, {car.location}</p>
                {car.features && <div className="flex flex-wrap gap-1 mb-3">{car.features.slice(0, 3).map(f => <span key={f} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">{f}</span>)}</div>}
                <div className="flex items-center justify-between">
                  <div><span className="text-xl font-bold text-brand">₦{car.pricing.daily.toLocaleString()}</span><span className="text-sm text-gray-500">/day</span></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filteredCars.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-12">No cars match your filters.</p>}
      </div>

      <Footer />
    </div>
  );
}
