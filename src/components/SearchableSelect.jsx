import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SearchableSelect({ value, onChange, options, placeholder = 'Select...' }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));
  const selectedLabel = options.find(o => o.value === value)?.label || '';

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white">
        <span className={selectedLabel ? '' : 'text-gray-400'}>{selectedLabel || placeholder}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-2 border-b dark:border-gray-700">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="w-full text-sm px-2 py-1.5 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none" autoFocus />
          </div>
          <div className="max-h-[220px] overflow-y-auto overscroll-contain">
            {filtered.map(o => (
              <button key={o.value} type="button"
                onClick={() => { onChange(o.value); setOpen(false); setSearch(''); }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${value === o.value ? 'bg-brand/10 text-brand font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                {o.label}
              </button>
            ))}
            {filtered.length === 0 && <p className="px-3 py-2 text-sm text-gray-400">No results</p>}
          </div>
        </div>
      )}
    </div>
  );
}
