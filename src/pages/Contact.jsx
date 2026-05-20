import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useSendContactMutation } from '@/store/apiSlice';

const Contact = () => {
  const { toast } = useToast();
  const [sendContact] = useSendContactMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await sendContact(formData).unwrap();
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: 'Message Failed',
        description: error.data?.error || 'Something went wrong',
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - VemoRide</title>
        <meta name="description" content="Get in touch with VemoRide. Contact us for car rental inquiries, bookings, or any questions about our services in Lagos." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">We're here to help with all your car rental needs</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-gold mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone & WhatsApp</h3>
                    <a href="tel:+2348087401435" className="text-gray-600 hover:text-gold">
                      +234 808 740 1435
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-gold mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@easyluxurydrive.com" className="text-gray-600 hover:text-gold">
                      info@easyluxurydrive.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-gold mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Operating Hours</h3>
                    <p className="text-gray-600">Monday - Sunday: 24/7</p>
                    <p className="text-sm text-gray-500">Airport pickup available anytime</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start mb-3">
                    <MapPin className="h-6 w-6 text-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Lagos Office (Primary)</h3>
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
                  <div className="flex items-start mb-3">
                    <MapPin className="h-6 w-6 text-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Ireland Contact Office</h3>
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+234 808 740 1435" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required placeholder="How can we help you?" rows={6} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-brand hover:bg-brand-dark">Send Message</Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;