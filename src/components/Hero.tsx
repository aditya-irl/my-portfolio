import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { LinkedInIcon } from './Icons';
import { 
  ArrowRight, 
  Download, 
  Terminal as TerminalIcon, 
  Code2, 
  Server, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  MapPin, 
  Play, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'java' | 'fullstack' | 'ai' | 'diagnostics'>('java');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[INIT] Java Runtime Engine v21.0.2 - Initialized',
    '[LOAD] Spring / Backend Architecture modules loaded',
    '[OK] PostgreSQL / MongoDB connection pool established',
    '[READY] Ready to architect robust full-stack web solutions.'
  ]);

  // Tagline typing animation states
  const LINE1_PREFIX = "Building ";
  const LINE1_HIGHLIGHT = "Scalable Systems";
  const LINE2_TEXT = "& Modern Web Apps.";
  const TOTAL_CHARS = LINE1_PREFIX.length + LINE1_HIGHLIGHT.length + LINE2_TEXT.length; // 43 chars

  const [charIndex, setCharIndex] = useState(0);
  const [typingState, setTypingState] = useState<'typing' | 'pausing' | 'deleting' | 'restarting'>('typing');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setCharIndex(TOTAL_CHARS);
      }
    }
  }, [TOTAL_CHARS]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCharIndex(TOTAL_CHARS);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    if (typingState === 'typing') {
      if (charIndex < TOTAL_CHARS) {
        // Fast energetic typing: ~25-40ms with 10-15ms subtle jitter
        const baseDelay = 32;
        const jitter = Math.floor(Math.random() * 16) - 8;
        timeoutId = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, Math.max(20, baseDelay + jitter));
      } else {
        setTypingState('pausing');
        timeoutId = setTimeout(() => {
          setTypingState('deleting');
        }, 1500); // 1.5s pause after full sentence completion
      }
    } else if (typingState === 'deleting') {
      if (charIndex > 0) {
        timeoutId = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 16); // Fast swift backspacing ~16ms
      } else {
        setTypingState('restarting');
        timeoutId = setTimeout(() => {
          setTypingState('typing');
        }, 500); // 500ms pause before starting next cycle
      }
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, typingState, prefersReducedMotion, TOTAL_CHARS]);

  const copyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    soundFx.playClick();
    setIsRunning(true);
    setConsoleLogs((prev) => [...prev, `[EXEC] Running simulation for module '${activeTab}'...`]);

    setTimeout(() => {
      if (activeTab === 'java') {
        setConsoleLogs((prev) => [
          ...prev,
          '[JAVA_OOP] Instantiated EnterpriseDataPipeline()',
          '[QUERY] Executing optimized database batch operation (0.004s)',
          '[SUCCESS] Scalable backend workflow verified with 100% integrity.'
        ]);
      } else if (activeTab === 'fullstack') {
        setConsoleLogs((prev) => [
          ...prev,
          '[REACT] Hydrating virtual DOM with modern state hooks',
          '[API] Express.js REST endpoint /api/v1/projects dispatched (200 OK)',
          '[SUCCESS] Full-stack application synchronized successfully.'
        ]);
      } else if (activeTab === 'ai') {
        setConsoleLogs((prev) => [
          ...prev,
          '[SLIDE_AI] Parsing educator document schema...',
          '[AUTO_SEGMENT] Segmenting question items into slide chunks',
          '[METRIC] Lecture slide preparation reduced by >70%.'
        ]);
      } else {
        setConsoleLogs((prev) => [
          ...prev,
          '[DIAGNOSTIC] All 5 production projects online',
          '[SECURITY] Strict CORS & authentication middleware verified',
          '[SYSTEM] Environment fully optimized for enterprise development.'
        ]);
      }
      setIsRunning(false);
      soundFx.playSuccess();
    }, 600);
  };

  const tabSnippets = {
    java: `// Skillnexis Java Backend Service Module
public class ApplicationWorkflowService {
    private final DatabaseInteractionManager dbManager;

    public ApplicationWorkflowService(DatabaseInteractionManager db) {
        this.dbManager = db;
    }

    public CompletableFuture<WorkflowResponse> executeDataPipeline(WorkflowContext ctx) {
        // Optimized database queries for scalable data retrieval
        return CompletableFuture.supplyAsync(() -> {
            var records = dbManager.fetchOptimizedRecords(ctx.getQueryId());
            return new WorkflowResponse(Status.SUCCESS, records);
        });
    }
}`,
    fullstack: `// Smart Campus & EdTech REST Architecture
import express, { Request, Response } from 'express';
import { NoticeModel } from './models/Notice';

export const noticeRouter = express.Router();

// Centralized Circulars & Notification Channel
noticeRouter.get('/circulars', async (req: Request, res: Response) => {
  const { category, priority } = req.query;
  const notices = await NoticeModel.find({ category, pinned: true })
    .sort({ createdAt: -1 })
    .lean();
  res.status(200).json({ status: 'success', count: notices.length, data: notices });
});`,
    ai: `// SlideAI - Automated Question-to-Slide Pipeline
export async function processDocumentToSlides(docBuffer: ArrayBuffer) {
  const parsedItems = await parseEducationalQuestions(docBuffer);
  
  // Intelligent segmentation for digital board educators
  const formattedSlides = parsedItems.map((item, index) => ({
    slideNumber: index + 1,
    questionTitle: item.title,
    structuredOptions: item.options,
    explanation: item.explanation
  }));

  // Achieves >70% reduction in preparation overhead
  return { success: true, slides: formattedSlides };
}`,
    diagnostics: `// System Diagnostics & Competency Verification
const engineerProfile = {
  name: "Aditya Kumar",
  title: "Full Stack Developer & Java Developer",
  coreSkills: ["Java", "Python", "React.js", "Node.js", "Express.js", "MongoDB", "MySQL"],
  certifications: ["Python (HackerRank)", "Java (HackerRank)", "SQL (HackerRank)", "J.P. Morgan Simulation", "AWS Cloud"],
  education: "B.Tech Computer Science & Engineering (2024-2028)"
};`
  };

  // Compute sliced strings for typing animation
  const typedLine1Prefix = LINE1_PREFIX.slice(0, Math.min(charIndex, 9));
  const typedLine1Highlight = charIndex > 9 ? LINE1_HIGHLIGHT.slice(0, Math.min(charIndex - 9, 16)) : "";
  const typedLine2 = charIndex > 25 ? LINE2_TEXT.slice(0, Math.min(charIndex - 25, 18)) : "";
  const isCaretOnLine1 = charIndex <= 25;

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Gradients & Grid Pattern */}
      <div className="absolute inset-0 bg-hero-grid opacity-60 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-blue/15 via-brand-indigo/10 to-transparent rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-violet/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & Primary CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                Full Stack &amp; Java Backend Engineer
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-brand-blue font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Greater Noida, India
              </span>
            </div>

            {/* Main Headline with Dynamic Typing Animation */}
            <div className="space-y-3 min-h-[140px] sm:min-h-[170px] lg:min-h-[190px] flex flex-col justify-center">
              {/* Screen reader full text for perfect accessibility & SEO */}
              <h1 className="sr-only">
                Building Scalable Systems &amp; Modern Web Apps.
              </h1>

              {/* Visual typing headline */}
              <div 
                aria-hidden="true" 
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.12]"
              >
                {/* Line 1: Building Scalable Systems */}
                <div className="min-h-[1.15em] flex items-center justify-center lg:justify-start">
                  <span>{typedLine1Prefix}</span>
                  {typedLine1Highlight && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-400 to-brand-violet text-glow ml-0.5">
                      {typedLine1Highlight}
                    </span>
                  )}
                  {isCaretOnLine1 && (
                    <span 
                      className="inline-block w-[3px] sm:w-[4px] h-[0.85em] ml-1 bg-brand-blue rounded-sm animate-pulse shadow-[0_0_10px_#38BDF8]"
                    />
                  )}
                </div>

                {/* Line 2: & Modern Web Apps. */}
                <div className="min-h-[1.15em] flex items-center justify-center lg:justify-start mt-1">
                  {charIndex > 25 ? (
                    <>
                      <span>{typedLine2}</span>
                      {!isCaretOnLine1 && (
                        <span 
                          className="inline-block w-[3px] sm:w-[4px] h-[0.85em] ml-1 bg-brand-blue rounded-sm animate-pulse shadow-[0_0_10px_#38BDF8]"
                        />
                      )}
                    </>
                  ) : (
                    <span className="invisible select-none opacity-0">&amp; Modern Web Apps.</span>
                  )}
                </div>
              </div>

              <p className="text-lg sm:text-xl font-medium text-slate-300 pt-1">
                <span className="text-white font-semibold">{personalInfo.name}</span> — {personalInfo.role}
              </p>
            </div>

            {/* Verified Summary Description */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {personalInfo.summary}
            </p>

            {/* Quick Tech Highlights Badge Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {['Java', 'Python', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'RESTful APIs'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono text-slate-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary CTA */}
              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-violet text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenResume();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-dark-surface/80 hover:bg-dark-card border border-white/10 hover:border-brand-blue/40 text-slate-200 hover:text-white text-sm font-medium backdrop-blur-md shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Download className="w-4 h-4 text-brand-blue" />
                <span>View / Download Resume</span>
              </button>

              {/* Copy Email Button */}
              <button
                onClick={copyEmail}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-brand-blue transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-sans">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>{personalInfo.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social & Connect Strip */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-2">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="flex items-center gap-1.5 hover:text-brand-blue transition-colors"
              >
                <LinkedInIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={`mailto:${personalInfo.email}`}
                onMouseEnter={() => soundFx.playHover()}
                className="flex items-center gap-1.5 hover:text-brand-blue transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Direct Mail</span>
              </a>
              <span className="text-slate-700">•</span>
              <span className="text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Resume Data
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Developer Terminal & Code Console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-dark-surface/90 border border-white/10 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden glass-card-glow">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-dark-bg/80 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5 text-brand-blue" />
                    aditya@dev-station:~/{activeTab}
                  </span>
                </div>

                <button
                  onClick={handleRunSimulation}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/30 text-[11px] font-mono text-brand-blue transition-all disabled:opacity-50"
                  title="Execute code simulation"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>Run Module</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Tab Bar */}
              <div className="flex items-center gap-1 px-3 pt-2 bg-dark-bg/40 border-b border-white/[0.06] overflow-x-auto text-xs font-mono">
                {[
                  { id: 'java', label: 'JavaService.java', icon: Code2 },
                  { id: 'fullstack', label: 'NoticeAPI.ts', icon: Server },
                  { id: 'ai', label: 'SlideAI.ts', icon: Sparkles },
                  { id: 'diagnostics', label: 'Profile.json', icon: Cpu },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        soundFx.playClick();
                        setActiveTab(tab.id as 'java' | 'fullstack' | 'ai' | 'diagnostics');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-dark-surface text-brand-blue border-t-2 border-brand-blue font-medium'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Code Snippet Editor View */}
              <div className="p-4 bg-dark-bg/60 text-xs font-mono text-slate-300 overflow-x-auto max-h-[220px] leading-relaxed select-text">
                <pre className="text-slate-300">
                  <code>{tabSnippets[activeTab]}</code>
                </pre>
              </div>

              {/* Terminal Output Logs Console */}
              <div className="p-3.5 bg-black/70 border-t border-white/[0.08] font-mono text-[11px] space-y-1 max-h-[140px] overflow-y-auto">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center justify-between pb-1 border-b border-white/[0.04]">
                  <span>System Console Output</span>
                  <span className="text-emerald-400">● LIVE</span>
                </div>
                {consoleLogs.slice(-4).map((log, i) => (
                  <div
                    key={i}
                    className={`leading-tight ${
                      log.includes('[SUCCESS]')
                        ? 'text-emerald-400'
                        : log.includes('[METRIC]')
                        ? 'text-brand-blue font-semibold'
                        : log.includes('[EXEC]')
                        ? 'text-amber-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
