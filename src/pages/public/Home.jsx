import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addMonths } from 'date-fns';
import { cars } from '@/data/dummy';
import { statesLGA } from '@/data/statesLGA';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sun, Moon, Globe, Car, Shield, Clock, Star, Award, CalendarDays, MapPin, Users, Heart } from 'lucide-react';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import CarImage from '@/components/CarImage';
import SearchableSelect from '@/components/SearchableSelect';
import Calendar from '@/components/Calendar';

const lagosPlaces = [
  { name: 'Lekki Conservation Centre', img: 'https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=600', desc: 'Canopy walkway and nature trails' },
  { name: 'Nike Art Gallery', img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600', desc: 'Largest art gallery in West Africa' },
  { name: 'Tarkwa Bay Beach', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', desc: 'Serene beach accessible by boat' },
  { name: 'Freedom Park', img: 'https://images.unsplash.com/photo-1590845947376-2638caa89309?w=600', desc: 'Historic park on Lagos Island' },
  { name: 'Elegushi Beach', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600', desc: 'Popular beach for events and relaxation' },
  { name: 'The Palms Shopping Mall', img: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=600', desc: 'Premium shopping and entertainment' },
];

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toggleLang } = useLanguage();
  const navigate = useNavigate();

  const [state, setState] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const maxDate = addMonths(today, 3);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (state) params.set('state', state);
    navigate(`/browse?${params.toString()}`);
  };

  const fleetOwnerIds = new Set();
  const counts = {};
  cars.forEach(c => { counts[c.ownerId] = (counts[c.ownerId] || 0) + 1; });
  Object.entries(counts).forEach(([id, n]) => { if (n >= 2) fleetOwnerIds.add(id); });
  const spotlightCars = cars.filter(c => fleetOwnerIds.has(c.ownerId) && c.rating >= 4.5).slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2"><img src="/vemoride4.svg" alt="VemoRide" className="h-10 w-10" /><span className="font-bold text-lg dark:text-white">Vemo<span className="text-brand">Ride</span></span></Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
            <Button variant="ghost" size="icon" onClick={toggleLang}><Globe className="h-4 w-4" /></Button>
            {isAuthenticated ? (
              <><span className="text-sm text-gray-600 dark:text-gray-300 hidden md:inline">{user?.name}</span><Link to="/dashboard"><Button size="sm" variant="outline">Dashboard</Button></Link></>
            ) : (
              <Link to="/login"><Button size="sm" className="bg-brand hover:bg-brand-dark">Log In</Button></Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero with car background */}
      <section className="relative text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-brand-dark/80" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Your ride, your way</h1>
          <p className="text-lg md:text-xl text-white/80 mb-3 max-w-2xl mx-auto">Rent quality cars from trusted partners across Nigeria. Professional drivers included.</p>
          <p className="text-sm text-white/60 mb-8 max-w-xl mx-auto">Whether you're visiting home, attending an event, or need a ride for business, VemoRide connects you with verified car owners and professional drivers.</p>

          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <SearchableSelect value={state || 'all'} onChange={v => setState(v === 'all' ? '' : v)} options={[{ value: 'all', label: 'All States' }, ...statesLGA.map(s => ({ value: s.state, label: s.state }))]} placeholder="Select State" />
              <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"><CalendarDays className="h-4 w-4 mr-2 text-gray-400" />{selectedDate ? selectedDate.toLocaleDateString() : 'Pick a date'}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar selected={selectedDate} onSelect={setSelectedDate} minDate={today} maxDate={maxDate} /></PopoverContent></Popover>
              <Button className="bg-brand hover:bg-brand-dark w-full" onClick={handleSearch}><Car className="h-4 w-4 mr-2" />Find a Car</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div><p className="text-2xl font-bold text-brand">70+</p><p className="text-sm text-gray-500">Cars Available</p></div>
          <div><p className="text-2xl font-bold text-brand">36 + FCT</p><p className="text-sm text-gray-500">States Covered</p></div>
          <div><p className="text-2xl font-bold text-brand">500+</p><p className="text-sm text-gray-500">Happy Customers</p></div>
          <div><p className="text-2xl font-bold text-brand">4.8</p><p className="text-sm text-gray-500">Average Rating</p></div>
        </div>
      </section>

      {/* Spotlight */}
      {spotlightCars.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6"><Award className="h-5 w-5 text-yellow-500" /><h2 className="text-2xl font-bold dark:text-white">Spotlight</h2></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {spotlightCars.map(car => (
                <Link key={car.id} to={`/car/${car.id}`} className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600">
                  <CarImage src={car.images[0]} alt={car.make} className="w-full h-40 object-cover" />
                  <div className="p-3"><p className="text-sm font-bold dark:text-white truncate">{car.make} {car.model}</p><div className="flex items-center justify-between mt-1"><span className="text-sm text-brand font-bold">₦{(car.pricing.daily / 1000).toFixed(0)}k/day</span><span className="flex items-center gap-0.5 text-xs"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{car.rating}</span></div></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why VemoRide */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center dark:text-white mb-4">Why VemoRide?</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">We make car rental simple, safe, and affordable for Nigerians at home and in the diaspora.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center"><div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="h-7 w-7 text-brand" /></div><h3 className="font-bold dark:text-white mb-2">Verified Partners</h3><p className="text-sm text-gray-600 dark:text-gray-400">Every partner and car is vetted before going live.</p></div>
            <div className="text-center"><div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4"><Car className="h-7 w-7 text-brand" /></div><h3 className="font-bold dark:text-white mb-2">Professional Drivers</h3><p className="text-sm text-gray-600 dark:text-gray-400">Rated drivers who know the roads.</p></div>
            <div className="text-center"><div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="h-7 w-7 text-brand" /></div><h3 className="font-bold dark:text-white mb-2">Flexible Rentals</h3><p className="text-sm text-gray-600 dark:text-gray-400">Daily, weekly, or monthly with discounts.</p></div>
            <div className="text-center"><div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4"><Users className="h-7 w-7 text-brand" /></div><h3 className="font-bold dark:text-white mb-2">Diaspora Friendly</h3><p className="text-sm text-gray-600 dark:text-gray-400">Book before you land. Your car will be waiting.</p></div>
          </div>
        </div>
      </section>

      {/* Lagos Places */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-2">Places to Visit in Lagos</h2>
          <p className="text-gray-500 mb-8">Coming home? Here are some spots worth exploring with your VemoRide.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lagosPlaces.map(place => (
              <div key={place.name} className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600">
                <img src={place.img} alt={place.name} className="w-full h-40 object-cover" />
                <div className="p-4"><h3 className="font-bold dark:text-white">{place.name}</h3><p className="text-sm text-gray-500 mt-1">{place.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold dark:text-white mb-6 text-center">Find Us</h2>
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 h-80">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46280277863!2d3.1438721!3d6.5480357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Lagos Map" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">Ready to hit the road?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Browse available cars in Lagos, Abuja, and across Nigeria.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-brand hover:bg-brand-dark" onClick={() => navigate('/browse')}>Browse Cars</Button>
            {!isAuthenticated && <Link to="/register"><Button size="lg" variant="outline">Become a Partner</Button></Link>}
          </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </div>
  );
}
