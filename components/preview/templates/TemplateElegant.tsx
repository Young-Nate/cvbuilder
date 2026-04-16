'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

export default function TemplateElegant({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#b07d62'; // default: warm brown
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  function Divider() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
        <div style={{ flex: 1, height: '1px', background: accent, opacity: 0.3 }} />
        <span style={{ color: accent, fontSize: '0.7rem', letterSpacing: '0.2em' }}>✦</span>
        <div style={{ flex: 1, height: '1px', background: accent, opacity: 0.3 }} />
      </div>
    );
  }

  function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '0.7rem', fontWeight: 600, color: accent, textTransform: 'uppercase', letterSpacing: '0.25em' }}>
          {children}
        </h2>
        <div style={{ width: '40px', height: '1px', background: accent, margin: '6px auto 0' }} />
      </div>
    );
  }

  return (
    <div style={{ background: '#fffef9', maxWidth: '794px', margin: '0 auto', minHeight: '100%', fontFamily: 'Georgia, "Times New Roman", serif', padding: '48px 64px' }}>
      {/* Centered header */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        {personal.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={personal.photo} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}` }} />
          </div>
        )}
        <h1 style={{ fontSize: '2.8rem', fontWeight: 400, color: '#2d1f17', letterSpacing: '0.12em', lineHeight: 1.1, marginBottom: '6px', textTransform: 'uppercase' }}>
          {personal.fullName}
        </h1>
        {personal.title && (
          <p style={{ fontSize: '0.9rem', color: accent, fontStyle: 'italic', letterSpacing: '0.08em', marginBottom: '14px' }}>{personal.title}</p>
        )}
        {/* Contact line */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 12px', fontSize: '0.72rem', color: '#7c6153' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </div>

      {/* Top ornamental border */}
      <div style={{ margin: '16px 0 4px', textAlign: 'center' }}>
        <div style={{ border: `1px solid ${accent}`, borderBottom: 'none', height: '8px', margin: '0 24px', opacity: 0.4 }} />
        <div style={{ border: `1px solid ${accent}`, height: '1px', margin: '3px 0', opacity: 0.4 }} />
      </div>

      {/* Summary */}
      {summary && (
        <>
          <Divider />
          <div style={{ marginBottom: '4px' }}>
            <SectionTitle>Profile</SectionTitle>
            <p style={{ fontSize: '0.85rem', color: '#3d2b22', lineHeight: 1.8, textAlign: 'center', fontStyle: 'italic' }}>
              {summary}
            </p>
          </div>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <Divider />
          <SectionTitle>Experience</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#2d1f17', letterSpacing: '0.03em' }}>{exp.position}</p>
                <p style={{ fontSize: '0.8rem', color: accent, fontStyle: 'italic', marginBottom: '2px' }}>
                  {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                </p>
                <p style={{ fontSize: '0.72rem', color: '#9c8076', letterSpacing: '0.06em' }}>
                  {formatDate(exp.startDate)} – {formatDate(exp.endDate, exp.current)}
                </p>
                {exp.bullets.length > 0 && (
                  <ul style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '3px', textAlign: 'left', paddingLeft: '20px' }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ fontSize: '0.78rem', color: '#4a3728', lineHeight: 1.65, listStyleType: 'disc' }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <Divider />
          <SectionTitle>Education</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'center' }}>
            {education.map((edu) => (
              <div key={edu.id}>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#2d1f17' }}>{edu.degree}</p>
                <p style={{ fontSize: '0.8rem', color: accent, fontStyle: 'italic' }}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</p>
                {edu.year && <p style={{ fontSize: '0.72rem', color: '#9c8076' }}>{edu.year}</p>}
                {edu.coursework && <p style={{ fontSize: '0.72rem', color: '#7c6153', marginTop: '2px' }}>{edu.coursework}</p>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.languages.length > 0) && (
        <>
          <Divider />
          <SectionTitle>Skills &amp; Languages</SectionTitle>
          <div style={{ textAlign: 'center' }}>
            {skills.technical.length > 0 && (
              <p style={{ fontSize: '0.78rem', color: '#4a3728', lineHeight: 1.9, marginBottom: '6px' }}>
                {skills.technical.join('  ·  ')}
              </p>
            )}
            {skills.languages.length > 0 && (
              <p style={{ fontSize: '0.78rem', color: '#7c6153', fontStyle: 'italic' }}>
                {skills.languages.map(l => `${l.name} (${l.level})`).join('  ·  ')}
              </p>
            )}
          </div>
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <Divider />
          <SectionTitle>Certifications</SectionTitle>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {certifications.map((cert) => (
              <p key={cert.id} style={{ fontSize: '0.78rem', color: '#4a3728' }}>
                <span style={{ fontWeight: 600 }}>{cert.name}</span>
                {cert.issuer ? <span style={{ color: accent }}> · {cert.issuer}</span> : ''}
                {cert.year ? <span style={{ color: '#9c8076' }}> · {cert.year}</span> : ''}
              </p>
            ))}
          </div>
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <Divider />
          <SectionTitle>Projects</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.map((proj) => (
              <div key={proj.id} style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#2d1f17' }}>{proj.name}
                  {proj.link && <span style={{ fontWeight: 400, fontSize: '0.72rem', color: accent, marginLeft: '8px', fontStyle: 'italic' }}>{proj.link}</span>}
                </p>
                {proj.description && <p style={{ fontSize: '0.78rem', color: '#4a3728', lineHeight: 1.6, marginTop: '2px' }}>{proj.description}</p>}
                {proj.tech && <p style={{ fontSize: '0.72rem', color: '#9c8076', fontStyle: 'italic', marginTop: '2px' }}>{proj.tech}</p>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <>
          <Divider />
          <SectionTitle>Publications</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
            {publications.map((pub) => (
              <div key={pub.id}>
                <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#2d1f17' }}>&ldquo;{pub.title}&rdquo;</p>
                <p style={{ fontSize: '0.72rem', color: '#7c6153', marginTop: '2px' }}>
                  {pub.journal}{pub.year ? `, ${pub.year}` : ''}{pub.doi ? ` · ${pub.doi}` : ''}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bottom ornamental border */}
      <div style={{ margin: '20px 0 0', textAlign: 'center' }}>
        <div style={{ border: `1px solid ${accent}`, height: '1px', margin: '0 0 3px', opacity: 0.4 }} />
        <div style={{ border: `1px solid ${accent}`, borderTop: 'none', height: '8px', margin: '0 24px', opacity: 0.4 }} />
      </div>
    </div>
  );
}
