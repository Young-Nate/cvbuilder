'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

export default function TemplateATS({ data, accentColor: _accentColor }: { data: ResumeData; accentColor?: string }) {
  // ATS is always black/white — accentColor prop accepted but intentionally not used
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  const baseStyle: React.CSSProperties = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#000000',
    background: '#ffffff',
  };

  return (
    <div style={{ ...baseStyle, maxWidth: '794px', margin: '0 auto', minHeight: '100%', padding: '36px 48px' }}>
      {/* Name and title — no photo for ATS */}
      <div style={{ marginBottom: '12px' }}>
        <h1 style={{ ...baseStyle, fontSize: '1.6rem', fontWeight: 700, margin: '0 0 3px 0', letterSpacing: '0' }}>
          {personal.fullName}
        </h1>
        {personal.title && (
          <p style={{ ...baseStyle, fontSize: '0.9rem', margin: '0 0 6px 0' }}>{personal.title}</p>
        )}
        {/* Contact — plain text */}
        <p style={{ ...baseStyle, fontSize: '0.8rem', margin: 0 }}>
          {[personal.email, personal.phone, personal.location, personal.linkedin, personal.portfolio]
            .filter(Boolean)
            .join(' | ')}
        </p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '10px 0' }} />

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...baseStyle, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p style={{ ...baseStyle, fontSize: '0.8rem', lineHeight: 1.55, margin: 0 }}>{summary}</p>
          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '10px 0 0' }} />
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...baseStyle, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            WORK EXPERIENCE
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ ...baseStyle, fontWeight: 700, fontSize: '0.82rem', margin: 0 }}>{exp.position}</p>
                  <span style={{ ...baseStyle, fontSize: '0.78rem' }}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                <p style={{ ...baseStyle, fontSize: '0.8rem', margin: '1px 0' }}>
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </p>
                {exp.bullets.length > 0 && (
                  <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ ...baseStyle, fontSize: '0.78rem', lineHeight: 1.5, listStyleType: 'disc', marginBottom: '2px' }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '10px 0 0' }} />
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...baseStyle, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            EDUCATION
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {education.map((edu) => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ ...baseStyle, fontWeight: 700, fontSize: '0.82rem', margin: 0 }}>{edu.degree}</p>
                  {edu.year && <span style={{ ...baseStyle, fontSize: '0.78rem' }}>{edu.year}</span>}
                </div>
                <p style={{ ...baseStyle, fontSize: '0.8rem', margin: '1px 0' }}>
                  {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                </p>
                {edu.coursework && (
                  <p style={{ ...baseStyle, fontSize: '0.78rem', margin: '1px 0' }}>Relevant Coursework: {edu.coursework}</p>
                )}
              </div>
            ))}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '10px 0 0' }} />
        </div>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.languages.length > 0) && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...baseStyle, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 6px 0' }}>
            SKILLS
          </h2>
          {skills.technical.length > 0 && (
            <p style={{ ...baseStyle, fontSize: '0.8rem', lineHeight: 1.5, margin: '0 0 4px 0' }}>
              <span style={{ fontWeight: 700 }}>Technical Skills: </span>
              {skills.technical.join(', ')}
            </p>
          )}
          {skills.languages.length > 0 && (
            <p style={{ ...baseStyle, fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
              <span style={{ fontWeight: 700 }}>Languages: </span>
              {skills.languages.map(l => `${l.name} (${l.level})`).join(', ')}
            </p>
          )}
          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '10px 0 0' }} />
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...baseStyle, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 6px 0' }}>
            CERTIFICATIONS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ ...baseStyle, fontSize: '0.8rem', margin: 0 }}>
                  {cert.name}{cert.issuer ? ` - ${cert.issuer}` : ''}
                </p>
                {cert.year && <span style={{ ...baseStyle, fontSize: '0.78rem' }}>{cert.year}</span>}
              </div>
            ))}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '10px 0 0' }} />
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...baseStyle, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 6px 0' }}>
            PROJECTS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {projects.map((proj) => (
              <div key={proj.id}>
                <p style={{ ...baseStyle, fontWeight: 700, fontSize: '0.82rem', margin: 0 }}>
                  {proj.name}{proj.link ? ` - ${proj.link}` : ''}
                </p>
                {proj.description && (
                  <p style={{ ...baseStyle, fontSize: '0.78rem', lineHeight: 1.5, margin: '1px 0' }}>{proj.description}</p>
                )}
                {proj.tech && (
                  <p style={{ ...baseStyle, fontSize: '0.78rem', margin: '1px 0' }}>Technologies: {proj.tech}</p>
                )}
              </div>
            ))}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #000', margin: '10px 0 0' }} />
        </div>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ ...baseStyle, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 6px 0' }}>
            PUBLICATIONS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {publications.map((pub) => (
              <div key={pub.id}>
                <p style={{ ...baseStyle, fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                  {pub.title}. {pub.journal}{pub.year ? `, ${pub.year}` : ''}.{pub.doi ? ` DOI: ${pub.doi}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
