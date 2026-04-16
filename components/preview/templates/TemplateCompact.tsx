'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

export default function TemplateCompact({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#0284c7'; // default: sky-600
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  return (
    <div className="bg-white" style={{ maxWidth: '794px', margin: '0 auto', minHeight: '100%', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '24px 32px', fontSize: '11px' }}>
      {/* Header */}
      <div style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '8px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {personal.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={personal.photo} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            )}
            <div>
              <h1 style={{ fontWeight: 800, fontSize: '1.4rem', color: '#0c4a6e', lineHeight: 1.1, marginBottom: '2px' }}>{personal.fullName}</h1>
              {personal.title && <p style={{ fontWeight: 600, fontSize: '0.75rem', color: accent }}>{personal.title}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1px', fontSize: '10px', color: '#64748b' }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.portfolio && <span>{personal.portfolio}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5 }}>{summary}</p>
        </div>
      )}

      {/* Skills — 3 columns */}
      {(skills.technical.length > 0 || skills.languages.length > 0) && (
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px' }}>
            Skills
          </h2>
          {skills.technical.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px 8px', marginBottom: '4px' }}>
              {skills.technical.map((skill, i) => (
                <span key={i} style={{ fontSize: '10px', color: '#374151', lineHeight: 1.5 }}>· {skill}</span>
              ))}
            </div>
          )}
          {skills.languages.length > 0 && (
            <p style={{ fontSize: '10px', color: '#374151' }}>
              <span style={{ fontWeight: 600, color: accent }}>Languages: </span>
              {skills.languages.map(l => `${l.name} (${l.level})`).join(' · ')}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px' }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '11px', color: '#1e293b' }}>{exp.position}</span>
                    <span style={{ color: accent, fontSize: '10px' }}>{exp.company}</span>
                    {exp.location && <span style={{ color: '#94a3b8', fontSize: '10px' }}>{exp.location}</span>}
                  </div>
                  <span style={{ fontSize: '10px', color: '#64748b', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {formatDate(exp.startDate)}–{formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.bullets.length > 0 && (
                  <ul style={{ margin: '2px 0 0 12px', padding: 0 }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ fontSize: '10px', color: '#4b5563', lineHeight: 1.45, listStyleType: 'disc' }}>{b}</li>
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
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px' }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11px', color: '#1e293b' }}>{edu.degree}</span>
                  <span style={{ color: accent, fontSize: '10px', marginLeft: '6px' }}>{edu.institution}</span>
                  {edu.location && <span style={{ color: '#94a3b8', fontSize: '10px', marginLeft: '4px' }}>{edu.location}</span>}
                  {edu.coursework && <span style={{ color: '#94a3b8', fontSize: '10px', marginLeft: '4px' }}>· {edu.coursework}</span>}
                </div>
                {edu.year && <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '8px', whiteSpace: 'nowrap' }}>{edu.year}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px' }}>
            Certifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px 12px' }}>
            {certifications.map((cert) => (
              <span key={cert.id} style={{ fontSize: '10px', color: '#374151', lineHeight: 1.5 }}>
                <span style={{ fontWeight: 600 }}>{cert.name}</span>
                {cert.issuer ? ` · ${cert.issuer}` : ''}
                {cert.year ? ` (${cert.year})` : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px' }}>
            Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {projects.map((proj) => (
              <div key={proj.id}>
                <span style={{ fontWeight: 700, fontSize: '11px', color: '#1e293b' }}>{proj.name}</span>
                {proj.link && <span style={{ color: accent, fontSize: '10px', marginLeft: '6px' }}>{proj.link}</span>}
                {proj.tech && <span style={{ color: '#94a3b8', fontSize: '10px', marginLeft: '4px' }}>· {proj.tech}</span>}
                {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: 1.45, margin: '1px 0 0 0' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <div>
          <h2 style={{ fontSize: '10px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px' }}>
            Publications
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {publications.map((pub) => (
              <div key={pub.id}>
                <span style={{ fontWeight: 600, fontSize: '11px', color: '#1e293b' }}>{pub.title}</span>
                <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '4px' }}>
                  {pub.journal}{pub.year ? `, ${pub.year}` : ''}{pub.doi ? ` · ${pub.doi}` : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
