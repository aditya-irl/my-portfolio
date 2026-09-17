import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { GitHubIcon, PythonIcon } from './Icons';
import { 
  Code2, 
  Layers, 
  Database, 
  Wrench, 
  Brain, 
  Search, 
  CheckCircle,
  Terminal,
  Sparkles,
  Server,
  Cpu,
  Coffee,
  FileCode,
  Layout,
  Palette,
  Atom,
  Network,
  Table,
  GitBranch,
  Cloud,
  Code,
  Send,
  Boxes,
  Binary,
  HardDrive
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'Brain': return <Brain className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-4 h-4 text-amber-400" />;
      case 'Python': return <PythonIcon className="w-4 h-4 text-yellow-400" />;
      case 'FileCode': return <FileCode className="w-4 h-4 text-sky-400" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-slate-300" />;
      case 'Database': return <Database className="w-4 h-4 text-blue-400" />;
      case 'Layout': return <Layout className="w-4 h-4 text-orange-400" />;
      case 'Palette': return <Palette className="w-4 h-4 text-sky-400" />;
      case 'Atom': return <Atom className="w-4 h-4 text-cyan-400" />;
      case 'Server': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'Network': return <Network className="w-4 h-4 text-purple-400" />;
      case 'Table': return <Table className="w-4 h-4 text-blue-500" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4 text-orange-500" />;
      case 'Github': return <GitHubIcon className="w-4 h-4 text-white" />;
      case 'Cloud': return <Cloud className="w-4 h-4 text-sky-400" />;
      case 'Code': return <Code className="w-4 h-4 text-blue-400" />;
      case 'Send': return <Send className="w-4 h-4 text-amber-500" />;
      case 'Boxes': return <Boxes className="w-4 h-4 text-emerald-400" />;
      case 'Binary': return <Binary className="w-4 h-4 text-indigo-400" />;
      case 'HardDrive': return <HardDrive className="w-4 h-4 text-teal-400" />;
      default: return <Code2 className="w-4 h-4 text-brand-blue" />;
    }
  };

  const filteredCategories = skillCategories.map((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
      return null;
    }
    const filteredSkills = cat.skills.filter((skill) => {
      const q = searchQuery.toLowerCase();
      return (
        skill.name.toLowerCase().includes(q) ||
        (skill.description && skill.description.toLowerCase().includes(q)) ||
        (skill.level && skill.level.toLowerCase().includes(q))
      );
    });

    if (filteredSkills.length === 0) return null;

    return {
      ...cat,
      skills: filteredSkills
    };
  }).filter(Boolean) as typeof skillCategories;

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-dark-bg border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-mono">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Arsenal &amp; Methodologies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Categorized Technical Skills
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Verified technical stack directly extracted from resume across languages, frameworks, databases, and core computer science concepts.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-brand-blue text-dark-bg font-bold shadow-md shadow-brand-blue/30'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
              }`}
            >
              All Skills ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-blue text-dark-bg font-bold shadow-md shadow-brand-blue/30'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search skill, e.g. Java, React, SQL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-surface/80 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-blue/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Skill Category Blocks */}
        <div className="space-y-10">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-brand-blue/10 border border-brand-blue/20 text-brand-blue">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {cat.skills.length} competencies
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => soundFx.playHover()}
                    className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:border-brand-blue/30 transition-colors">
                            {getSkillIcon(skill.iconName)}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white group-hover:text-brand-blue transition-colors">
                              {skill.name}
                            </h4>
                            {skill.level && (
                              <span className="inline-block text-[10px] font-mono text-slate-400">
                                {skill.level}
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400" title="Verified Skill">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      {skill.description && (
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 glass-card rounded-2xl border border-dashed border-white/10">
              <p className="text-slate-400 text-sm">
                No technical skills matched your search for "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 px-4 py-1.5 rounded-lg bg-brand-blue/20 text-brand-blue text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
