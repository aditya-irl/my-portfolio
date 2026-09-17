import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { soundFx } from '../utils/sound';
import { GitHubIcon } from './Icons';
import { 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Code2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'AI & Utilities', label: 'AI & Utilities' },
    { id: 'Full-Stack', label: 'Full-Stack Web' },
    { id: 'Enterprise & Systems', label: 'Enterprise / Java' },
    { id: 'Commercial', label: 'Commercial Client' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const openProjectModal = (proj: Project) => {
    soundFx.playClick();
    setActiveProjectModal(proj);
  };

  const closeProjectModal = () => {
    soundFx.playClick();
    setActiveProjectModal(null);
  };

  const handleContactClick = () => {
    soundFx.playClick();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-dark-bg border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono">
              <Code2 className="w-3.5 h-3.5" />
              <span>Production &amp; Commercial Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Featured Case Studies &amp; Projects
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Production-grade freelance platforms, AI automation utilities, and enterprise database systems built with modern engineering standards.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-blue text-dark-bg font-bold shadow-lg shadow-brand-blue/30'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
              }`}
            >
              {cat.label} {cat.id === 'all' ? `(${projects.length})` : ''}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative group overflow-hidden border border-white/10"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/[0.05] border border-white/10 text-slate-300">
                    {project.type}
                  </span>
                  {project.metrics && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-brand-blue/10 text-brand-blue border border-brand-blue/20 font-medium">
                      {project.metrics}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-blue transition-colors mb-2">
                  {project.title}
                </h3>
                
                <p className="text-xs text-brand-blue/90 font-medium mb-3">
                  {project.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>

                {/* Key Bullet Preview */}
                <div className="space-y-2 mb-6">
                  {project.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div>
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4 pt-4 border-t border-white/[0.08]">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[10px] font-mono text-slate-400 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-2 mb-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue/15 hover:bg-brand-blue/25 border border-brand-blue/30 text-xs font-semibold text-brand-blue transition-colors flex-1 justify-center"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactClick();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-xs font-medium text-emerald-400 transition-colors flex-1 justify-center group/btn"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Contact for Demo</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-200 transition-colors flex-1 justify-center"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                </div>

                {/* Case Study Action Button */}
                <button
                  onClick={() => openProjectModal(project)}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/[0.04] group-hover:bg-brand-blue group-hover:text-dark-bg text-xs font-semibold text-white transition-all shadow-sm"
                >
                  <span>Inspect Case Study &amp; Architecture</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Explicit Mention Below Project: Contact for Demo */}
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live Walkthrough Available</span>
                  </span>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactClick();
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/demo"
                  >
                    <span>Contact for Demo</span>
                    <ArrowRight className="w-3 h-3 group-hover/demo:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================= */}
        {/* 📢 BOTTOM CALLOUT: CONTACT FOR LIVE DEMO                      */}
        {/* ============================================================= */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-blue/10 via-brand-indigo/10 to-emerald-500/10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left glass-card-glow">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Live Demonstrations &amp; Source Access
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-display font-bold text-white">
              Interested in a live interactive demo or custom platform build?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Private sandbox walkthroughs, institutional deployments, and custom feature demonstrations are available directly upon request.
            </p>
          </div>

          <a
            href="#contact"
            onClick={handleContactClick}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all whitespace-nowrap flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact for Demo</span>
          </a>
        </div>

      </div>

      {/* Deep-Dive Project Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-surface border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue border border-brand-blue/20 text-xs font-mono">
                    {activeProjectModal.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeProjectModal.type}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {activeProjectModal.title}
                </h3>
                <p className="text-sm text-brand-blue mt-1">
                  {activeProjectModal.tagline}
                </p>
              </div>

              <button
                onClick={closeProjectModal}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Project Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeProjectModal.description}
              </p>
            </div>

            {/* Key Features & Achievements from Resume */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Key Features &amp; Engineering Deliverables
              </h4>
              <div className="space-y-2.5">
                {activeProjectModal.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Details Grid */}
            {activeProjectModal.architectureDetails && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  System Architecture Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {activeProjectModal.architectureDetails.frontend && (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-500 font-mono block mb-1">Frontend Layer</span>
                      <span className="text-slate-200">{activeProjectModal.architectureDetails.frontend}</span>
                    </div>
                  )}
                  {activeProjectModal.architectureDetails.backend && (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-500 font-mono block mb-1">Backend &amp; API Layer</span>
                      <span className="text-slate-200">{activeProjectModal.architectureDetails.backend}</span>
                    </div>
                  )}
                  {activeProjectModal.architectureDetails.database && (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-500 font-mono block mb-1">Database &amp; Storage</span>
                      <span className="text-slate-200">{activeProjectModal.architectureDetails.database}</span>
                    </div>
                  )}
                  {activeProjectModal.architectureDetails.keyInnovation && (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-brand-blue font-mono block mb-1">Core Innovation</span>
                      <span className="text-slate-200">{activeProjectModal.architectureDetails.keyInnovation}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Technologies Badges */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProjectModal.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-white/[0.04] text-xs font-mono text-slate-200 border border-white/[0.08]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Demo & Walkthrough Notice in Modal */}
            <div className="p-4 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    Interactive Walkthrough &amp; Sandbox Access
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Looking for a live sandbox demonstration, code review, or custom deployment of this system?
                </p>
              </div>
              <a
                href="#contact"
                onClick={() => {
                  closeProjectModal();
                  handleContactClick();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-bg text-xs font-bold shadow-md shadow-emerald-500/20 transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact for Demo</span>
              </a>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-2">
                {activeProjectModal.liveUrl && (
                  <a
                    href={activeProjectModal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-blue text-dark-bg text-xs font-bold shadow-md shadow-brand-blue/20 hover:bg-brand-blue/90 transition-colors"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {activeProjectModal.githubUrl && (
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 transition-colors border border-white/10"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={() => {
                    closeProjectModal();
                    handleContactClick();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-semibold text-emerald-400 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact for Demo</span>
                </a>
              </div>

              <button
                onClick={closeProjectModal}
                className="px-5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-slate-300 transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
