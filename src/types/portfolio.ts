export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'AI & Utilities' | 'Enterprise & Systems' | 'Commercial';
  type: string; // e.g. "Freelance / Production", "Commercial Project"
  description: string;
  highlights: string[];
  technologies: string[];
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  architectureDetails?: {
    frontend?: string;
    backend?: string;
    database?: string;
    deployment?: string;
    keyInnovation?: string;
  };
  featured: boolean;
  accentColor: string;
}

export interface SkillItem {
  name: string;
  iconName: string;
  level?: string;
  description?: string;
  relatedProjects?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  type: string;
  location?: string;
  points: string[];
  skills: string[];
  current?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  status: string;
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  type: string;
  technology?: string;
  linkUrl?: string;
  description: string;
  badgeCode: string;
  tags: string[];
  verificationNote: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  subRole: string;
  location: string;
  email: string;
  linkedin: string;
  github?: string;
  instagram?: string;
  whatsapp?: string; // e.g. "8865804386" (country code + phone number without + or spaces)
  phone?: string;
  summary: string;
  headline: string;
}
