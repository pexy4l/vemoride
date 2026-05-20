import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieConsent from '@/components/CookieConsent';
import Home from '@/pages/Home';
import Cars from '@/pages/Cars';
import CarDetail from '@/pages/CarDetail';
import Booking from '@/pages/Booking';
import AirportPickup from '@/pages/AirportPickup';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/airport-pickup" element={<AirportPickup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;