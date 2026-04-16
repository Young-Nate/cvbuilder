'use client';

import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { ResumeData, Experience, Education, Certification, Project, Publication, Language, TemplateName } from '@/lib/types';
import { createEmptyResume } from '@/lib/sampleData';

// ── Actions ──

type Action =
  | { type: 'SET_ALL'; payload: ResumeData }
  | { type: 'UPDATE_PERSONAL'; payload: Partial<ResumeData['personal']> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  // Experience
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'REORDER_EXPERIENCE'; payload: Experience[] }
  // Education
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  // Skills
  | { type: 'SET_TECHNICAL_SKILLS'; payload: string[] }
  | { type: 'SET_LANGUAGES'; payload: Language[] }
  // Certifications
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<Certification> } }
  | { type: 'REMOVE_CERTIFICATION'; payload: string }
  // Projects
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'REMOVE_PROJECT'; payload: string }
  // Publications
  | { type: 'ADD_PUBLICATION'; payload: Publication }
  | { type: 'UPDATE_PUBLICATION'; payload: { id: string; data: Partial<Publication> } }
  | { type: 'REMOVE_PUBLICATION'; payload: string }
  // Template
  | { type: 'SET_TEMPLATE'; payload: TemplateName }
  // Accent color
  | { type: 'SET_ACCENT_COLOR'; payload: string };

interface AppState {
  resume: ResumeData;
  template: TemplateName;
  accentColor: string;
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ALL':
      return { ...state, resume: action.payload };
    case 'UPDATE_PERSONAL':
      return { ...state, resume: { ...state.resume, personal: { ...state.resume.personal, ...action.payload } } };
    case 'UPDATE_SUMMARY':
      return { ...state, resume: { ...state.resume, summary: action.payload } };

    // Experience
    case 'ADD_EXPERIENCE':
      return { ...state, resume: { ...state.resume, experience: [...state.resume.experience, action.payload] } };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          experience: state.resume.experience.map(e =>
            e.id === action.payload.id ? { ...e, ...action.payload.data } : e
          ),
        },
      };
    case 'REMOVE_EXPERIENCE':
      return { ...state, resume: { ...state.resume, experience: state.resume.experience.filter(e => e.id !== action.payload) } };
    case 'REORDER_EXPERIENCE':
      return { ...state, resume: { ...state.resume, experience: action.payload } };

    // Education
    case 'ADD_EDUCATION':
      return { ...state, resume: { ...state.resume, education: [...state.resume.education, action.payload] } };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: state.resume.education.map(e =>
            e.id === action.payload.id ? { ...e, ...action.payload.data } : e
          ),
        },
      };
    case 'REMOVE_EDUCATION':
      return { ...state, resume: { ...state.resume, education: state.resume.education.filter(e => e.id !== action.payload) } };

    // Skills
    case 'SET_TECHNICAL_SKILLS':
      return { ...state, resume: { ...state.resume, skills: { ...state.resume.skills, technical: action.payload } } };
    case 'SET_LANGUAGES':
      return { ...state, resume: { ...state.resume, skills: { ...state.resume.skills, languages: action.payload } } };

    // Certifications
    case 'ADD_CERTIFICATION':
      return { ...state, resume: { ...state.resume, certifications: [...state.resume.certifications, action.payload] } };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          certifications: state.resume.certifications.map(c =>
            c.id === action.payload.id ? { ...c, ...action.payload.data } : c
          ),
        },
      };
    case 'REMOVE_CERTIFICATION':
      return { ...state, resume: { ...state.resume, certifications: state.resume.certifications.filter(c => c.id !== action.payload) } };

    // Projects
    case 'ADD_PROJECT':
      return { ...state, resume: { ...state.resume, projects: [...state.resume.projects, action.payload] } };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: state.resume.projects.map(p =>
            p.id === action.payload.id ? { ...p, ...action.payload.data } : p
          ),
        },
      };
    case 'REMOVE_PROJECT':
      return { ...state, resume: { ...state.resume, projects: state.resume.projects.filter(p => p.id !== action.payload) } };

    // Publications
    case 'ADD_PUBLICATION':
      return { ...state, resume: { ...state.resume, publications: [...state.resume.publications, action.payload] } };
    case 'UPDATE_PUBLICATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          publications: state.resume.publications.map(p =>
            p.id === action.payload.id ? { ...p, ...action.payload.data } : p
          ),
        },
      };
    case 'REMOVE_PUBLICATION':
      return { ...state, resume: { ...state.resume, publications: state.resume.publications.filter(p => p.id !== action.payload) } };

    // Template
    case 'SET_TEMPLATE':
      return { ...state, template: action.payload };

    // Accent color
    case 'SET_ACCENT_COLOR':
      return { ...state, accentColor: action.payload };

    default:
      return state;
  }
}

// ── Context ──

interface ResumeContextType {
  state: AppState;
  dispatch: Dispatch<Action>;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    resume: createEmptyResume(),
    template: 'minimal' as TemplateName,
    accentColor: '',
  });

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}
