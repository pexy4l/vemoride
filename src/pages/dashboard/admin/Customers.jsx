import React, { useState } from 'react';
import { users } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Ban, CheckCircle } from 'lucide-react';

export default function Customers() {
  const [, forceUpdate] = useState(0);
  const customers = users.filter(u => u.role === 'customer');

  const toggleSuspend = (id) => {
    const u = users.find(x => x.id === id);
    if (u) u.suspended = !u.suspended;
    forceUpdate(n => n + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold dark:text-white mb-6">Customers ({customers.length})</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700"><tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr></thead>
          <tbody className="divide-y dark:divide-gray-700">
            {customers.map(u => (
              <tr key={u.id}>
                <td className="px-4 py-3 text-sm font-medium dark:text-white">{u.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{u.phone}</td>
                <td className="px-4 py-3">{u.suspended ? <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Suspended</span> : <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Active</span>}</td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => toggleSuspend(u.id)}>
                    {u.suspended ? <><CheckCircle className="h-4 w-4 mr-1 text-green-600" />Activate</> : <><Ban className="h-4 w-4 mr-1 text-red-500" />Suspend</>}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
