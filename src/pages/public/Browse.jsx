import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { addMonths } from 'date-fns';
import { cars } from '@/data/dummy';
import { statesLGA } from '@/data/statesLGA';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Star, MapPin, Heart, Sun, Moon, Globe, SlidersHorizontal, Award, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import Footer from '@/components/Footer';
import CarImage from '@/components/CarImage';
import PriceRangeSlider from '@/components/PriceRangeSlider';
import SearchableSelect from '@/components/SearchableSelect';
import Calendar from '@/components/Calendar';

const PER_PAGE = 15;
const ALL_FEATURES = ['AC', 'Bluetooth Access', 'Leather Seats', 'Tinted Windows', 'USB Charging'];

export default function Browse() {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toggleLang } = useLanguage();
  const [searchParams] = useSearchParams();

  const [stateFilter, setStateFilter] = useState(searchParams.get('state') || '');
  const [lgaFilter, setLgaFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'all');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(250000);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [outOfState, setOutOfState] = useState(false);
  const [fleetOnly, setFleetOnly] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState(1);

  const today = new Date();
  const maxDate = addMonths(today, 3);

  const lgasForState = useMemo(() => {
    if (!stateFilter) return [];
    return statesLGA.find(s => s.state === stateFilter)?.lgas || [];
  }, [stateFilter]);

  const fleetOwnerIds = useMemo(() => {
    const counts = {};
    cars.forEach(c => { counts[c.ownerId] = (counts[c.ownerId] || 0) + 1; });
    return new Set(Object.entries(counts).filter(([, n]) => n >= 2).map(([id]) => id));
  }, []);

  const filteredCars = useMemo(() => {
    let result = cars.filter(c => c.status === 'available');
    if (stateFilter) result = result.filter(c => c.location === stateFilter);
    if (lgaFilter) result = result.filter(c => c.lga === lgaFilter);
    if (typeFilter !== 'all') result = result.filter(c => c.type === typeFilter);
    result = result.filter(c => c.pricing.daily >= priceMin && c.pricing.daily <= priceMax);
    if (selectedFeatures.length > 0) result = result.filter(c => selectedFeatures.every(f => (c.features || []).includes(f)));
    if (outOfState) result = result.filter(c => c.outOfState);
    if (fleetOnly) result = result.filter(c => fleetOwnerIds.has(c.ownerId));
    return result;
  }, [stateFilter, lgaFilter, typeFilter, priceMin, priceMax, selectedFeatures, outOfState, fleetOnly, fleetOwnerIds]);

  const totalPages = Math.ceil(filteredCars.length / PER_PAGE);
  const paginatedCars = filteredCars.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleFeature = (f) => { setSelectedFeatures(s => s.includes(f) ? s.filter(x => x !== f) : [...s, f]); setPage(1); };
  const toggleFav = (e, carId) => { e.preventDefault(); setFavourites(f => f.includes(carId) ? f.filter(id => id !== carId) : [...f, carId]); };

  const FilterPanel = () => (
    <div className="space-y-5">
      {/* State */}
      <div>
        <Label className="text-sm font-medium">State</Label>
        <div className="mt-1">
          <SearchableSelect
            value={stateFilter}
            onChange={v => { setStateFilter(v === 'all' ? '' : v); setLgaFilter(''); setPage(1); }}
            options={[{ value: 'all', label: 'All States' }, ...statesLGA.map(s => ({ value: s.state, label: s.state }))]}
            placeholder="All States"
          />
        </div>
      </div>

      {stateFilter && <>
        <div className="border-t dark:border-gray-700" />
        <div>
          <Label className="text-sm font-medium">Local Government Area</Label>
          <div className="mt-1">
            <SearchableSelect
              value={lgaFilter || 'all'}
              onChange={v => { setLgaFilter(v === 'all' ? '' : v); setPage(1); }}
              options={[{ value: 'all', label: 'All LGAs' }, ...lgasForState.map(l => ({ value: l, label: l }))]}
              placeholder="All LGAs"
            />
          </div>
        </div>
      </>}

      <div className="border-t dark:border-gray-700" />

      {/* Type */}
      <div>
        <Label className="text-sm font-medium">Car Type</Label>
        <Select value={typeFilter} onValueChange={v => { setTypeFilter(v); setPage(1); }}>
          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="Sedan">Sedan</SelectItem><SelectItem value="SUV">SUV</SelectItem><SelectItem value="Van">Van</SelectItem></SelectContent>
        </Select>
      </div>

      <div className="border-t dark:border-gray-700" />

      {/* Date */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal text-sm">
              <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
              {selectedDate ? selectedDate.toLocaleDateString() : 'Select date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar selected={selectedDate} onSelect={setSelectedDate} minDate={today} maxDate={maxDate} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="border-t dark:border-gray-700" />

      {/* Price */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Price Range (₦/day)</Label>
        <PriceRangeSlider min={0} max={250000} step={1000} value={[priceMin, priceMax]} onChange={([min, max]) => { setPriceMin(min); setPriceMax(max); setPage(1); }} />
      </div>

      <div className="border-t dark:border-gray-700" />

      {/* Features */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Features</Label>
        <div className="space-y-2">
          {ALL_FEATURES.map(f => (
            <div key={f} className="flex items-center gap-2">
              <Checkbox checked={selectedFeatures.includes(f)} onCheckedChange={() => toggleFeature(f)} id={`feat-${f}`} />
              <label htmlFor={`feat-${f}`} className="text-sm dark:text-gray-300 cursor-pointer">{f}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t dark:border-gray-700" />

      {/* Toggles */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox checked={outOfState} onCheckedChange={v => { setOutOfState(v); setPage(1); }} id="out-of-state" />
          <label htmlFor="out-of-state" className="text-sm dark:text-gray-300 cursor-pointer">Out of state available</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={fleetOnly} onCheckedChange={v => { setFleetOnly(v); setPage(1); }} id="fleet-only" />
          <label htmlFor="fleet-only" className="text-sm dark:text-gray-300 cursor-pointer">Fleet partners only</label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2"><img src="/vemoride4.svg" alt="VemoRide" className="h-10 w-10" /><span className="font-bold text-lg dark:text-white">Vemo<span className="text-brand">Ride</span></span></Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
            <Button variant="ghost" size="icon" onClick={toggleLang}><Globe className="h-4 w-4" /></Button>
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:inline">{user?.name}</span>
                <Link to="/dashboard"><Button size="sm" variant="outline">Dashboard</Button></Link>
              </>
            ) : (
              <Link to="/login"><Button size="sm" className="bg-brand hover:bg-brand-dark">Log In</Button></Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 sticky top-6">
              <h2 className="font-bold dark:text-white mb-4">Filters</h2>
              <FilterPanel />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold dark:text-white">Browse Cars</h1>
                <p className="text-sm text-gray-500">{filteredCars.length} car{filteredCars.length !== 1 ? 's' : ''} found</p>
              </div>
              <Sheet>
                <SheetTrigger asChild><Button variant="outline" size="sm" className="lg:hidden"><SlidersHorizontal className="h-4 w-4 mr-1" />Filters</Button></SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto"><SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader><div className="mt-4"><FilterPanel /></div></SheetContent>
              </Sheet>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginatedCars.map(car => {
                const isFleet = fleetOwnerIds.has(car.ownerId);
                return (
                  <Link key={car.id} to={`/car/${car.id}`} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative border border-gray-200 dark:border-gray-700">
                    <button onClick={(e) => toggleFav(e, car.id)} className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full">
                      <Heart className={`h-4 w-4 ${favourites.includes(car.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </button>
                    {isFleet && <span className="absolute top-3 left-3 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Award className="h-3 w-3" />Fleet</span>}
                    <CarImage src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-44 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold dark:text-white">{car.make} {car.model}</h3>
                        <div className="flex items-center gap-1 text-sm"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /><span className="dark:text-gray-300">{car.rating}</span></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{car.year} - {car.type} - {car.seats} seats</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{car.lga}, {car.location}</p>
                      {car.features && <div className="flex flex-wrap gap-1 mt-2">{car.features.slice(0, 3).map(f => <span key={f} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">{f}</span>)}</div>}
                      <div className="mt-3"><span className="text-xl font-bold text-brand">₦{car.pricing.daily.toLocaleString()}</span><span className="text-sm text-gray-500">/day</span></div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filteredCars.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-12">No cars match your filters.</p>}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-sm dark:text-gray-300">Page {page} of {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
