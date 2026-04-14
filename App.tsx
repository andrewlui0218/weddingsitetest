import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import Transportation from './components/Transportation';
import PhotoUpload from './components/PhotoUpload';
import Footer from './components/Footer';

const App: React.FC = () => {
  const bgImage = "images/hero-bg.jpg";

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      {/* 
        Global Background Layer 
        - Using an <img> tag with fetchpriority="high" allows the browser to discover 
          and load the LCP image faster than a background-image in CSS.
      */}
      <img 
        src={bgImage}
        alt="Background"
        className="fixed inset-0 z-[-1] w-full h-full object-cover object-center"
        // @ts-ignore - fetchpriority is valid in HTML attributes but types might lag
        fetchpriority="high"
      />

      <Hero />
      <EventDetails />
      <Navbar />
      <OurStory />
      <Gallery />
      <Transportation />
      <PhotoUpload />
      <Footer />
    </div>
  );
};

export default App;