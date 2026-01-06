export interface Skill {
  id?: string;
  name: string;
  level: number;
  category: string;
  order?: number;
}

export interface Service {
  id?: string;
  icon: string;
  title: string;
  description: string;
  order?: number;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  featured?: boolean;
  order?: number;
}

export interface AboutStats {
  id?: string;
  projectsCompleted: number;
  languagesMastered: number;
}

export interface AboutContent {
  id?: string;
  title: string;
  description1: string;
  description2: string;
  image: string;
}

export interface ContactInfo {
  id?: string;
  email: string;
  phone: string;
  location: string;
}

export interface SocialLink {
  id?: string;
  platform: string;
  url: string;
  icon: string;
  order?: number;
}
