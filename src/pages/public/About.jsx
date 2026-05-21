import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sun, Moon, Globe } from 'lucide-react';
import Footer from '@/components/Footer';

export default function About() {
  const { theme, toggleTheme } = useTheme();
  const { toggleLang } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2"><img src="/vemoride4.svg" alt="VemoRide" className="h-10 w-10" /><span className="font-bold text-lg dark:text-white">Vemo<span className="text-brand">Ride</span></span></Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
            <Button variant="ghost" size="icon" onClick={toggleLang}><Globe className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold dark:text-white mb-6">About VemoRide</h1>
        <div className="prose dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
          <p>VemoRide is a car rental marketplace connecting partners with customers across Nigeria. Whether you need a car for a day, a week, or a month, we make it easy to find the perfect ride.</p>
          <h2 className="text-2xl font-bold dark:text-white mt-8">Our Mission</h2>
          <p>To provide reliable, affordable, and convenient car rental services across Nigeria, empowering partners to earn from their vehicles and giving customers access to quality cars with flexible options.</p>
          <h2 className="text-2xl font-bold dark:text-white mt-8">How It Works</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browse available cars by location and date</li>
            <li>Choose between self-drive or with-driver options</li>
            <li>Submit a booking request to the partner</li>
            <li>Once accepted, your booking is confirmed</li>
            <li>Rate your experience after the trip</li>
          </ul>
          <h2 className="text-2xl font-bold dark:text-white mt-8">For Partners</h2>
          <p>List your cars, set your own pricing, manage availability, and earn money from your vehicles. You can also add drivers and manage your fleet all from one dashboard.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
