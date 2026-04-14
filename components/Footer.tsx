import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#222] text-center">
      <p className="text-gray-400 text-xs tracking-[2px] uppercase mb-2">
        Christy & Andrew
      </p>
      <div className="w-8 h-[1px] bg-gray-600 mx-auto mb-2"></div>
      <p className="text-gray-500 text-[10px] tracking-widest">
        2026
      </p>
    </footer>
  );
};

export default Footer;