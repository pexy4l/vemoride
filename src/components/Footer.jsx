import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img 
              src="/vemoride.svg" 
              alt="VemoRide Logo" 
              className="h-16 w-16 mb-4"
            />
            <p className="text-gray-400 text-sm">
              Reliable car rentals in Lagos with airport pick-up services.
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Quick Links</span>
            <nav className="flex flex-col space-y-2">
              <Link to="/cars" className="text-gray-400 hover:text-white transition-colors text-sm">
                Browse Cars
              </Link>
              <Link to="/booking" className="text-gray-400 hover:text-white transition-colors text-sm">
                Book Now
              </Link>
              <Link to="/airport-pickup" className="text-gray-400 hover:text-white transition-colors text-sm">
                Airport Pickup
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Contact</span>
            <div className="space-y-3">
              <a href="tel:+2348087401435" className="flex items-start text-gray-400 hover:text-white transition-colors text-sm">
                <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>+234 808 740 1435</span>
              </a>
              <a href="mailto:info@easyluxurydrive.com" className="flex items-start text-gray-400 hover:text-white transition-colors text-sm">
                <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>info@easyluxurydrive.com</span>
              </a>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Locations</span>
            <div className="space-y-3">
              <div className="flex items-start text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Medina Estate, Gbagada, Lagos, Nigeria</span>
              </div>
              <div className="flex items-start text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Meadowbrook, Athlone, Westmeath, Ireland</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} VemoRide. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;