import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { LinkedInIcon } from './Icons';
import { 
  ArrowUp, 
  Mail, 
  ShieldCheck, 
  MapPin 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-bg border-t border-white/[0.08] text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-indigo p-[1px]">
                <div className="w-full h-full bg-dark-bg rounded-[11px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-base text-brand-blue">
                    AK
                  </span>
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg block leading-tight">
                  {personalInfo.name}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {personalInfo.role}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Crafting high-throughput Java backend architectures and responsive, full-stack digital web platforms based in Greater Noida, India.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Resume Single Source of Truth</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="font-mono uppercase tracking-wider text-slate-300 font-semibold block">
              Direct Navigation
            </span>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Education', 'Certifications', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => soundFx.playClick()}
                    onMouseEnter={() => soundFx.playHover()}
                    className="hover:text-brand-blue transition-colors flex items-center gap-1.5"
                  >
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Location */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="font-mono uppercase tracking-wider text-slate-300 font-semibold block">
              Get in Touch
            </span>
            <div className="space-y-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-brand-blue transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-brand-blue" />
                <span className="break-all">{personalInfo.email}</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-blue transition-colors flex items-center gap-2"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn Profile</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. Engineered with React, TypeScript &amp; Tailwind.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors border border-white/[0.06]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-brand-blue" />
          </button>
        </div>

      </div>
    </footer>
  );
};
