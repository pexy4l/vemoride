import React, { useCallback } from 'react';
import { Upload, X, Image } from 'lucide-react';

const MAX_FILES = 10;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageUploader({ images, onChange }) {
  const handleFiles = useCallback((files) => {
    const newImages = [...images];
    for (const file of files) {
      if (newImages.length >= MAX_FILES) break;
      if (file.size > MAX_SIZE) continue;
      if (!file.type.startsWith('image/')) continue;
      newImages.push(URL.createObjectURL(file));
    }
    onChange(newImages);
  }, [images, onChange]);

  const handleDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };
  const handleInput = (e) => { handleFiles(e.target.files); e.target.value = ''; };
  const removeImage = (idx) => onChange(images.filter((_, i) => i !== idx));

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-brand transition-colors"
        onClick={() => document.getElementById('img-upload-input').click()}
      >
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Drag & drop images here or <span className="text-brand font-medium">click to browse</span></p>
        <p className="text-xs text-gray-400 mt-1">{MAX_FILES} images max, 10MB each</p>
        <input id="img-upload-input" type="file" accept="image/*" multiple onChange={handleInput} className="hidden" />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-2 mt-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <img src={img} alt={`Upload ${i + 1}`} className="w-full h-16 object-cover rounded-lg" />
              <button onClick={() => removeImage(i)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-400 mt-2">{images.length}/{MAX_FILES} images</p>
    </div>
  );
}
