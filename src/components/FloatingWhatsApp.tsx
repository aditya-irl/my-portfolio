import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { WhatsAppIcon } from './Icons';
import { soundFx } from '../utils/sound';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // -----------------------------------------------------------------------------------------
  // 📱 HOW TO CONFIGURE YOUR WHATSAPP NUMBER:
  // Update `personalInfo.whatsapp` in `src/data/portfolioData.ts` with your number
  // Format: country code + 10-digit number without '+' or spaces (e.g. "8865804386")
  // -----------------------------------------------------------------------------------------
  const whatsappNumber = personalInfo.whatsapp ? personalInfo.whatsapp.replace(/[^0-9]/g, '') : '8865804386';
  const defaultMessage = encodeURIComponent(
    `Hi ${personalInfo.name.split(' ')[0] || 'Aditya'}, I saw your developer portfolio and would like to discuss an opportunity / project!`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-dark-surface/90 backdrop-blur-md border border-emerald-500/30 text-xs font-medium text-emerald-400 shadow-xl transition-all duration-300 pointer-events-none ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Quick Chat on WhatsApp</span>
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundFx.playClick()}
        onMouseEnter={() => {
          setIsHovered(true);
          soundFx.playHover();
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border border-emerald-400/40"
        aria-label="Chat on WhatsApp"
        title="Chat with Aditya on WhatsApp"
      >
        {/* Pulsing glow ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none"></span>

        {/* Online green indicator dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-dark-bg shadow-sm"></span>

        <WhatsAppIcon className="w-6 h-6 fill-current relative z-10" />
      </a>
    </div>
  );
};
