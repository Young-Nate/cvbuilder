'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

export default function TemplateTechnical({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#22c55e'; // default: green-500
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  return (
    <div className="bg-white" style={{ maxWidth: '794px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Dark header */}
      <div style={{ background: '#0f172a', padding: '32px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {personal.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={personal.photo} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${accent}` }} />
          )}
          <div>
            <h1 style={{ fontFamily: '"Courier New", monospace', fontSize: '2rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.02em', marginBottom: '4px' }}>
              {personal.fullName}
            </h1>
            {personal.title && (
              <p style={{ color: accent, fontFamily: '"Courier New", monospace', fontSize: '0.9rem', marginBottom: '14px' }}>
                // {personal.title}
              </p>
            )}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {personal.email && (
                <span style={{ fontFamily: '"Courier New", monospace', color: '#94a3b8', fontSize: '0.75rem' }}>
                  <span style={{ color: accent }}>email:</span> {personal.email}
                </span>
              )}
              {personal.phone && (
                <span style={{ fontFamily: '"Courier New", monospace', color: '#94a3b8', fontSize: '0.75rem' }}>
                  <span style={{ color: accent }}>tel:</span> {personal.phone}
                </span>
              )}
              {personal.location && (
                <span style={{ fontFamily: '"Courier New", monospace', color: '#94a3b8', fontSize: '0.75rem' }}>
                  <span style={{ color: accent }}>loc:</span> {personal.location}
                </span>
              )}
              {personal.linkedin && (
                <span style={{ fontFamily: '"Courier New", monospace', color: '#94a3b8', fontSize: '0.75rem' }}>
                  <span style={{ color: accent }}>linkedin:</span> {personal.linkedin}
                </span>
              )}
              {personal.portfolio && (
                <span style={{ fontFamily: '"Courier New", monospace', color: '#94a3b8', fontSize: '0.75rem' }}>
                  <span style={{ color: accent }}>url:</span> {personal.portfolio}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 40px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '24px', background: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `3px solid ${accent}`, borderRadius: '4px', padding: '12px 16px' }}>
            <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.languages.length > 0) && (
          <div style={{ marginBottom: '24px' }}>
            <h2 className="font-bold text-xs uppercase tracking-widest text-slate-700" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: accent }}>$</span> tech_stack
            </h2>
            {skills.technical.length > 0 && (
              <div className="flex flex-wrap" style={{ gap: '6px', marginBottom: '8px' }}>
                {skills.technical.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium rounded px-2 py-1"
                    style={{ background: '#f1f5f9', border: `1px solid ${accent}`, color: '#334155', fontFamily: '"Courier New", monospace' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {skills.languages.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs" style={{ fontFamily: '"Courier New", monospace', color: '#64748b' }}>
                    <span style={{ color: accent }}>{lang.name}</span>:{' '}
                    <span style={{ color: '#94a3b8' }}>{lang.level}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Projects (prominent) */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 className="font-bold text-xs uppercase tracking-widest text-slate-700" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: accent }}>$</span> projects
            </h2>
            <div className="grid grid-cols-2" style={{ gap: '10px' }}>
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{ border: '1px solid #e2e8f0', borderTop: `2px solid ${accent}`, borderRadius: '4px', padding: '12px', background: '#fafafa' }}
                >
                  <p className="font-bold text-sm text-slate-800">{proj.name}</p>
                  {proj.link && (
                    <p className="text-xs mt-0.5" style={{ color: accent, fontFamily: '"Courier New", monospace' }}>{proj.link}</p>
                  )}
                  {proj.description && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>}
                  {proj.tech && (
                    <div className="flex flex-wrap mt-1" style={{ gap: '4px' }}>
                      {proj.tech.split(',').map((t, i) => (
                        <span key={i} className="text-xs rounded px-1.5 py-0.5" style={{ background: '#0f172a', color: '#94a3b8', fontFamily: '"Courier New", monospace' }}>
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 className="font-bold text-xs uppercase tracking-widest text-slate-700" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: accent }}>$</span> experience
            </h2>
            <div className="flex flex-col" style={{ gap: '16px' }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-slate-800">{exp.position}</p>
                      <p className="text-xs font-medium text-slate-500">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <span className="text-xs whitespace-nowrap ml-4" style={{ color: accent, fontFamily: '"Courier New", monospace' }}>
                      {formatDate(exp.startDate)} → {formatDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul style={{ marginTop: '6px', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
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

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 className="font-bold text-xs uppercase tracking-widest text-slate-700" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: accent }}>$</span> education
            </h2>
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm text-slate-800">{edu.degree}</p>
                    <p className="text-xs text-slate-500">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-400 mt-0.5">{edu.coursework}</p>}
                  </div>
                  {edu.year && <span className="text-xs ml-4 whitespace-nowrap" style={{ color: accent, fontFamily: '"Courier New", monospace' }}>{edu.year}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 className="font-bold text-xs uppercase tracking-widest text-slate-700" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: accent }}>$</span> certifications
            </h2>
            <div className="flex flex-wrap" style={{ gap: '6px' }}>
              {certifications.map((cert) => (
                <span key={cert.id} className="text-xs rounded px-2 py-1" style={{ background: '#f1f5f9', border: `1px solid ${accent}`, color: '#334155' }}>
                  {cert.name}{cert.issuer ? ` (${cert.issuer})` : ''}{cert.year ? ` · ${cert.year}` : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <div>
            <h2 className="font-bold text-xs uppercase tracking-widest text-slate-700" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: accent }}>$</span> publications
            </h2>
            <div className="flex flex-col" style={{ gap: '6px' }}>
              {publications.map((pub) => (
                <div key={pub.id}>
                  <p className="text-sm text-slate-700 font-medium">{pub.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-mono">{pub.journal}{pub.year ? `, ${pub.year}` : ''}{pub.doi ? ` | doi:${pub.doi}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
