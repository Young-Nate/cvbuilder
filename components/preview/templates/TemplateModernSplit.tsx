'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

const levelPercent: Record<string, number> = {
  Native: 100, Fluent: 85, Advanced: 70, Intermediate: 50, Beginner: 30,
};

export default function TemplateModernSplit({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#1e293b'; // default: slate-800
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  return (
    <div className="bg-white flex" style={{ minHeight: '100%', maxWidth: '794px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div className="text-white flex flex-col" style={{ width: '30%', minWidth: '220px', padding: '40px 24px', flexShrink: 0, backgroundColor: accent }}>
        {/* Photo */}
        {personal.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={personal.photo} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />
          </div>
        )}
        {/* Name */}
        <div style={{ marginBottom: '32px' }}>
          <h1 className="font-bold text-xl text-white leading-tight" style={{ marginBottom: '4px' }}>
            {personal.fullName}
          </h1>
          {personal.title && (
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{personal.title}</p>
          )}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '28px' }}>
          <h2 className="text-xs font-bold uppercase tracking-widest" style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.5)' }}>Contact</h2>
          <div className="flex flex-col" style={{ gap: '6px' }}>
            {personal.email && <p className="text-xs break-all" style={{ color: 'rgba(255,255,255,0.75)' }}>{personal.email}</p>}
            {personal.phone && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{personal.phone}</p>}
            {personal.location && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{personal.location}</p>}
            {personal.linkedin && <p className="text-xs break-all" style={{ color: 'rgba(255,255,255,0.75)' }}>{personal.linkedin}</p>}
            {personal.portfolio && <p className="text-xs break-all" style={{ color: 'rgba(255,255,255,0.75)' }}>{personal.portfolio}</p>}
          </div>
        </div>

        {/* Technical Skills */}
        {skills.technical.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.5)' }}>Skills</h2>
            <div className="flex flex-wrap" style={{ gap: '6px' }}>
              {skills.technical.map((skill, i) => (
                <span key={i} className="text-xs rounded px-2 py-1" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {skills.languages.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.5)' }}>Languages</h2>
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {skills.languages.map((lang, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '3px' }}>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.9)' }}>{lang.name}</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{lang.level}</span>
                  </div>
                  <div className="rounded-full" style={{ height: '4px', background: 'rgba(255,255,255,0.2)' }}>
                    <div
                      className="rounded-full"
                      style={{ height: '4px', width: `${levelPercent[lang.level] || 50}%`, backgroundColor: 'rgba(255,255,255,0.7)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.5)' }}>Certifications</h2>
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>{cert.name}</p>
                  {cert.issuer && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{cert.issuer}{cert.year ? ` · ${cert.year}` : ''}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1" style={{ padding: '40px 32px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="text-slate-700 font-bold text-xs uppercase tracking-widest" style={{ marginBottom: '10px', borderBottom: '2px solid #e2e8f0', paddingBottom: '6px' }}>Summary</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="text-slate-700 font-bold text-xs uppercase tracking-widest" style={{ marginBottom: '14px', borderBottom: '2px solid #e2e8f0', paddingBottom: '6px' }}>Experience</h2>
            <div className="flex flex-col" style={{ gap: '18px' }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm text-slate-800">{exp.position}</p>
                      <p className="text-sm" style={{ color: accent }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4 mt-0.5">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul style={{ marginTop: '6px', paddingLeft: '16px' }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="text-xs text-slate-600 leading-relaxed list-disc" style={{ marginBottom: '3px' }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="text-slate-700 font-bold text-xs uppercase tracking-widest" style={{ marginBottom: '14px', borderBottom: '2px solid #e2e8f0', paddingBottom: '6px' }}>Education</h2>
            <div className="flex flex-col" style={{ gap: '12px' }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm text-slate-800">{edu.degree}</p>
                      <p className="text-sm" style={{ color: accent }}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</p>
                    </div>
                    {edu.year && <span className="text-xs text-slate-400 ml-4">{edu.year}</span>}
                  </div>
                  {edu.coursework && <p className="text-xs text-slate-500 mt-1">{edu.coursework}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="text-slate-700 font-bold text-xs uppercase tracking-widest" style={{ marginBottom: '14px', borderBottom: '2px solid #e2e8f0', paddingBottom: '6px' }}>Projects</h2>
            <div className="flex flex-col" style={{ gap: '12px' }}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-sm text-slate-800">{proj.name}</p>
                    {proj.link && <span className="text-xs" style={{ color: accent }}>{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-xs text-slate-600 mt-1">{proj.description}</p>}
                  {proj.tech && <p className="text-xs text-slate-400 mt-1 italic">{proj.tech}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <div>
            <h2 className="text-slate-700 font-bold text-xs uppercase tracking-widest" style={{ marginBottom: '14px', borderBottom: '2px solid #e2e8f0', paddingBottom: '6px' }}>Publications</h2>
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {publications.map((pub) => (
                <div key={pub.id}>
                  <p className="text-sm text-slate-700 font-medium">{pub.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{pub.journal}{pub.year ? `, ${pub.year}` : ''}{pub.doi ? ` — DOI: ${pub.doi}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
