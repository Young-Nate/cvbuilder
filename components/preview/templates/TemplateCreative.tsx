'use client';

import { ResumeData } from '@/lib/types';

function formatDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m)-1]} ${y}` : y;
}

export default function TemplateCreative({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#7c3aed'; // default: purple-700
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;

  return (
    <div className="bg-white flex" style={{ maxWidth: '794px', margin: '0 auto', minHeight: '100%', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Left accent stripe */}
      <div style={{ width: '6px', background: accent, flexShrink: 0 }} />

      {/* Content */}
      <div style={{ flex: 1, padding: '40px 44px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '6px' }}>
            {personal.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={personal.photo} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            )}
            <div>
              <h1 className="font-black text-5xl" style={{ color: accent, letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px' }}>
                {personal.fullName}
              </h1>
              {personal.title && (
                <p className="font-semibold text-lg" style={{ color: accent, opacity: 0.7, marginBottom: '6px' }}>{personal.title}</p>
              )}
            </div>
          </div>
          {/* Contact with icons */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {personal.email && <span className="text-sm text-gray-600">📧 {personal.email}</span>}
            {personal.phone && <span className="text-sm text-gray-600">📱 {personal.phone}</span>}
            {personal.location && <span className="text-sm text-gray-600">📍 {personal.location}</span>}
            {personal.linkedin && <span className="text-sm text-gray-600">🔗 {personal.linkedin}</span>}
            {personal.portfolio && <span className="text-sm text-gray-600">🌐 {personal.portfolio}</span>}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '28px', background: 'linear-gradient(135deg, #f5f3ff, #fdf4ff)', borderRadius: '12px', padding: '16px 20px' }}>
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.languages.length > 0) && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="font-bold text-sm uppercase tracking-widest" style={{ color: accent, marginBottom: '12px' }}>Skills &amp; Languages</h2>
            {skills.technical.length > 0 && (
              <div className="flex flex-wrap" style={{ gap: '6px', marginBottom: '10px' }}>
                {skills.technical.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold rounded-full px-3 py-1"
                    style={{
                      border: `1px solid ${accent}`,
                      color: accent,
                      background: 'transparent',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {skills.languages.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs text-gray-600">
                    <span className="font-semibold" style={{ color: accent }}>{lang.name}</span>
                    <span className="text-gray-400"> · {lang.level}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="font-bold text-sm uppercase tracking-widest" style={{ color: accent, marginBottom: '16px' }}>Experience</h2>
            <div className="flex flex-col" style={{ gap: '18px' }}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '14px', opacity: 0.85 }}>
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <div>
                      <p className="font-bold text-sm text-gray-900">{exp.position}</p>
                      <p className="text-sm font-medium" style={{ color: accent }}>{exp.company}
                        {exp.location ? <span className="text-gray-400 font-normal"> · {exp.location}</span> : ''}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 rounded-full px-2 py-0.5 bg-gray-100">
                      {formatDate(exp.startDate)} – {formatDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul style={{ marginTop: '6px', paddingLeft: '14px' }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="text-xs text-gray-600 leading-relaxed" style={{ listStyleType: 'disc', marginBottom: '3px' }}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="font-bold text-sm uppercase tracking-widest" style={{ color: accent, marginBottom: '14px' }}>Projects</h2>
            <div className="grid grid-cols-2" style={{ gap: '12px' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ border: `1px solid ${accent}`, borderRadius: '10px', padding: '12px 14px', background: '#fafafa', opacity: 0.9 }}>
                  <p className="font-bold text-sm text-gray-900">{proj.name}</p>
                  {proj.link && <p className="text-xs mt-0.5" style={{ color: accent }}>{proj.link}</p>}
                  {proj.description && <p className="text-xs text-gray-600 mt-1">{proj.description}</p>}
                  {proj.tech && <p className="text-xs text-gray-400 mt-1 italic">{proj.tech}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="font-bold text-sm uppercase tracking-widest" style={{ color: accent, marginBottom: '12px' }}>Education</h2>
            <div className="flex flex-col" style={{ gap: '10px' }}>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{edu.degree}</p>
                    <p className="text-xs text-gray-500">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</p>
                    {edu.coursework && <p className="text-xs text-gray-400 mt-0.5">{edu.coursework}</p>}
                  </div>
                  {edu.year && <span className="text-xs text-gray-400 ml-4">{edu.year}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 className="font-bold text-sm uppercase tracking-widest" style={{ color: accent, marginBottom: '12px' }}>Certifications</h2>
            <div className="flex flex-wrap" style={{ gap: '8px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs rounded-lg px-3 py-2" style={{ border: `1px solid ${accent}`, color: accent, background: '#fafafa' }}>
                  <span className="font-semibold">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-500"> · {cert.issuer}</span>}
                  {cert.year && <span className="text-gray-400"> · {cert.year}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <div>
            <h2 className="font-bold text-sm uppercase tracking-widest" style={{ color: accent, marginBottom: '12px' }}>Publications</h2>
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {publications.map((pub) => (
                <div key={pub.id}>
                  <p className="text-sm text-gray-800 font-medium">{pub.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{pub.journal}{pub.year ? `, ${pub.year}` : ''}{pub.doi ? ` — ${pub.doi}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
