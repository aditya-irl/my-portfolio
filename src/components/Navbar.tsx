import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
  onOpenCommand?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenResume,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About me', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#projects' },
    { name: 'Contact me', href: '#contact' },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-black/90 backdrop-blur-md border-b border-neutral-800 shadow-lg text-white'
          : 'py-5 bg-transparent text-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          
          {/* Brand Monogram Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className={`w-9 h-9 border-2 flex items-center justify-center font-bold font-display text-sm tracking-wider transition-colors ${
              scrolled ? 'border-white text-white bg-black' : 'border-black text-black bg-white'
            }`}>
              AK
            </div>
            <span className={`hidden sm:inline font-bold tracking-[0.15em] text-xs uppercase ${
              scrolled ? 'text-white' : 'text-black'
            }`}>
              {personalInfo.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-[0.15em] uppercase">
            {navLinks.slice(0, 3).map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`transition-colors relative py-1 ${
                    scrolled
                      ? isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                      : isActive ? 'text-black font-bold' : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] ${
                      scrolled ? 'bg-white' : 'bg-black'
                    }`} />
                  )}
                </button>
              );
            })}

            {/* Resume Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenResume();
              }}
              className={`flex items-center gap-1.5 transition-colors ${
                scrolled ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Contact Me CTA Pill Button */}
            <button
              onClick={() => handleNavClick('#contact')}
              className={`px-5 py-2 rounded-full font-bold tracking-[0.15em] text-xs uppercase transition-all duration-200 border-2 ${
                scrolled
                  ? 'bg-white text-black border-white hover:bg-black hover:text-white'
                  : 'bg-black text-white border-black hover:bg-white hover:text-black'
              }`}
            >
              Contact me
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenResume();
              }}
              className={`p-1.5 border text-xs font-bold ${
                scrolled ? 'border-white text-white' : 'border-black text-black'
              }`}
              title="Resume"
            >
              <FileText className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className={`p-1.5 focus:outline-none ${
                scrolled ? 'text-white' : 'text-black'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white border-b border-neutral-800 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-semibold tracking-[0.15em] uppercase text-xs">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 text-neutral-300 hover:text-white border-b border-neutral-900"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-neutral-300 hover:text-white border-b border-neutral-900 flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Interactive Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
