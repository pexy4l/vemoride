import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Footer() {
  const [feedback, setFeedback] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedback = (e) => { e.preventDefault(); setFeedbackSent(true); setFeedback(''); setFeedbackEmail(''); };
  const handleRefer = () => { navigator.clipboard.writeText('https://vemoride.com?ref=friend'); alert('Referral link copied!'); };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Feedback section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Help Us Improve</h3>
              <p className="text-sm text-gray-400 mb-4">We'd love to hear your feedback or suggestions to make VemoRide better for you.</p>
              {feedbackSent ? (
                <p className="text-brand font-medium">Thank you for your feedback! We appreciate it.</p>
              ) : (
                <form onSubmit={handleFeedback} className="space-y-3">
                  <Input value={feedbackEmail} onChange={e => setFeedbackEmail(e.target.value)} placeholder="Your email" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" required />
                  <Textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Your feedback or suggestion..." className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" rows={3} required />
                  <Button type="submit" size="sm" className="bg-brand hover:bg-brand-dark"><Send className="h-3 w-3 mr-2" />Send Feedback</Button>
                </form>
              )}
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <Gift className="h-10 w-10 text-brand mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Refer a Friend</h3>
              <p className="text-sm text-gray-400 mb-4">Know someone who needs a ride? Share VemoRide with them!</p>
              <Button onClick={handleRefer} variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white"><Gift className="h-4 w-4 mr-2" />Copy Referral Link</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4"><img src="/vemoride4.svg" alt="VemoRide" className="h-8 w-8" /><span className="font-bold text-lg text-white">Vemo<span className="text-brand">Ride</span></span></div>
            <p className="text-sm">Rent cars from trusted partners in Nigeria, with professional drivers included.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-brand">Home</Link></li>
              <li><Link to="/browse" className="hover:text-brand">Browse Cars</Link></li>
              <li><Link to="/about" className="hover:text-brand">About</Link></li>
              <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" />+234 808 740 1435</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" />info@vemoride.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />Lagos, Nigeria</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-brand">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VemoRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
