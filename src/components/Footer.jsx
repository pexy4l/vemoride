import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/vemoride4.svg" alt="VemoRide" className="h-8 w-8" />
              <span className="font-bold text-lg text-white">Vemo<span className="text-brand">Ride</span></span>
            </div>
            <p className="text-sm">Rent cars from trusted owners in Nigeria, with or without a driver.</p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-brand">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand">About</Link></li>
              <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" />+234 808 740 1435</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" />info@vemoride.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />Lagos, Nigeria</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-brand">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VemoRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
