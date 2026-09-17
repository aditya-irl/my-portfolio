import React, { useState, useEffect, useRef } from 'react';
import { personalInfo, projects, skillCategories, certifications } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { LinkedInIcon } from './Icons';
import { 
  Search, 
  X, 
  FileText, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Mail, 
  Terminal
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFx.playClick();
        if (isOpen) onClose();
        else {
          const evt = new CustomEvent('open-command-palette');
          window.dispatchEvent(evt);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultItems = [
    { id: 'resume', label: 'View & Download Interactive Resume', icon: FileText, action: () => { onOpenResume(); onClose(); }, category: 'Actions' },
    { id: 'projects', label: 'Jump to Projects & Case Studies', icon: Code2, action: () => { scrollTo('#projects'); }, category: 'Navigation' },
    { id: 'skills', label: 'Explore Technical Skills Matrix', icon: Terminal, action: () => { scrollTo('#skills'); }, category: 'Navigation' },
    { id: 'experience', label: 'View Work History & Internships', icon: Briefcase, action: () => { scrollTo('#experience'); }, category: 'Navigation' },
    { id: 'education', label: 'View Education & B.Tech Degrees', icon: GraduationCap, action: () => { scrollTo('#education'); }, category: 'Navigation' },
    { id: 'certifications', label: 'View Verified Certifications', icon: Award, action: () => { scrollTo('#certifications'); }, category: 'Navigation' },
    { id: 'contact', label: 'Contact Aditya Kumar', icon: Mail, action: () => { scrollTo('#contact'); }, category: 'Navigation' },
    { id: 'linkedin', label: 'Open LinkedIn Profile', icon: LinkedInIcon, action: () => { window.open(personalInfo.linkedin, '_blank'); onClose(); }, category: 'External' },
  ];

  const projectItems = projects.map(p => ({
    id: `p-${p.id}`,
    label: `Project: ${p.title}`,
    icon: Code2,
    action: () => { scrollTo('#projects'); },
    category: 'Projects'
  }));

  const allSkills = skillCategories.flatMap(c => c.skills).map(s => ({
    id: `s-${s.name}`,
    label: `Skill: ${s.name} (${s.level || 'Technical'})`,
    icon: Terminal,
    action: () => { scrollTo('#skills'); },
    category: 'Skills'
  }));

  const certItems = certifications.map(c => ({
    id: `c-${c.id}`,
    label: `Certification: ${c.title} (${c.issuer})`,
    icon: Award,
    action: () => { scrollTo('#certifications'); },
    category: 'Certifications'
  }));

  const allItems = [...defaultItems, ...projectItems, ...allSkills, ...certItems];

  const filtered = query.trim() === ''
    ? defaultItems
    : allItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  const scrollTo = (hash: string) => {
    soundFx.playClick();
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-dark-surface border border-white/15 rounded-2xl shadow-2xl overflow-hidden glass-card-glow"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-dark-bg/60">
          <Search className="w-4 h-4 text-brand-blue shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, project name, or skill (e.g. Java, SlideAI, Resume)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 rounded-md text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-[360px] overflow-y-auto space-y-1">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => {
                  soundFx.playHover();
                  setSelectedIndex(idx);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm transition-colors ${
                  isSelected
                    ? 'bg-brand-blue/15 text-brand-blue border border-brand-blue/30 font-medium'
                    : 'text-slate-300 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {item.category}
                </span>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs font-mono">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate with mouse or enter</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400">ESC to exit</kbd>
        </div>
      </div>
    </div>
  );
};
