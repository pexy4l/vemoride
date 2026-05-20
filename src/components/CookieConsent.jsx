import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookies_accepted')) setShow(true);
  }, []);

  const accept = () => { localStorage.setItem('cookies_accepted', 'true'); setShow(false); };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-600 dark:text-gray-300">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <Button size="sm" className="bg-brand hover:bg-brand-dark whitespace-nowrap" onClick={accept}>Accept</Button>
      </div>
    </div>
  );
}
