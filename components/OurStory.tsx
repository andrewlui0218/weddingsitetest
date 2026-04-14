import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface StoryEvent {
  date: string;
  title: string;
  image: string;
}

const stories: StoryEvent[] = [
  { date: '12th May, 2021', title: 'Our first Date!', image: 'images/story-1.jpg' },
  { date: '25th December, 2021', title: 'Our first Christmas!', image: 'images/story-2.jpg' },
  { date: '12th October, 2024', title: 'Tottori, Japan', image: 'images/story-3.jpg' },
  { date: '23rd October, 2024', title: 'Happy Graduation!', image: 'images/story-4.jpg' },
  { date: '15th November, 2024', title: 'We are engaged!', image: 'images/story-5.jpg' },
  { date: '25th April, 2026', title: 'Our Big Day!', image: 'images/story-6.jpg' },
];

const StoryItem: React.FC<{ event: StoryEvent; index: number }> = ({ event, index }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`relative w-full flex mb-8 ${isLeft ? 'justify-start md:justify-end' : 'justify-start'} md:w-1/2 ${isLeft ? 'md:pr-8 md:ml-0' : 'md:pl-8 md:ml-[50%]'} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {/* Timeline Dot (Desktop center, Mobile left) */}
      <div className={`absolute top-6 w-4 h-4 rounded-full bg-white border-[3px] border-wedding-primary z-10 shadow-sm transition-transform duration-300 hover:scale-150
        ${isLeft ? 'md:-right-[10px]' : 'md:-left-[10px]'} 
        left-[-9px] md:left-auto
      `}></div>

      {/* Content Card */}
      <div className={`group w-full ml-6 md:ml-0 bg-white/95 p-4 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
        <div className="overflow-hidden rounded-xl mb-4">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              loading="lazy"
              decoding="async"
            />
        </div>
        <span className="font-serif font-bold text-xl text-wedding-dark block mb-1 group-hover:text-wedding-primary transition-colors">
          {event.date}
        </span>
        <div className="text-gray-600 font-medium text-sm md:text-base">
          {event.title}
        </div>
      </div>
    </div>
  );
};

const OurStory: React.FC = () => {
  // Add animation for the section header
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    // Changed bg-gray-50 to bg-white/90
    <section id="our-story" className="py-20 px-4 bg-white/90 backdrop-blur-sm relative" ref={ref}>
      <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h3 className="font-serif text-5xl font-bold text-wedding-dark tracking-wider mb-4">Our Story</h3>
        <div className={`h-1 w-20 bg-wedding-primary mx-auto rounded-full transition-all duration-1000 delay-300 ${isVisible ? 'w-20 opacity-100' : 'w-0 opacity-0'}`}></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Center Line */}
        <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-wedding-primary/40 transform md:-translate-x-1/2 transition-all duration-1000 delay-500 origin-top ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}></div>
        
        <div className="flex flex-col w-full">
          {stories.map((event, index) => (
            <StoryItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;