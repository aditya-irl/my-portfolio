import React from 'react';
import { experiences } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-dark-bg border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Industry Experience &amp; Internships</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Work History &amp; Internships
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Hands-on technical engineering and organizational execution verified strictly from professional engagements.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              onMouseEnter={() => soundFx.playHover()}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-dark-bg border-2 border-brand-blue flex items-center justify-center group-hover:scale-125 group-hover:bg-brand-blue transition-all duration-200">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:bg-dark-bg"></div>
              </div>

              {/* Experience Card */}
              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 space-y-6">
                
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
                        {exp.type}
                      </span>
                      {exp.location && (
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <MapPin className="w-3 h-3 text-brand-blue" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-brand-blue transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-4 h-4 text-brand-blue" />
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300 shrink-0 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="space-y-3">
                  {exp.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Skills used */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.08]">
                  <span className="text-xs font-mono text-slate-400 mr-2">Key Competencies:</span>
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] text-xs font-mono text-slate-300 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
