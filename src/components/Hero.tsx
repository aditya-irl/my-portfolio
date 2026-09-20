import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { BlackHole } from './BlackHole';
import { LinkedInIcon, GitHubIcon, InstagramIcon } from './Icons';
import { Mail, ArrowRight, Download, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const scrollToContact = () => {
    soundFx.playClick();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 sm:pt-28 flex flex-col justify-between bg-[#f8f9fa] text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full flex-grow flex items-center py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Minimalist Editorial Headline & Bio */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10 text-left">
            
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-medium tracking-wide text-neutral-600">
                Hi, I am
              </p>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-black uppercase leading-[1.05]">
                {personalInfo.name}
              </h1>

              <div className="pt-1">
                <p className="text-sm sm:text-lg font-semibold tracking-[0.18em] uppercase text-neutral-500">
                  {personalInfo.role}
                </p>
              </div>
            </div>

            {/* Location & Status Line */}
            <div className="flex items-center gap-4 text-xs font-semibold tracking-wider text-neutral-600 uppercase pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-black" />
                {personalInfo.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Available for Roles
              </span>
            </div>

            {/* Minimalist Social Icon Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`mailto:${personalInfo.email}`}
                onMouseEnter={() => soundFx.playHover()}
                className="w-10 h-10 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200"
                title="Send Email"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="w-10 h-10 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="w-10 h-10 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              {personalInfo.instagram && (
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  className="w-10 h-10 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200"
                  title="Instagram Profile"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={scrollToContact}
                className="px-8 py-3.5 bg-black text-white border-2 border-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-transparent hover:text-black transition-all duration-200 flex items-center gap-2"
              >
                <span>Contact me</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenResume();
                }}
                className="px-8 py-3.5 bg-transparent text-black border-2 border-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-200 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Portrait Panel with atmospheric Black Hole & Dark Frame matching Figma reference */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] bg-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col justify-between group">
              
              {/* Subtle Black Hole WebGL background inside the right panel */}
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <BlackHole scale={0.9} speed={0.8} intensity={1.0} />
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              </div>

              {/* Aditya Kumar's Professional Portrait Photo */}
              <div className="absolute inset-0 z-10 overflow-hidden flex items-end justify-center">
                <img
                  src="/aditya.jpg"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top filter grayscale-[15%] contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                {/* Editorial Gradient Overlay at bottom for clean text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Top Tag Inside Frame */}
              <div className="relative z-20 flex items-center justify-between p-6">
                <span className="text-[10px] font-mono tracking-[0.25em] text-white uppercase border border-white/40 bg-black/70 backdrop-blur-sm px-2.5 py-1">
                  ENGINEER // 2026
                </span>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-black/70 backdrop-blur-sm px-2.5 py-1 border border-emerald-500/40 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
              </div>

              {/* Bottom Info inside Frame */}
              <div className="relative z-20 p-6 space-y-1.5">
                <div className="h-[2px] w-12 bg-white mb-2" />
                <p className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">
                  ADITYA KUMAR &bull; B.TECH CSE
                </p>
                <p className="text-[11px] text-neutral-300 font-sans tracking-wide">
                  Full Stack Web Developer &amp; Java Specialist
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Full-width "IT SERVICES / ENGINEERING FOCUS" Dark Banner (IT BERRIES in Reference) */}
      <div className="w-full bg-black text-white py-12 sm:py-16 border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
            
            <div className="md:col-span-4">
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-400 pb-2">
                ENGINEERING FOCUS
              </h2>
              <p className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
                SCALABLE ARCHITECTURES &bull; MODERN WEB
              </p>
            </div>

            <div className="md:col-span-8">
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                Passionate about building scalable backend systems, robust Java object-oriented architectures, and high-impact web platforms. Combining high-performance database engineering (MySQL, MongoDB) with clean, responsive user interfaces and intelligent automation utilities.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
