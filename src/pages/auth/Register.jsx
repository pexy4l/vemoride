import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToastNotify } from '@/components/ToastNotify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const showToast = useToastNotify();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) { setError('Please select an account type'); return; }
    const result = register(name, email, password, role);
    if (result.success) {
      showToast(`Welcome to VemoRide, ${name}!`);
      const from = location.state?.from || '/';
      navigate(from);
    }
    else setError(result.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <img src="/vemoride4.svg" alt="VemoRide" className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold dark:text-white">Create an account</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Choose your account type to get started</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label>Full Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required /></div>
          <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
          <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" required /></div>

          <div>
            <Label>I want to</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${role === 'customer' ? 'border-brand bg-brand/5' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}`}
              >
                <p className="font-medium dark:text-white">Rent a Car</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Customer</p>
              </button>
              <button
                type="button"
                onClick={() => setRole('drivercarowner')}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${role === 'drivercarowner' ? 'border-brand bg-brand/5' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}`}
              >
                <p className="font-medium dark:text-white">List my Cars</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Partner</p>
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-brand hover:bg-brand-dark">Create Account</Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-brand font-medium">Log In</Link>
        </p>
      </div>
    </div>
  );
}
