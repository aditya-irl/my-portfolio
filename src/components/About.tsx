import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { 
  Code2, 
  ShieldCheck, 
  Terminal, 
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Code2,
      title: "Java Backend & OOP Architecture",
      desc: "Deep focus on clean object-oriented paradigms, backend modularity, and optimized database query execution gained through hands-on industry internship experience.",
      accent: "text-brand-blue border-brand-blue/30 bg-brand-blue/10",
      skills: ["Java", "OOPs", "Relational DBMS", "SQL", "Optimized Query Logic"]
    },
    {
      icon: Layers,
      title: "Production Full-Stack Web Platforms",
      desc: "Building complete web applications using React.js, Node.js, Express, and modern database backends (MongoDB & MySQL), delivering real-world commercial and campus solutions.",
      accent: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"]
    },
    {
      icon: Sparkles,
      title: "AI-Powered Automation Utilities",
      desc: "Architecting purpose-built tools like SlideAI that leverage intelligent text parsing and segmentation algorithms to drastically reduce preparation overhead by >70%.",
      accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      skills: ["AI Integration", "Document Parsing", "Vercel", "Automation"]
    }
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-dark-bg border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>Developer Profile &amp; Core Strengths</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Engineering with Purpose &amp; Precision
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Undergraduate software engineer pairing strong algorithmic problem-solving with production web and backend execution.
          </p>
        </div>

        {/* Top Summary Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden glass-card-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-brand-blue animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-blue font-semibold">
                  Professional Identity
                </span>
              </div>
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal">
                "{personalInfo.summary}"
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
                <div>
                  <span className="block text-xs font-mono text-slate-400 uppercase">Status</span>
                  <span className="text-sm font-semibold text-white">3rd-Year B.Tech CSE</span>
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 uppercase">Institution</span>
                  <span className="text-sm font-semibold text-white">Accurate Inst. of Mgmt &amp; Tech</span>
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 uppercase">Core Location</span>
                  <span className="text-sm font-semibold text-white">Greater Noida, India</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics & Verified Badges */}
            <div className="lg:col-span-4 bg-dark-surface/90 rounded-2xl p-6 border border-white/10 space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Engineering Highlights
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">
                    <strong className="text-white">HackerRank Certified</strong> in Java, SQL &amp; Python problem-solving
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">
                    <strong className="text-white">J.P. Morgan Chase &amp; Co.</strong> Software Engineering Simulation (Forage)
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">
                    <strong className="text-white">AWS Cloud Practitioner</strong> Foundational Training
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">
                    <strong className="text-white">5 Production &amp; Commercial</strong> Deployed Platforms
                  </span>
                </div>
              </div>

              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="mt-4 flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-white/10"
              >
                <span>Browse Project Case Studies</span>
                <ArrowUpRight className="w-4 h-4 text-brand-blue" />
              </a>
            </div>

          </div>
        </div>

        {/* 3 Core Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => soundFx.playHover()}
                className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${pillar.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/[0.06]">
                  {pillar.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] text-[11px] font-mono text-slate-300 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
