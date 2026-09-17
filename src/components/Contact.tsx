import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { LinkedInIcon } from './Icons';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setIsSubmitting(true);

    // -------------------------------------------------------------------------------------
    // 💡 HOW TO CONNECT TO A REAL EMAIL DISPATCH SERVICE (Optional):
    // You can easily plug in EmailJS, Formspree, or Resend here:
    // Example with Formspree / Fetch:
    // await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    // -------------------------------------------------------------------------------------
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      soundFx.playSuccess();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }, 800);
  };

  const copyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-dark-bg border-t border-white/[0.04] overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-brand-indigo/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Communication Channel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Let's Build Something Exceptional
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Open for software engineering opportunities, full-stack web platforms, Java backend engineering, and technical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Verified Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-display font-bold text-white">
                Contact Coordinates
              </h3>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">Direct Email</span>
                      <a 
                        href={`mailto:${personalInfo.email}`} 
                        className="text-xs sm:text-sm font-medium text-white hover:text-brand-blue transition-colors break-all"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn Box */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-blue-500/30 flex items-center justify-between gap-3 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-600/20">
                      <LinkedInIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">LinkedIn Network</span>
                      <span className="text-xs sm:text-sm font-medium text-white group-hover:text-brand-blue transition-colors">
                        aditya-kumar-13984b31a
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* Location Box */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Engineering Base</span>
                    <span className="text-xs sm:text-sm font-medium text-white">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active status: Available for internships, freelance, &amp; SWE roles</span>
              </div>
            </div>

          </div>

          {/* Right Column: Functional Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card glass-card-glow rounded-3xl p-6 sm:p-10 border border-white/10 relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, <span className="text-white font-semibold">{formData.name}</span>. I will review your message and respond directly to <span className="text-brand-blue font-mono">{formData.email}</span>.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 transition-colors"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                      className="px-5 py-2.5 rounded-xl bg-brand-blue text-dark-bg text-xs font-bold transition-colors"
                    >
                      Open in Email App
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <h3 className="text-lg font-display font-bold text-white">
                      Send a Message
                    </h3>
                    <span className="text-xs font-mono text-slate-500">
                      Standard response &lt; 24h
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-mono text-slate-300">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Morgan"
                        className="w-full bg-dark-surface/90 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-blue/70 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono text-slate-300">
                        Your Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. alex@company.com"
                        className="w-full bg-dark-surface/90 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-blue/70 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-mono text-slate-300">
                      Subject / Project Scope *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineer Opportunity / Project Inquiry"
                      className="w-full bg-dark-surface/90 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-blue/70 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-mono text-slate-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your team, tech stack, or the solution you would like to build..."
                      className="w-full bg-dark-surface/90 border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-blue/70 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => soundFx.playHover()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-violet text-white text-sm font-semibold shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/35 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Payload...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
