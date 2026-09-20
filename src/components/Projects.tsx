import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { soundFx } from '../utils/sound';
import { GitHubIcon } from './Icons';
import { 
  CheckCircle2, 
  X, 
  ExternalLink,
  MessageSquare,
  Eye,
  Layers,
  Terminal
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'ALL' },
    { id: 'Full-Stack', label: 'FULL-STACK' },
    { id: 'Enterprise & Systems', label: 'JAVA / BACKEND' },
    { id: 'AI & Utilities', label: 'AI & UTILITIES' },
    { id: 'Commercial', label: 'COMMERCIAL' },
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

  const scrollToContact = () => {
    soundFx.playClick();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 bg-black text-white border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        
        {/* Boxed Section Title Badge */}
        <div className="inline-block border-[3px] border-white px-10 py-2.5 tracking-[0.3em] font-extrabold text-sm sm:text-base uppercase bg-transparent text-white mb-6">
          PORTFOLIO
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-neutral-400 max-w-xl mx-auto mb-8">
          Selected Production Platforms &bull; Commercial Systems &bull; AI Utilities
        </p>

        {/* Editorial Separator Line */}
        <div className="flex items-center justify-center max-w-xs mx-auto mb-12">
          <div className="flex-1 h-[1px] bg-white opacity-25" />
          <span className="px-3 text-xs text-neutral-400 font-mono">◆</span>
          <div className="flex-1 h-[1px] bg-white opacity-25" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 border-2 ${
                selectedCategory === cat.id
                  ? 'bg-white text-black border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]'
                  : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-500 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Large Visual Gallery Grid matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-[#0e0e10] border-2 border-neutral-800 hover:border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Project Top Art / Preview Panel */}
              <div className="relative aspect-[16/10] bg-[#141416] border-b-2 border-neutral-800 flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black opacity-90" />
                
                {/* Decorative Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                {/* Project Number / Category Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-white border border-neutral-700 bg-black/80 px-2 py-0.5 uppercase">
                    0{idx + 1} // {project.category}
                  </span>
                </div>

                {/* Center Visual Mockup Graphic */}
                <div className="relative z-10 text-center space-y-2 transform group-hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 mx-auto border border-neutral-700 bg-black flex items-center justify-center text-white">
                    {project.category.includes('Java') || project.category.includes('Enterprise') ? (
                      <Terminal className="w-6 h-6" />
                    ) : (
                      <Layers className="w-6 h-6" />
                    )}
                  </div>
                  <span className="font-display font-black text-sm tracking-wider uppercase text-white block">
                    {project.title.split('–')[0].split('-')[0]}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 block tracking-widest">
                    {project.metrics || 'PRODUCTION ARCHITECTURE'}
                  </span>
                </div>
              </div>

              {/* Project Body Info */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight group-hover:text-neutral-200 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-medium tracking-wide leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-900">
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => openProjectModal(project)}
                      className="flex-1 py-2.5 bg-white text-black border-2 border-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-black text-white border-2 border-neutral-700 hover:border-white transition-colors"
                        title="GitHub Repository"
                        aria-label="GitHub Repository"
                      >
                        <GitHubIcon className="w-4 h-4" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-black text-white border-2 border-neutral-700 hover:border-white transition-colors"
                        title="Live Site"
                        aria-label="Live Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner for Live Demo */}
        <div className="mt-16 p-8 border-2 border-white/20 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-semibold block">
              &bull; LIVE SANDBOX &amp; DEMOS
            </span>
            <h4 className="text-lg sm:text-xl font-display font-bold text-white uppercase">
              Looking for a custom build or interactive walkthrough?
            </h4>
            <p className="text-xs text-neutral-400 max-w-xl font-normal">
              Private sandbox walkthroughs, institutional deployments, and architecture reviews are available on request.
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-white text-black border-2 border-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all whitespace-nowrap flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact for Demo</span>
          </button>
        </div>

      </div>

      {/* Deep-Dive Project Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0f0f11] border-2 border-white text-white p-6 sm:p-10 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b-2 border-neutral-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 border border-neutral-700 px-2 py-0.5 inline-block">
                  {activeProjectModal.category} &bull; {activeProjectModal.type}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  {activeProjectModal.title}
                </h3>
                <p className="text-xs text-neutral-300 font-medium">
                  {activeProjectModal.tagline}
                </p>
              </div>

              <button
                onClick={closeProjectModal}
                className="p-2 border border-neutral-700 text-neutral-400 hover:text-white hover:border-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
                OVERVIEW
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeProjectModal.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
                ENGINEERING DELIVERABLES &amp; ACHIEVEMENTS
              </h4>
              <div className="space-y-2">
                {activeProjectModal.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-black border border-neutral-800 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Details */}
            {activeProjectModal.architectureDetails && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
                  SYSTEM ARCHITECTURE
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {activeProjectModal.architectureDetails.frontend && (
                    <div className="p-3 bg-black border border-neutral-800">
                      <span className="text-neutral-500 font-mono block mb-1 uppercase text-[10px]">Frontend</span>
                      <span className="text-neutral-200">{activeProjectModal.architectureDetails.frontend}</span>
                    </div>
                  )}
                  {activeProjectModal.architectureDetails.backend && (
                    <div className="p-3 bg-black border border-neutral-800">
                      <span className="text-neutral-500 font-mono block mb-1 uppercase text-[10px]">Backend</span>
                      <span className="text-neutral-200">{activeProjectModal.architectureDetails.backend}</span>
                    </div>
                  )}
                  {activeProjectModal.architectureDetails.database && (
                    <div className="p-3 bg-black border border-neutral-800">
                      <span className="text-neutral-500 font-mono block mb-1 uppercase text-[10px]">Database</span>
                      <span className="text-neutral-200">{activeProjectModal.architectureDetails.database}</span>
                    </div>
                  )}
                  {activeProjectModal.architectureDetails.keyInnovation && (
                    <div className="p-3 bg-black border border-neutral-800">
                      <span className="text-emerald-400 font-mono block mb-1 uppercase text-[10px]">Innovation</span>
                      <span className="text-neutral-200">{activeProjectModal.architectureDetails.keyInnovation}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
                TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProjectModal.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-black border border-neutral-700 text-xs font-mono text-neutral-200 uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-neutral-800">
              <div className="flex flex-wrap items-center gap-3">
                {activeProjectModal.liveUrl && (
                  <a
                    href={activeProjectModal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white text-black border-2 border-white text-xs font-bold tracking-wider uppercase hover:bg-black hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <span>Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {activeProjectModal.githubUrl && (
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-black text-white border-2 border-neutral-700 hover:border-white text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    closeProjectModal();
                    scrollToContact();
                  }}
                  className="px-5 py-2.5 bg-black text-white border-2 border-emerald-500/50 hover:border-emerald-400 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Contact for Demo</span>
                </button>
              </div>

              <button
                onClick={closeProjectModal}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-300"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
