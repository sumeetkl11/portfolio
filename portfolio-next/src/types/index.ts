export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  repoUrl?: string;
  imageFallback?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Profile {
  name: string;
  tagline: string;
  location: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface KatanaSkill {
  id: string;
  name: string;
  color: string;
}

export type Skill = KatanaSkill;
