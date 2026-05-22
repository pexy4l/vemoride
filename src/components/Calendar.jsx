import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ selected, onSelect, minDate, maxDate }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(selected ? selected.getMonth() : today.getMonth());
  const [viewYear, setViewYear] = useState(selected ? selected.getFullYear() : today.getFullYear());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isDisabled = (day) => {
    const date = new Date(viewYear, viewMonth, day);
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isToday = (day) => {
    return viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate();
  };

  const isSelected = (day) => {
    if (!selected) return false;
    return viewYear === selected.getFullYear() && viewMonth === selected.getMonth() && day === selected.getDate();
  };

  const handleSelect = (day) => {
    if (isDisabled(day)) return;
    onSelect(new Date(viewYear, viewMonth, day));
  };

  const canGoPrev = !minDate || new Date(viewYear, viewMonth, 0) >= minDate;
  const canGoNext = !maxDate || new Date(viewYear, viewMonth + 1, 1) <= maxDate;

  return (
    <div className="w-[300px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="bg-brand text-white px-4 py-3 flex items-center justify-between">
        <button onClick={prevMonth} disabled={!canGoPrev} className="p-1 rounded hover:bg-white/20 disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
        <h2 className="font-semibold text-sm">{MONTHS[viewMonth]} {viewYear}</h2>
        <button onClick={nextMonth} disabled={!canGoNext} className="p-1 rounded hover:bg-white/20 disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-700">
        {DAYS.map(d => <div key={d} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">{d}</div>)}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 p-2 gap-0.5">
        {Array.from({ length: firstDay }, (_, i) => <div key={`b${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const disabled = isDisabled(day);
          const sel = isSelected(day);
          const tod = isToday(day);
          return (
            <button key={day} onClick={() => handleSelect(day)} disabled={disabled}
              className={`h-9 w-9 mx-auto rounded-full text-sm flex items-center justify-center transition-colors
                ${sel ? 'bg-brand text-white font-bold' : ''}
                ${tod && !sel ? 'border-2 border-brand text-brand font-bold' : ''}
                ${disabled ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : ''}
                ${!sel && !disabled && !tod ? 'text-gray-700 dark:text-gray-300 hover:bg-brand/10' : ''}
              `}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
