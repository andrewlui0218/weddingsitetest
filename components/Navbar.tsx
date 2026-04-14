import React from 'react';

const Navbar: React.FC = () => {
  const navLinks = [
    { name: 'Home', href: '#hero-page' },
    { name: 'Story', href: '#our-story' },
    { name: 'Photos', href: '#pre-wedding' },
    { name: 'Map', href: '#transportation' },
    { name: 'Upload', href: '#photo-upload', highlight: true },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Calculate offset to account for the sticky navbar height
      // Using 80px to provide a comfortable buffer
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm py-4 animate-fade-in-down">
      <div className="flex justify-center items-center gap-4 md:gap-8 px-4 overflow-x-auto">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleScroll(e, link.href)}
            className={`
              text-xs md:text-sm font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer
              ${link.highlight ? 'text-wedding-dark hover:text-wedding-primary' : 'text-gray-600 hover:text-wedding-dark'}
            `}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;