import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plane, Clock, Phone, DollarSign, CheckCircle } from 'lucide-react';

const AirportPickup = () => {
  return (
    <>
      <Helmet>
        <title>Airport Pickup Service - VemoRide</title>
        <meta name="description" content="Professional airport pickup service at Murtala Muhammed International Airport Lagos from VemoRide. Meet and greet, reliable drivers, and flexible scheduling." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-brand to-brand-dark text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Plane className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Airport Pickup Service</h1>
              <p className="text-xl mb-8">
                Reliable meet and greet service at Murtala Muhammed International Airport
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <CheckCircle className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Book Your Car</h3>
                      <p className="text-gray-600">
                        Select your vehicle and provide your flight details when booking
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Driver Contact</h3>
                      <p className="text-gray-600">
                        Our driver will contact you before your arrival with meeting instructions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Plane className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Meet and Greet</h3>
                      <p className="text-gray-600">
                        Your driver will meet you at the arrivals hall with a name sign
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Grace Period</h3>
                      <p className="text-gray-600">
                        We monitor your flight and provide up to 60 minutes grace period for delays
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <DollarSign className="h-5 w-5 text-gold mr-2" />
                      Pricing
                    </h3>
                    <p className="text-gray-600">
                      Airport pickup is included with all car rentals at no additional charge. 
                      Standard rental rates apply.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Clock className="h-5 w-5 text-gold mr-2" />
                      Operating Hours
                    </h3>
                    <p className="text-gray-600">
                      Available 24/7 for all international and domestic flights at 
                      Murtala Muhammed International Airport.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-gold mr-2" />
                      What's Included
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Professional driver meet and greet</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Flight monitoring for delays</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>60-minute grace period</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Assistance with luggage</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Direct transfer to your destination</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button asChild size="lg" className="w-full bg-brand hover:bg-brand-dark">
                    <Link to="/booking">Book Airport Pickup</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link to="/cars">Browse Our Fleet</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-green-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact us for any questions about our airport pickup service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline">
                <a href="tel:+2348087401435">Call +234 808 740 1435</a>
              </Button>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/2348087401435" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AirportPickup;