'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

export default function TemplatePortfolio({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#f59e0b'; // default: amber-400
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  return (
    <div className="bg-white" style={{ maxWidth: '794px', margin: '0 auto', minHeight: '100%', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Hero header */}
      <div style={{ background: '#1c1917', padding: '36px 48px', display: 'flex', alignItems: 'center', gap: '28px' }}>
        {/* Photo or avatar */}
        {personal.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={personal.photo} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `3px solid ${accent}` }} />
        ) : (
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, border: `3px solid ${accent}`,
          }}>
            <span style={{ color: '#1c1917', fontWeight: 900, fontSize: '2rem', lineHeight: 1 }}>
              {personal.fullName ? personal.fullName.split(' ').map(n => n[0]).slice(0, 2).join('') : '?'}
            </span>
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.05, marginBottom: '4px' }}>
            {personal.fullName}
          </h1>
          {personal.title && (
            <p style={{ color: accent, fontWeight: 600, fontSize: '1rem', marginBottom: '10px' }}>{personal.title}</p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {personal.email && <span style={{ color: '#a8a29e', fontSize: '0.75rem' }}>{personal.email}</span>}
            {personal.phone && <span style={{ color: '#a8a29e', fontSize: '0.75rem' }}>{personal.phone}</span>}
            {personal.location && <span style={{ color: '#a8a29e', fontSize: '0.75rem' }}>{personal.location}</span>}
            {personal.linkedin && (
              <span style={{ color: accent, fontSize: '0.75rem', fontWeight: 600 }}>{personal.linkedin}</span>
            )}
            {personal.portfolio && (
              <span style={{ color: accent, fontSize: '0.75rem', fontWeight: 600 }}>{personal.portfolio}</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 48px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '0.95rem', color: '#44403c', lineHeight: 1.7, borderLeft: `4px solid ${accent}`, paddingLeft: '16px' }}>
              {summary}
            </p>
          </div>
        )}

        {/* Projects — two-column cards (prominent) */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1rem', color: '#1c1917', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '3px', background: accent, display: 'inline-block', borderRadius: '2px' }} />
              Featured Work
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    border: '1px solid #e7e5e4',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    background: '#fff',
                    borderTop: `3px solid ${accent}`,
                  }}
                >
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1c1917', marginBottom: '4px' }}>{proj.name}</p>
                  {proj.link && (
                    <p style={{ fontSize: '0.7rem', color: accent, marginBottom: '6px', fontWeight: 600, wordBreak: 'break-all' }}>{proj.link}</p>
                  )}
                  {proj.description && <p style={{ fontSize: '0.75rem', color: '#57534e', lineHeight: 1.5, marginBottom: '6px' }}>{proj.description}</p>}
                  {proj.tech && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {proj.tech.split(',').map((t, i) => (
                        <span key={i} style={{ fontSize: '0.65rem', background: '#fef3c7', color: '#92400e', borderRadius: '4px', padding: '1px 6px', fontWeight: 500 }}>
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
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1rem', color: '#1c1917', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '3px', background: accent, display: 'inline-block', borderRadius: '2px' }} />
              Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '4px', background: '#e7e5e4', borderRadius: '2px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1c1917' }}>{exp.position}</p>
                        <p style={{ fontSize: '0.8rem', color: '#78716c' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: accent, fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                        {formatDate(exp.startDate)} – {formatDate(exp.endDate, exp.current)}
                      </span>
                    </div>
                    {exp.bullets.length > 0 && (
                      <ul style={{ marginTop: '6px', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {exp.bullets.map((b, i) => (
                          <li key={i} style={{ fontSize: '0.75rem', color: '#57534e', lineHeight: 1.5, listStyleType: 'disc' }}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-col: Education + Skills */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '28px' }}>
          {education.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1c1917', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '16px', height: '2px', background: accent, display: 'inline-block', borderRadius: '2px' }} />
                Education
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p style={{ fontWeight: 600, fontSize: '0.8rem', color: '#1c1917' }}>{edu.degree}</p>
                    <p style={{ fontSize: '0.75rem', color: '#78716c' }}>{edu.institution}{edu.year ? ` · ${edu.year}` : ''}</p>
                    {edu.coursework && <p style={{ fontSize: '0.7rem', color: '#a8a29e', marginTop: '2px' }}>{edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(skills.technical.length > 0 || skills.languages.length > 0) && (
            <div style={{ flex: 1 }}>
              <h2 style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1c1917', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '16px', height: '2px', background: accent, display: 'inline-block', borderRadius: '2px' }} />
                Skills
              </h2>
              {skills.technical.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
                  {skills.technical.map((skill, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#92400e', borderRadius: '4px', padding: '2px 8px', fontWeight: 500 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              {skills.languages.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {skills.languages.map((lang, i) => (
                    <p key={i} style={{ fontSize: '0.75rem', color: '#57534e' }}>
                      <span style={{ fontWeight: 600 }}>{lang.name}</span> · {lang.level}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1c1917', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '16px', height: '2px', background: accent, display: 'inline-block', borderRadius: '2px' }} />
              Certifications
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '0.75rem', border: `1px solid ${accent}`, borderRadius: '6px', padding: '5px 10px', color: '#44403c' }}>
                  <span style={{ fontWeight: 600 }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#78716c' }}> · {cert.issuer}</span>}
                  {cert.year && <span style={{ color: accent }}> · {cert.year}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1c1917', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '16px', height: '2px', background: accent, display: 'inline-block', borderRadius: '2px' }} />
              Publications
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {publications.map((pub) => (
                <div key={pub.id}>
                  <p style={{ fontSize: '0.8rem', color: '#1c1917', fontWeight: 500 }}>{pub.title}</p>
                  <p style={{ fontSize: '0.72rem', color: '#78716c', marginTop: '1px' }}>{pub.journal}{pub.year ? `, ${pub.year}` : ''}{pub.doi ? ` · ${pub.doi}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
