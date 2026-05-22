import React, { useState, useEffect } from 'react';

export default function PriceRangeSlider({ min = 0, max = 250000, step = 1000, value, onChange }) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  const gap = step;

  useEffect(() => { setMinVal(value[0]); setMaxVal(value[1]); }, [value[0], value[1]]);

  const getLeft = () => ((minVal - min) / (max - min)) * 100;
  const getRight = () => 100 - ((maxVal - min) / (max - min)) * 100;

  const handleMinRange = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - gap);
    setMinVal(val);
  };

  const handleMaxRange = (e) => {
    const val = Math.max(Number(e.target.value), minVal + gap);
    setMaxVal(val);
  };

  const commit = () => onChange([minVal, maxVal]);

  return (
    <div className="pt-2 pb-4">
      {/* Number inputs */}
      <div className="flex items-center gap-2 mb-4">
        <input type="number" value={minVal} min={min} max={max} step={step}
          onChange={e => { const v = Math.min(Number(e.target.value), maxVal - gap); setMinVal(v); onChange([v, maxVal]); }}
          className="w-full text-center text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1.5 bg-white dark:bg-gray-700 dark:text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        <span className="text-gray-400 text-sm">-</span>
        <input type="number" value={maxVal} min={min} max={max} step={step}
          onChange={e => { const v = Math.max(Number(e.target.value), minVal + gap); setMaxVal(v); onChange([minVal, v]); }}
          className="w-full text-center text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1.5 bg-white dark:bg-gray-700 dark:text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
      </div>

      {/* Track */}
      <div className="relative h-[5px] bg-gray-200 dark:bg-gray-600 rounded-full">
        <div className="absolute h-full bg-brand rounded-full transition-none" style={{ left: `${getLeft()}%`, right: `${getRight()}%` }} />
      </div>

      {/* Range thumbs */}
      <div className="relative h-0">
        <input type="range" min={min} max={max} step={step} value={minVal}
          onInput={handleMinRange} onMouseUp={commit} onTouchEnd={commit}
          className="absolute w-full -top-[5px] h-[5px] bg-transparent appearance-none pointer-events-none
            [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(0,0,0,0.1)] [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_0_6px_rgba(0,0,0,0.1)] [&::-moz-range-thumb]:cursor-pointer" />
        <input type="range" min={min} max={max} step={step} value={maxVal}
          onInput={handleMaxRange} onMouseUp={commit} onTouchEnd={commit}
          className="absolute w-full -top-[5px] h-[5px] bg-transparent appearance-none pointer-events-none
            [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(0,0,0,0.1)] [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_0_6px_rgba(0,0,0,0.1)] [&::-moz-range-thumb]:cursor-pointer" />
      </div>
    </div>
  );
}
