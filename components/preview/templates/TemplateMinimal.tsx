'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

export default function TemplateMinimal({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#9ca3af'; // default: gray-400
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  return (
    <div className="bg-white min-h-full font-sans text-gray-900" style={{ padding: '48px 56px', maxWidth: '794px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        {personal.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={personal.photo} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        )}
        <div>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-900" style={{ marginBottom: '4px' }}>
            {personal.fullName}
          </h1>
          {personal.title && (
            <p className="text-lg text-gray-500 font-light" style={{ marginBottom: '12px' }}>{personal.title}</p>
          )}
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.portfolio && <span>{personal.portfolio}</span>}
          </div>
        </div>
      </div>

      <hr style={{ marginBottom: '28px', borderColor: accent }} />

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '28px' }}>
          <h2 className="font-serif text-xs font-semibold uppercase tracking-widest" style={{ marginBottom: '10px', color: accent }}>Profile</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          <hr style={{ marginTop: '28px', borderColor: accent }} />
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 className="font-serif text-xs font-semibold uppercase tracking-widest" style={{ marginBottom: '16px', color: accent }}>Experience</h2>
          <div className="flex flex-col" style={{ gap: '20px' }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-sm text-gray-900">{exp.position}</span>
                    <span className="text-sm text-gray-500"> — {exp.company}</span>
                    {exp.location && <span className="text-sm text-gray-400">, {exp.location}</span>}
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.bullets.length > 0 && (
                  <ul style={{ marginTop: '6px', paddingLeft: '16px', gap: '4px', display: 'flex', flexDirection: 'column' }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-gray-600 leading-relaxed list-disc">{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <hr style={{ marginTop: '28px', borderColor: accent }} />
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 className="font-serif text-xs font-semibold uppercase tracking-widest" style={{ marginBottom: '16px', color: accent }}>Education</h2>
          <div className="flex flex-col" style={{ gap: '12px' }}>
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-sm text-gray-900">{edu.degree}</span>
                    <span className="text-sm text-gray-500"> — {edu.institution}</span>
                    {edu.location && <span className="text-sm text-gray-400">, {edu.location}</span>}
                  </div>
                  {edu.year && <span className="text-xs text-gray-400 ml-4">{edu.year}</span>}
                </div>
                {edu.coursework && <p className="text-xs text-gray-500 mt-1">{edu.coursework}</p>}
              </div>
            ))}
          </div>
          <hr style={{ marginTop: '28px', borderColor: accent }} />
        </div>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.languages.length > 0) && (
        <div style={{ marginBottom: '28px' }}>
          <h2 className="font-serif text-xs font-semibold uppercase tracking-widest" style={{ marginBottom: '12px', color: accent }}>Skills</h2>
          {skills.technical.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Technical: </span>
              <span className="text-sm text-gray-700">{skills.technical.join(' · ')}</span>
            </div>
          )}
          {skills.languages.length > 0 && (
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Languages: </span>
              <span className="text-sm text-gray-700">{skills.languages.map(l => `${l.name} (${l.level})`).join(' · ')}</span>
            </div>
          )}
          <hr style={{ marginTop: '28px', borderColor: accent }} />
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 className="font-serif text-xs font-semibold uppercase tracking-widest" style={{ marginBottom: '12px', color: accent }}>Certifications</h2>
          <div className="flex flex-col" style={{ gap: '6px' }}>
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span className="text-sm text-gray-700">{cert.name}{cert.issuer ? ` — ${cert.issuer}` : ''}</span>
                {cert.year && <span className="text-xs text-gray-400 ml-4">{cert.year}</span>}
              </div>
            ))}
          </div>
          <hr style={{ marginTop: '28px', borderColor: accent }} />
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 className="font-serif text-xs font-semibold uppercase tracking-widest" style={{ marginBottom: '12px', color: accent }}>Projects</h2>
          <div className="flex flex-col" style={{ gap: '12px' }}>
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-sm text-gray-900">{proj.name}</span>
                  {proj.link && <span className="text-xs text-gray-400">{proj.link}</span>}
                </div>
                {proj.description && <p className="text-sm text-gray-600 mt-1">{proj.description}</p>}
                {proj.tech && <p className="text-xs text-gray-400 mt-1">{proj.tech}</p>}
              </div>
            ))}
          </div>
          <hr style={{ marginTop: '28px', borderColor: accent }} />
        </div>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 className="font-serif text-xs font-semibold uppercase tracking-widest" style={{ marginBottom: '12px', color: accent }}>Publications</h2>
          <div className="flex flex-col" style={{ gap: '8px' }}>
            {publications.map((pub) => (
              <div key={pub.id}>
                <p className="text-sm text-gray-700 italic">{pub.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {pub.journal}{pub.year ? `, ${pub.year}` : ''}{pub.doi ? ` — ${pub.doi}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
