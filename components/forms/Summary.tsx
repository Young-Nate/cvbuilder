'use client';

import { useResume } from '@/context/ResumeContext';

const MAX_CHARS = 500;

export default function Summary() {
  const { state, dispatch } = useResume();
  const summary: string = state.resume.summary ?? '';

  const handleChange = (value: string) => {
    if (value.length > MAX_CHARS) return;
    dispatch({ type: 'UPDATE_SUMMARY', payload: value });
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Professional Summary</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          A brief overview of your experience and goals.
        </p>
      </div>

      <div>
        <textarea
          rows={5}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white resize-none"
          placeholder="Write a concise summary of your professional background, key skills, and career objectives..."
          value={summary}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="flex justify-end mt-1">
          <span
            className={`text-xs ${
              summary.length >= MAX_CHARS ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {summary.length}/{MAX_CHARS}
          </span>
        </div>
      </div>
    </div>
  );
}
