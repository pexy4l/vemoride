import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cars } from '@/data/dummy';
import { statesLGA } from '@/data/statesLGA';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sun, Moon, Globe, Car, Shield, Clock, Star, MapPin, Award } from 'lucide-react';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toggleLang } = useLanguage();
  const navigate = useNavigate();

  const [state, setState] = useState('');
  const [type, setType] = useState('all');
  const [price, setPrice] = useState('all');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (state) params.set('state', state);
    if (type !== 'all') params.set('type', type);
    if (price !== 'all') params.set('price', price);
    navigate(`/browse?${params.toString()}`);
  };

  // Spotlight: top-rated cars from fleet owners
  const spotlightCars = cars.filter(c => {
    const ownerCarCount = cars.filter(x => x.ownerId === c.ownerId).length;
    return ownerCarCount >= 2 && c.rating >= 4.5;
  }).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Your ride, your way</h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">Rent quality cars from trusted partners across Nigeria. Professional drivers included.</p>

          {/* Quick filters */}
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Select value={state || 'all'} onValueChange={v => setState(v === 'all' ? '' : v)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><SelectValue placeholder="State" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All States</SelectItem>{statesLGA.map(s => <SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><SelectValue placeholder="Car Type" /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="Sedan">Sedan</SelectItem><SelectItem value="SUV">SUV</SelectItem><SelectItem value="Van">Van</SelectItem></SelectContent>
              </Select>
              <Select value={price} onValueChange={setPrice}>
                <SelectTrigger className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><SelectValue placeholder="Budget" /></SelectTrigger>
                <SelectContent><SelectItem value="all">Any Budget</SelectItem><SelectItem value="low">Under ₦80k/day</SelectItem><SelectItem value="mid">₦80k-₦130k/day</SelectItem><SelectItem value="high">Above ₦130k/day</SelectItem></SelectContent>
              </Select>
              <Button className="bg-brand hover:bg-brand-dark w-full" onClick={handleSearch}><Car className="h-4 w-4 mr-2" />Find a Car</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight */}
      {spotlightCars.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6"><Award className="h-5 w-5 text-yellow-500" /><h2 className="text-2xl font-bold dark:text-white">Spotlight</h2></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {spotlightCars.map(car => (
                <Link key={car.id} to={`/car/${car.id}`} className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img src={car.images[0]} alt={car.make} className="w-full h-28 object-cover" />
                  <div className="p-2">
                    <p className="text-xs font-bold dark:text-white truncate">{car.make} {car.model}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brand font-bold">₦{(car.pricing.daily / 1000).toFixed(0)}k</span>
                      <span className="flex items-center gap-0.5 text-xs"><Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />{car.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Value Props */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center dark:text-white mb-12">Why VemoRide?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="h-7 w-7 text-brand" /></div>
              <h3 className="font-bold dark:text-white mb-2">Trusted Partners</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">All partners are verified. Every car is inspected before listing.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4"><Car className="h-7 w-7 text-brand" /></div>
              <h3 className="font-bold dark:text-white mb-2">Professional Drivers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Every rental comes with a professional, rated driver.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="h-7 w-7 text-brand" /></div>
              <h3 className="font-bold dark:text-white mb-2">Flexible Rentals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Daily, weekly, or monthly. Discounts for longer bookings.</p>
            </div>
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
