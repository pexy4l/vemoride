import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    logout: 'Logout',
    search: 'Search',
    bookNow: 'Book Now',
    signIn: 'Sign In',
    register: 'Register',
    myBookings: 'My Bookings',
    savedCars: 'Saved Cars',
    notifications: 'Notifications',
    ratings: 'Ratings & Reviews',
    profile: 'Profile Settings',
    overview: 'Overview',
    myCars: 'My Cars',
    drivers: 'Drivers',
    bookingRequests: 'Booking Requests',
    availability: 'Availability',
    pricing: 'Pricing',
    earnings: 'Earnings',
  },
  fr: {
    logout: 'Deconnexion',
    search: 'Rechercher',
    bookNow: 'Reserver',
    signIn: 'Connexion',
    register: "S'inscrire",
    myBookings: 'Mes Reservations',
    savedCars: 'Voitures Sauvegardees',
    notifications: 'Notifications',
    ratings: 'Avis & Notes',
    profile: 'Parametres du Profil',
    overview: 'Apercu',
    myCars: 'Mes Voitures',
    drivers: 'Chauffeurs',
    bookingRequests: 'Demandes de Reservation',
    availability: 'Disponibilite',
    pricing: 'Tarification',
    earnings: 'Revenus',
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
  const [onToggleCallback, setOnToggleCallback] = useState(null);

  const registerCallback = (cb) => setOnToggleCallback(() => cb);

  const toggleLang = () => {
    const next = lang === 'en' ? 'fr' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
    if (onToggleCallback) onToggleCallback(next === 'en' ? 'English' : 'Francais');
  };

  const t = (key) => translations[lang]?.[key] || key;

  return <LanguageContext.Provider value={{ lang, toggleLang, t, registerCallback }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
