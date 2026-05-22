import React, { useState, useRef, useCallback } from 'react';

export default function PriceRangeSlider({ min = 0, max = 250000, step = 5000, value, onChange }) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  const gap = step;

  const getPercent = useCallback((val) => ((val - min) / (max - min)) * 100, [min, max]);

  const handleMin = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - gap);
    setMinVal(val);
    onChange([val, maxVal]);
  };

  const handleMax = (e) => {
    const val = Math.max(Number(e.target.value), minVal + gap);
    setMaxVal(val);
    onChange([minVal, val]);
  };

  const leftPercent = getPercent(minVal);
  const rightPercent = 100 - getPercent(maxVal);

  return (
    <div className="pt-2 pb-4">
      {/* Price inputs */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1">
          <input type="number" value={minVal} onChange={handleMin} min={min} max={max}
            className="w-full text-center text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1.5 bg-white dark:bg-gray-700 dark:text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        </div>
        <span className="text-gray-400 text-sm">-</span>
        <div className="flex-1">
          <input type="number" value={maxVal} onChange={handleMax} min={min} max={max}
            className="w-full text-center text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1.5 bg-white dark:bg-gray-700 dark:text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        </div>
      </div>

      {/* Slider track */}
      <div className="relative h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full">
        <div className="absolute h-full bg-brand rounded-full" style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }} />
      </div>

      {/* Range inputs */}
      <div className="relative">
        <input type="range" min={min} max={max} step={step} value={minVal} onChange={handleMin}
          className="absolute w-full -top-1.5 h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer" />
        <input type="range" min={min} max={max} step={step} value={maxVal} onChange={handleMax}
          className="absolute w-full -top-1.5 h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer" />
      </div>
    </div>
  );
}
