import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Car, Users, Globe, Shield } from 'lucide-react';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - VemoRide</title>
        <meta name="description" content="Learn about VemoRide - your trusted car rental partner in Lagos with international support from Ireland." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About VemoRide</h1>
              <p className="text-xl">
                Your trusted partner for quality car rentals in Lagos
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-4">
                    VemoRide was founded with a simple mission: to provide reliable, 
                    high-quality car rental services to both locals and visitors in Lagos, Nigeria.
                  </p>
                  <p className="mb-4">
                    We understand the challenges of navigating a bustling city like Lagos, 
                    which is why we've built our business around convenience, reliability, 
                    and exceptional customer service.
                  </p>
                  <p>
                    With our primary operations based in Medina Estate, Gbagada, and 
                    international support from our Ireland office, we're uniquely positioned 
                    to serve both local and international customers with the same level of 
                    professionalism and care.
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <Car className="h-12 w-12 text-gold mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Fleet</h3>
                  <p className="text-gray-600">
                    All our vehicles are regularly serviced and maintained to the highest 
                    standards, ensuring your safety and comfort on every journey.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <Users className="h-12 w-12 text-gold mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Drivers</h3>
                  <p className="text-gray-600">
                    Need a chauffeur? Our experienced, professional drivers know Lagos 
                    inside out and will get you to your destination safely and on time.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <Globe className="h-12 w-12 text-gold mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">International Support</h3>
                  <p className="text-gray-600">
                    With our Ireland office, we provide seamless support for international 
                    customers planning their Lagos visit.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <Shield className="h-12 w-12 text-gold mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Options</h3>
                  <p className="text-gray-600">
                    Whether you need a car for a day, a week, or a month, we offer 
                    flexible rental periods to suit your needs.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-green-50 p-8 rounded-lg"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">✓</span>
                    <span>Competitive rates with transparent pricing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">✓</span>
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">✓</span>
                    <span>Airport pickup and drop-off services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">✓</span>
                    <span>Well-maintained, clean vehicles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">✓</span>
                    <span>Optional chauffeur services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">✓</span>
                    <span>Flexible rental periods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold font-bold mr-3">✓</span>
                    <span>Local expertise with international standards</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;