import React, { useRef, useEffect, useState } from 'react';
import { soundFx } from '../utils/sound';
import { 
  Activity, 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause,
  Sliders
} from 'lucide-react';

export const CinematicVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [visualMode, setVisualMode] = useState<'neural' | 'matrix' | 'quantum'>('neural');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const stories = [
    {
      badge: "Architecture Principle",
      title: "Core Java Engineering & Scalable Backend Workflows",
      subtitle: "Skillnexis Internship & OOP Foundations",
      desc: "Architecting modular Java backend pipelines with optimized relational database queries, rigorous unit validation, and rock-solid object-oriented abstractions."
    },
    {
      badge: "Full-Stack Ecosystem",
      title: "End-to-End Reactive Platforms & REST Architecture",
      subtitle: "React.js • Node.js • Express • MongoDB",
      desc: "Engineering responsive web portals like Smart Campus & EdTech Management systems to replace fragmented communication and streamline data flow."
    },
    {
      badge: "AI Automation",
      title: "Intelligent Document Parsing & Slide Generation",
      subtitle: "SlideAI Utility Innovation",
      desc: "Empowering digital educators by auto-segmenting complex exam papers into structured lecture slide decks, reducing prep time by over 70%."
    }
  ];

  // Canvas particle animation system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    const particleCount = window.innerWidth < 768 ? 35 : 85;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseColor: string;
      pulse: number;
    }> = [];

    const colors = ['#38BDF8', '#818CF8', '#C084FC', '#34D399', '#38BDF8'];

    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2.5 + 1.5,
        color: color,
        baseColor: color,
        pulse: Math.random() * Math.PI,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Background subtle grid/gradient wash
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.2
      );
      bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.85)');
      bgGrad.addColorStop(0.5, 'rgba(7, 9, 14, 0.95)');
      bgGrad.addColorStop(1, 'rgba(5, 7, 10, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (isPlaying) {
          p1.x += p1.vx;
          p1.y += p1.vy;
          p1.pulse += 0.03;

          // Bounce off bounds
          if (p1.x < 0 || p1.x > width) p1.vx *= -1;
          if (p1.y < 0 || p1.y > height) p1.vy *= -1;

          // Mouse attraction/repulsion
          if (isHovering) {
            const dx = mouseX - p1.x;
            const dy = mouseY - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const angle = Math.atan2(dy, dx);
              p1.x += Math.cos(angle) * 0.8;
              p1.y += Math.sin(angle) * 0.8;
            }
          }
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = visualMode === 'quantum' ? 170 : visualMode === 'matrix' ? 110 : 140;

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = visualMode === 'matrix' ? `rgba(52, 211, 153, ${opacity})` : `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        const currentRadius = p1.radius + Math.sin(p1.pulse) * 0.8;
        ctx.arc(p1.x, p1.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = visualMode === 'matrix' ? '#34D399' : p1.color;
        ctx.shadowColor = p1.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw central orbital ring if quantum mode
      if (visualMode === 'quantum') {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 120 + Math.sin(frame * 0.02) * 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
        ctx.setLineDash([6, 12]);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, visualMode]);

  // Story autoplay interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, stories.length]);

  const toggleFullscreen = () => {
    soundFx.playClick();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 bg-dark-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Motion Visual Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Architectural Motion &amp; System Dynamics
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Live interactive neural canvas visualizing the convergence of Java backend architecture, modern web ecosystems, and AI automation.
          </p>
        </div>

        {/* Cinematic Visual Container */}
        <div
          ref={containerRef}
          className="relative rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-dark-bg min-h-[520px] sm:min-h-[580px] flex flex-col justify-between p-6 sm:p-10"
        >
          {/* Canvas Background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair z-0"
          />

          {/* Top Floating Control Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 bg-dark-surface/60 backdrop-blur-md p-3 rounded-2xl border border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
              </span>
              <span className="text-xs font-mono text-slate-200">
                Simulation Mode: <span className="text-brand-blue font-semibold uppercase">{visualMode}</span>
              </span>
            </div>

            {/* Interactive Mode Switches & Controls */}
            <div className="flex items-center gap-2">
              {(['neural', 'matrix', 'quantum'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    soundFx.playClick();
                    setVisualMode(mode);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                    visualMode === mode
                      ? 'bg-brand-blue text-dark-bg font-bold shadow-md shadow-brand-blue/30'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                  }`}
                >
                  {mode}
                </button>
              ))}

              <div className="h-4 w-[1px] bg-white/10 mx-1"></div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                title={isPlaying ? 'Pause Animation' : 'Play Animation'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Central / Bottom Narrative Story Card */}
          <div className="relative z-10 max-w-2xl bg-dark-surface/85 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-mono font-medium">
                {stories[activeStoryIndex].badge}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                0{activeStoryIndex + 1} / 0{stories.length}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug mb-1">
              {stories[activeStoryIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-brand-blue font-medium mb-3">
              {stories[activeStoryIndex].subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {stories[activeStoryIndex].desc}
            </p>

            {/* Story Navigation Indicators */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/[0.08]">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveStoryIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeStoryIndex === idx
                      ? 'w-10 bg-brand-blue shadow-[0_0_10px_#38BDF8]'
                      : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`View story ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Interactive Prompt */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-mono">
              <Sliders className="w-3.5 h-3.5 text-brand-blue" />
              Hover/move cursor to influence dynamic physics &amp; orbital nodes
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
              60 FPS Canvas Engine
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
