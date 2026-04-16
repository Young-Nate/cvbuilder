'use client';

import React from 'react';
import Link from 'next/link';
import { TEMPLATES } from '@/lib/templates';
import { TemplateSelector } from '@/components/shared/TemplateSelector';
import { useResume } from '@/context/ResumeContext';
import { TemplateName } from '@/lib/types';

export default function LandingPage() {
  const { state, dispatch } = useResume();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">Resume<span className="text-blue-600">Craft</span></span>
          </div>
          <Link
            href="/builder"
            className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Building
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-6 tracking-wide uppercase">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            100% Free — No Signup Required
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.08] mb-5">
            Build Your CV in<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Minutes, Not Hours</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            10 professional templates. Real-time preview. Export to PDF. Your data stays in your browser — nothing is ever uploaded or stored.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/builder"
              className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm"
            >
              Build Your CV →
            </Link>
            <a
              href="#templates"
              className="px-8 py-3.5 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all text-sm border border-gray-200"
            >
              Browse Templates
            </a>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-6 justify-center text-sm text-gray-500 font-medium">
          {['No account needed', 'No AI / no tracking', '10 unique templates', 'PDF export', 'Works offline'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Template Gallery */}
      <section id="templates" className="bg-gray-50 border-t border-gray-100 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
              10 Professional Templates
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              From minimal to creative, ATS-friendly to academic. Pick one and start editing — you can switch anytime.
            </p>
          </div>
          <TemplateSelector
            current={state.template}
            onChange={(id: TemplateName) => dispatch({ type: 'SET_TEMPLATE', payload: id })}
            layout="grid"
          />
          <div className="text-center mt-10">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm"
            >
              Start with {TEMPLATES.find(t => t.id === state.template)?.name || 'this template'} →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
            Three Steps to Your CV
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Fill in your details', desc: 'Add your experience, education, skills, and projects. No account or signup needed.' },
              { num: '2', title: 'Choose a template', desc: 'Pick from 10 professionally designed templates. Switch between them anytime without losing data.' },
              { num: '3', title: 'Download as PDF', desc: 'Export a pixel-perfect PDF that matches what you see. Print it, email it, upload it.' },
            ].map(step => (
              <div key={step.num} className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-extrabold text-sm flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ResumeCraft — Your data never leaves your browser. No cookies, no tracking, no storage.
        </div>
      </footer>
    </div>
  );
}
