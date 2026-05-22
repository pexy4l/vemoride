import React, { useState } from 'react';

const FALLBACK = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800';

export default function CarImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src);
  return <img src={imgSrc} alt={alt} className={className} onError={() => setImgSrc(FALLBACK)} loading="lazy" />;
}
