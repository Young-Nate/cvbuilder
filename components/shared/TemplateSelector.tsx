'use client';

import React from 'react';
import { TemplateName } from '@/lib/types';
import { TEMPLATES } from '@/lib/templates';

interface Props {
  current: TemplateName;
  onChange: (id: TemplateName) => void;
  layout?: 'grid' | 'dropdown';
}

const thumbnailStyles: Record<string, { bg: string; accent: string; layout: string }> = {
  minimal:        { bg: 'bg-white',    accent: 'bg-gray-800',  layout: 'single' },
  'modern-split': { bg: 'bg-white',    accent: 'bg-slate-800', layout: 'split' },
  executive:      { bg: 'bg-white',    accent: 'bg-blue-800',  layout: 'bold' },
  creative:       { bg: 'bg-purple-50', accent: 'bg-purple-600', layout: 'asymmetric' },
  technical:      { bg: 'bg-slate-50', accent: 'bg-green-500', layout: 'tech' },
  academic:       { bg: 'bg-amber-50', accent: 'bg-red-800',   layout: 'single' },
  portfolio:      { bg: 'bg-white',    accent: 'bg-amber-500', layout: 'visual' },
  compact:        { bg: 'bg-white',    accent: 'bg-sky-600',   layout: 'dense' },
  elegant:        { bg: 'bg-stone-50', accent: 'bg-amber-700', layout: 'centered' },
  ats:            { bg: 'bg-white',    accent: 'bg-black',     layout: 'plain' },
};

