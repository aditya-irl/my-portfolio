import React from 'react';
import { educationList } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-24 sm:py-32 bg-dark-bg border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Foundations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Education &amp; Credentials
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Formal computer science degree and secondary educational background verified from academic records.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id}
              onMouseEnter={() => soundFx.playHover()}
              className={`glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative ${
                idx === 0 ? 'border-brand-blue/30 glass-card-glow' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium ${
                    idx === 0 
                      ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' 
                      : 'bg-white/[0.04] text-slate-300 border border-white/10'
                  }`}>
                    {edu.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {edu.duration}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-display font-bold text-white leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-slate-300">
                    {edu.institution}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{edu.location}</span>
                </div>

                {edu.highlights && (
                  <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                    {edu.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {idx === 0 && (
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">Undergraduate Degree</span>
                  <span className="text-brand-blue font-semibold">B.Tech (CSE)</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
