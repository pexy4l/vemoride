import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Globe, Car, Shield, Clock, MapPin } from 'lucide-react';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toggleLang } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
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

      {/* Hero */}
      <section className="flex-1 flex items-center bg-gradient-to-br from-brand to-brand-dark text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Your ride, your way</h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Rent quality cars from trusted owners across Nigeria. Professional drivers included.
          </p>
          <Button size="lg" className="bg-white text-brand hover:bg-gray-100 text-lg px-8 py-6" onClick={() => navigate('/browse')}>
            <Car className="h-5 w-5 mr-2" /> Find a Car
          </Button>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center dark:text-white mb-12">Why VemoRide?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4"><Shield className="h-7 w-7 text-brand" /></div>
              <h3 className="font-bold dark:text-white mb-2">Trusted Owners</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">All car owners are verified. Every car is inspected before listing.</p>
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
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">Ready to hit the road?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Browse available cars in Lagos, Abuja, and across Nigeria.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-brand hover:bg-brand-dark" onClick={() => navigate('/browse')}>Browse Cars</Button>
            {!isAuthenticated && <Link to="/register"><Button size="lg" variant="outline">Create Account</Button></Link>}
          </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </div>
  );
}
