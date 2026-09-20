import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { LinkedInIcon, GitHubIcon, InstagramIcon } from './Icons';
import { ChevronUp, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white py-16 border-t border-neutral-900 text-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center space-y-8">
        
        {/* Back to top Button matching Reference */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center gap-2 group focus:outline-none"
        >
          <div className="w-10 h-10 border-2 border-white flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-200">
            <ChevronUp className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-[0.25em] text-[11px] uppercase text-neutral-300 group-hover:text-white transition-colors">
            BACK TO TOP
          </span>
        </button>

        {/* Minimalist Social Icon Links matching Reference */}
        <div className="flex items-center gap-4 pt-2">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border-2 border-neutral-700 hover:border-white flex items-center justify-center text-white transition-all duration-200"
            title="LinkedIn Profile"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border-2 border-neutral-700 hover:border-white flex items-center justify-center text-white transition-all duration-200"
            title="GitHub Profile"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>

          {personalInfo.instagram && (
            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border-2 border-neutral-700 hover:border-white flex items-center justify-center text-white transition-all duration-200"
              title="Instagram Profile"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          )}

          <a
            href={`mailto:${personalInfo.email}`}
            className="w-10 h-10 border-2 border-neutral-700 hover:border-white flex items-center justify-center text-white transition-all duration-200"
            title="Send Email"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright Line matching Reference */}
        <div className="pt-4 text-xs font-mono tracking-widest uppercase text-neutral-500">
          @{new Date().getFullYear()} {personalInfo.name} &bull; ALL RIGHTS RESERVED
        </div>

      </div>
    </footer>
  );
};
