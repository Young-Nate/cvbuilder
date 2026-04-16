export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  linkedin: string;
  photo: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  coursework: string;
}

export interface Language {
  name: string;
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Beginner';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  tech: string;
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  doi: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: {
    technical: string[];
    languages: Language[];
  };
  certifications: Certification[];
  projects: Project[];
  publications: Publication[];
}

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}

export type TemplateName =
  | 'minimal'
  | 'modern-split'
  | 'executive'
  | 'creative'
  | 'technical'
  | 'academic'
  | 'portfolio'
  | 'compact'
  | 'elegant'
  | 'ats';

export interface TemplateConfig {
  id: TemplateName;
  name: string;
  description: string;
  colors: TemplateColors;
}
