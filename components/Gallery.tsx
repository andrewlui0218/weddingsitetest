import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hk' | 'japan'>('hk');
  // Store index instead of src to enable navigation
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Swipe interaction state
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  const { ref, isVisible } = useScrollAnimation(0.1);

  // Generate paths for local images
  const hkPhotos = Array.from({ length: 6 }).map((_, i) => `images/gallery-hk-${i + 1}.jpg`);
  const jpPhotos = Array.from({ length: 6 }).map((_, i) => `images/gallery-jp-${i + 1}.jpg`);

  const currentPhotos = activeTab === 'hk' ? hkPhotos : jpPhotos;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setTranslate({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setTranslate({ x: 0, y: 0 });
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex < currentPhotos.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
      setTranslate({ x: 0, y: 0 });
    } else {
        // Snap back if at end
        setTranslate({ x: 0, y: 0 });
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
      setTranslate({ x: 0, y: 0 });
    } else {
        // Snap back if at start
        setTranslate({ x: 0, y: 0 });
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only enable swipe if not zoomed (simplification: browser zoom usually handled by browser, 
    // but here we just track single touch for swipe)
    if (e.touches.length === 1) {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isDragging) return;
    
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    // We strictly ignore vertical movement (dy) to keep image centered
    
    setTranslate({ x: dx, y: 0 });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!touchStartRef.current) return;

    const swipeThreshold = 50;

    // Horizontal Swipe -> Navigation
    if (Math.abs(translate.x) > swipeThreshold) {
      if (translate.x > 0) {
        showPrev(); // Swipe Right
      } else {
        showNext(); // Swipe Left
      }
    } 
    // Not enough movement -> Snap back
    else {
      setTranslate({ x: 0, y: 0 });
    }

    touchStartRef.current = null;
  };

  return (
    <section id="pre-wedding" className="py-24 bg-white/90 backdrop-blur-sm" ref={ref}>
      <div className={`max-w-6xl mx-auto px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className="text-center mb-12">
          <h3 className="font-serif text-5xl font-bold text-wedding-dark tracking-wider mb-8">Pre-Wedding</h3>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('hk')}
              className={`px-8 py-2 rounded-full border-2 text-sm font-bold uppercase tracking-wider transition-all duration-300
                ${activeTab === 'hk' 
                  ? 'bg-wedding-dark text-white border-wedding-dark shadow-lg scale-105' 
                  : 'bg-white text-wedding-dark border-wedding-dark hover:bg-wedding-dark/10'}
              `}
            >
              Hong Kong
            </button>
            <button
              onClick={() => setActiveTab('japan')}
              className={`px-8 py-2 rounded-full border-2 text-sm font-bold uppercase tracking-wider transition-all duration-300
                ${activeTab === 'japan' 
                  ? 'bg-wedding-dark text-white border-wedding-dark shadow-lg scale-105' 
                  : 'bg-white text-wedding-dark border-wedding-dark hover:bg-wedding-dark/10'}
              `}
            >
              Hokkaido
            </button>
          </div>
        </div>

        {/* 
          Key ensures container remounts on tab change to re-trigger animations.
        */}
        <div key={activeTab} className="columns-2 md:columns-3 gap-4 space-y-4">
          {currentPhotos.map((src, index) => (
            <div 
              key={`${activeTab}-${index}`} 
              className="break-inside-avoid overflow-hidden rounded-xl shadow-md group opacity-0 animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 200}ms`, 
                animationDuration: '0.8s',
                animationFillMode: 'forwards' 
              }}
            >
              <img 
                src={src} 
                alt={`Gallery ${activeTab} ${index}`} 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 ease-in-out cursor-zoom-in"
                loading="lazy"
                decoding="async"
                onClick={() => openLightbox(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - Rendered into body via Portal to ensure full screen coverage */}
      {lightboxIndex !== null && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center animate-fade-in touch-none"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-[110]"
            onClick={closeLightbox}
          >
            <i className="fa-solid fa-xmark text-3xl md:text-5xl drop-shadow-lg"></i>
          </button>

          {/* Previous Button (Desktop) */}
          {lightboxIndex > 0 && (
            <button
              className="hidden md:block absolute left-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={showPrev}
            >
              <i className="fa-solid fa-chevron-left text-5xl"></i>
            </button>
          )}

          {/* Next Button (Desktop) */}
          {lightboxIndex < currentPhotos.length - 1 && (
            <button
              className="hidden md:block absolute right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={showNext}
            >
              <i className="fa-solid fa-chevron-right text-5xl"></i>
            </button>
          )}

          {/* Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
            // Attach touch handlers here to capture swipe on screen
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img 
              src={currentPhotos[lightboxIndex]} 
              alt="Full view" 
              className="max-h-[90vh] max-w-full object-contain shadow-2xl select-none"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onClick={(e) => e.stopPropagation()} // Prevent close on image click
              draggable={false} // Prevent native drag
            />
            
            {/* Index Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-serif text-lg tracking-widest bg-black/30 px-4 py-1 rounded-full">
              {lightboxIndex + 1} / {currentPhotos.length}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Gallery;