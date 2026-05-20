import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, Settings, CheckCircle } from 'lucide-react';
import { useGetCarQuery } from '@/store/apiSlice';

const CarDetail = () => {
  const { id } = useParams();
  const { data: car, isLoading } = useGetCarQuery(id);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600">Loading car details...</p></div>;
  if (!car) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600">Car not found</p></div>;

  return (
    <>
      <Helmet>
        <title>{car.make} {car.model} - VemoRide</title>
        <meta name="description" content={`Rent a ${car.year} ${car.make} ${car.model} in Lagos with VemoRide. ${car.transmission} transmission, ${car.seats} seats. ₦${car.daily_rate.toLocaleString()} per day.`} />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                  </div>
                  {car.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-2">
                      {car.images.slice(1).map((image, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img src={image} alt={`${car.make} ${car.model} view ${index + 2}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.make} {car.model}</h1>
                  <p className="text-xl text-gray-600 mb-6">{car.year} • {car.type}</p>
                  <div className="bg-green-50 p-6 rounded-lg mb-6">
                    <span className="text-4xl font-bold text-gold">₦{car.daily_rate.toLocaleString()}</span>
                    <span className="text-gray-600 ml-2">per day</span>
                  </div>
                  <div className="space-y-4 mb-6">
                    <h2 className="text-xl font-semibold">Features</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center"><Settings className="h-5 w-5 text-gold mr-2" /><span>{car.transmission}</span></div>
                      <div className="flex items-center"><Users className="h-5 w-5 text-gold mr-2" /><span>{car.seats} Seats</span></div>
                      {car.airport_pickup && <div className="flex items-center"><CheckCircle className="h-5 w-5 text-green-600 mr-2" /><span>Airport Pickup</span></div>}
                    </div>
                  </div>
                  <div className="space-y-4 mb-6">
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p className="text-gray-600">{car.description}</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <h2 className="text-xl font-semibold">Rental Terms</h2>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" /><span>All cars come with a professional driver</span></li>
                      <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" /><span>Mileage policy: Unlimited within Lagos and surrounding areas</span></li>
                      <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" /><span>Security deposit required at pickup</span></li>
                      <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" /><span>Fuel: Return with same level as pickup</span></li>
                    </ul>
                  </div>
                  {car.status === 'Available' ? (
                    <Button asChild size="lg" className="w-full bg-brand hover:bg-brand-dark"><Link to={`/booking?car=${car.id}`}>Book This Car</Link></Button>
                  ) : (
                    <Button size="lg" className="w-full" disabled>Currently Unavailable</Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CarDetail;
