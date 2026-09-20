import React from 'react';
import { 
  Coffee, 
  Layers, 
  Server, 
  Cpu, 
  Terminal, 
  Database, 
  Layout, 
  Palette, 
  Atom, 
  FileCode, 
  GitBranch, 
  Cloud,
  Table,
  Workflow
} from 'lucide-react';
import { PythonIcon } from './Icons';

export const Skills: React.FC = () => {
  const usingNow = [
    { name: "JAVA", icon: <Coffee className="w-8 h-8 text-black" />, desc: "Core OOP, Backend Services" },
    { name: "REACT", icon: <Atom className="w-8 h-8 text-black" />, desc: "Reactive UI, State Hooks" },
    { name: "NODE.JS", icon: <Server className="w-8 h-8 text-black" />, desc: "Asynchronous Runtime" },
    { name: "EXPRESS", icon: <Cpu className="w-8 h-8 text-black" />, desc: "RESTful API Endpoints" },
    { name: "PYTHON", icon: <PythonIcon className="w-8 h-8 text-black" />, desc: "Data & Automation Logic" },
    { name: "JAVASCRIPT", icon: <FileCode className="w-8 h-8 text-black" />, desc: "Modern ES6+ Syntax" },
    { name: "MONGODB", icon: <Layers className="w-8 h-8 text-black" />, desc: "NoSQL Document Store" },
    { name: "MYSQL", icon: <Table className="w-8 h-8 text-black" />, desc: "Relational ACID DBMS" },
    { name: "SQL", icon: <Database className="w-8 h-8 text-black" />, desc: "Complex Querying & Joins" },
    { name: "HTML5", icon: <Layout className="w-8 h-8 text-black" />, desc: "Semantic Web Structure" },
    { name: "CSS3 / TAILWIND", icon: <Palette className="w-8 h-8 text-black" />, desc: "Responsive Design Systems" },
    { name: "GIT / GITHUB", icon: <GitBranch className="w-8 h-8 text-black" />, desc: "Version Control & Sync" }
  ];

  const learning = [
    { name: "AWS CLOUD", icon: <Cloud className="w-7 h-7 text-black" /> },
    { name: "TYPESCRIPT", icon: <FileCode className="w-7 h-7 text-black" /> },
    { name: "NEXT.JS", icon: <Layers className="w-7 h-7 text-black" /> },
    { name: "SYSTEM DESIGN", icon: <Workflow className="w-7 h-7 text-black" /> },
    { name: "DOCKER / DEVOPS", icon: <Terminal className="w-7 h-7 text-black" /> }
  ];

  const otherSkills = [
    "RESTful APIs Architecture",
    "Object-Oriented Programming (OOPs)",
    "Database Indexing & Normalization",
    "Agile Collaboration & Code Review",
    "Data Structures & Algorithms (DSA)",
    "API Testing & Payload Verification",
    "English (Professional) & Hindi (Native)"
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 bg-[#ffffff] text-black border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        
        {/* Boxed Section Title Badge */}
        <div className="inline-block border-[3px] border-black px-10 py-2.5 tracking-[0.3em] font-extrabold text-sm sm:text-base uppercase bg-transparent text-black mb-6">
          SKILLS
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-neutral-500 max-w-xl mx-auto mb-8">
          Verified Core Competencies &amp; Technical Stack
        </p>

        {/* Editorial Separator Line */}
        <div className="flex items-center justify-center max-w-xs mx-auto mb-16">
          <div className="flex-1 h-[1px] bg-black opacity-25" />
          <span className="px-3 text-xs text-neutral-400 font-mono">◆</span>
          <div className="flex-1 h-[1px] bg-black opacity-25" />
        </div>

        {/* 1. USING NOW */}
        <div className="mb-20 text-left">
          <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-600 mb-8 pb-3 border-b-2 border-black inline-block">
            USING NOW:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {usingNow.map((skill, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center justify-center p-6 bg-[#f8f9fa] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 text-center group"
              >
                <div className="mb-3 transform group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <span className="font-display font-extrabold text-xs sm:text-sm tracking-wider uppercase text-black">
                  {skill.name}
                </span>
                <span className="text-[10px] text-neutral-500 font-medium mt-1">
                  {skill.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. LEARNING / EXPLORING */}
        <div className="mb-20 text-left">
          <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-600 mb-8 pb-3 border-b-2 border-black inline-block">
            LEARNING / EXPLORING:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {learning.map((skill, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center justify-center p-5 bg-[#f8f9fa] border-2 border-neutral-400 hover:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] transition-all text-center"
              >
                <div className="mb-2 text-neutral-800">
                  {skill.icon}
                </div>
                <span className="font-display font-bold text-xs tracking-wider uppercase text-neutral-900">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. OTHER SKILLS / STRENGTHS */}
        <div className="text-left">
          <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-600 mb-8 pb-3 border-b-2 border-black inline-block">
            OTHER SKILLS &amp; PROFICIENCIES:
          </h3>

          <div className="flex flex-wrap gap-3">
            {otherSkills.map((skill, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 bg-white border-2 border-black font-semibold text-xs tracking-wider uppercase text-neutral-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
