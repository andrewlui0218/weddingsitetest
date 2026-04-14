import React from 'react';

const Hero: React.FC = () => {
  // Image path relative to the public folder (served at root)
  const bgImage = "images/hero-bg.jpg"; 

  return (
    <section 
      id="hero-page" 
      // Mobile: bg-scroll (fixes zoom), bg-[50%_85%] (focuses on bottom/couple)
      // Desktop: bg-fixed (parallax), bg-[center_25%] (original focus)
      className="relative h-screen min-h-[700px] flex items-start justify-center pt-20 md:pt-32 bg-cover bg-no-repeat bg-scroll md:bg-fixed bg-[50%_85%] md:bg-[center_25%]"
      style={{ 
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* 
        Text Container 
        - Reduced mobile padding and max-width to keep it compact at the top.
        - Reduced mobile font sizes to ensure faces aren't blocked.
      */}
      <div className="relative z-10 bg-white/70 backdrop-blur-sm px-6 py-6 md:px-10 md:py-12 rounded-[30px] shadow-lg max-w-xs md:max-w-xl mx-4 text-center border border-white/40 animate-fade-in-down">
        <h2 className="font-serif italic text-gray-600 text-sm md:text-lg mb-2 tracking-wide">
          Together with their families
        </h2>
        <h1 className="font-script text-4xl md:text-7xl lg:text-8xl text-wedding-dark mb-2 md:mb-3 leading-tight opacity-0 animate-zoom-in" style={{ animationDelay: '0.3s' }}>
          Christy & Andrew
        </h1>
        <p className="font-serif italic text-gray-700 text-sm md:text-xl tracking-wider opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          invite you to celebrate their marriage
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/90 animate-pulse-slow">
         <i className="fa-solid fa-chevron-down text-3xl drop-shadow-lg"></i>
      </div>
    </section>
  );
};

export default Hero;