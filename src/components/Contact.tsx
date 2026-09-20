import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { MapPin, Send, CheckCircle2, Copy, Check, AlertCircle } from 'lucide-react';
import { LinkedInIcon, InstagramIcon } from './Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formPayload = new FormData();
    formPayload.append("access_key", "59e39b8a-f7d9-4c5f-8bce-e65ac0a21b8d");
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone || "Not provided");
    formPayload.append("message", formData.message);
    formPayload.append("subject", `New Portfolio Contact Message from ${formData.name}`);
    formPayload.append("from_name", formData.name);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload
      });

      const data = await response.json();

      if (response.ok && (data.success || data.message === "Form submitted successfully")) {
        setSubmitted(true);
        soundFx.playSuccess();
      } else {
        setErrorMessage(data.message || "Failed to submit message. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error occurred. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#f8f9fa] text-black border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        
        {/* Boxed Section Title Badge */}
        <div className="inline-block border-[3px] border-black px-10 py-2.5 tracking-[0.3em] font-extrabold text-sm sm:text-base uppercase bg-transparent text-black mb-6">
          CONTACT
        </div>

        {/* Centered Subtitle */}
        <p className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-neutral-500 max-w-xl mx-auto mb-8">
          Have a project in mind, looking to hire, or want to discuss engineering collaboration?
        </p>

        {/* Editorial Separator Line */}
        <div className="flex items-center justify-center max-w-xs mx-auto mb-16">
          <div className="flex-1 h-[1px] bg-black opacity-25" />
          <span className="px-3 text-xs text-neutral-400 font-mono">◆</span>
          <div className="flex-1 h-[1px] bg-black opacity-25" />
        </div>

        {/* Minimalist Editorial Contact Form matching Reference */}
        <div className="max-w-2xl mx-auto text-left mb-16">
          {submitted ? (
            <div className="p-8 bg-white border-2 border-black text-center space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
              <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-black">
                Message Transmitted Successfully
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600">
                Thank you for reaching out, <span className="font-bold text-black">{formData.name}</span>. I will respond directly to <span className="font-mono text-black font-semibold">{formData.email}</span>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', message: '' });
                }}
                className="px-6 py-2.5 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form id="form" onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border-2 border-red-600 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ENTER YOUR NAME*"
                  className="editorial-input"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ENTER YOUR EMAIL*"
                  className="editorial-input"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="PHONE NUMBER"
                  className="editorial-input"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="YOUR MESSAGE*"
                  className="editorial-input resize-none"
                />
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-3.5 bg-black text-white border-2 border-black text-xs font-extrabold tracking-[0.25em] uppercase hover:bg-transparent hover:text-black transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>SUBMIT</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Direct Contact Coordinates Strip */}
        <div className="pt-10 border-t border-neutral-300 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">Direct Mail</span>
            <div className="flex items-center justify-center gap-1.5">
              <a href={`mailto:${personalInfo.email}`} className="text-xs font-bold text-black hover:underline truncate max-w-[150px]">
                {personalInfo.email}
              </a>
              <button onClick={copyEmail} className="p-1 hover:text-neutral-500" title="Copy">
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">Location</span>
            <span className="text-xs font-bold text-black flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {personalInfo.location}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">LinkedIn</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-black hover:underline flex items-center justify-center gap-1"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>aditya-kumar</span>
            </a>
          </div>

          {personalInfo.instagram && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 block">Instagram</span>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-black hover:underline flex items-center justify-center gap-1"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@aaditya_irl_</span>
              </a>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
