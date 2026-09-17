import React from 'react';
import { personalInfo, skillCategories, projects, experiences, educationList, certifications } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const handleCopyText = () => {
    soundFx.playClick();
    const resumeText = `
${personalInfo.name}
${personalInfo.role}
${personalInfo.location} • ${personalInfo.email} • ${personalInfo.linkedin}

PROFESSIONAL SUMMARY
${personalInfo.summary}

EDUCATION
${educationList.map(e => `${e.institution} - ${e.degree} (${e.duration}) - ${e.status}`).join('\n')}

TECHNICAL SKILLS
${skillCategories.map(c => `${c.title}: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

EXPERIENCE & INTERNSHIPS
${experiences.map(exp => `${exp.role} - ${exp.company} (${exp.duration})\n${exp.points.map(p => `• ${p}`).join('\n')}`).join('\n\n')}

FEATURED PROJECTS
${projects.filter(p => p.id !== 'water-brand-website').map(p => `${p.title} | ${p.technologies.join(', ')}\n${p.highlights.map(h => `• ${h}`).join('\n')}`).join('\n\n')}

CERTIFICATIONS & TRAINING
${certifications.map(c => `• ${c.title} (${c.issuer}): ${c.description}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Container */}
      <div 
        className="relative w-full max-w-4xl bg-dark-surface border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Action Bar (Sticky, hidden in print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-dark-bg/90 border-b border-white/10 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-blue" />
            <h3 className="text-base font-display font-bold text-white">
              Official Resume Document
            </h3>
            <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
              Verified Source of Truth
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors border border-white/10"
              title="Copy entire resume text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Text!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-brand-blue text-dark-bg text-xs font-bold shadow-lg shadow-brand-blue/25 hover:bg-brand-blue/90 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors ml-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Viewport */}
        <div className="overflow-y-auto p-6 sm:p-12 bg-white text-slate-900 font-sans selection:bg-sky-200 selection:text-slate-900 leading-normal print:p-0">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Resume Header */}
            <div className="text-center border-b border-slate-300 pb-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
                {personalInfo.name}
              </h1>
              <p className="text-base font-semibold text-slate-800 mt-1">
                {personalInfo.role}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
                <span>{personalInfo.location}</span>
                <span>•</span>
                <a href={`mailto:${personalInfo.email}`} className="text-blue-700 hover:underline">
                  {personalInfo.email}
                </a>
                <span>•</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                  linkedin.com/in/aditya-kumar-13984b31a
                </a>
              </div>
            </div>

            {/* PROFESSIONAL SUMMARY */}
            <section className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs text-slate-800 leading-relaxed text-justify">
                {personalInfo.summary}
              </p>
            </section>

            {/* EDUCATION */}
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
                EDUCATION
              </h2>
              
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Accurate Institute of Management and Technology, Greater Noida</span>
                    <span className="font-normal text-slate-700">2024 – 2028 (Expected)</span>
                  </div>
                  <div className="italic text-slate-700">
                    Bachelor of Technology (B.Tech) in Computer Science and Engineering
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">
                    Green Valley Public School, Dibiyapur, Auraiya, UP <span className="font-normal italic">— Senior Secondary (Class XII)</span>
                  </span>
                  <span className="text-slate-600 font-medium">Completed</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">
                    RBSRS Public School, Saurikh, Kannauj, UP <span className="font-normal italic">— Secondary (Class X)</span>
                  </span>
                  <span className="text-slate-600 font-medium">Completed</span>
                </div>
              </div>
            </section>

            {/* TECHNICAL SKILLS */}
            <section className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
                TECHNICAL SKILLS
              </h2>
              <div className="text-xs space-y-1 text-slate-800">
                <div>
                  <strong className="text-slate-900">Languages:</strong> Java, JavaScript (ES6+), C, SQL, HTML5, CSS3
                </div>
                <div>
                  <strong className="text-slate-900">Frameworks &amp; Web:</strong> React.js, Node.js, Express.js, RESTful APIs
                </div>
                <div>
                  <strong className="text-slate-900">Databases:</strong> MongoDB (NoSQL), MySQL / Relational DBMS
                </div>
                <div>
                  <strong className="text-slate-900">Tools &amp; Platforms:</strong> Git, GitHub, Vercel, VS Code, Postman
                </div>
                <div>
                  <strong className="text-slate-900">Core Concepts:</strong> Object-Oriented Programming (OOPs), Data Structures &amp; Algorithms (DSA), Database Management Systems (DBMS)
                </div>
              </div>
            </section>

            {/* EXPERIENCE & INTERNSHIPS */}
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
                EXPERIENCE &amp; INTERNSHIPS
              </h2>

              <div className="space-y-3 text-xs">
                {/* Skillnexis */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Java Developer Intern — <span className="font-normal italic">Skillnexis</span></span>
                    <span className="font-normal text-slate-700">2 Months</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                    <li>Designed and implemented core Java backend modules and object-oriented architectures for application workflows.</li>
                    <li>Constructed database queries and optimized data interaction logic to support scalable data storage and retrieval.</li>
                    <li>Collaborated on code testing, debugging edge cases, and adhering to standard software engineering best practices.</li>
                  </ul>
                </div>

                {/* Edlernity */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>HR Operations Intern — <span className="font-normal italic">Edlernity</span></span>
                    <span className="font-normal text-slate-700">Internship</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                    <li>Streamlined candidate evaluation pipelines by screening profiles and coordinating interview rounds with cross-functional teams.</li>
                    <li>Maintained and managed recruitment tracker spreadsheets, ensuring accurate candidate record management and reporting.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FEATURED PROJECTS */}
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
                FEATURED PROJECTS
              </h2>

              <div className="space-y-3 text-xs">
                {/* SlideAI */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>SlideAI – Automated Question-to-Slide Converter | <span className="font-normal">React.js, Node.js, AI Integration, Vercel</span></span>
                    <span className="font-normal italic text-slate-700">Freelance / Production</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                    <li>Engineered an AI-powered utility that parses question papers and documents, auto-segmenting items into formatted slides.</li>
                    <li>Designed specifically for digital board educators, reducing lecture slide preparation time by over 70%.</li>
                  </ul>
                </div>

                {/* Smart Campus Web Notice Portal */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Smart Campus Web Notice Portal | <span className="font-normal">React.js, Node.js, MongoDB, Express</span></span>
                    <span className="font-normal italic text-slate-700">Freelance / College Project</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                    <li>Developed a centralized, web-based circulars system to replace chaotic WhatsApp group messaging for college departments.</li>
                    <li>Implemented category-based filtering, pinned administrative notices, and structured notification channels for students.</li>
                  </ul>
                </div>

                {/* EdTech Institute Management Platform */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>EdTech Institute Management Platform (ClassPlus Model) | <span className="font-normal">Full-Stack Web App, DBMS</span></span>
                    <span className="font-normal italic text-slate-700">Freelance Project</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                    <li>Built a comprehensive coaching management application facilitating course distribution, student tracking, and batches.</li>
                    <li>Structured backend schemas to handle student progress, administrative controls, and class communication feeds.</li>
                  </ul>
                </div>

                {/* Electronic Store Mobile & Inventory Management System */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Electronic Store Mobile &amp; Inventory Management System | <span className="font-normal">Java / JavaScript, Database Management</span></span>
                    <span className="font-normal italic text-slate-700">Commercial Project</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                    <li>Engineered inventory management software enabling real-time stock monitoring, billing, and sales analytics for retail.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CERTIFICATIONS & TRAINING */}
            <section className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
                CERTIFICATIONS &amp; TRAINING
              </h2>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-800">
                <li>
                  <strong className="text-slate-900">HackerRank Certified:</strong> Java, Python, and SQL certifications verifying core problem-solving proficiency.
                </li>
                <li>
                  <strong className="text-slate-900">J.P. Morgan Chase &amp; Co.:</strong> Software Engineering Job Simulation (Forage) — Completed practical tasks in interface development, live financial data feeds, and perspective analysis.
                </li>
                <li>
                  <strong className="text-slate-900">Cloud Computing:</strong> AWS Certified Cloud Practitioner / Cloud Foundational Training.
                </li>
              </ul>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};
