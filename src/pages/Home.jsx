import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Car, Clock, Shield, Users, CheckCircle, MapPin } from 'lucide-react';
import { useGetPremiumCarsQuery } from '@/store/apiSlice';

const Home = () => {
  const { data: premiumCars = [] } = useGetPremiumCarsQuery();

  const steps = [
    { icon: Car, title: 'Choose Your Car', description: 'Browse our fleet and select the perfect vehicle' },
    { icon: Clock, title: 'Request Dates', description: 'Tell us when you need the car' },
    { icon: CheckCircle, title: 'We Confirm', description: 'We call you to confirm availability' },
  ];

  const highlights = [
    { icon: Clock, title: 'On-Time Airport Pickup', description: 'Never miss your flight with our reliable service' },
    { icon: Shield, title: 'Well-Maintained Cars', description: 'All vehicles regularly serviced and inspected' },
    { icon: Users, title: 'Optional Driver', description: 'Professional chauffeur service available' },
    { icon: Car, title: 'Flexible Rentals', description: 'Daily, weekly, or monthly rental options' },
  ];

  const testimonials = [
    { name: 'Adebayo O.', text: 'Excellent service! The car was clean and the airport pickup was seamless.' },
    { name: 'Sarah M.', text: 'Very professional team. Highly recommend for anyone visiting Lagos.' },
    { name: 'Chidi N.', text: 'Great rates and friendly staff. Will definitely use again!' },
  ];

  const faqs = [
    { q: 'Do you offer airport pickup?', a: 'Yes, we provide meet and greet service at Murtala Muhammed International Airport.' },
    { q: 'What is your cancellation policy?', a: 'Contact us at least 24 hours before pickup for free cancellation.' },
    { q: 'Can I rent with a driver?', a: 'Yes, we offer optional chauffeur service for all our vehicles.' },
  ];

  return (
    <>
      <Helmet>
        <title>VemoRide - Reliable Lagos Car Rentals with Airport Pick Up</title>
        <meta name="description" content="Rent quality cars in Lagos with airport pickup service from VemoRide. Self-drive and chauffeur options available. Book your car rental today!" />
      </Helmet>

      <div className="bg-gray-50">
        <section className="relative bg-gray-900 text-white">
          <div className="absolute inset-0">
            <img className="w-full h-full object-cover opacity-40" alt="Modern black Lexus 570 SUV" src="https://images.unsplash.com/photo-1687016071453-aa7e6d00f07e" />
          </div>
          <div className="relative container mx-auto px-4 py-32 md:py-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Reliable Lagos Car Rentals with Airport Pick Up
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Quality vehicles, professional service, and flexible rental options in Lagos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-brand hover:bg-brand-dark">
                  <Link to="/cars">Browse Cars</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose VemoRide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <highlight.icon className="h-10 w-10 text-gold mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Premium Fleet</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {premiumCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm text-center"
                >
                  <img
                    src={car.image}
                    alt={car.alt}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{car.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
                <div className="space-y-6">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-lg"
                    >
                      <p className="text-gray-700 mb-3">"{testimonial.text}"</p>
                      <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-lg"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Locations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start mb-4">
                  <MapPin className="h-6 w-6 text-gold mr-3 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Lagos Office (Primary)</h3>
                    <p className="text-gray-600">Medina Estate, Gbagada, Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=3.3692%2C6.5355%2C3.3892%2C6.5555&layer=mapnik&marker=6.5455%2C3.3792"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Lagos Office Location"
                  ></iframe>
                </div>
              </div>

              <div>
                <div className="flex items-start mb-4">
                  <MapPin className="h-6 w-6 text-gold mr-3 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ireland Contact Office</h3>
                    <p className="text-gray-600">Meadowbrook, Athlone, Westmeath, Ireland</p>
                  </div>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-7.9500%2C53.4200%2C-7.9100%2C53.4400&layer=mapnik&marker=53.4300%2C-7.9300"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Ireland Office Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "VemoRide",
          "image": "/vemoride.png",
          "telephone": "+234 808 740 1435",
          "address": [
            {
              "@type": "PostalAddress",
              "streetAddress": "Medina Estate, Gbagada",
              "addressLocality": "Lagos",
              "addressCountry": "Nigeria"
            },
            {
              "@type": "PostalAddress",
              "streetAddress": "Meadowbrook",
              "addressLocality": "Athlone, Westmeath",
              "addressCountry": "Ireland"
            }
          ],
          "priceRange": "₦₦"
        })}
      </script>
    </>
  );
};

export default Home;