function TemplateThumbnail({ id }: { id: string }) {
  const s = thumbnailStyles[id] || thumbnailStyles.minimal;

  if (s.layout === 'split') {
    return (
      <div className={`w-full h-full ${s.bg} flex rounded overflow-hidden`}>
        <div className={`w-[30%] ${s.accent}`}>
          <div className="mt-3 mx-1.5 space-y-1">
            <div className="h-1 w-6 bg-blue-400 rounded-full opacity-80" />
            <div className="h-0.5 w-5 bg-white/40 rounded-full" />
            <div className="h-0.5 w-4 bg-white/40 rounded-full" />
          </div>
        </div>
        <div className="flex-1 p-2 space-y-1.5">
          <div className="h-1.5 w-10 bg-gray-300 rounded-full" />
          <div className="h-0.5 w-full bg-gray-200 rounded-full" />
          <div className="h-0.5 w-3/4 bg-gray-200 rounded-full" />
          <div className="h-0.5 w-5/6 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  if (s.layout === 'bold') {
    return (
      <div className={`w-full h-full ${s.bg} rounded overflow-hidden`}>
        <div className={`h-2 ${s.accent}`} />
        <div className="p-2 space-y-1.5">
          <div className="h-2 w-14 bg-slate-700 rounded-full" />
          <div className="h-0.5 w-8 bg-blue-400 rounded-full" />
          <div className="mt-1 h-1 w-4 bg-blue-700 rounded-full border-l-2 border-blue-700" />
          <div className="h-0.5 w-full bg-gray-200 rounded-full" />
          <div className="h-0.5 w-3/4 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  if (s.layout === 'asymmetric') {
    return (
      <div className={`w-full h-full ${s.bg} flex rounded overflow-hidden`}>
        <div className={`w-1 ${s.accent}`} />
        <div className="flex-1 p-2 space-y-1.5">
          <div className="h-2 w-12 bg-purple-600 rounded-full" />
          <div className="h-0.5 w-full bg-gray-200 rounded-full" />
          <div className="flex gap-1 mt-1">
            <div className="h-2 w-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            <div className="h-2 w-5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full" />
          </div>
          <div className="h-0.5 w-3/4 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  if (s.layout === 'tech') {
    return (
      <div className={`w-full h-full ${s.bg} rounded overflow-hidden`}>
        <div className="bg-slate-800 p-2">
          <div className="h-1.5 w-12 bg-white rounded-full" style={{ fontFamily: 'monospace' }} />
          <div className="h-0.5 w-6 bg-green-400 rounded-full mt-1" />
        </div>
        <div className="p-2 space-y-1">
          <div className="flex gap-1">
            <div className="h-2 w-5 bg-slate-200 rounded" />
            <div className="h-2 w-6 bg-slate-200 rounded" />
            <div className="h-2 w-4 bg-slate-200 rounded" />
          </div>
          <div className="h-0.5 w-full bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  if (s.layout === 'visual') {
    return (
      <div className={`w-full h-full ${s.bg} rounded overflow-hidden`}>
        <div className="bg-gray-900 p-2 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500" />
          <div>
            <div className="h-1.5 w-10 bg-white rounded-full" />
            <div className="h-0.5 w-6 bg-gray-400 rounded-full mt-0.5" />
          </div>
        </div>
        <div className="p-2 grid grid-cols-2 gap-1">
          <div className="h-5 border border-gray-200 rounded p-1">
            <div className="h-0.5 w-full bg-gray-200 rounded-full" />
          </div>
          <div className="h-5 border border-gray-200 rounded p-1">
            <div className="h-0.5 w-full bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (s.layout === 'dense') {
    return (
      <div className={`w-full h-full ${s.bg} rounded overflow-hidden p-1.5`}>
        <div className="h-1.5 w-10 bg-sky-600 rounded-full mb-1" />
        <div className="space-y-0.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-0.5 bg-gray-200 rounded-full" style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-0.5 mt-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-1.5 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (s.layout === 'centered') {
    return (
      <div className={`w-full h-full ${s.bg} rounded overflow-hidden p-2 text-center`}>
        <div className="h-2 w-12 bg-gray-700 rounded-full mx-auto" />
        <div className="h-0.5 w-8 bg-amber-700 rounded-full mx-auto mt-1" />
        <div className="text-amber-700 text-[6px] my-1">—— ✦ ——</div>
        <div className="space-y-0.5">
          <div className="h-0.5 w-full bg-gray-200 rounded-full" />
          <div className="h-0.5 w-3/4 bg-gray-200 rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  if (s.layout === 'plain') {
    return (
      <div className={`w-full h-full ${s.bg} rounded overflow-hidden p-2`}>
        <div className="h-2 w-14 bg-black rounded-full" />
        <div className="h-0.5 w-10 bg-gray-300 rounded-full mt-1" />
        <div className="border-b border-gray-300 my-1.5" />
        <div className="h-1 w-6 bg-black rounded-full mb-1" />
        <div className="space-y-0.5">
          <div className="h-0.5 w-full bg-gray-200 rounded-full" />
          <div className="h-0.5 w-5/6 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  // Default single column
  return (
    <div className={`w-full h-full ${s.bg} rounded overflow-hidden p-2`}>
      <div className={`h-2 w-12 ${s.accent} rounded-full`} />
      <div className="h-0.5 w-8 bg-gray-300 rounded-full mt-1" />
      <div className="border-b border-gray-200 my-1.5" />
      <div className="space-y-1">
        <div className="h-0.5 w-full bg-gray-200 rounded-full" />
        <div className="h-0.5 w-3/4 bg-gray-200 rounded-full" />
        <div className="h-0.5 w-5/6 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

export function TemplateSelector({ current, onChange, layout = 'grid' }: Props) {
  if (layout === 'dropdown') {
    return (
      <select
        value={current}
        onChange={e => onChange(e.target.value as TemplateName)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {TEMPLATES.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {TEMPLATES.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`group relative rounded-xl overflow-hidden border-2 transition-all ${
            current === t.id
              ? 'border-blue-600 shadow-lg shadow-blue-100 ring-2 ring-blue-200'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
        >
          <div className="aspect-[3/4] p-1">
            <TemplateThumbnail id={t.id} />
          </div>
          <div className="px-2 pb-2 pt-1">
            <div className={`text-xs font-semibold truncate ${current === t.id ? 'text-blue-600' : 'text-gray-700'}`}>
              {t.name}
            </div>
          </div>
          {current === t.id && (
            <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
