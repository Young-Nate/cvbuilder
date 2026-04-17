'use client';

import { Document, Page, View, Text, Link, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/types';
import { ComponentType } from 'react';

// ─── Font Registration ────────────────────────────────────────────────────────
// Using built-in PDF fonts — no external download required.
// Times-Roman / Times-Bold for serif templates
// Courier for monospace templates
// Helvetica for ATS template

// ─── Date Formatter ───────────────────────────────────────────────────────────
function fmtDate(d: string, current?: boolean) {
  if (current) return 'Present';
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return m ? `${months[parseInt(m) - 1]} ${y}` : y;
}

// ─── 1. PdfMinimal ────────────────────────────────────────────────────────────
const minimalStyles = StyleSheet.create({
  page: { fontFamily: 'Times-Roman', fontSize: 11, paddingTop: 40, paddingBottom: 40, paddingLeft: 50, paddingRight: 50, color: '#2c2c2c' },
  name: { fontFamily: 'Times-Bold', fontSize: 24, marginBottom: 2 },
  title: { fontFamily: 'Times-Roman', fontSize: 12, color: '#555555', marginBottom: 6 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', fontSize: 10, color: '#555555', marginBottom: 14, gap: 10 },
  contactItem: { marginRight: 10 },
  rule: { borderBottomWidth: 0.75, borderBottomColor: '#aaaaaa', marginBottom: 8 },
  sectionTitle: { fontFamily: 'Times-Bold', fontSize: 13, marginBottom: 4 },
  summary: { fontSize: 11, lineHeight: 1.5, marginBottom: 12 },
  expBlock: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  expPosition: { fontFamily: 'Times-Bold', fontSize: 11 },
  expCompany: { fontFamily: 'Times-Roman', fontSize: 11, color: '#444' },
  expDate: { fontSize: 10, color: '#666' },
  bullet: { fontSize: 10, lineHeight: 1.45, marginLeft: 12, marginBottom: 1 },
  eduBlock: { marginBottom: 8 },
  eduRow: { flexDirection: 'row', justifyContent: 'space-between' },
  eduDegree: { fontFamily: 'Times-Bold', fontSize: 11 },
  eduInstitution: { fontSize: 10, color: '#555' },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  skillTag: { fontSize: 10, color: '#333', borderWidth: 0.5, borderColor: '#aaa', paddingHorizontal: 6, paddingVertical: 2 },
  section: { marginBottom: 14 },
  langRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  langItem: { fontSize: 10 },
  certBlock: { marginBottom: 5 },
  certName: { fontFamily: 'Times-Bold', fontSize: 10 },
  certSub: { fontSize: 10, color: '#555' },
  projBlock: { marginBottom: 8 },
  projName: { fontFamily: 'Times-Bold', fontSize: 11 },
  projDesc: { fontSize: 10, color: '#444', lineHeight: 1.4 },
  pubBlock: { marginBottom: 6 },
  pubTitle: { fontFamily: 'Times-Bold', fontSize: 10 },
  pubSub: { fontSize: 10, color: '#555' },
});

function PdfMinimal({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#2c2c2c';
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={minimalStyles.page}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2, gap: 12 }}>
          {personal.photo && (
            <Image src={personal.photo} style={{ width: 45, height: 45, borderRadius: 22 }} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={[minimalStyles.name, { color: accent }]}>{personal.fullName}</Text>
            {personal.title ? <Text style={minimalStyles.title}>{personal.title}</Text> : null}
          </View>
        </View>
        <View style={minimalStyles.contactRow}>
          {personal.email ? <Text style={minimalStyles.contactItem}>{personal.email}</Text> : null}
          {personal.phone ? <Text style={minimalStyles.contactItem}>{personal.phone}</Text> : null}
          {personal.location ? <Text style={minimalStyles.contactItem}>{personal.location}</Text> : null}
          {personal.portfolio ? <Link src={personal.portfolio} style={{ ...minimalStyles.contactItem, color: '#555' }}>{personal.portfolio}</Link> : null}
          {personal.linkedin ? <Link src={personal.linkedin} style={{ ...minimalStyles.contactItem, color: '#555' }}>{personal.linkedin}</Link> : null}
        </View>
        <View style={minimalStyles.rule} />

        {/* Summary */}
        {summary ? (
          <View style={minimalStyles.section}>
            <Text style={[minimalStyles.sectionTitle, { color: accent }]}>Summary</Text>
            <View style={minimalStyles.rule} />
            <Text style={minimalStyles.summary}>{summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {experience.length > 0 ? (
          <View style={minimalStyles.section}>
            <Text style={[minimalStyles.sectionTitle, { color: accent }]}>Experience</Text>
            <View style={minimalStyles.rule} />
            {experience.map((exp) => (
              <View key={exp.id} style={minimalStyles.expBlock} wrap={false}>
                <View style={minimalStyles.expHeader}>
                  <View>
                    <Text style={minimalStyles.expPosition}>{exp.position}</Text>
                    <Text style={minimalStyles.expCompany}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                  </View>
                  <Text style={minimalStyles.expDate}>{fmtDate(exp.startDate)} – {fmtDate(exp.endDate, exp.current)}</Text>
                </View>
                {exp.bullets.filter(b => b.trim()).map((b, i) => (
                  <Text key={i} style={minimalStyles.bullet}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {education.length > 0 ? (
          <View style={minimalStyles.section}>
            <Text style={[minimalStyles.sectionTitle, { color: accent }]}>Education</Text>
            <View style={minimalStyles.rule} />
            {education.map((edu) => (
              <View key={edu.id} style={minimalStyles.eduBlock} wrap={false}>
                <View style={minimalStyles.eduRow}>
                  <Text style={minimalStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={{ fontSize: 10, color: '#666' }}>{edu.year}</Text>
                </View>
                <Text style={minimalStyles.eduInstitution}>{edu.institution}{edu.location ? ` — ${edu.location}` : ''}</Text>
                {edu.coursework ? <Text style={{ fontSize: 10, color: '#666' }}>Coursework: {edu.coursework}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
        {skills.technical.length > 0 ? (
          <View style={minimalStyles.section}>
            <Text style={[minimalStyles.sectionTitle, { color: accent }]}>Skills</Text>
            <View style={minimalStyles.rule} />
            <View style={minimalStyles.skillsRow}>
              {skills.technical.map((s, i) => <Text key={i} style={minimalStyles.skillTag}>{s}</Text>)}
            </View>
          </View>
        ) : null}

        {/* Languages */}
        {skills.languages.length > 0 ? (
          <View style={minimalStyles.section}>
            <Text style={[minimalStyles.sectionTitle, { color: accent }]}>Languages</Text>
            <View style={minimalStyles.rule} />
            <View style={minimalStyles.langRow}>
              {skills.languages.map((l, i) => (
                <Text key={i} style={minimalStyles.langItem}>{l.name} ({l.level})</Text>
              ))}
            </View>
          </View>
        ) : null}

        {/* Certifications */}
        {certifications.length > 0 ? (
          <View style={minimalStyles.section}>
            <Text style={[minimalStyles.sectionTitle, { color: accent }]}>Certifications</Text>
            <View style={minimalStyles.rule} />
            {certifications.map((c) => (
              <View key={c.id} style={minimalStyles.certBlock} wrap={false}>
                <Text style={minimalStyles.certName}>{c.name}</Text>
                <Text style={minimalStyles.certSub}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Projects */}
        {projects.length > 0 ? (
          <View style={minimalStyles.section}>
            <Text style={[minimalStyles.sectionTitle, { color: accent }]}>Projects</Text>
            <View style={minimalStyles.rule} />
            {projects.map((p) => (
              <View key={p.id} style={minimalStyles.projBlock} wrap={false}>
                <Text style={minimalStyles.projName}>{p.name}</Text>
                {p.tech ? <Text style={{ fontSize: 10, color: '#666', marginBottom: 2 }}>{p.tech}</Text> : null}
                <Text style={minimalStyles.projDesc}>{p.description}</Text>
                {p.link ? <Link src={p.link} style={{ fontSize: 10, color: '#555' }}>{p.link}</Link> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Publications */}
        {publications.length > 0 ? (
          <View style={minimalStyles.section}>
            <Text style={[minimalStyles.sectionTitle, { color: accent }]}>Publications</Text>
            <View style={minimalStyles.rule} />
            {publications.map((pub) => (
              <View key={pub.id} style={minimalStyles.pubBlock} wrap={false}>
                <Text style={minimalStyles.pubTitle}>{pub.title}</Text>
                <Text style={minimalStyles.pubSub}>{pub.journal}{pub.year ? ` · ${pub.year}` : ''}{pub.doi ? ` · DOI: ${pub.doi}` : ''}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

// ─── 2. PdfModernSplit ─────────────────────────────────────────────────────────
const splitStyles = StyleSheet.create({
  page: { fontSize: 10, flexDirection: 'row', backgroundColor: '#ffffff' },
  leftCol: { width: '30%', color: '#ffffff', paddingTop: 36, paddingBottom: 36, paddingLeft: 18, paddingRight: 18, overflow: 'hidden' },
  rightCol: { width: '70%', paddingTop: 36, paddingBottom: 36, paddingLeft: 26, paddingRight: 28, color: '#2c2c2c' },
  nameBlock: { marginBottom: 28 },
  photoWrap: { alignItems: 'center', marginBottom: 14 },
  name: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 3, lineHeight: 1.2 },
  jobTitle: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  leftSection: { marginBottom: 22 },
  leftSectionTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, color: 'rgba(255,255,255,0.5)' },
  contactItem: { fontSize: 8.5, color: 'rgba(255,255,255,0.75)', marginBottom: 5, lineHeight: 1.4 },
  contactLink: { fontSize: 8.5, color: 'rgba(255,255,255,0.75)', marginBottom: 5, lineHeight: 1.4, textDecoration: 'none' },
  skillBadge: { color: 'rgba(255,255,255,0.9)', fontSize: 8.5, paddingHorizontal: 6, paddingVertical: 2.5, marginBottom: 4, marginRight: 4, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 3 },
  langRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  langName: { fontSize: 8.5, color: 'rgba(255,255,255,0.9)' },
  langLevel: { fontSize: 8.5, color: 'rgba(255,255,255,0.5)' },
  langBar: { height: 3, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, marginBottom: 2 },
  langFill: { height: 3, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 2 },
  rightSection: { marginBottom: 22 },
  rightSectionTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1.5, color: '#64748b', marginBottom: 8, paddingBottom: 5, borderBottomWidth: 1.5, borderBottomColor: '#e2e8f0' },
  summary: { fontSize: 9.5, lineHeight: 1.6, color: '#475569', marginTop: 2 },
  expBlock: { marginBottom: 14 },
  expTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 1 },
  expPosition: { fontFamily: 'Helvetica-Bold', fontSize: 10.5, color: '#1e293b' },
  expDate: { fontSize: 8.5, color: '#94a3b8', flexShrink: 0, marginLeft: 8 },
  expCompany: { fontSize: 9.5, marginBottom: 4 },
  bullet: { fontSize: 9, lineHeight: 1.5, marginLeft: 12, marginBottom: 2, color: '#475569' },
  eduBlock: { marginBottom: 10 },
  eduTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  eduDegree: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#1e293b' },
  eduYear: { fontSize: 8.5, color: '#94a3b8', flexShrink: 0, marginLeft: 8 },
  eduMeta: { fontSize: 9, marginBottom: 2 },
  eduCoursework: { fontSize: 8.5, color: '#64748b', marginTop: 2 },
  certBlock: { marginBottom: 6 },
  certName: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: 'rgba(255,255,255,0.9)' },
  certSub: { fontSize: 8, color: 'rgba(255,255,255,0.5)' },
  projBlock: { marginBottom: 10 },
  projName: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#1e293b' },
  projDesc: { fontSize: 9, color: '#475569', lineHeight: 1.5, marginTop: 2 },
  projTech: { fontSize: 8.5, color: '#94a3b8', fontFamily: 'Helvetica-Oblique', marginTop: 2 },
  pubBlock: { marginBottom: 8 },
  pubTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: '#334155' },
  pubSub: { fontSize: 8.5, color: '#64748b', marginTop: 1 },
});

const langPercent: Record<string, number> = {
  Native: 100, Fluent: 85, Advanced: 70, Intermediate: 50, Beginner: 30,
};

function PdfModernSplit({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#1e3a5f';
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={splitStyles.page}>
        {/* Left Column */}
        <View style={[splitStyles.leftCol, { backgroundColor: accent }]}>
          {/* Photo */}
          {personal.photo ? (
            <View style={splitStyles.photoWrap}>
              <Image src={personal.photo} style={{ width: 65, height: 65, borderRadius: 32, objectFit: 'cover' }} />
            </View>
          ) : null}

          {/* Name */}
          <View style={splitStyles.nameBlock}>
            <Text style={splitStyles.name}>{personal.fullName}</Text>
            {personal.title ? <Text style={splitStyles.jobTitle}>{personal.title}</Text> : null}
          </View>

          {/* Contact */}
          <View style={splitStyles.leftSection}>
            <Text style={splitStyles.leftSectionTitle}>Contact</Text>
            {personal.email ? <Text style={splitStyles.contactItem}>{personal.email}</Text> : null}
            {personal.phone ? <Text style={splitStyles.contactItem}>{personal.phone}</Text> : null}
            {personal.location ? <Text style={splitStyles.contactItem}>{personal.location}</Text> : null}
            {personal.linkedin ? (
              <Link src={personal.linkedin} style={splitStyles.contactLink}>
                <Text style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.75)' }}>{personal.linkedin}</Text>
              </Link>
            ) : null}
            {personal.portfolio ? (
              <Link src={personal.portfolio} style={splitStyles.contactLink}>
                <Text style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.75)' }}>{personal.portfolio}</Text>
              </Link>
            ) : null}
          </View>

          {/* Skills */}
          {skills.technical.length > 0 ? (
            <View style={splitStyles.leftSection}>
              <Text style={splitStyles.leftSectionTitle}>Skills</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {skills.technical.map((s, i) => <Text key={i} style={splitStyles.skillBadge}>{s}</Text>)}
              </View>
            </View>
          ) : null}

          {/* Languages */}
          {skills.languages.length > 0 ? (
            <View style={splitStyles.leftSection}>
              <Text style={splitStyles.leftSectionTitle}>Languages</Text>
              {skills.languages.map((l, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <View style={splitStyles.langRow}>
                    <Text style={splitStyles.langName}>{l.name}</Text>
                    <Text style={splitStyles.langLevel}>{l.level}</Text>
                  </View>
                  <View style={splitStyles.langBar}>
                    <View style={[splitStyles.langFill, { width: `${langPercent[l.level] || 50}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {/* Certifications in left col */}
          {certifications.length > 0 ? (
            <View style={splitStyles.leftSection}>
              <Text style={splitStyles.leftSectionTitle}>Certifications</Text>
              {certifications.map((c) => (
                <View key={c.id} style={splitStyles.certBlock}>
                  <Text style={splitStyles.certName}>{c.name}</Text>
                  <Text style={splitStyles.certSub}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* Right Column */}
        <View style={splitStyles.rightCol}>
          {/* Summary */}
          {summary ? (
            <View style={splitStyles.rightSection}>
              <Text style={splitStyles.rightSectionTitle}>Summary</Text>
              <Text style={splitStyles.summary}>{summary}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {experience.length > 0 ? (
            <View style={splitStyles.rightSection}>
              <Text style={splitStyles.rightSectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={splitStyles.expBlock} wrap={false}>
                  <View style={splitStyles.expTopRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={splitStyles.expPosition}>{exp.position}</Text>
                      <Text style={[splitStyles.expCompany, { color: accent }]}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</Text>
                    </View>
                    <Text style={splitStyles.expDate}>{fmtDate(exp.startDate)} – {fmtDate(exp.endDate, exp.current)}</Text>
                  </View>
                  {exp.bullets.filter(b => b.trim()).map((b, i) => (
                    <Text key={i} style={splitStyles.bullet}>• {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {/* Education */}
          {education.length > 0 ? (
            <View style={splitStyles.rightSection}>
              <Text style={splitStyles.rightSectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={splitStyles.eduBlock} wrap={false}>
                  <View style={splitStyles.eduTopRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={splitStyles.eduDegree}>{edu.degree}</Text>
                      <Text style={[splitStyles.eduMeta, { color: accent }]}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</Text>
                    </View>
                    {edu.year ? <Text style={splitStyles.eduYear}>{edu.year}</Text> : null}
                  </View>
                  {edu.coursework ? <Text style={splitStyles.eduCoursework}>{edu.coursework}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* Projects */}
          {projects.length > 0 ? (
            <View style={splitStyles.rightSection}>
              <Text style={splitStyles.rightSectionTitle}>Projects</Text>
              {projects.map((p) => (
                <View key={p.id} style={splitStyles.projBlock} wrap={false}>
                  <Text style={splitStyles.projName}>{p.name}</Text>
                  {p.description ? <Text style={splitStyles.projDesc}>{p.description}</Text> : null}
                  {p.tech ? <Text style={splitStyles.projTech}>{p.tech}</Text> : null}
                  {p.link ? <Link src={p.link} style={{ fontSize: 8.5, color: accent, marginTop: 2, textDecoration: 'none' }}><Text>{p.link}</Text></Link> : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* Publications */}
          {publications.length > 0 ? (
            <View style={splitStyles.rightSection}>
              <Text style={splitStyles.rightSectionTitle}>Publications</Text>
              {publications.map((pub) => (
                <View key={pub.id} style={splitStyles.pubBlock} wrap={false}>
                  <Text style={splitStyles.pubTitle}>{pub.title}</Text>
                  <Text style={splitStyles.pubSub}>{pub.journal}{pub.year ? `, ${pub.year}` : ''}{pub.doi ? ` — DOI: ${pub.doi}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}

// ─── 3. PdfExecutive ──────────────────────────────────────────────────────────
const execStyles = StyleSheet.create({
  page: { fontSize: 10, backgroundColor: '#ffffff', color: '#1a2533', paddingBottom: 36 },
  topBar: { paddingHorizontal: 40, paddingTop: 28, paddingBottom: 20 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, color: '#ffffff', marginBottom: 3 },
  titleLine: { fontFamily: 'Helvetica', fontSize: 11, color: '#9ab4cc', marginBottom: 10 },
  contactStrip: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  contactItem: { fontSize: 9, color: '#c8daea' },
  body: { paddingHorizontal: 40, paddingTop: 18 },
  section: { marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  sectionTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
  sectionLine: { flex: 1, marginLeft: 8, borderBottomWidth: 1.5 },
  summary: { fontSize: 10, lineHeight: 1.55, color: '#333' },
  expBlock: { marginBottom: 9 },
  expTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  expPosition: { fontFamily: 'Helvetica-Bold', fontSize: 10.5, color: '#1a2533' },
  expDate: { fontSize: 9, color: '#4a6585', fontFamily: 'Helvetica-Oblique' },
  expCompany: { fontSize: 9.5, color: '#4a6585', marginBottom: 3 },
  bullet: { fontSize: 9.5, lineHeight: 1.4, marginLeft: 10, marginBottom: 1 },
  eduBlock: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  eduLeft: { flex: 1 },
  eduDegree: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  eduMeta: { fontSize: 9, color: '#4a6585' },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  skillBadge: { fontSize: 9, paddingHorizontal: 7, paddingVertical: 2 },
  langRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  langItem: { fontSize: 9, color: '#333' },
  certBlock: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  certName: { fontFamily: 'Helvetica-Bold', fontSize: 9.5 },
  certSub: { fontSize: 9, color: '#666' },
  projBlock: { marginBottom: 7 },
  projName: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  projDesc: { fontSize: 9.5, color: '#444', lineHeight: 1.4 },
  pubBlock: { marginBottom: 5 },
  pubTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5 },
  pubSub: { fontSize: 9, color: '#666' },
});

function PdfExecutive({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#1a365d';
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={execStyles.page}>
        {/* Top Bar */}
        <View style={[execStyles.topBar, { backgroundColor: accent }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 3 }}>
            {personal.photo && (
              <Image src={personal.photo} style={{ width: 45, height: 45, borderRadius: 22 }} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={execStyles.name}>{personal.fullName}</Text>
              {personal.title ? <Text style={execStyles.titleLine}>{personal.title}</Text> : null}
            </View>
          </View>
          <View style={execStyles.contactStrip}>
            {personal.email ? <Text style={execStyles.contactItem}>{personal.email}</Text> : null}
            {personal.phone ? <Text style={execStyles.contactItem}>{personal.phone}</Text> : null}
            {personal.location ? <Text style={execStyles.contactItem}>{personal.location}</Text> : null}
            {personal.portfolio ? <Link src={personal.portfolio} style={{ ...execStyles.contactItem, textDecoration: 'underline' }}>{personal.portfolio}</Link> : null}
            {personal.linkedin ? <Link src={personal.linkedin} style={{ ...execStyles.contactItem, textDecoration: 'underline' }}>{personal.linkedin}</Link> : null}
          </View>
        </View>

        <View style={execStyles.body}>
          {/* Summary */}
          {summary ? (
            <View style={execStyles.section}>
              <View style={execStyles.sectionHeader}>
                <Text style={[execStyles.sectionTitle, { color: accent }]}>Executive Summary</Text>
                <View style={[execStyles.sectionLine, { borderBottomColor: accent }]} />
              </View>
              <Text style={execStyles.summary}>{summary}</Text>
            </View>
          ) : null}

          {/* Experience */}
          {experience.length > 0 ? (
            <View style={execStyles.section}>
              <View style={execStyles.sectionHeader}>
                <Text style={[execStyles.sectionTitle, { color: accent }]}>Professional Experience</Text>
                <View style={[execStyles.sectionLine, { borderBottomColor: accent }]} />
              </View>
              {experience.map((exp) => (
                <View key={exp.id} style={execStyles.expBlock} wrap={false}>
                  <View style={execStyles.expTopRow}>
                    <Text style={execStyles.expPosition}>{exp.position}</Text>
                    <Text style={execStyles.expDate}>{fmtDate(exp.startDate)} – {fmtDate(exp.endDate, exp.current)}</Text>
                  </View>
                  <Text style={execStyles.expCompany}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</Text>
                  {exp.bullets.filter(b => b.trim()).map((b, i) => (
                    <Text key={i} style={execStyles.bullet}>▸ {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {/* Education */}
          {education.length > 0 ? (
            <View style={execStyles.section}>
              <View style={execStyles.sectionHeader}>
                <Text style={[execStyles.sectionTitle, { color: accent }]}>Education</Text>
                <View style={[execStyles.sectionLine, { borderBottomColor: accent }]} />
              </View>
              {education.map((edu) => (
                <View key={edu.id} style={execStyles.eduBlock} wrap={false}>
                  <View style={execStyles.eduLeft}>
                    <Text style={execStyles.eduDegree}>{edu.degree}</Text>
                    <Text style={execStyles.eduMeta}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</Text>
                    {edu.coursework ? <Text style={{ fontSize: 9, color: '#666' }}>Coursework: {edu.coursework}</Text> : null}
                  </View>
                  <Text style={{ fontSize: 9, color: '#666' }}>{edu.year}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Skills */}
          {skills.technical.length > 0 ? (
            <View style={execStyles.section}>
              <View style={execStyles.sectionHeader}>
                <Text style={[execStyles.sectionTitle, { color: accent }]}>Core Competencies</Text>
                <View style={[execStyles.sectionLine, { borderBottomColor: accent }]} />
              </View>
              <View style={execStyles.skillsRow}>
                {skills.technical.map((s, i) => <Text key={i} style={[execStyles.skillBadge, { backgroundColor: '#e8f0f8', color: accent }]}>{s}</Text>)}
              </View>
            </View>
          ) : null}

          {/* Languages */}
          {skills.languages.length > 0 ? (
            <View style={execStyles.section}>
              <View style={execStyles.sectionHeader}>
                <Text style={[execStyles.sectionTitle, { color: accent }]}>Languages</Text>
                <View style={[execStyles.sectionLine, { borderBottomColor: accent }]} />
              </View>
              <View style={execStyles.langRow}>
                {skills.languages.map((l, i) => (
                  <Text key={i} style={execStyles.langItem}>{l.name} ({l.level})</Text>
                ))}
              </View>
            </View>
          ) : null}

          {/* Certifications */}
          {certifications.length > 0 ? (
            <View style={execStyles.section}>
              <View style={execStyles.sectionHeader}>
                <Text style={[execStyles.sectionTitle, { color: accent }]}>Certifications</Text>
                <View style={[execStyles.sectionLine, { borderBottomColor: accent }]} />
              </View>
              {certifications.map((c) => (
                <View key={c.id} style={execStyles.certBlock} wrap={false}>
                  <Text style={execStyles.certName}>{c.name}</Text>
                  <Text style={execStyles.certSub}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Projects */}
          {projects.length > 0 ? (
            <View style={execStyles.section}>
              <View style={execStyles.sectionHeader}>
                <Text style={[execStyles.sectionTitle, { color: accent }]}>Key Projects</Text>
                <View style={[execStyles.sectionLine, { borderBottomColor: accent }]} />
              </View>
              {projects.map((p) => (
                <View key={p.id} style={execStyles.projBlock} wrap={false}>
                  <Text style={[execStyles.projName, { color: accent }]}>{p.name}</Text>
                  {p.tech ? <Text style={{ fontSize: 9, color: '#4a6585', marginBottom: 1 }}>{p.tech}</Text> : null}
                  <Text style={execStyles.projDesc}>{p.description}</Text>
                  {p.link ? <Link src={p.link} style={{ fontSize: 9, color: accent }}>{p.link}</Link> : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* Publications */}
          {publications.length > 0 ? (
            <View style={execStyles.section}>
              <View style={execStyles.sectionHeader}>
                <Text style={[execStyles.sectionTitle, { color: accent }]}>Publications</Text>
                <View style={[execStyles.sectionLine, { borderBottomColor: accent }]} />
              </View>
              {publications.map((pub) => (
                <View key={pub.id} style={execStyles.pubBlock} wrap={false}>
                  <Text style={execStyles.pubTitle}>{pub.title}</Text>
                  <Text style={execStyles.pubSub}>{pub.journal}{pub.year ? ` · ${pub.year}` : ''}{pub.doi ? ` · DOI: ${pub.doi}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}

// ─── 4. PdfCreative ───────────────────────────────────────────────────────────
const creativeStyles = StyleSheet.create({
  page: { fontSize: 10, flexDirection: 'row', backgroundColor: '#faf8fc' },
  stripe: { width: 8 },
  mainContent: { flex: 1, paddingTop: 36, paddingBottom: 36, paddingLeft: 28, paddingRight: 36 },
  headerBlock: { marginBottom: 16 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 24, color: '#3b1a6b', lineHeight: 1.1 },
  title: { fontSize: 12, marginTop: 3, marginBottom: 8 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  contactChip: { fontSize: 9, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  section: { marginBottom: 14 },
  sectionTitle: { fontFamily: 'Helvetica-Bold', fontSize: 11, marginBottom: 4, paddingBottom: 3, borderBottomWidth: 1.5 },
  summary: { fontSize: 10, lineHeight: 1.55, color: '#3b1a6b' },
  expBlock: { marginBottom: 9 },
  expPosition: { fontFamily: 'Helvetica-Bold', fontSize: 10.5, color: '#3b1a6b' },
  expMeta: { fontSize: 9, marginBottom: 3 },
  bullet: { fontSize: 9.5, lineHeight: 1.4, marginLeft: 10, color: '#3b3b4f' },
  eduBlock: { marginBottom: 7 },
  eduDegree: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#3b1a6b' },
  eduMeta: { fontSize: 9 },
  skillBadge: { fontSize: 9, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, marginRight: 5, marginBottom: 5 },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  langItem: { fontSize: 9.5, color: '#3b1a6b', marginBottom: 3 },
  certBlock: { marginBottom: 5 },
  certName: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#3b1a6b' },
  certSub: { fontSize: 9 },
  projBlock: { marginBottom: 8, borderLeftWidth: 2, paddingLeft: 8 },
  projName: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#3b1a6b' },
  projDesc: { fontSize: 9.5, color: '#3b3b4f', lineHeight: 1.4 },
  pubBlock: { marginBottom: 6 },
  pubTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: '#3b1a6b' },
  pubSub: { fontSize: 9 },
});

function PdfCreative({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#7c3aed';
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={creativeStyles.page}>
        <View style={[creativeStyles.stripe, { backgroundColor: accent }]} />
        <View style={creativeStyles.mainContent}>
          {/* Header */}
          <View style={creativeStyles.headerBlock}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              {personal.photo && (
                <Image src={personal.photo} style={{ width: 45, height: 45, borderRadius: 22 }} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={creativeStyles.name}>{personal.fullName}</Text>
                {personal.title ? <Text style={[creativeStyles.title, { color: accent }]}>{personal.title}</Text> : null}
              </View>
            </View>
            <View style={creativeStyles.contactRow}>
              {personal.email ? <Text style={[creativeStyles.contactChip, { backgroundColor: '#ede9fe', color: '#5b21b6' }]}>{personal.email}</Text> : null}
              {personal.phone ? <Text style={[creativeStyles.contactChip, { backgroundColor: '#ede9fe', color: '#5b21b6' }]}>{personal.phone}</Text> : null}
              {personal.location ? <Text style={[creativeStyles.contactChip, { backgroundColor: '#ede9fe', color: '#5b21b6' }]}>{personal.location}</Text> : null}
              {personal.portfolio ? <Link src={personal.portfolio} style={{ ...creativeStyles.contactChip, backgroundColor: '#ede9fe', color: '#5b21b6', textDecoration: 'none' }}>{personal.portfolio}</Link> : null}
              {personal.linkedin ? <Link src={personal.linkedin} style={{ ...creativeStyles.contactChip, backgroundColor: '#ede9fe', color: '#5b21b6', textDecoration: 'none' }}>{personal.linkedin}</Link> : null}
            </View>
          </View>

          {summary ? (
            <View style={creativeStyles.section}>
              <Text style={[creativeStyles.sectionTitle, { color: accent, borderBottomColor: '#c4b5fd' }]}>About Me</Text>
              <Text style={creativeStyles.summary}>{summary}</Text>
            </View>
          ) : null}

          {experience.length > 0 ? (
            <View style={creativeStyles.section}>
              <Text style={[creativeStyles.sectionTitle, { color: accent, borderBottomColor: '#c4b5fd' }]}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={creativeStyles.expBlock} wrap={false}>
                  <Text style={creativeStyles.expPosition}>{exp.position}</Text>
                  <Text style={[creativeStyles.expMeta, { color: accent }]}>{exp.company}{exp.location ? ` · ${exp.location}` : ''} · {fmtDate(exp.startDate)} – {fmtDate(exp.endDate, exp.current)}</Text>
                  {exp.bullets.filter(b => b.trim()).map((b, i) => (
                    <Text key={i} style={creativeStyles.bullet}>✦ {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {education.length > 0 ? (
            <View style={creativeStyles.section}>
              <Text style={[creativeStyles.sectionTitle, { color: accent, borderBottomColor: '#c4b5fd' }]}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={creativeStyles.eduBlock} wrap={false}>
                  <Text style={creativeStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={[creativeStyles.eduMeta, { color: accent }]}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}{edu.year ? ` · ${edu.year}` : ''}</Text>
                  {edu.coursework ? <Text style={{ fontSize: 9, color: '#666' }}>Coursework: {edu.coursework}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}

          {skills.technical.length > 0 ? (
            <View style={creativeStyles.section}>
              <Text style={[creativeStyles.sectionTitle, { color: accent, borderBottomColor: '#c4b5fd' }]}>Skills</Text>
              <View style={creativeStyles.skillsWrap}>
                {skills.technical.map((s, i) => <Text key={i} style={[creativeStyles.skillBadge, { backgroundColor: '#ede9fe', color: '#5b21b6' }]}>{s}</Text>)}
              </View>
            </View>
          ) : null}

          {skills.languages.length > 0 ? (
            <View style={creativeStyles.section}>
              <Text style={[creativeStyles.sectionTitle, { color: accent, borderBottomColor: '#c4b5fd' }]}>Languages</Text>
              {skills.languages.map((l, i) => (
                <Text key={i} style={creativeStyles.langItem}>{l.name} — {l.level}</Text>
              ))}
            </View>
          ) : null}

          {certifications.length > 0 ? (
            <View style={creativeStyles.section}>
              <Text style={[creativeStyles.sectionTitle, { color: accent, borderBottomColor: '#c4b5fd' }]}>Certifications</Text>
              {certifications.map((c) => (
                <View key={c.id} style={creativeStyles.certBlock} wrap={false}>
                  <Text style={creativeStyles.certName}>{c.name}</Text>
                  <Text style={[creativeStyles.certSub, { color: accent }]}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {projects.length > 0 ? (
            <View style={creativeStyles.section}>
              <Text style={[creativeStyles.sectionTitle, { color: accent, borderBottomColor: '#c4b5fd' }]}>Projects</Text>
              {projects.map((p) => (
                <View key={p.id} style={[creativeStyles.projBlock, { borderLeftColor: '#c4b5fd' }]} wrap={false}>
                  <Text style={creativeStyles.projName}>{p.name}</Text>
                  {p.tech ? <Text style={{ fontSize: 9, color: accent, marginBottom: 1 }}>{p.tech}</Text> : null}
                  <Text style={creativeStyles.projDesc}>{p.description}</Text>
                  {p.link ? <Link src={p.link} style={{ fontSize: 9, color: accent }}>{p.link}</Link> : null}
                </View>
              ))}
            </View>
          ) : null}

          {publications.length > 0 ? (
            <View style={creativeStyles.section}>
              <Text style={[creativeStyles.sectionTitle, { color: accent, borderBottomColor: '#c4b5fd' }]}>Publications</Text>
              {publications.map((pub) => (
                <View key={pub.id} style={creativeStyles.pubBlock} wrap={false}>
                  <Text style={creativeStyles.pubTitle}>{pub.title}</Text>
                  <Text style={[creativeStyles.pubSub, { color: accent }]}>{pub.journal}{pub.year ? ` · ${pub.year}` : ''}{pub.doi ? ` · DOI: ${pub.doi}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}

// ─── 5. PdfTechnical ──────────────────────────────────────────────────────────
const techStyles = StyleSheet.create({
  page: { fontSize: 10, backgroundColor: '#0f172a', color: '#e2e8f0', paddingBottom: 36 },
  header: { backgroundColor: '#1e293b', paddingHorizontal: 36, paddingTop: 28, paddingBottom: 20, borderBottomWidth: 2 },
  name: { fontFamily: 'Courier-Bold', fontSize: 20, marginBottom: 3 },
  title: { fontFamily: 'Courier', fontSize: 10, color: '#94a3b8', marginBottom: 8 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  contactItem: { fontFamily: 'Courier', fontSize: 9, color: '#94a3b8' },
  body: { paddingHorizontal: 36, paddingTop: 18 },
  section: { marginBottom: 14 },
  sectionTitle: { fontFamily: 'Courier-Bold', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4, borderBottomWidth: 0.5, paddingBottom: 3 },
  summary: { fontFamily: 'Courier', fontSize: 9.5, lineHeight: 1.55, color: '#cbd5e1' },
  expBlock: { marginBottom: 10 },
  expPosition: { fontFamily: 'Courier-Bold', fontSize: 10.5, color: '#e2e8f0' },
  expMeta: { fontFamily: 'Courier', fontSize: 9, marginBottom: 3 },
  bullet: { fontFamily: 'Courier', fontSize: 9.5, lineHeight: 1.4, marginLeft: 10, color: '#cbd5e1' },
  eduBlock: { marginBottom: 7 },
  eduDegree: { fontFamily: 'Courier-Bold', fontSize: 10, color: '#e2e8f0' },
  eduMeta: { fontFamily: 'Courier', fontSize: 9, color: '#94a3b8' },
  skillTag: { fontFamily: 'Courier', backgroundColor: '#1e293b', borderWidth: 0.5, fontSize: 9, paddingHorizontal: 6, paddingVertical: 2, marginRight: 5, marginBottom: 5 },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  langItem: { fontFamily: 'Courier', fontSize: 9.5, color: '#cbd5e1', marginBottom: 3 },
  certBlock: { marginBottom: 5 },
  certName: { fontFamily: 'Courier-Bold', fontSize: 9.5, color: '#e2e8f0' },
  certSub: { fontFamily: 'Courier', fontSize: 9, color: '#94a3b8' },
  projBlock: { marginBottom: 8, borderLeftWidth: 1.5, paddingLeft: 10 },
  projName: { fontFamily: 'Courier-Bold', fontSize: 10 },
  projDesc: { fontFamily: 'Courier', fontSize: 9.5, color: '#cbd5e1', lineHeight: 1.4 },
  pubBlock: { marginBottom: 6 },
  pubTitle: { fontFamily: 'Courier-Bold', fontSize: 9.5, color: '#e2e8f0' },
  pubSub: { fontFamily: 'Courier', fontSize: 9, color: '#94a3b8' },
});

function PdfTechnical({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#22c55e';
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={techStyles.page}>
        <View style={[techStyles.header, { borderBottomColor: accent }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 3 }}>
            {personal.photo && (
              <Image src={personal.photo} style={{ width: 45, height: 45, borderRadius: 22 }} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={[techStyles.name, { color: accent }]}>{personal.fullName}</Text>
              {personal.title ? <Text style={techStyles.title}>// {personal.title}</Text> : null}
            </View>
          </View>
          <View style={techStyles.contactRow}>
            {personal.email ? <Text style={techStyles.contactItem}>{personal.email}</Text> : null}
            {personal.phone ? <Text style={techStyles.contactItem}>{personal.phone}</Text> : null}
            {personal.location ? <Text style={techStyles.contactItem}>{personal.location}</Text> : null}
            {personal.portfolio ? <Link src={personal.portfolio} style={{ ...techStyles.contactItem, textDecoration: 'underline' }}>{personal.portfolio}</Link> : null}
            {personal.linkedin ? <Link src={personal.linkedin} style={{ ...techStyles.contactItem, textDecoration: 'underline' }}>{personal.linkedin}</Link> : null}
          </View>
        </View>

        <View style={techStyles.body}>
          {summary ? (
            <View style={techStyles.section}>
              <Text style={[techStyles.sectionTitle, { color: accent, borderBottomColor: accent }]}>About</Text>
              <Text style={techStyles.summary}>{summary}</Text>
            </View>
          ) : null}

          {skills.technical.length > 0 ? (
            <View style={techStyles.section}>
              <Text style={[techStyles.sectionTitle, { color: accent, borderBottomColor: accent }]}>Tech Stack</Text>
              <View style={techStyles.skillsWrap}>
                {skills.technical.map((s, i) => <Text key={i} style={[techStyles.skillTag, { color: accent, borderColor: accent }]}>{s}</Text>)}
              </View>
            </View>
          ) : null}

          {experience.length > 0 ? (
            <View style={techStyles.section}>
              <Text style={[techStyles.sectionTitle, { color: accent, borderBottomColor: accent }]}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={techStyles.expBlock} wrap={false}>
                  <Text style={techStyles.expPosition}>{exp.position}</Text>
                  <Text style={[techStyles.expMeta, { color: accent }]}>{exp.company}{exp.location ? ` · ${exp.location}` : ''} · {fmtDate(exp.startDate)} – {fmtDate(exp.endDate, exp.current)}</Text>
                  {exp.bullets.filter(b => b.trim()).map((b, i) => (
                    <Text key={i} style={techStyles.bullet}>→ {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {projects.length > 0 ? (
            <View style={techStyles.section}>
              <Text style={[techStyles.sectionTitle, { color: accent, borderBottomColor: accent }]}>Projects</Text>
              {projects.map((p) => (
                <View key={p.id} style={[techStyles.projBlock, { borderLeftColor: accent }]} wrap={false}>
                  <Text style={[techStyles.projName, { color: accent }]}>{p.name}</Text>
                  {p.tech ? <Text style={{ fontFamily: 'Courier', fontSize: 9, color: '#4ade80', marginBottom: 1 }}>{p.tech}</Text> : null}
                  <Text style={techStyles.projDesc}>{p.description}</Text>
                  {p.link ? <Link src={p.link} style={{ fontFamily: 'Courier', fontSize: 9, color: accent }}>{p.link}</Link> : null}
                </View>
              ))}
            </View>
          ) : null}

          {education.length > 0 ? (
            <View style={techStyles.section}>
              <Text style={[techStyles.sectionTitle, { color: accent, borderBottomColor: accent }]}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={techStyles.eduBlock} wrap={false}>
                  <Text style={techStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={techStyles.eduMeta}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}{edu.year ? ` · ${edu.year}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {skills.languages.length > 0 ? (
            <View style={techStyles.section}>
              <Text style={[techStyles.sectionTitle, { color: accent, borderBottomColor: accent }]}>Languages</Text>
              {skills.languages.map((l, i) => (
                <Text key={i} style={techStyles.langItem}>{l.name} — {l.level}</Text>
              ))}
            </View>
          ) : null}

          {certifications.length > 0 ? (
            <View style={techStyles.section}>
              <Text style={[techStyles.sectionTitle, { color: accent, borderBottomColor: accent }]}>Certifications</Text>
              {certifications.map((c) => (
                <View key={c.id} style={techStyles.certBlock} wrap={false}>
                  <Text style={techStyles.certName}>{c.name}</Text>
                  <Text style={techStyles.certSub}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {publications.length > 0 ? (
            <View style={techStyles.section}>
              <Text style={[techStyles.sectionTitle, { color: accent, borderBottomColor: accent }]}>Publications</Text>
              {publications.map((pub) => (
                <View key={pub.id} style={techStyles.pubBlock} wrap={false}>
                  <Text style={techStyles.pubTitle}>{pub.title}</Text>
                  <Text style={techStyles.pubSub}>{pub.journal}{pub.year ? ` · ${pub.year}` : ''}{pub.doi ? ` · DOI: ${pub.doi}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}

// ─── 6. PdfAcademic ───────────────────────────────────────────────────────────
const acadStyles = StyleSheet.create({
  page: { fontFamily: 'Times-Roman', fontSize: 11, paddingTop: 50, paddingBottom: 50, paddingLeft: 60, paddingRight: 60, color: '#1a1a1a' },
  header: { textAlign: 'center', marginBottom: 20 },
  name: { fontFamily: 'Times-Bold', fontSize: 20, color: '#1a1a1a', marginBottom: 3 },
  title: { fontFamily: 'Times-Roman', fontSize: 12, color: '#555', marginBottom: 6 },
  contactRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 12, fontSize: 10, color: '#555' },
  divider: { borderBottomWidth: 1.5, marginVertical: 10 },
  section: { marginBottom: 16 },
  sectionTitle: { fontFamily: 'Times-Bold', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 },
  summary: { fontSize: 11, lineHeight: 1.6 },
  expBlock: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  expPosition: { fontFamily: 'Times-Bold', fontSize: 11.5 },
  expDate: { fontFamily: 'Times-Roman', fontSize: 10, color: '#555' },
  expCompany: { fontFamily: 'Times-Roman', fontSize: 10.5, color: '#555', fontStyle: 'italic', marginBottom: 3 },
  bullet: { fontSize: 10.5, lineHeight: 1.5, marginLeft: 14, marginBottom: 1 },
  eduBlock: { marginBottom: 8 },
  eduRow: { flexDirection: 'row', justifyContent: 'space-between' },
  eduDegree: { fontFamily: 'Times-Bold', fontSize: 11 },
  eduYear: { fontSize: 10, color: '#555' },
  eduInstitution: { fontFamily: 'Times-Roman', fontSize: 10.5, fontStyle: 'italic', color: '#555' },
  pubBlock: { marginBottom: 8 },
  pubTitle: { fontFamily: 'Times-Bold', fontSize: 11, lineHeight: 1.4 },
  pubCitation: { fontFamily: 'Times-Roman', fontSize: 10, color: '#3d3d3d', lineHeight: 1.4, fontStyle: 'italic' },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillItem: { fontSize: 10.5, color: '#333', borderBottomWidth: 0.5, paddingBottom: 1 },
  langItem: { fontSize: 10.5, color: '#333', marginBottom: 3 },
  certBlock: { marginBottom: 5 },
  certName: { fontFamily: 'Times-Bold', fontSize: 10.5 },
  certSub: { fontSize: 10, color: '#555', fontStyle: 'italic' },
  projBlock: { marginBottom: 8 },
  projName: { fontFamily: 'Times-Bold', fontSize: 11 },
  projDesc: { fontSize: 10.5, color: '#333', lineHeight: 1.5 },
});

function PdfAcademic({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#7b2d26';
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={acadStyles.page}>
        {/* Centered Header */}
        <View style={acadStyles.header}>
          {personal.photo && (
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Image src={personal.photo} style={{ width: 45, height: 45, borderRadius: 22 }} />
            </View>
          )}
          <Text style={acadStyles.name}>{personal.fullName}</Text>
          {personal.title ? <Text style={acadStyles.title}>{personal.title}</Text> : null}
          <View style={acadStyles.contactRow}>
            {personal.email ? <Text>{personal.email}</Text> : null}
            {personal.phone ? <Text>{personal.phone}</Text> : null}
            {personal.location ? <Text>{personal.location}</Text> : null}
            {personal.portfolio ? <Link src={personal.portfolio} style={{ color: accent }}>{personal.portfolio}</Link> : null}
            {personal.linkedin ? <Link src={personal.linkedin} style={{ color: accent }}>{personal.linkedin}</Link> : null}
          </View>
        </View>
        <View style={[acadStyles.divider, { borderBottomColor: accent }]} />

        {summary ? (
          <View style={acadStyles.section}>
            <Text style={[acadStyles.sectionTitle, { color: accent }]}>Research Interests</Text>
            <Text style={acadStyles.summary}>{summary}</Text>
          </View>
        ) : null}

        {publications.length > 0 ? (
          <View style={acadStyles.section}>
            <Text style={[acadStyles.sectionTitle, { color: accent }]}>Publications</Text>
            <View style={[acadStyles.divider, { borderBottomColor: accent }]} />
            {publications.map((pub, idx) => (
              <View key={pub.id} style={acadStyles.pubBlock} wrap={false}>
                <Text style={acadStyles.pubTitle}>[{idx + 1}] {pub.title}</Text>
                <Text style={acadStyles.pubCitation}>
                  {pub.journal}{pub.year ? `, ${pub.year}` : ''}{pub.doi ? `. DOI: ${pub.doi}` : ''}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {experience.length > 0 ? (
          <View style={acadStyles.section}>
            <Text style={[acadStyles.sectionTitle, { color: accent }]}>Academic & Professional Experience</Text>
            <View style={[acadStyles.divider, { borderBottomColor: accent }]} />
            {experience.map((exp) => (
              <View key={exp.id} style={acadStyles.expBlock} wrap={false}>
                <View style={acadStyles.expHeader}>
                  <Text style={acadStyles.expPosition}>{exp.position}</Text>
                  <Text style={acadStyles.expDate}>{fmtDate(exp.startDate)} – {fmtDate(exp.endDate, exp.current)}</Text>
                </View>
                <Text style={acadStyles.expCompany}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                {exp.bullets.filter(b => b.trim()).map((b, i) => (
                  <Text key={i} style={acadStyles.bullet}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View style={acadStyles.section}>
            <Text style={[acadStyles.sectionTitle, { color: accent }]}>Education</Text>
            <View style={[acadStyles.divider, { borderBottomColor: accent }]} />
            {education.map((edu) => (
              <View key={edu.id} style={acadStyles.eduBlock} wrap={false}>
                <View style={acadStyles.eduRow}>
                  <Text style={acadStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={acadStyles.eduYear}>{edu.year}</Text>
                </View>
                <Text style={acadStyles.eduInstitution}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</Text>
                {edu.coursework ? <Text style={{ fontSize: 10, color: '#555' }}>Coursework: {edu.coursework}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {skills.technical.length > 0 ? (
          <View style={acadStyles.section}>
            <Text style={[acadStyles.sectionTitle, { color: accent }]}>Technical Skills</Text>
            <View style={[acadStyles.divider, { borderBottomColor: accent }]} />
            <View style={acadStyles.skillsRow}>
              {skills.technical.map((s, i) => (
                <Text key={i} style={[acadStyles.skillItem, { borderBottomColor: accent }]}>{s}{i < skills.technical.length - 1 ? ',' : ''}</Text>
              ))}
            </View>
          </View>
        ) : null}

        {skills.languages.length > 0 ? (
          <View style={acadStyles.section}>
            <Text style={[acadStyles.sectionTitle, { color: accent }]}>Languages</Text>
            <View style={[acadStyles.divider, { borderBottomColor: accent }]} />
            {skills.languages.map((l, i) => (
              <Text key={i} style={acadStyles.langItem}>{l.name} — {l.level}</Text>
            ))}
          </View>
        ) : null}

        {certifications.length > 0 ? (
          <View style={acadStyles.section}>
            <Text style={[acadStyles.sectionTitle, { color: accent }]}>Certifications & Awards</Text>
            <View style={[acadStyles.divider, { borderBottomColor: accent }]} />
            {certifications.map((c) => (
              <View key={c.id} style={acadStyles.certBlock} wrap={false}>
                <Text style={acadStyles.certName}>{c.name}</Text>
                <Text style={acadStyles.certSub}>{c.issuer}{c.year ? `, ${c.year}` : ''}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {projects.length > 0 ? (
          <View style={acadStyles.section}>
            <Text style={[acadStyles.sectionTitle, { color: accent }]}>Research Projects</Text>
            <View style={[acadStyles.divider, { borderBottomColor: accent }]} />
            {projects.map((p) => (
              <View key={p.id} style={acadStyles.projBlock} wrap={false}>
                <Text style={acadStyles.projName}>{p.name}</Text>
                {p.tech ? <Text style={{ fontSize: 10, color: '#555', fontStyle: 'italic', marginBottom: 1 }}>{p.tech}</Text> : null}
                <Text style={acadStyles.projDesc}>{p.description}</Text>
                {p.link ? <Link src={p.link} style={{ fontSize: 10, color: accent }}>{p.link}</Link> : null}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

// ─── 7. PdfPortfolio ──────────────────────────────────────────────────────────
const portfolioStyles = StyleSheet.create({
  page: { fontSize: 10, backgroundColor: '#fffbf2', color: '#1c1007', paddingBottom: 36 },
  header: { backgroundColor: '#1c1007', paddingHorizontal: 36, paddingTop: 30, paddingBottom: 22 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, marginBottom: 3 },
  titleText: { fontFamily: 'Helvetica', fontSize: 11, color: '#fcd34d', marginBottom: 10 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  contactItem: { fontSize: 9, color: '#fde68a' },
  body: { paddingHorizontal: 36, paddingTop: 18 },
  section: { marginBottom: 14 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sectionAccent: { width: 4, height: 14, marginRight: 8 },
  sectionTitle: { fontFamily: 'Helvetica-Bold', fontSize: 12, color: '#1c1007' },
  summary: { fontSize: 10, lineHeight: 1.55, color: '#3d2e0e' },
  projCard: { borderWidth: 1, backgroundColor: '#fffdf5', paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  projHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  projName: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#92400e', flex: 1 },
  projTech: { fontSize: 8, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 6 },
  projDesc: { fontSize: 9.5, color: '#3d2e0e', lineHeight: 1.45, marginBottom: 3 },
  projLink: { fontSize: 9, color: '#b45309' },
  expBlock: { marginBottom: 9 },
  expPosition: { fontFamily: 'Helvetica-Bold', fontSize: 10.5, color: '#92400e' },
  expMeta: { fontSize: 9, color: '#b45309', marginBottom: 3 },
  bullet: { fontSize: 9.5, lineHeight: 1.4, marginLeft: 10, color: '#3d2e0e' },
  eduBlock: { marginBottom: 7 },
  eduDegree: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#92400e' },
  eduMeta: { fontSize: 9, color: '#b45309' },
  skillTag: { borderWidth: 0.5, color: '#92400e', fontSize: 9, paddingHorizontal: 7, paddingVertical: 2, marginRight: 5, marginBottom: 5 },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  langItem: { fontSize: 9.5, color: '#3d2e0e', marginBottom: 3 },
  certBlock: { marginBottom: 5 },
  certName: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#92400e' },
  certSub: { fontSize: 9, color: '#b45309' },
  pubBlock: { marginBottom: 6 },
  pubTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: '#92400e' },
  pubSub: { fontSize: 9, color: '#b45309' },
});

function PdfPortfolio({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#f59e0b';
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={portfolioStyles.page}>
        <View style={portfolioStyles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 3 }}>
            {personal.photo && (
              <Image src={personal.photo} style={{ width: 45, height: 45, borderRadius: 22 }} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={[portfolioStyles.name, { color: accent }]}>{personal.fullName}</Text>
              {personal.title ? <Text style={portfolioStyles.titleText}>{personal.title}</Text> : null}
            </View>
          </View>
          <View style={portfolioStyles.contactRow}>
            {personal.email ? <Text style={portfolioStyles.contactItem}>{personal.email}</Text> : null}
            {personal.phone ? <Text style={portfolioStyles.contactItem}>{personal.phone}</Text> : null}
            {personal.location ? <Text style={portfolioStyles.contactItem}>{personal.location}</Text> : null}
            {personal.portfolio ? <Link src={personal.portfolio} style={{ ...portfolioStyles.contactItem, textDecoration: 'underline' }}>{personal.portfolio}</Link> : null}
            {personal.linkedin ? <Link src={personal.linkedin} style={{ ...portfolioStyles.contactItem, textDecoration: 'underline' }}>{personal.linkedin}</Link> : null}
          </View>
        </View>

        <View style={portfolioStyles.body}>
          {summary ? (
            <View style={portfolioStyles.section}>
              <View style={portfolioStyles.sectionTitleRow}>
                <View style={[portfolioStyles.sectionAccent, { backgroundColor: accent }]} />
                <Text style={portfolioStyles.sectionTitle}>Profile</Text>
              </View>
              <Text style={portfolioStyles.summary}>{summary}</Text>
            </View>
          ) : null}

          {projects.length > 0 ? (
            <View style={portfolioStyles.section}>
              <View style={portfolioStyles.sectionTitleRow}>
                <View style={[portfolioStyles.sectionAccent, { backgroundColor: accent }]} />
                <Text style={portfolioStyles.sectionTitle}>Featured Projects</Text>
              </View>
              {projects.map((p) => (
                <View key={p.id} style={[portfolioStyles.projCard, { borderColor: accent }]} wrap={false}>
                  <View style={portfolioStyles.projHeaderRow}>
                    <Text style={portfolioStyles.projName}>{p.name}</Text>
                    {p.tech ? <Text style={[portfolioStyles.projTech, { color: accent, backgroundColor: '#fef3c7' }]}>{p.tech}</Text> : null}
                  </View>
                  <Text style={portfolioStyles.projDesc}>{p.description}</Text>
                  {p.link ? <Link src={p.link} style={portfolioStyles.projLink}>{p.link}</Link> : null}
                </View>
              ))}
            </View>
          ) : null}

          {experience.length > 0 ? (
            <View style={portfolioStyles.section}>
              <View style={portfolioStyles.sectionTitleRow}>
                <View style={[portfolioStyles.sectionAccent, { backgroundColor: accent }]} />
                <Text style={portfolioStyles.sectionTitle}>Experience</Text>
              </View>
              {experience.map((exp) => (
                <View key={exp.id} style={portfolioStyles.expBlock} wrap={false}>
                  <Text style={portfolioStyles.expPosition}>{exp.position}</Text>
                  <Text style={portfolioStyles.expMeta}>{exp.company}{exp.location ? ` · ${exp.location}` : ''} · {fmtDate(exp.startDate)} – {fmtDate(exp.endDate, exp.current)}</Text>
                  {exp.bullets.filter(b => b.trim()).map((b, i) => (
                    <Text key={i} style={portfolioStyles.bullet}>• {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {education.length > 0 ? (
            <View style={portfolioStyles.section}>
              <View style={portfolioStyles.sectionTitleRow}>
                <View style={[portfolioStyles.sectionAccent, { backgroundColor: accent }]} />
                <Text style={portfolioStyles.sectionTitle}>Education</Text>
              </View>
              {education.map((edu) => (
                <View key={edu.id} style={portfolioStyles.eduBlock} wrap={false}>
                  <Text style={portfolioStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={portfolioStyles.eduMeta}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}{edu.year ? ` · ${edu.year}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {skills.technical.length > 0 ? (
            <View style={portfolioStyles.section}>
              <View style={portfolioStyles.sectionTitleRow}>
                <View style={[portfolioStyles.sectionAccent, { backgroundColor: accent }]} />
                <Text style={portfolioStyles.sectionTitle}>Skills</Text>
              </View>
              <View style={portfolioStyles.skillsWrap}>
                {skills.technical.map((s, i) => <Text key={i} style={[portfolioStyles.skillTag, { backgroundColor: '#fef3c7', borderColor: accent }]}>{s}</Text>)}
              </View>
            </View>
          ) : null}

          {skills.languages.length > 0 ? (
            <View style={portfolioStyles.section}>
              <View style={portfolioStyles.sectionTitleRow}>
                <View style={[portfolioStyles.sectionAccent, { backgroundColor: accent }]} />
                <Text style={portfolioStyles.sectionTitle}>Languages</Text>
              </View>
              {skills.languages.map((l, i) => (
                <Text key={i} style={portfolioStyles.langItem}>{l.name} — {l.level}</Text>
              ))}
            </View>
          ) : null}

          {certifications.length > 0 ? (
            <View style={portfolioStyles.section}>
              <View style={portfolioStyles.sectionTitleRow}>
                <View style={[portfolioStyles.sectionAccent, { backgroundColor: accent }]} />
                <Text style={portfolioStyles.sectionTitle}>Certifications</Text>
              </View>
              {certifications.map((c) => (
                <View key={c.id} style={portfolioStyles.certBlock} wrap={false}>
                  <Text style={portfolioStyles.certName}>{c.name}</Text>
                  <Text style={portfolioStyles.certSub}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {publications.length > 0 ? (
            <View style={portfolioStyles.section}>
              <View style={portfolioStyles.sectionTitleRow}>
                <View style={[portfolioStyles.sectionAccent, { backgroundColor: accent }]} />
                <Text style={portfolioStyles.sectionTitle}>Publications</Text>
              </View>
              {publications.map((pub) => (
                <View key={pub.id} style={portfolioStyles.pubBlock} wrap={false}>
                  <Text style={portfolioStyles.pubTitle}>{pub.title}</Text>
                  <Text style={portfolioStyles.pubSub}>{pub.journal}{pub.year ? ` · ${pub.year}` : ''}{pub.doi ? ` · DOI: ${pub.doi}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}

// ─── 8. PdfCompact ────────────────────────────────────────────────────────────
const compactStyles = StyleSheet.create({
  page: { fontSize: 8.5, paddingTop: 28, paddingBottom: 28, paddingLeft: 32, paddingRight: 32, color: '#1a1a1a' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 5 },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 16, color: '#111' },
  title: { fontFamily: 'Helvetica', fontSize: 9, color: '#555' },
  contactBlock: { alignItems: 'flex-end' },
  contactItem: { fontSize: 8, color: '#555', marginBottom: 1 },
  rule: { borderBottomWidth: 0.5, borderBottomColor: '#999', marginBottom: 5 },
  section: { marginBottom: 9 },
  sectionTitle: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 },
  twoColRow: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  summary: { fontSize: 8.5, lineHeight: 1.5 },
  expBlock: { marginBottom: 6 },
  expTopRow: { flexDirection: 'row', justifyContent: 'space-between' },
  expPosition: { fontFamily: 'Helvetica-Bold', fontSize: 9 },
  expDate: { fontSize: 8, color: '#555' },
  expCompany: { fontSize: 8, color: '#555', marginBottom: 2 },
  bullet: { fontSize: 8.5, lineHeight: 1.4, marginLeft: 8 },
  eduBlock: { marginBottom: 4 },
  eduDegree: { fontFamily: 'Helvetica-Bold', fontSize: 8.5 },
  eduMeta: { fontSize: 8, color: '#555' },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  skillTag: { fontSize: 8, backgroundColor: '#f0f0f0', color: '#333', paddingHorizontal: 5, paddingVertical: 1 },
  langWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  langItem: { fontSize: 8.5 },
  certBlock: { marginBottom: 3 },
  certName: { fontFamily: 'Helvetica-Bold', fontSize: 8.5 },
  certSub: { fontSize: 8, color: '#555' },
  projBlock: { marginBottom: 5 },
  projName: { fontFamily: 'Helvetica-Bold', fontSize: 8.5 },
  projDesc: { fontSize: 8, color: '#333', lineHeight: 1.4 },
  pubBlock: { marginBottom: 4 },
  pubTitle: { fontFamily: 'Helvetica-Bold', fontSize: 8.5 },
  pubSub: { fontSize: 8, color: '#555' },
});

function PdfCompact({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#0284c7';
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={compactStyles.page}>
        {/* Compact Header */}
        <View style={compactStyles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {personal.photo && (
              <Image src={personal.photo} style={{ width: 45, height: 45, borderRadius: 22 }} />
            )}
            <View>
              <Text style={[compactStyles.name, { color: accent }]}>{personal.fullName}</Text>
              {personal.title ? <Text style={compactStyles.title}>{personal.title}</Text> : null}
            </View>
          </View>
          <View style={compactStyles.contactBlock}>
            {personal.email ? <Text style={compactStyles.contactItem}>{personal.email}</Text> : null}
            {personal.phone ? <Text style={compactStyles.contactItem}>{personal.phone}</Text> : null}
            {personal.location ? <Text style={compactStyles.contactItem}>{personal.location}</Text> : null}
            {personal.portfolio ? <Link src={personal.portfolio} style={{ ...compactStyles.contactItem, color: '#333' }}>{personal.portfolio}</Link> : null}
            {personal.linkedin ? <Link src={personal.linkedin} style={{ ...compactStyles.contactItem, color: '#333' }}>{personal.linkedin}</Link> : null}
          </View>
        </View>
        <View style={compactStyles.rule} />

        {summary ? (
          <View style={compactStyles.section}>
            <Text style={[compactStyles.sectionTitle, { color: accent }]}>Summary</Text>
            <Text style={compactStyles.summary}>{summary}</Text>
          </View>
        ) : null}

        {experience.length > 0 ? (
          <View style={compactStyles.section}>
            <Text style={[compactStyles.sectionTitle, { color: accent }]}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={compactStyles.expBlock} wrap={false}>
                <View style={compactStyles.expTopRow}>
                  <Text style={compactStyles.expPosition}>{exp.position} — {exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                  <Text style={compactStyles.expDate}>{fmtDate(exp.startDate)} – {fmtDate(exp.endDate, exp.current)}</Text>
                </View>
                {exp.bullets.filter(b => b.trim()).map((b, i) => (
                  <Text key={i} style={compactStyles.bullet}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {/* Two-column row: Education + Skills */}
        <View style={compactStyles.twoColRow}>
          {education.length > 0 ? (
            <View style={{ ...compactStyles.section, ...compactStyles.col }}>
              <Text style={[compactStyles.sectionTitle, { color: accent }]}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={compactStyles.eduBlock} wrap={false}>
                  <Text style={compactStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={compactStyles.eduMeta}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}{edu.year ? ` · ${edu.year}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {skills.technical.length > 0 ? (
            <View style={{ ...compactStyles.section, ...compactStyles.col }}>
              <Text style={[compactStyles.sectionTitle, { color: accent }]}>Skills</Text>
              <View style={compactStyles.skillsWrap}>
                {skills.technical.map((s, i) => <Text key={i} style={compactStyles.skillTag}>{s}</Text>)}
              </View>
            </View>
          ) : null}
        </View>

        {/* Two-column row: Languages + Certifications */}
        <View style={compactStyles.twoColRow}>
          {skills.languages.length > 0 ? (
            <View style={{ ...compactStyles.section, ...compactStyles.col }}>
              <Text style={[compactStyles.sectionTitle, { color: accent }]}>Languages</Text>
              <View style={compactStyles.langWrap}>
                {skills.languages.map((l, i) => (
                  <Text key={i} style={compactStyles.langItem}>{l.name} ({l.level})</Text>
                ))}
              </View>
            </View>
          ) : null}

          {certifications.length > 0 ? (
            <View style={{ ...compactStyles.section, ...compactStyles.col }}>
              <Text style={[compactStyles.sectionTitle, { color: accent }]}>Certifications</Text>
              {certifications.map((c) => (
                <View key={c.id} style={compactStyles.certBlock} wrap={false}>
                  <Text style={compactStyles.certName}>{c.name}</Text>
                  <Text style={compactStyles.certSub}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {projects.length > 0 ? (
          <View style={compactStyles.section}>
            <Text style={[compactStyles.sectionTitle, { color: accent }]}>Projects</Text>
            <View style={compactStyles.twoColRow}>
              {projects.map((p) => (
                <View key={p.id} style={{ ...compactStyles.projBlock, flex: 1 }} wrap={false}>
                  <Text style={compactStyles.projName}>{p.name}{p.tech ? ` · ${p.tech}` : ''}</Text>
                  <Text style={compactStyles.projDesc}>{p.description}</Text>
                  {p.link ? <Link src={p.link} style={{ fontSize: 8, color: '#333' }}>{p.link}</Link> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {publications.length > 0 ? (
          <View style={compactStyles.section}>
            <Text style={[compactStyles.sectionTitle, { color: accent }]}>Publications</Text>
            {publications.map((pub) => (
              <View key={pub.id} style={compactStyles.pubBlock} wrap={false}>
                <Text style={compactStyles.pubTitle}>{pub.title}</Text>
                <Text style={compactStyles.pubSub}>{pub.journal}{pub.year ? ` · ${pub.year}` : ''}{pub.doi ? ` · DOI: ${pub.doi}` : ''}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

// ─── 9. PdfElegant ────────────────────────────────────────────────────────────
const elegantStyles = StyleSheet.create({
  page: { fontFamily: 'Times-Roman', fontSize: 11, paddingTop: 44, paddingBottom: 44, paddingLeft: 52, paddingRight: 52, color: '#2d1f18', backgroundColor: '#fdf9f6' },
  header: { textAlign: 'center', marginBottom: 12 },
  name: { fontFamily: 'Times-Bold', fontSize: 26, color: '#2d1f18', letterSpacing: 2, marginBottom: 4 },
  title: { fontFamily: 'Times-Roman', fontSize: 12, fontStyle: 'italic', marginBottom: 6 },
  divider: { textAlign: 'center', fontSize: 12, marginBottom: 6 },
  contactRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 12, fontSize: 9.5, color: '#5c3d2e' },
  section: { marginBottom: 16 },
  sectionHeader: { textAlign: 'center', marginBottom: 10 },
  sectionTitle: { fontFamily: 'Times-Bold', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5 },
  ornament: { textAlign: 'center', fontSize: 10, marginBottom: 8 },
  summary: { fontSize: 11, lineHeight: 1.65, color: '#3d2a1e', textAlign: 'justify' },
  expBlock: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  expPosition: { fontFamily: 'Times-Bold', fontSize: 11.5, color: '#2d1f18' },
  expDate: { fontFamily: 'Times-Roman', fontSize: 9.5, fontStyle: 'italic' },
  expCompany: { fontFamily: 'Times-Roman', fontSize: 10.5, color: '#5c3d2e', fontStyle: 'italic', marginBottom: 3 },
  bullet: { fontSize: 10.5, lineHeight: 1.5, marginLeft: 14, color: '#3d2a1e' },
  eduBlock: { marginBottom: 8 },
  eduRow: { flexDirection: 'row', justifyContent: 'space-between' },
  eduDegree: { fontFamily: 'Times-Bold', fontSize: 11 },
  eduYear: { fontFamily: 'Times-Roman', fontSize: 9.5 },
  eduInstitution: { fontFamily: 'Times-Roman', fontSize: 10.5, color: '#5c3d2e', fontStyle: 'italic' },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  skillTag: { fontSize: 10, color: '#2d1f18', borderBottomWidth: 0.5, paddingBottom: 1 },
  langRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 12 },
  langItem: { fontSize: 10.5, color: '#3d2a1e' },
  certBlock: { textAlign: 'center', marginBottom: 5 },
  certName: { fontFamily: 'Times-Bold', fontSize: 10.5, color: '#2d1f18' },
  certSub: { fontFamily: 'Times-Roman', fontSize: 9.5, color: '#5c3d2e', fontStyle: 'italic' },
  projBlock: { marginBottom: 8 },
  projName: { fontFamily: 'Times-Bold', fontSize: 11, color: '#2d1f18', textAlign: 'center', marginBottom: 3 },
  projDesc: { fontSize: 10.5, color: '#3d2a1e', lineHeight: 1.5, textAlign: 'justify' },
  pubBlock: { marginBottom: 6 },
  pubTitle: { fontFamily: 'Times-Bold', fontSize: 10.5, color: '#2d1f18', textAlign: 'center' },
  pubSub: { fontFamily: 'Times-Roman', fontSize: 9.5, color: '#5c3d2e', fontStyle: 'italic', textAlign: 'center' },
});

function PdfElegant({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  const accent = accentColor || '#b07d62';
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={elegantStyles.page}>
        {/* Centered Header */}
        <View style={elegantStyles.header}>
          {personal.photo && (
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Image src={personal.photo} style={{ width: 45, height: 45, borderRadius: 22 }} />
            </View>
          )}
          <Text style={elegantStyles.name}>{personal.fullName}</Text>
          {personal.title ? <Text style={[elegantStyles.title, { color: accent }]}>{personal.title}</Text> : null}
          <Text style={[elegantStyles.divider, { color: accent }]}>— ✦ —</Text>
          <View style={elegantStyles.contactRow}>
            {personal.email ? <Text>{personal.email}</Text> : null}
            {personal.phone ? <Text>{personal.phone}</Text> : null}
            {personal.location ? <Text>{personal.location}</Text> : null}
            {personal.portfolio ? <Link src={personal.portfolio} style={{ color: accent }}>{personal.portfolio}</Link> : null}
            {personal.linkedin ? <Link src={personal.linkedin} style={{ color: accent }}>{personal.linkedin}</Link> : null}
          </View>
        </View>

        {summary ? (
          <View style={elegantStyles.section}>
            <View style={elegantStyles.sectionHeader}>
              <Text style={[elegantStyles.sectionTitle, { color: accent }]}>Profile</Text>
            </View>
            <Text style={[elegantStyles.ornament, { color: accent }]}>—— ✦ ——</Text>
            <Text style={elegantStyles.summary}>{summary}</Text>
          </View>
        ) : null}

        {experience.length > 0 ? (
          <View style={elegantStyles.section}>
            <View style={elegantStyles.sectionHeader}>
              <Text style={[elegantStyles.sectionTitle, { color: accent }]}>Experience</Text>
            </View>
            <Text style={[elegantStyles.ornament, { color: accent }]}>—— ✦ ——</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={elegantStyles.expBlock} wrap={false}>
                <View style={elegantStyles.expHeader}>
                  <Text style={elegantStyles.expPosition}>{exp.position}</Text>
                  <Text style={[elegantStyles.expDate, { color: accent }]}>{fmtDate(exp.startDate)} – {fmtDate(exp.endDate, exp.current)}</Text>
                </View>
                <Text style={elegantStyles.expCompany}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                {exp.bullets.filter(b => b.trim()).map((b, i) => (
                  <Text key={i} style={elegantStyles.bullet}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View style={elegantStyles.section}>
            <View style={elegantStyles.sectionHeader}>
              <Text style={[elegantStyles.sectionTitle, { color: accent }]}>Education</Text>
            </View>
            <Text style={[elegantStyles.ornament, { color: accent }]}>—— ✦ ——</Text>
            {education.map((edu) => (
              <View key={edu.id} style={elegantStyles.eduBlock} wrap={false}>
                <View style={elegantStyles.eduRow}>
                  <Text style={elegantStyles.eduDegree}>{edu.degree}</Text>
                  <Text style={[elegantStyles.eduYear, { color: accent }]}>{edu.year}</Text>
                </View>
                <Text style={elegantStyles.eduInstitution}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</Text>
                {edu.coursework ? <Text style={{ fontSize: 10, color: '#5c3d2e', fontStyle: 'italic' }}>Coursework: {edu.coursework}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {skills.technical.length > 0 ? (
          <View style={elegantStyles.section}>
            <View style={elegantStyles.sectionHeader}>
              <Text style={[elegantStyles.sectionTitle, { color: accent }]}>Skills</Text>
            </View>
            <Text style={[elegantStyles.ornament, { color: accent }]}>—— ✦ ——</Text>
            <View style={elegantStyles.skillsRow}>
              {skills.technical.map((s, i) => <Text key={i} style={[elegantStyles.skillTag, { borderBottomColor: accent }]}>{s}</Text>)}
            </View>
          </View>
        ) : null}

        {skills.languages.length > 0 ? (
          <View style={elegantStyles.section}>
            <View style={elegantStyles.sectionHeader}>
              <Text style={[elegantStyles.sectionTitle, { color: accent }]}>Languages</Text>
            </View>
            <Text style={[elegantStyles.ornament, { color: accent }]}>—— ✦ ——</Text>
            <View style={elegantStyles.langRow}>
              {skills.languages.map((l, i) => (
                <Text key={i} style={elegantStyles.langItem}>{l.name} — {l.level}</Text>
              ))}
            </View>
          </View>
        ) : null}

        {certifications.length > 0 ? (
          <View style={elegantStyles.section}>
            <View style={elegantStyles.sectionHeader}>
              <Text style={[elegantStyles.sectionTitle, { color: accent }]}>Certifications</Text>
            </View>
            <Text style={[elegantStyles.ornament, { color: accent }]}>—— ✦ ——</Text>
            {certifications.map((c) => (
              <View key={c.id} style={elegantStyles.certBlock} wrap={false}>
                <Text style={elegantStyles.certName}>{c.name}</Text>
                <Text style={elegantStyles.certSub}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {projects.length > 0 ? (
          <View style={elegantStyles.section}>
            <View style={elegantStyles.sectionHeader}>
              <Text style={[elegantStyles.sectionTitle, { color: accent }]}>Projects</Text>
            </View>
            <Text style={[elegantStyles.ornament, { color: accent }]}>—— ✦ ——</Text>
            {projects.map((p) => (
              <View key={p.id} style={elegantStyles.projBlock} wrap={false}>
                <Text style={elegantStyles.projName}>{p.name}</Text>
                {p.tech ? <Text style={{ fontSize: 9.5, color: accent, fontStyle: 'italic', textAlign: 'center', marginBottom: 2 }}>{p.tech}</Text> : null}
                <Text style={elegantStyles.projDesc}>{p.description}</Text>
                {p.link ? <Link src={p.link} style={{ fontSize: 9.5, color: accent, textAlign: 'center' }}>{p.link}</Link> : null}
              </View>
            ))}
          </View>
        ) : null}

        {publications.length > 0 ? (
          <View style={elegantStyles.section}>
            <View style={elegantStyles.sectionHeader}>
              <Text style={[elegantStyles.sectionTitle, { color: accent }]}>Publications</Text>
            </View>
            <Text style={[elegantStyles.ornament, { color: accent }]}>—— ✦ ——</Text>
            {publications.map((pub) => (
              <View key={pub.id} style={elegantStyles.pubBlock} wrap={false}>
                <Text style={elegantStyles.pubTitle}>{pub.title}</Text>
                <Text style={elegantStyles.pubSub}>{pub.journal}{pub.year ? ` · ${pub.year}` : ''}{pub.doi ? ` · DOI: ${pub.doi}` : ''}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

// ─── 10. PdfATS ───────────────────────────────────────────────────────────────
const atsStyles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10.5, paddingTop: 36, paddingBottom: 36, paddingLeft: 44, paddingRight: 44, color: '#000000', backgroundColor: '#ffffff' },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 16, color: '#000000', marginBottom: 2 },
  title: { fontFamily: 'Helvetica', fontSize: 10.5, marginBottom: 5 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, fontSize: 10, marginBottom: 10 },
  contactItem: { color: '#000000' },
  rule: { borderBottomWidth: 1, borderBottomColor: '#000000', marginBottom: 6 },
  section: { marginBottom: 12 },
  sectionTitle: { fontFamily: 'Helvetica-Bold', fontSize: 11, textTransform: 'uppercase', marginBottom: 4 },
  summary: { fontSize: 10.5, lineHeight: 1.5 },
  expBlock: { marginBottom: 8 },
  expPosition: { fontFamily: 'Helvetica-Bold', fontSize: 10.5 },
  expMeta: { fontSize: 10, marginBottom: 2 },
  bullet: { fontSize: 10.5, lineHeight: 1.45, marginLeft: 12 },
  eduBlock: { marginBottom: 6 },
  eduDegree: { fontFamily: 'Helvetica-Bold', fontSize: 10.5 },
  eduMeta: { fontSize: 10 },
  skillsText: { fontSize: 10.5, lineHeight: 1.5 },
  langText: { fontSize: 10.5, lineHeight: 1.5 },
  certBlock: { marginBottom: 4 },
  certName: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  certSub: { fontSize: 10 },
  projBlock: { marginBottom: 7 },
  projName: { fontFamily: 'Helvetica-Bold', fontSize: 10.5 },
  projDesc: { fontSize: 10, lineHeight: 1.4 },
  pubBlock: { marginBottom: 5 },
  pubTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  pubSub: { fontSize: 10 },
});

function PdfATS({ data, accentColor }: { data: ResumeData; accentColor?: string }) {
  // ATS template intentionally ignores accentColor and uses plain black
  const { personal, summary, experience, education, skills, certifications, projects, publications } = data;
  return (
    <Document>
      <Page size="A4" style={atsStyles.page}>
        {/* Plain Header — no photo for ATS */}
        <Text style={atsStyles.name}>{personal.fullName}</Text>
        {personal.title ? <Text style={atsStyles.title}>{personal.title}</Text> : null}
        <View style={atsStyles.contactRow}>
          {personal.email ? <Text style={atsStyles.contactItem}>{personal.email}</Text> : null}
          {personal.phone ? <Text style={atsStyles.contactItem}>{personal.phone}</Text> : null}
          {personal.location ? <Text style={atsStyles.contactItem}>{personal.location}</Text> : null}
          {personal.portfolio ? <Text style={atsStyles.contactItem}>{personal.portfolio}</Text> : null}
          {personal.linkedin ? <Text style={atsStyles.contactItem}>{personal.linkedin}</Text> : null}
        </View>
        <View style={atsStyles.rule} />

        {summary ? (
          <View style={atsStyles.section}>
            <Text style={atsStyles.sectionTitle}>SUMMARY</Text>
            <View style={atsStyles.rule} />
            <Text style={atsStyles.summary}>{summary}</Text>
          </View>
        ) : null}

        {experience.length > 0 ? (
          <View style={atsStyles.section}>
            <Text style={atsStyles.sectionTitle}>EXPERIENCE</Text>
            <View style={atsStyles.rule} />
            {experience.map((exp) => (
              <View key={exp.id} style={atsStyles.expBlock} wrap={false}>
                <Text style={atsStyles.expPosition}>{exp.position}</Text>
                <Text style={atsStyles.expMeta}>{exp.company}{exp.location ? `, ${exp.location}` : ''} | {fmtDate(exp.startDate)} - {fmtDate(exp.endDate, exp.current)}</Text>
                {exp.bullets.filter(b => b.trim()).map((b, i) => (
                  <Text key={i} style={atsStyles.bullet}>- {b}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View style={atsStyles.section}>
            <Text style={atsStyles.sectionTitle}>EDUCATION</Text>
            <View style={atsStyles.rule} />
            {education.map((edu) => (
              <View key={edu.id} style={atsStyles.eduBlock} wrap={false}>
                <Text style={atsStyles.eduDegree}>{edu.degree}</Text>
                <Text style={atsStyles.eduMeta}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}{edu.year ? ` | ${edu.year}` : ''}</Text>
                {edu.coursework ? <Text style={{ fontSize: 10 }}>Coursework: {edu.coursework}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {skills.technical.length > 0 ? (
          <View style={atsStyles.section}>
            <Text style={atsStyles.sectionTitle}>SKILLS</Text>
            <View style={atsStyles.rule} />
            <Text style={atsStyles.skillsText}>{skills.technical.join(', ')}</Text>
          </View>
        ) : null}

        {skills.languages.length > 0 ? (
          <View style={atsStyles.section}>
            <Text style={atsStyles.sectionTitle}>LANGUAGES</Text>
            <View style={atsStyles.rule} />
            <Text style={atsStyles.langText}>{skills.languages.map(l => `${l.name} (${l.level})`).join(', ')}</Text>
          </View>
        ) : null}

        {certifications.length > 0 ? (
          <View style={atsStyles.section}>
            <Text style={atsStyles.sectionTitle}>CERTIFICATIONS</Text>
            <View style={atsStyles.rule} />
            {certifications.map((c) => (
              <View key={c.id} style={atsStyles.certBlock} wrap={false}>
                <Text style={atsStyles.certName}>{c.name}</Text>
                <Text style={atsStyles.certSub}>{c.issuer}{c.year ? ` | ${c.year}` : ''}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {projects.length > 0 ? (
          <View style={atsStyles.section}>
            <Text style={atsStyles.sectionTitle}>PROJECTS</Text>
            <View style={atsStyles.rule} />
            {projects.map((p) => (
              <View key={p.id} style={atsStyles.projBlock} wrap={false}>
                <Text style={atsStyles.projName}>{p.name}{p.tech ? ` | ${p.tech}` : ''}</Text>
                <Text style={atsStyles.projDesc}>{p.description}</Text>
                {p.link ? <Text style={{ fontSize: 10 }}>{p.link}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {publications.length > 0 ? (
          <View style={atsStyles.section}>
            <Text style={atsStyles.sectionTitle}>PUBLICATIONS</Text>
            <View style={atsStyles.rule} />
            {publications.map((pub) => (
              <View key={pub.id} style={atsStyles.pubBlock} wrap={false}>
                <Text style={atsStyles.pubTitle}>{pub.title}</Text>
                <Text style={atsStyles.pubSub}>{pub.journal}{pub.year ? ` | ${pub.year}` : ''}{pub.doi ? ` | DOI: ${pub.doi}` : ''}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

// ─── Export Map ───────────────────────────────────────────────────────────────
export const pdfTemplates: Record<string, ComponentType<{ data: ResumeData; accentColor?: string }>> = {
  'minimal': PdfMinimal,
  'modern-split': PdfModernSplit,
  'executive': PdfExecutive,
  'creative': PdfCreative,
  'technical': PdfTechnical,
  'academic': PdfAcademic,
  'portfolio': PdfPortfolio,
  'compact': PdfCompact,
  'elegant': PdfElegant,
  'ats': PdfATS,
};
