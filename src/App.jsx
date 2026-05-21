import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ToastProvider, useToastNotify } from '@/components/ToastNotify';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Public
import Landing from '@/pages/public/Home';
import Browse from '@/pages/public/Browse';
import CarDetail from '@/pages/public/CarDetail';
import BookingRequest from '@/pages/public/BookingRequest';
import About from '@/pages/public/About';
import Contact from '@/pages/public/Contact';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';

// Customer
import MyBookings from '@/pages/dashboard/customer/MyBookings';
import SavedCars from '@/pages/dashboard/customer/SavedCars';

// Owner
import OwnerOverview from '@/pages/dashboard/owner/Overview';
import MyCars from '@/pages/dashboard/owner/MyCars';
import Drivers from '@/pages/dashboard/owner/Drivers';
import BookingRequests from '@/pages/dashboard/owner/BookingRequests';
import Availability from '@/pages/dashboard/owner/Availability';
import Pricing from '@/pages/dashboard/owner/Pricing';
import Earnings from '@/pages/dashboard/owner/Earnings';
import AssignedTrips from '@/pages/dashboard/owner/AssignedTrips';
import TripHistory from '@/pages/dashboard/owner/TripHistory';

// Admin
import AdminOverview from '@/pages/dashboard/admin/Overview';
import Customers from '@/pages/dashboard/admin/Customers';
import Owners from '@/pages/dashboard/admin/Owners';
import AllCars from '@/pages/dashboard/admin/AllCars';
import AllBookings from '@/pages/dashboard/admin/AllBookings';
import Approvals from '@/pages/dashboard/admin/Approvals';

// Shared
import Notifications from '@/pages/dashboard/shared/Notifications';
import Ratings from '@/pages/dashboard/shared/Ratings';
import Profile from '@/pages/dashboard/shared/Profile';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function RoleOverview() {
  const { user } = useAuth();
  if (user?.role === 'admin') return <AdminOverview />;
  return <OwnerOverview />;
}

function DashboardRedirect() {
  const { user } = useAuth();
  if (user?.role === 'customer') return <Navigate to="/dashboard/bookings" />;
  if (user?.role === 'drivercarowner') return <Navigate to="/dashboard/overview" />;
  if (user?.role === 'admin') return <Navigate to="/dashboard/overview" />;
  return <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/car/:id" element={<CarDetail />} />
      <Route path="/car/:id/book" element={<ProtectedRoute><BookingRequest /></ProtectedRoute>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardRedirect />} />

        {/* Customer */}
        <Route path="bookings" element={<MyBookings />} />
        <Route path="saved" element={<SavedCars />} />

        {/* Owner / Admin - shared overview route */}
        <Route path="overview" element={<RoleOverview />} />
        <Route path="cars" element={<MyCars />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="booking-requests" element={<BookingRequests />} />
        <Route path="availability" element={<Availability />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="trips" element={<AssignedTrips />} />
        <Route path="trip-history" element={<TripHistory />} />

        {/* Admin */}
        <Route path="customers" element={<Customers />} />
        <Route path="owners" element={<Owners />} />
        <Route path="all-cars" element={<AllCars />} />
        <Route path="all-bookings" element={<AllBookings />} />
        <Route path="approvals" element={<Approvals />} />

        {/* Shared */}
        <Route path="notifications" element={<Notifications />} />
        <Route path="ratings" element={<Ratings />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function ToastWirer() {
  const showToast = useToastNotify();
  const { registerCallback: regTheme } = useTheme();
  const { registerCallback: regLang } = useLanguage();
  useEffect(() => { regTheme(showToast); regLang(showToast); }, [showToast, regTheme, regLang]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <AuthProvider>
              <ToastWirer />
              <AppRoutes />
            </AuthProvider>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
