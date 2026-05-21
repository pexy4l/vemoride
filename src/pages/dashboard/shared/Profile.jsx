import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { users } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function Profile() {
  const { user } = useAuth();
  const userData = users.find(u => u.id === user?.id);
  const [, forceUpdate] = useState(0);

  const isPartner = user?.role === 'drivercarowner';

  const toggleCompanyImage = (checked) => {
    if (userData) { userData.useCompanyImage = checked; forceUpdate(n => n + 1); }
  };

  const updateCompanyImage = (url) => {
    if (userData) { userData.companyImage = url; forceUpdate(n => n + 1); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Profile Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border dark:border-gray-700 max-w-lg space-y-4">
        <div><Label>Name</Label><Input value={user?.name || ''} disabled /></div>
        <div><Label>Email</Label><Input value={user?.email || ''} disabled /></div>
        <div><Label>Phone</Label><Input value={user?.phone || ''} disabled /></div>
        <div><Label>Role</Label><Input value={isPartner ? 'Partner' : user?.role} disabled className="capitalize" /></div>

        {isPartner && (
          <div className="border-t dark:border-gray-700 pt-4 space-y-3">
            <h2 className="font-bold dark:text-white">Company Branding</h2>
            <div className="flex items-center gap-2">
              <Checkbox checked={userData?.useCompanyImage || false} onCheckedChange={toggleCompanyImage} id="use-company" />
              <label htmlFor="use-company" className="text-sm dark:text-gray-300 cursor-pointer">Use company image instead of personal profile</label>
            </div>
            {userData?.useCompanyImage && (
              <div>
                <Label>Company Image URL</Label>
                <Input value={userData?.companyImage || ''} onChange={e => updateCompanyImage(e.target.value)} placeholder="https://..." />
                {userData?.companyImage && <img src={userData.companyImage} alt="Company" className="w-16 h-16 rounded-full object-cover mt-2 bg-gray-100" />}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
