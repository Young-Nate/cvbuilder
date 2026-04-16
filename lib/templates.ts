import { TemplateConfig } from './types';

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'minimal',
    name: 'Minimal Classic',
    description: 'Clean, ample white space, serif headers, single column',
    colors: { primary: '#1a1a1a', secondary: '#555555', accent: '#1a1a1a', background: '#ffffff', text: '#1a1a1a', muted: '#777777' },
  },
  {
    id: 'modern-split',
    name: 'Modern Split',
    description: 'Two-column layout with colored sidebar',
    colors: { primary: '#1e3a5f', secondary: '#4a90d9', accent: '#4a90d9', background: '#f0f4f8', text: '#1e3a5f', muted: '#5a7a9a' },
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Bold, information-dense, professional blue/gray',
    colors: { primary: '#1a365d', secondary: '#2d4a7a', accent: '#2b6cb0', background: '#ffffff', text: '#1a202c', muted: '#718096' },
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Asymmetric layout with vibrant accents and icons',
    colors: { primary: '#7c3aed', secondary: '#a78bfa', accent: '#ec4899', background: '#faf5ff', text: '#1e1b4b', muted: '#6b7280' },
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Developer-friendly with monospace and skill tags',
    colors: { primary: '#0f172a', secondary: '#1e293b', accent: '#22c55e', background: '#f8fafc', text: '#0f172a', muted: '#64748b' },
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Formal, traditional, with publications section',
    colors: { primary: '#1a1a2e', secondary: '#16213e', accent: '#7b2d26', background: '#fffcf7', text: '#1a1a2e', muted: '#6b6b6b' },
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Visual-first, large project cards, profile photo',
    colors: { primary: '#111827', secondary: '#374151', accent: '#f59e0b', background: '#ffffff', text: '#111827', muted: '#6b7280' },
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Dense single-page layout for experienced professionals',
    colors: { primary: '#0c4a6e', secondary: '#075985', accent: '#0284c7', background: '#ffffff', text: '#0f172a', muted: '#64748b' },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Centered, ornamental dividers, serif, soft palette',
    colors: { primary: '#2d3748', secondary: '#4a5568', accent: '#b07d62', background: '#fefdfb', text: '#2d3748', muted: '#718096' },
  },
  {
    id: 'ats',
    name: 'ATS-Friendly',
    description: 'Optimized for applicant tracking systems, no graphics',
    colors: { primary: '#000000', secondary: '#333333', accent: '#000000', background: '#ffffff', text: '#000000', muted: '#555555' },
  },
];

export function getTemplate(id: string): TemplateConfig {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}
