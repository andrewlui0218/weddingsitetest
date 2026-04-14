import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const EventDetails: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const timeLeft = useCountdown("April 25, 2026 18:00:00");

  const scheduleItems = [
    { title: 'Reception', time: '6:00 PM', icon: 'fa-door-open' },
    { title: 'Ceremony', time: '6:30 PM', icon: 'fa-ring' },
    { title: 'Banquet', time: '8:00 PM', icon: 'fa-utensils' },
  ];

  // Calendar Event Details
  const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Christy+%26+Andrew+Wedding&dates=20260425T100000Z/20260425T150000Z&details=We+can't+wait+to+celebrate+with+you!%0A%0AReception:+6:00+PM%0ACeremony:+6:30+PM%0ABanquet:+8:00+PM&location=WM+Hotel,+Sai+Kung,+Hong+Kong";

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Christy and Andrew//Wedding Website//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:Christy & Andrew Wedding',
      'DTSTART:20260425T180000',
      'DTEND:20260425T230000',
      'DTSTAMP:' + new Date().toISOString().replace(/[-:.]/g, ''),
      'UID:' + new Date().getTime() + '@christyandandrew.com',
      'DESCRIPTION:We can\'t wait to celebrate with you!\\n\\nReception: 6:00 PM\\nCeremony: 6:30 PM\\nBanquet: 8:00 PM',
      'LOCATION:WM Hotel, Sai Kung, Hong Kong',
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Christy_and_Andrew_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section 
      id="date-timer-page" 
      // Changed bg-wedding-bg to bg-white/90 to let the global background show through faintly
      className="py-24 px-4 bg-white/90 relative overflow-hidden backdrop-blur-sm"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Title Block */}
        <div className={`mb-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="font-serif text-5xl md:text-6xl text-wedding-dark mb-4">
            25th April, 2026
          </div>
          <div className="font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase text-wedding-dark mb-2">
            Grand Ballroom
          </div>
          <div className="font-serif text-lg md:text-xl tracking-widest uppercase text-wedding-dark/80">
            WM Hotel, Sai Kung
          </div>
        </div>

        {/* Schedule Block (Moved Up) */}
        <div 
          className={`flex flex-row justify-center items-start gap-2 md:gap-16 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {scheduleItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center group flex-1 px-1">
              <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-wedding-dark mb-2 md:mb-3">
                {item.title}
              </span>
              <i className={`fa-solid ${item.icon} text-lg md:text-2xl text-wedding-primary mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300`}></i>
              <span className="font-serif text-base md:text-2xl font-bold text-wedding-text whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>

        {/* Divider Line */}
        <div className={`w-24 h-[1px] bg-wedding-dark/30 mx-auto mb-10 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Countdown Block (Moved Down) */}
        <div 
          className={`flex justify-center gap-3 md:gap-6 mb-10 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {Object.entries(timeLeft).map(([unit, value], i) => (
            <div 
              key={unit} 
              className="bg-white/80 border border-wedding-primary rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px] shadow-sm hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="font-serif text-3xl md:text-4xl font-bold text-wedding-dark block leading-none">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-[0.6rem] md:text-xs uppercase tracking-wider text-gray-500 mt-1 block">
                {unit}
              </span>
            </div>
          ))}
        </div>

        {/* Add to Calendar Buttons */}
        <div className={`flex flex-row justify-center items-center gap-2 md:gap-4 mb-4 transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a 
            href={googleCalendarUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex-initial justify-center items-center px-3 py-2 md:px-6 bg-white border border-gray-200 rounded-full text-[10px] md:text-sm font-semibold tracking-wide text-gray-700 hover:text-wedding-primary hover:border-wedding-primary/50 hover:shadow-md transition-all duration-300 whitespace-nowrap"
          >
            <i className="fa-brands fa-google text-sm md:text-lg mr-1.5 md:mr-2 text-wedding-primary group-hover:scale-110 transition-transform"></i>
            Google Calendar
          </a>
          
          <button 
            onClick={handleDownloadIcs}
            className="group flex-initial justify-center items-center px-3 py-2 md:px-6 bg-white border border-gray-200 rounded-full text-[10px] md:text-sm font-semibold tracking-wide text-gray-700 hover:text-wedding-primary hover:border-wedding-primary/50 hover:shadow-md transition-all duration-300 whitespace-nowrap"
          >
            <i className="fa-regular fa-calendar-check text-sm md:text-lg mr-1.5 md:mr-2 text-wedding-primary group-hover:scale-110 transition-transform"></i>
            iCal / Outlook
          </button>
        </div>

      </div>
    </section>
  );
};

export default EventDetails;