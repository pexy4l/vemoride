import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cars, drivers, users } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Star, Users, Settings, MapPin, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import CarImage from '@/components/CarImage';

export default function CarDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === id);

  if (!car) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900"><p className="text-xl dark:text-white">Car not found</p></div>;

  const owner = users.find(u => u.id === car.ownerId);
  const driver = drivers.find(d => d.id === car.assignedDriverId);

  const blockedSet = new Set(car.availability.blockedDates);
  const today = new Date();
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-600 dark:text-gray-300"><ArrowLeft className="h-5 w-5" /></button>
          <Link to="/" className="flex items-center gap-2">
            <img src="/vemoride4.svg" alt="VemoRide" className="h-10 w-10" />
            <span className="font-bold text-lg dark:text-white">Vemo<span className="text-brand">Ride</span></span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Car info */}
          <div className="lg:col-span-2 space-y-6">
            <CarImage src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-72 object-cover rounded-xl" />

            <div>
              <h1 className="text-3xl font-bold dark:text-white">{car.make} {car.model}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{car.year} - {car.type} - {car.location} State</p>
              <div className="flex items-center gap-1 mt-2"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="font-medium dark:text-white">{car.rating}</span><span className="text-gray-500 text-sm">({car.trips} trips)</span></div>
            </div>

            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1"><Settings className="h-4 w-4" />{car.transmission}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />{car.seats} seats</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{car.location}</span>
            </div>

            <p className="text-gray-700 dark:text-gray-300">{car.description}</p>

            {/* Pricing */}
            <div>
              <h2 className="text-xl font-bold dark:text-white mb-3">Pricing</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 text-center">
                  <p className="text-sm text-gray-500">Daily</p>
                  <p className="text-lg font-bold text-brand">₦{car.pricing.daily.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 text-center">
                  <p className="text-sm text-gray-500">Weekly</p>
                  <p className="text-lg font-bold text-brand">₦{car.pricing.weekly.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 text-center">
                  <p className="text-sm text-gray-500">Monthly</p>
                  <p className="text-lg font-bold text-brand">₦{car.pricing.monthly.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 text-center">
                  <p className="text-sm text-gray-500">Weekend</p>
                  <p className="text-lg font-bold text-brand">₦{car.pricing.weekend.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>- {car.pricing.discount2Days}% off for 2+ days</p>
                <p>- {car.pricing.discount7Days}% off for 7+ days</p>
                <p>- {car.pricing.discount30Days}% off for 30+ days</p>
              </div>
            </div>

            {/* Availability Calendar */}
            <div>
              <h2 className="text-xl font-bold dark:text-white mb-3">Availability (Next 30 days)</h2>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map(date => {
                  const blocked = blockedSet.has(date);
                  const day = new Date(date).getDate();
                  return (
                    <div key={date} className={`p-2 text-center text-sm rounded ${blocked ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'}`}>
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-50 border rounded" /> Available</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 border rounded" /> Blocked</span>
              </div>
            </div>

            {/* Booking Terms */}
            <div>
              <h2 className="text-xl font-bold dark:text-white mb-3">Booking Terms</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />Booking is confirmed once the owner accepts your request</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />Free cancellation up to 24 hours before pickup</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />Security deposit required at pickup</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />Fuel: Return with same level as pickup</li>
              </ul>
            </div>
          </div>

          {/* Right - Owner/Driver + Book button */}
          <div className="space-y-6">
            {/* Owner */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
              <h3 className="font-bold dark:text-white mb-3">Partner</h3>
              <div className="flex items-center gap-3">
                {owner?.useCompanyImage && owner?.companyImage ? (
                  <img src={owner.companyImage} alt={owner.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                ) : (
                  <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold">{owner?.name?.charAt(0)}</div>
                )}
                <div>
                  <p className="font-medium dark:text-white">{owner?.name}</p>
                  <p className="text-sm text-gray-500">Partner</p>
                </div>
              </div>
            </div>

            {/* Driver */}
            {driver && (
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
                <h3 className="font-bold dark:text-white mb-3">Assigned Driver</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold">{driver.name.charAt(0)}</div>
                  <div>
                    <p className="font-medium dark:text-white">{driver.name}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{driver.rating} - {driver.trips} trips</div>
                  </div>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border dark:border-gray-700">
              <h3 className="font-bold dark:text-white mb-3">Options</h3>
              <div className="space-y-2 text-sm">
                {car.withDriver && <p className="text-green-600 dark:text-green-400 flex items-center gap-2"><CheckCircle className="h-4 w-4" />With driver available</p>}
                {car.selfDrive && <p className="text-green-600 dark:text-green-400 flex items-center gap-2"><CheckCircle className="h-4 w-4" />Self-drive available</p>}
              </div>
            </div>

            {/* Book button */}
            {isAuthenticated ? (
              <Link to={`/car/${car.id}/book`}>
                <Button className="w-full bg-brand hover:bg-brand-dark text-lg py-6">Book This Car</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="w-full bg-brand hover:bg-brand-dark text-lg py-6">Log In to Book</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
