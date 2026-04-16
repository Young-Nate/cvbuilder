'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

export default function TemplateAcademic({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#7b2d26'; // default: maroon
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  return (
    <div style={{ background: '#fdfbf7', maxWidth: '794px', margin: '0 auto', minHeight: '100%', fontFamily: 'Georgia, "Times New Roman", serif', padding: '48px 56px' }}>
      {/* Header — centered, formal */}
      <div style={{ textAlign: 'center', marginBottom: '28px', borderBottom: `2px solid ${accent}`, paddingBottom: '20px' }}>
        {personal.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={personal.photo} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        )}
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1a1a1a', letterSpacing: '0.05em', marginBottom: '4px' }}>
          {personal.fullName}
        </h1>
        {personal.title && (
          <p style={{ fontSize: '1rem', color: accent, fontStyle: 'italic', marginBottom: '10px' }}>{personal.title}</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 16px', fontSize: '0.8rem', color: '#555' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', borderBottom: `1px solid ${accent}`, paddingBottom: '4px', opacity: 0.7 }}>
            Research Profile
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#333', lineHeight: 1.7, textAlign: 'justify' }}>{summary}</p>
        </div>
      )}

      {/* Publications (prominent for academic) */}
      {publications.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `1px solid ${accent}`, paddingBottom: '4px', opacity: 0.7 }}>
            Publications
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {publications.map((pub, idx) => (
              <div key={pub.id} style={{ paddingLeft: '24px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, top: 0, color: accent, fontSize: '0.8rem', fontWeight: 600 }}>[{idx + 1}]</span>
                <p style={{ fontSize: '0.875rem', color: '#222', lineHeight: 1.6 }}>
                  &ldquo;{pub.title}.&rdquo;{' '}
                  <span style={{ fontStyle: 'italic' }}>{pub.journal}</span>
                  {pub.year ? ` (${pub.year})` : ''}
                  {pub.doi ? <span style={{ color: accent, fontSize: '0.8rem' }}> DOI: {pub.doi}</span> : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `1px solid ${accent}`, paddingBottom: '4px', opacity: 0.7 }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1a1a1a' }}>{edu.degree}</p>
                  <p style={{ fontSize: '0.85rem', color: '#444', fontStyle: 'italic' }}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                  {edu.coursework && <p style={{ fontSize: '0.78rem', color: '#666', marginTop: '2px' }}>Coursework: {edu.coursework}</p>}
                </div>
                {edu.year && <span style={{ fontSize: '0.8rem', color: accent, whiteSpace: 'nowrap', marginLeft: '16px' }}>{edu.year}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `1px solid ${accent}`, paddingBottom: '4px', opacity: 0.7 }}>
            Academic &amp; Professional Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1a1a1a' }}>{exp.position}</p>
                    <p style={{ fontSize: '0.85rem', color: '#444', fontStyle: 'italic' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: accent, whiteSpace: 'nowrap', marginLeft: '16px' }}>
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.bullets.length > 0 && (
                  <ul style={{ marginTop: '6px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ fontSize: '0.8rem', color: '#444', lineHeight: 1.6, listStyleType: 'disc' }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects / Research Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `1px solid ${accent}`, paddingBottom: '4px', opacity: 0.7 }}>
            Research Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.map((proj) => (
              <div key={proj.id}>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1a1a1a' }}>{proj.name}
                  {proj.link && <span style={{ fontWeight: 400, fontSize: '0.78rem', color: accent, marginLeft: '8px' }}>{proj.link}</span>}
                </p>
                {proj.description && <p style={{ fontSize: '0.8rem', color: '#444', marginTop: '2px', lineHeight: 1.6, textAlign: 'justify' }}>{proj.description}</p>}
                {proj.tech && <p style={{ fontSize: '0.78rem', color: '#666', marginTop: '2px', fontStyle: 'italic' }}>Technologies: {proj.tech}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Languages — two columns */}
      {(skills.technical.length > 0 || skills.languages.length > 0) && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `1px solid ${accent}`, paddingBottom: '4px', opacity: 0.7 }}>
            Skills &amp; Languages
          </h2>
          <div style={{ display: 'flex', gap: '32px' }}>
            {skills.technical.length > 0 && (
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: '0.78rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Technical</p>
                <p style={{ fontSize: '0.8rem', color: '#444', lineHeight: 1.8 }}>{skills.technical.join(' · ')}</p>
              </div>
            )}
            {skills.languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: '0.78rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Languages</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {skills.languages.map((lang, i) => (
                    <p key={i} style={{ fontSize: '0.8rem', color: '#444' }}>{lang.name} — {lang.level}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `1px solid ${accent}`, paddingBottom: '4px', opacity: 0.7 }}>
            Certifications &amp; Honors
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#333' }}>{cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}</span>
                {cert.year && <span style={{ color: accent }}>{cert.year}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
