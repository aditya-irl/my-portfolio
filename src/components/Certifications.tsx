import React from 'react';
import { certifications } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { HackerRankIcon, PythonIcon } from './Icons';
import { 
  Award, 
  ShieldCheck, 
  Layers, 
  Cloud,
  Coffee,
  Database,
  ExternalLink
} from 'lucide-react';

export const Certifications: React.FC = () => {
  const getCertIcon = (id: string) => {
    if (id.includes('python')) {
      return (
        <div className="relative">
          <HackerRankIcon className="w-6 h-6 text-emerald-400" />
          <div className="absolute -bottom-1 -right-1 bg-dark-bg rounded-full p-0.5 border border-white/10">
            <PythonIcon className="w-2.5 h-2.5 text-yellow-400" />
          </div>
        </div>
      );
    }
    if (id.includes('java-hackerrank')) {
      return (
        <div className="relative">
          <HackerRankIcon className="w-6 h-6 text-emerald-400" />
          <div className="absolute -bottom-1 -right-1 bg-dark-bg rounded-full p-0.5 border border-white/10">
            <Coffee className="w-2.5 h-2.5 text-amber-400" />
          </div>
        </div>
      );
    }
    if (id.includes('sql-hackerrank')) {
      return (
        <div className="relative">
          <HackerRankIcon className="w-6 h-6 text-emerald-400" />
          <div className="absolute -bottom-1 -right-1 bg-dark-bg rounded-full p-0.5 border border-white/10">
            <Database className="w-2.5 h-2.5 text-sky-400" />
          </div>
        </div>
      );
    }
    if (id.includes('jpmorgan')) return <Layers className="w-6 h-6 text-blue-400" />;
    return <Cloud className="w-6 h-6 text-amber-400" />;
  };

  return (
    <section id="certifications" className="relative py-24 sm:py-32 bg-dark-bg border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Industry Certifications</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Certifications &amp; Training
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Individual verified problem-solving assessments, industry corporate simulations, and cloud foundational credentials.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-brand-blue/40 transition-colors">
                    {getCertIcon(cert.id)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-brand-blue font-semibold uppercase tracking-wider">
                      {cert.issuer}
                    </span>
                    {cert.technology && (
                      <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded">
                        {cert.technology}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-brand-blue transition-colors">
                    {cert.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {cert.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[10px] font-mono text-slate-400 border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Verification Note & Link */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px] text-slate-500">
                  {cert.badgeCode}
                </span>

                {cert.linkUrl ? (
                  <a
                    href={cert.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-white transition-colors"
                  >
                    <span>View Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-emerald-400 font-medium">
                    {cert.verificationNote}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
