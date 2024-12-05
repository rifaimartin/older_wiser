'use client';
import { useState, useRef } from 'react';
import Swal from 'sweetalert2';

interface AvatarUploadProps {
  name: string;
  currentImage?: string;
  onFileSelect: (file: File) => void;
}

export const AvatarUpload = ({ name, currentImage, onFileSelect }: AvatarUploadProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      Swal.fire({
        title: 'File Too Large!',
        text: 'Please upload an image less than 1MB',
        icon: 'error',
        confirmButtonColor: '#6A8270'
      });
      return;
    } 

    // Create preview URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    
    // Pass file to parent
    onFileSelect(file);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-32 h-32 rounded-full bg-[#6A8270] text-white relative flex items-center justify-center text-4xl font-semibold">
        {(previewUrl || currentImage) ? (
          <img 
            src={previewUrl || currentImage} 
            alt={name} 
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          name?.charAt(0).toUpperCase()
        )}
        
        {isHovering && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
            >
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />
    </div>
  );
};