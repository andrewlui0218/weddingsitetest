import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation.ts';

const Transportation: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  // Define paths for local images with "images/" prefix
  const mapImage = "images/transport-map.jpg";
  const guideImage = "images/transport-guide.jpg";

  return (
    <section id="transportation" className="py-20 bg-white/90 backdrop-blur-sm" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Title Animation */}
        <h3 className={`text-center font-serif text-5xl font-bold text-wedding-dark tracking-wider mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          Transportation
        </h3>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-12">
          {/* Card 1 */}
          <div className={`flex-1 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 transition-all duration-1000 delay-200 transform hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="relative overflow-hidden rounded-xl bg-gray-200 group">
              <img 
                src={mapImage} 
                alt="Direction Map" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-2 text-center font-semibold text-wedding-dark backdrop-blur-sm">
                Location Map
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className={`flex-1 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 transition-all duration-1000 delay-400 transform hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
             <div className="relative overflow-hidden rounded-xl bg-gray-200 group">
               <img 
                 src={guideImage} 
                 alt="Transport Guide" 
                 className="w-full h-auto transition-transform duration-700 group-hover:scale-105" 
                 loading="lazy"
                 decoding="async"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-2 text-center font-semibold text-wedding-dark backdrop-blur-sm">
                Transportation Guide
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Notes */}
        <div className={`max-w-3xl mx-auto space-y-4 text-center md:text-left transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 p-4 bg-wedding-bg/50 rounded-lg border border-wedding-primary/20">
            <i className="fa-solid fa-square-parking text-2xl text-wedding-primary shrink-0"></i>
            <p className="text-gray-700 text-sm md:text-base">
              Limited parking spaces are available. Please reserve in advance when confirming your RSVP.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 p-4 bg-wedding-bg/50 rounded-lg border border-wedding-primary/20">
            <i className="fa-solid fa-bus text-2xl text-wedding-primary shrink-0"></i>
            <p className="text-gray-700 text-sm md:text-base">
              Two 45-seat shuttle buses will be provided from the hotel to Kowloon Tong MTR after the banquet.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Transportation;