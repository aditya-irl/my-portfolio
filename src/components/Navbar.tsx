import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { 
  FileText, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Search,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
  onOpenCommand: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenResume,
  onOpenCommand,
  soundEnabled,
  onToggleSound
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Greater Noida / IST Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-dark-bg/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo / Identity */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue via-brand-indigo to-brand-violet p-[1px] shadow-lg shadow-brand-blue/20 group-hover:shadow-brand-blue/40 transition-all duration-300">
                <div className="w-full h-full bg-dark-bg/90 rounded-[11px] flex items-center justify-center backdrop-blur-sm group-hover:bg-dark-surface transition-colors">
                  <span className="font-display font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-indigo-400">
                    AK
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-base tracking-wide text-white group-hover:text-brand-blue transition-colors">
                    {personalInfo.name}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
                    Available
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Greater Noida (IST {currentTime || 'UTC+5:30'})</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-dark-surface/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.06] shadow-inner shadow-white/[0.02]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 relative ${
                      isActive
                        ? 'text-brand-blue bg-white/[0.08] shadow-sm font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-brand-blue rounded-full shadow-[0_0_8px_#38BDF8]"></span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons: Cmd+K, Audio Toggle, Resume Modal */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Command Palette Trigger */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenCommand();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-surface/70 hover:bg-white/[0.08] border border-white/[0.08] text-xs text-slate-300 hover:text-white transition-all group"
                title="Open Command Palette (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5 text-brand-blue group-hover:scale-110 transition-transform" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono text-slate-400">
                  ⌘K
                </kbd>
              </button>

              {/* Sound FX Toggle */}
              <button
                onClick={() => {
                  onToggleSound();
                }}
                className="p-2 rounded-lg bg-dark-surface/70 hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-brand-blue transition-all"
                title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
                aria-label="Toggle Sound"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-brand-blue" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {/* View/Download Resume CTA */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenResume();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue/20 via-brand-indigo/20 to-brand-violet/20 hover:from-brand-blue/30 hover:via-brand-indigo/30 hover:to-brand-violet/30 border border-brand-blue/40 text-xs font-semibold text-white shadow-lg shadow-brand-blue/10 hover:shadow-brand-blue/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-brand-blue" />
                <span>Interactive Resume</span>
              </button>
            </div>

            {/* Mobile Menu & Quick Actions Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenResume();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue/10 border border-brand-blue/30 text-xs font-medium text-brand-blue"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-2 rounded-lg bg-dark-surface border border-white/10 text-slate-300 hover:text-white focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-dark-surface/95 backdrop-blur-2xl rounded-2xl p-4 border border-white/10 shadow-2xl space-y-2">
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/[0.08]">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onOpenCommand();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.04] text-xs text-slate-300 hover:text-white border border-white/[0.06]"
                >
                  <Search className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Search (⌘K)</span>
                </button>
                <button
                  onClick={() => {
                    onToggleSound();
                  }}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.04] text-xs text-slate-300 hover:text-white border border-white/[0.06]"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Audio On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                      <span>Audio Muted</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-brand-blue hover:bg-white/[0.06] transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-slate-600 text-xs">→</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-white/[0.08]">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/30 text-xs font-semibold text-white"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
