import { ResumeData } from './types';
import { v4 as uuid } from 'uuid';

export const sampleResume: ResumeData = {
  personal: {
    fullName: 'Alexandra Chen',
    title: 'Senior Product Designer',
    email: 'alexandra.chen@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    portfolio: 'https://alexchen.design',
    linkedin: 'linkedin.com/in/alexandrachen',
    photo: '',
  },
  summary:
    'Product designer with 8+ years of experience creating intuitive digital experiences for B2B SaaS products. Led design systems serving 50+ engineers at two Fortune 500 companies. Passionate about accessibility-first design and data-driven iteration.',
  experience: [
    {
      id: uuid(),
      company: 'Stripe',
      position: 'Senior Product Designer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      bullets: [
        'Led redesign of the merchant dashboard serving 3M+ businesses, improving task completion by 34%',
        'Built and maintained a Figma design system with 200+ components used by 60 engineers',
        'Conducted 50+ user research sessions to validate new payment flow concepts',
        'Mentored 3 junior designers and established design critique process',
      ],
    },
    {
      id: uuid(),
      company: 'Figma',
      position: 'Product Designer',
      location: 'San Francisco, CA',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      bullets: [
        'Designed the collaborative commenting system used by 4M+ users',
        'Created prototyping features that increased user engagement by 28%',
        'Partnered with engineering to ship 12 major features in 2 years',
      ],
    },
    {
      id: uuid(),
      company: 'Google',
      position: 'UX Designer',
      location: 'Mountain View, CA',
      startDate: '2016-01',
      endDate: '2018-05',
      current: false,
      bullets: [
        'Designed Material Design components for Google Cloud Platform',
        'Improved onboarding flow conversion by 22% through iterative A/B testing',
      ],
    },
  ],
  education: [
    {
      id: uuid(),
      degree: 'Master of Fine Arts, Interaction Design',
      institution: 'School of Visual Arts',
      location: 'New York, NY',
      year: '2016',
      coursework: 'Human-Computer Interaction, Design Systems, Information Architecture',
    },
    {
      id: uuid(),
      degree: 'Bachelor of Arts, Graphic Design',
      institution: 'Rhode Island School of Design',
      location: 'Providence, RI',
      year: '2014',
      coursework: '',
    },
  ],
  skills: {
    technical: ['Figma', 'Sketch', 'Adobe CC', 'Framer', 'HTML/CSS', 'React', 'Prototyping', 'Design Systems', 'User Research', 'Accessibility', 'Data Visualization', 'Motion Design'],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Mandarin', level: 'Fluent' },
      { name: 'French', level: 'Intermediate' },
    ],
  },
  certifications: [
    { id: uuid(), name: 'Google UX Design Professional Certificate', issuer: 'Google', year: '2022' },
    { id: uuid(), name: 'Certified Accessibility Specialist', issuer: 'IAAP', year: '2021' },
  ],
  projects: [
    { id: uuid(), name: 'DesignKit', description: 'Open-source Figma plugin for generating accessible color palettes. 12K+ installs.', link: 'https://github.com/alexchen/designkit', tech: 'TypeScript, Figma API' },
    { id: uuid(), name: 'AccessFirst', description: 'Chrome extension that audits web pages for WCAG compliance in real-time.', link: 'https://accessfirst.dev', tech: 'React, Chrome Extension API' },
  ],
  publications: [
    { id: uuid(), title: 'Design Systems at Scale: Lessons from Stripe', journal: 'Smashing Magazine', year: '2023', doi: '' },
    { id: uuid(), title: 'Accessibility-First Design in Enterprise SaaS', journal: 'A List Apart', year: '2022', doi: '' },
  ],
};

export function createEmptyResume(): ResumeData {
  return {
    personal: { fullName: '', title: '', email: '', phone: '', location: '', portfolio: '', linkedin: '', photo: '' },
    summary: '',
    experience: [],
    education: [],
    skills: { technical: [], languages: [] },
    certifications: [],
    projects: [],
    publications: [],
  };
}
