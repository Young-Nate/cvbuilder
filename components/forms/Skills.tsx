'use client';

import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useResume } from '@/context/ResumeContext';
import { Language } from '@/lib/types';

const inputClass =
  'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

const LEVELS = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Beginner'] as const;

export default function Skills() {
  const { state, dispatch } = useResume();
  const technicalSkills: string[] = state.resume.skills?.technical ?? [];
  const languages: Language[] = state.resume.skills?.languages ?? [];

  const [tagInput, setTagInput] = useState('');

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commitTags(tagInput);
    }
  };

  const handleTagInputBlur = () => {
    if (tagInput.trim()) {
      commitTags(tagInput);
    }
  };

  const commitTags = (raw: string) => {
    const newTags = raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !technicalSkills.includes(s));

    if (newTags.length > 0) {
      dispatch({
        type: 'SET_TECHNICAL_SKILLS',
        payload: [...technicalSkills, ...newTags],
      });
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    dispatch({
      type: 'SET_TECHNICAL_SKILLS',
      payload: technicalSkills.filter((t) => t !== tag),
    });
  };

  const addLanguage = () => {
    const newLang: Language = {
      name: '',
      level: 'Intermediate',
    };
    dispatch({ type: 'SET_LANGUAGES', payload: [...languages, newLang] });
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    dispatch({ type: 'SET_LANGUAGES', payload: updated as Language[] });
  };

  const removeLanguage = (index: number) => {
    dispatch({
      type: 'SET_LANGUAGES',
      payload: languages.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Skills</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          List your technical skills and language proficiencies.
        </p>
      </div>

      {/* Technical Skills */}
      <div className="mb-6">
        <label className={labelClass}>Technical Skills</label>
        <p className="text-xs text-gray-400 mb-2">
          Type a skill and press Enter or comma to add it.
        </p>

        {/* Tag display */}
        {technicalSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {technicalSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-full"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeTag(skill)}
                  className="text-blue-400 hover:text-red-500 leading-none"
                  aria-label={`Remove ${skill}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        <input
          type="text"
          className={inputClass}
          placeholder="e.g. React, TypeScript, Node.js"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          onBlur={handleTagInputBlur}
        />
      </div>

      {/* Languages */}
      <div>
        <label className={labelClass}>Languages</label>
        <div className="space-y-3">
          {languages.map((lang, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  className={inputClass}
                  placeholder={`Language ${index + 1}`}
                  value={lang.name}
                  onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <select
                  className={inputClass}
                  value={lang.level}
                  onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                >
                  {LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="text-sm text-red-500 hover:text-red-700 font-medium flex-shrink-0"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addLanguage}
          className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <span>+</span> Add language
        </button>
      </div>
    </div>
  );
}
