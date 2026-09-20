import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Layout, Server, Cpu, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const services = [
    {
      icon: Layout,
      title: "DESIGN & FRONTEND",
      desc: "Creating responsive, modern web interfaces with React.js, TypeScript, and Tailwind CSS. Crafting intuitive user experiences, single-page architectures, and dynamic dashboards."
    },
    {
      icon: Server,
      title: "DEVELOPMENT & BACKEND",
      desc: "Architecting modular Java backend pipelines, enterprise object-oriented workflows, robust Express.js RESTful APIs, and optimized query execution logic."
    },
    {
      icon: Cpu,
      title: "MAINTENANCE & SYSTEMS",
      desc: "Structuring relational and NoSQL database schemas (MySQL, MongoDB), handling AWS cloud deployments, Git version control workflows, and code reliability."
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#f8f9fa] text-black border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        
        {/* Boxed Section Title Badge */}
        <div className="inline-block border-[3px] border-black px-10 py-2.5 tracking-[0.3em] font-extrabold text-sm sm:text-base uppercase bg-transparent text-black mb-6">
          ABOUT ME
        </div>

        {/* Centered Editorial Subtitle */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-neutral-500 max-w-xl mx-auto mb-10">
          Undergraduate Computer Science Engineer &bull; Full Stack &amp; Java Developer
        </p>

        {/* Editorial Separator Line */}
        <div className="flex items-center justify-center max-w-xs mx-auto mb-12">
          <div className="flex-1 h-[1px] bg-black opacity-25" />
          <span className="px-3 text-xs text-neutral-400 font-mono">◆</span>
          <div className="flex-1 h-[1px] bg-black opacity-25" />
        </div>

        {/* Bio Text */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
            {personalInfo.summary}
          </p>
        </div>

        {/* 3 Column Service / Competency Breakdown matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 text-center">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="flex flex-col items-center space-y-4 p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                <div className="w-14 h-14 border-2 border-black flex items-center justify-center text-black bg-[#f8f9fa] mb-2">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-sm sm:text-base font-display font-extrabold tracking-[0.15em] text-black uppercase">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Verified Credentials Summary Strip */}
        <div className="mt-16 pt-10 border-t border-neutral-300 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-4 bg-white border border-neutral-200">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">Academics</span>
            <span className="text-xs sm:text-sm font-bold text-black block">B.Tech in CSE (3rd Year)</span>
            <span className="text-[11px] text-neutral-600">Accurate Institute of Mgmt &amp; Tech</span>
          </div>

          <div className="p-4 bg-white border border-neutral-200">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">Industry Experience</span>
            <span className="text-xs sm:text-sm font-bold text-black block">Java Developer Intern</span>
            <span className="text-[11px] text-neutral-600">Skillnexis &bull; Backend Architecture</span>
          </div>

          <div className="p-4 bg-white border border-neutral-200">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">Verified Badges</span>
            <span className="text-xs sm:text-sm font-bold text-black block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              HackerRank (Java, SQL, Python)
            </span>
            <span className="text-[11px] text-neutral-600">J.P. Morgan SWE Simulation</span>
          </div>
        </div>

      </div>
    </section>
  );
};
