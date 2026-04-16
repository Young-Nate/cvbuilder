'use client';

import React, { useState, useCallback, useEffect, useRef, useMemo, useId } from 'react';
import Link from 'next/link';
import { useResume } from '@/context/ResumeContext';
import { TemplateName } from '@/lib/types';
import { sampleResume } from '@/lib/sampleData';
import { TEMPLATES } from '@/lib/templates';
import { exportToJson, importFromJson } from '@/utils/exportImport';

// Forms
import PersonalInfo from '@/components/forms/PersonalInfo';
import Summary from '@/components/forms/Summary';
import WorkExperience from '@/components/forms/WorkExperience';
import Education from '@/components/forms/Education';
import Skills from '@/components/forms/Skills';
import Certifications from '@/components/forms/Certifications';
import Projects from '@/components/forms/Projects';
import Publications from '@/components/forms/Publications';

// Preview
import { ResumePreview } from '@/components/preview/ResumePreview';
import { TemplateSelector } from '@/components/shared/TemplateSelector';

export default function BuilderPage() {
  const { state, dispatch } = useResume();
  const [showTemplates, setShowTemplates] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const colorId = useId();
  const [previewScale, setPreviewScale] = useState(0.55);
  const previewRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLInputElement>(null);

  // Debounced resume data for preview
  const [debouncedData, setDebouncedData] = useState(state.resume);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    debounceTimer.current = setTimeout(() => {
      setDebouncedData(state.resume);
    }, 300);
    return () => clearTimeout(debounceTimer.current);
  }, [state.resume]);

  // Calculate preview scale based on container width
  useEffect(() => {
    function calcScale() {
      if (previewRef.current) {
        const containerWidth = previewRef.current.clientWidth;
        const a4Width = 793; // 210mm in px at 96dpi
        const scale = Math.min(containerWidth / a4Width, 1);
        setPreviewScale(scale);
      }
    }
    calcScale();
    window.addEventListener('resize', calcScale);
    return () => window.removeEventListener('resize', calcScale);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const idx = parseInt(e.key) - 1;
        if (idx < TEMPLATES.length) {
          dispatch({ type: 'SET_TEMPLATE', payload: TEMPLATES[idx].id });
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault();
        dispatch({ type: 'SET_TEMPLATE', payload: TEMPLATES[9].id });
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch]);

  const handleLoadSample = useCallback(() => {
    dispatch({ type: 'SET_ALL', payload: sampleResume });
  }, [dispatch]);

  const handleExportJson = useCallback(() => {
    exportToJson(state.resume);
  }, [state.resume]);

  const handleImportJson = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importFromJson(file);
      dispatch({ type: 'SET_ALL', payload: data });
    } catch {
      alert('Could not import file. Make sure it is a valid JSON file exported from ResumeCraft.');
    }
    if (importRef.current) importRef.current.value = '';
  }, [dispatch]);

  const handleSetAccentColor = useCallback((color: string) => {
    dispatch({ type: 'SET_ACCENT_COLOR', payload: color });
  }, [dispatch]);

  const PRESET_COLORS = [
    '', // reset / template default
    '#2563eb', // blue
    '#7c3aed', // violet
    '#dc2626', // red
    '#059669', // emerald
    '#d97706', // amber
    '#0891b2', // cyan
    '#be185d', // pink
    '#1e3a5f', // navy
    '#000000', // black
  ];

  const handleDownloadPdf = useCallback(async () => {
    setPdfLoading(true);
    try {
      const { generatePdfFromElement } = await import('@/utils/pdfGenerator');
      // Find the actual resume content element (the white A4 div inside the preview)
      const previewEl = previewRef.current?.querySelector('.bg-white.shadow-xl') as HTMLElement;
      if (!previewEl) {
        throw new Error('Preview element not found');
      }
      const name = state.resume.personal.fullName?.replace(/\s+/g, '_') || 'Resume';
      await generatePdfFromElement(previewEl, `${name}_CV.pdf`);
    } catch (err) {
      console.error(err);
      alert('PDF generation failed. Please try again.');
    }
    setPdfLoading(false);
  }, [state.resume, state.template, state.accentColor]);

  const currentTemplateName = useMemo(
    () => TEMPLATES.find(t => t.id === state.template)?.name || 'Minimal',
    [state.template]
  );

  const formSections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'projects', label: 'Projects' },
    { id: 'publications', label: 'Publications' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3 z-50 flex-shrink-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900 hidden sm:inline">Resume<span className="text-blue-600">Craft</span></span>
        </Link>

        {/* Template selector */}
        <div className="relative">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            {currentTemplateName}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {showTemplates && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowTemplates(false)} />
              <div className="absolute top-full left-0 mt-2 w-[520px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 max-h-[60vh] overflow-y-auto">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Choose template</div>
                <TemplateSelector
                  current={state.template}
                  onChange={(id: TemplateName) => {
                    dispatch({ type: 'SET_TEMPLATE', payload: id });
                    setShowTemplates(false);
                  }}
                  layout="grid"
                />
              </div>
            </>
          )}
        </div>

        {/* Color picker */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex items-center gap-2 px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            title="Accent color"
          >
            <div
              className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
              style={{ backgroundColor: state.accentColor || '#2563eb' }}
            />
            <span className="hidden sm:inline text-xs">Color</span>
          </button>
          {showColorPicker && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowColorPicker(false)} />
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[200px]">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Accent color</div>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {PRESET_COLORS.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        handleSetAccentColor(c);
                      }}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        state.accentColor === c
                          ? 'border-blue-500 scale-110'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: c || '#e5e7eb' }}
                      title={c ? c : 'Template default'}
                    >
                      {c === '' && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18" />
                        </svg>
                      )}
                      {state.accentColor === c && c !== '' && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={colorId} className="text-xs text-gray-500">Custom:</label>
                  <input
                    id={colorId}
                    type="color"
                    value={state.accentColor || '#2563eb'}
                    onChange={(e) => handleSetAccentColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border-0 p-0"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <button
          onClick={handleLoadSample}
          className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
        >
          Load Sample
        </button>
        <button
          onClick={handleExportJson}
          className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
        >
          Export JSON
        </button>
        <label className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer hidden sm:block">
          Import JSON
          <input ref={importRef} type="file" accept=".json" onChange={handleImportJson} className="hidden" />
        </label>
        <button
          onClick={handleDownloadPdf}
          disabled={pdfLoading}
          className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-1.5"
        >
          {pdfLoading ? (
            <>
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Generating…
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
            </>
          )}
        </button>
      </header>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form panel (left) */}
        <div className="w-full md:w-[38%] lg:w-[35%] overflow-y-auto border-r border-gray-200 bg-white">
          <div className="p-6 space-y-8">
            {/* Quick nav */}
            <div className="flex flex-wrap gap-1.5">
              {formSections.map(s => (
                <a
                  key={s.id}
                  href={`#section-${s.id}`}
                  className="px-2.5 py-1 text-[11px] font-medium text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div id="section-personal"><PersonalInfo /></div>
            <div id="section-summary"><Summary /></div>
            <div id="section-experience"><WorkExperience /></div>
            <div id="section-education"><Education /></div>
            <div id="section-skills"><Skills /></div>
            <div id="section-certifications"><Certifications /></div>
            <div id="section-projects"><Projects /></div>
            <div id="section-publications"><Publications /></div>
          </div>
        </div>

        {/* Preview panel (right) */}
        <div
          ref={previewRef}
          className="hidden md:block flex-1 overflow-y-auto bg-gray-100 p-6"
        >
          <ResumePreview
            data={debouncedData}
            template={state.template}
            scale={previewScale}
            accentColor={state.accentColor}
          />
        </div>
      </div>
    </div>
  );
}
