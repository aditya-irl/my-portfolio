import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CinematicVisual } from './components/CinematicVisual';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { soundFx } from './utils/sound';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundFx.isEnabled());
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Scroll Progress and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom event listener for command palette trigger
  useEffect(() => {
    const handleOpenCommand = () => setIsCommandOpen(true);
    window.addEventListener('open-command-palette', handleOpenCommand);
    return () => window.removeEventListener('open-command-palette', handleOpenCommand);
  }, []);

  const handleToggleSound = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col relative selection:bg-brand-blue/30 selection:text-white">
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet z-[60] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Sticky Glass Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section with Interactive Code Terminal */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Cinematic Motion Visual Canvas Section */}
        <CinematicVisual />

        {/* About Section */}
        <About />

        {/* Categorized Skills Section */}
        <Skills />

        {/* Featured Projects & Case Studies */}
        <Projects />

        {/* Experience & Internships Timeline */}
        <Experience />

        {/* Education Timeline */}
        <Education />

        {/* Certifications & Verified Badges */}
        <Certifications />

        {/* Contact & Inquiry Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Floating WhatsApp Quick Connect Button */}
      <FloatingWhatsApp />
    </div>
  );
};
