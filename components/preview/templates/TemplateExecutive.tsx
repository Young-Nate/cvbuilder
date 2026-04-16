'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

export default function TemplateExecutive({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#1d4ed8'; // default: blue-700
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex items-center" style={{ marginBottom: '14px' }}>
        <div style={{ width: '4px', height: '18px', background: accent, borderRadius: '2px', marginRight: '10px', flexShrink: 0 }} />
        <h2 className="font-bold text-xs uppercase tracking-widest text-slate-700">{children}</h2>
      </div>
    );
  }

  return (
    <div className="bg-white" style={{ maxWidth: '794px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top accent bar */}
      <div style={{ height: '6px', background: accent }} />

      {/* Header */}
      <div style={{ background: '#f8fafc', padding: '32px 48px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {personal.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={personal.photo} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          )}
          <div>
            <h1 className="font-black text-4xl text-slate-800 uppercase tracking-tight" style={{ letterSpacing: '-0.5px', marginBottom: '4px' }}>
              {personal.fullName}
            </h1>
            {personal.title && (
              <p className="font-semibold text-lg" style={{ color: accent, marginBottom: '14px' }}>{personal.title}</p>
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
              {personal.email && <span className="font-medium text-slate-600">{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.linkedin && <span>{personal.linkedin}</span>}
              {personal.portfolio && <span>{personal.portfolio}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 48px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '28px' }}>
            <SectionTitle>Executive Summary</SectionTitle>
            <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <SectionTitle>Professional Experience</SectionTitle>
            <div className="flex flex-col" style={{ gap: '18px' }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '14px' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-slate-800">{exp.position}</p>
                      <p className="text-sm font-semibold" style={{ color: accent }}>{exp.company}
                        {exp.location ? <span className="text-slate-400 font-normal"> · {exp.location}</span> : ''}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4 bg-slate-100 px-2 py-1 rounded font-medium">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul style={{ marginTop: '8px', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="text-xs text-slate-600 leading-relaxed list-disc">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-column bottom area */}
        <div className="flex gap-8">
          {/* Left column */}
          <div style={{ flex: '1' }}>
            {/* Education */}
            {education.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <SectionTitle>Education</SectionTitle>
                <div className="flex flex-col" style={{ gap: '10px' }}>
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm text-slate-800">{edu.degree}</p>
                          <p className="text-xs font-medium" style={{ color: accent }}>{edu.institution}</p>
                          {edu.location && <p className="text-xs text-slate-400">{edu.location}</p>}
                        </div>
                        {edu.year && <span className="text-xs text-slate-400 ml-2 whitespace-nowrap">{edu.year}</span>}
                      </div>
                      {edu.coursework && <p className="text-xs text-slate-500 mt-1">{edu.coursework}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(skills.technical.length > 0 || skills.languages.length > 0) && (
              <div style={{ marginBottom: '24px' }}>
                <SectionTitle>Core Competencies</SectionTitle>
                {skills.technical.length > 0 && (
                  <div className="flex flex-wrap" style={{ gap: '6px', marginBottom: '10px' }}>
                    {skills.technical.map((skill, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-medium">{skill}</span>
                    ))}
                  </div>
                )}
                {skills.languages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((lang, i) => (
                      <span key={i} className="text-xs text-slate-600">
                        <span className="font-semibold">{lang.name}</span> ({lang.level})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right column */}
          <div style={{ flex: '1' }}>
            {/* Certifications */}
            {certifications.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <SectionTitle>Certifications</SectionTitle>
                <div className="flex flex-col" style={{ gap: '6px' }}>
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-baseline">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{cert.name}</p>
                        {cert.issuer && <p className="text-xs text-slate-500">{cert.issuer}</p>}
                      </div>
                      {cert.year && <span className="text-xs text-slate-400 ml-2">{cert.year}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <SectionTitle>Key Projects</SectionTitle>
                <div className="flex flex-col" style={{ gap: '8px' }}>
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <p className="font-semibold text-sm text-slate-800">{proj.name}
                        {proj.link && <span className="font-normal text-xs ml-2" style={{ color: accent }}>{proj.link}</span>}
                      </p>
                      {proj.description && <p className="text-xs text-slate-600 mt-0.5">{proj.description}</p>}
                      {proj.tech && <p className="text-xs text-slate-400 mt-0.5 italic">{proj.tech}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Publications */}
            {publications.length > 0 && (
              <div>
                <SectionTitle>Publications</SectionTitle>
                <div className="flex flex-col" style={{ gap: '8px' }}>
                  {publications.map((pub) => (
                    <div key={pub.id}>
                      <p className="text-sm text-slate-700 font-medium italic">{pub.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{pub.journal}{pub.year ? `, ${pub.year}` : ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
