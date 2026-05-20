import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Car, CalendarDays, DollarSign, Users, Bell, Star, Settings, LayoutDashboard,
  ClipboardList, MapPin, History, TrendingUp, LogOut, Menu, X, Sun, Moon, Globe,
  Bookmark, ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const customerNav = [
  { label: 'Browse Cars', path: '/', icon: Car },
  { label: 'My Bookings', path: '/dashboard/bookings', icon: ClipboardList },
  { label: 'Saved Cars', path: '/dashboard/saved', icon: Bookmark },
  { label: 'Notifications', path: '/dashboard/notifications', icon: Bell },
  { label: 'Ratings & Reviews', path: '/dashboard/ratings', icon: Star },
  { label: 'Profile Settings', path: '/dashboard/profile', icon: Settings },
];

const ownerNav = [
  { label: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
  { label: 'My Cars', path: '/dashboard/cars', icon: Car },
  { label: 'Drivers', path: '/dashboard/drivers', icon: Users },
  { label: 'Booking Requests', path: '/dashboard/booking-requests', icon: ClipboardList },
  { label: 'Availability', path: '/dashboard/availability', icon: CalendarDays },
  { label: 'Pricing', path: '/dashboard/pricing', icon: DollarSign },
  { label: 'Earnings', path: '/dashboard/earnings', icon: TrendingUp },
  { label: 'Notifications', path: '/dashboard/notifications', icon: Bell },
  { label: 'Ratings & Reviews', path: '/dashboard/ratings', icon: Star },
  { label: 'Profile Settings', path: '/dashboard/profile', icon: Settings },
  { label: 'Assigned Trips', path: '/dashboard/trips', icon: MapPin },
  { label: 'Trip History', path: '/dashboard/trip-history', icon: History },
];

const adminNav = [
  { label: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
  { label: 'Customers', path: '/dashboard/customers', icon: Users },
  { label: 'DriverCarOwners', path: '/dashboard/owners', icon: Car },
  { label: 'All Cars', path: '/dashboard/all-cars', icon: Car },
  { label: 'All Bookings', path: '/dashboard/all-bookings', icon: ClipboardList },
  { label: 'Approvals', path: '/dashboard/approvals', icon: ShieldCheck },
  { label: 'Notifications', path: '/dashboard/notifications', icon: Bell },
  { label: 'Profile Settings', path: '/dashboard/profile', icon: Settings },
];

function getNavItems(role) {
  if (role === 'admin') return adminNav;
  if (role === 'drivercarowner') return ownerNav;
  return customerNav;
}

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = getNavItems(user?.role);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2">
            <img src="/vemoride.svg" alt="VemoRide" className="h-8 w-8" />
            <span className="font-bold text-lg dark:text-white">VemoRide</span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-brand/10 text-brand dark:text-green-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t dark:border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="h-4 w-4" /> {t('logout')}
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5 dark:text-white" /></button>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleLang}>
              <Globe className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-300">{user?.name}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
