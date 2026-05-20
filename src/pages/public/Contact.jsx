import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sun, Moon, Globe, Phone, Mail, MapPin } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Contact() {
  const { theme, toggleTheme } = useTheme();
  const { toggleLang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2"><img src="/vemoride3.svg" alt="VemoRide" className="h-10 w-10" /><span className="font-bold text-lg dark:text-white">Vemo<span className="text-brand">Ride</span></span></Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
            <Button variant="ghost" size="icon" onClick={toggleLang}><Globe className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold dark:text-white mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold dark:text-white mb-4">Get in Touch</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-brand" /><span>+234 808 740 1435</span></div>
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-brand" /><span>info@vemoride.com</span></div>
              <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-brand" /><span>Lagos, Nigeria</span></div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700">
            {submitted ? (
              <p className="text-green-600 font-medium">Thank you! We'll get back to you soon.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><Label>Name</Label><Input placeholder="Your name" required /></div>
                <div><Label>Email</Label><Input type="email" placeholder="you@example.com" required /></div>
                <div><Label>Message</Label><Textarea placeholder="How can we help?" rows={4} required /></div>
                <Button type="submit" className="w-full bg-brand hover:bg-brand-dark">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
