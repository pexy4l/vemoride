import React, { useState, useEffect } from 'react';

export default function PriceRangeSlider({ min = 0, max = 250000, step = 1000, value, onChange }) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  const [minInput, setMinInput] = useState(String(value[0]));
  const [maxInput, setMaxInput] = useState(String(value[1]));
  const gap = step;

  useEffect(() => { setMinVal(value[0]); setMaxVal(value[1]); setMinInput(String(value[0])); setMaxInput(String(value[1])); }, [value[0], value[1]]);

  const getLeft = () => ((minVal - min) / (max - min)) * 100;
  const getRight = () => 100 - ((maxVal - min) / (max - min)) * 100;

  const handleMinRange = (e) => { const val = Math.min(Number(e.target.value), maxVal - gap); setMinVal(val); setMinInput(String(val)); };
  const handleMaxRange = (e) => { const val = Math.max(Number(e.target.value), minVal + gap); setMaxVal(val); setMaxInput(String(val)); };
  const commit = () => onChange([minVal, maxVal]);

  const commitMinInput = () => { const v = Math.max(min, Math.min(Number(minInput) || 0, maxVal - gap)); setMinVal(v); setMinInput(String(v)); onChange([v, maxVal]); };
  const commitMaxInput = () => { const v = Math.min(max, Math.max(Number(maxInput) || max, minVal + gap)); setMaxVal(v); setMaxInput(String(v)); onChange([minVal, v]); };

  return (
    <div className="pt-2 pb-4">
      {/* Number inputs */}
      <div className="flex items-center gap-2 mb-4">
        <input type="text" value={minInput}
          onChange={e => setMinInput(e.target.value)}
          onBlur={commitMinInput}
          onKeyDown={e => e.key === 'Enter' && commitMinInput()}
          className="w-full text-center text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1.5 bg-white dark:bg-gray-700 dark:text-white outline-none" />
        <span className="text-gray-400 text-sm">-</span>
        <input type="text" value={maxInput}
          onChange={e => setMaxInput(e.target.value)}
          onBlur={commitMaxInput}
          onKeyDown={e => e.key === 'Enter' && commitMaxInput()}
          className="w-full text-center text-sm border border-gray-300 dark:border-gray-600 rounded-md py-1.5 bg-white dark:bg-gray-700 dark:text-white outline-none" />
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
