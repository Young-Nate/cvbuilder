'use client';

import { v4 as uuid } from 'uuid';
import { useResume } from '@/context/ResumeContext';
import { Experience as WorkExperienceType } from '@/lib/types';

const inputClass =
  'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

const MAX_BULLETS = 6;

export default function WorkExperience() {
  const { state, dispatch } = useResume();
  const experiences: WorkExperienceType[] = state.resume.experience ?? [];

  const addExperience = () => {
    const newExp: WorkExperienceType = {
      id: uuid(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExp });
  };

  const updateExperience = (id: string, field: keyof WorkExperienceType, value: unknown) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { id, data: { [field]: value } },
    });
  };

  const removeExperience = (id: string) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', payload: id });
  };

  const addBullet = (exp: WorkExperienceType) => {
    if ((exp.bullets?.length ?? 0) >= MAX_BULLETS) return;
    const updatedBullets = [...(exp.bullets ?? []), ''];
    updateExperience(exp.id, 'bullets', updatedBullets);
  };

  const updateBullet = (exp: WorkExperienceType, index: number, value: string) => {
    const updatedBullets = [...(exp.bullets ?? [])];
    updatedBullets[index] = value;
    updateExperience(exp.id, 'bullets', updatedBullets);
  };

  const removeBullet = (exp: WorkExperienceType, index: number) => {
    const updatedBullets = (exp.bullets ?? []).filter((_, i) => i !== index);
    updateExperience(exp.id, 'bullets', updatedBullets);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Work Experience</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Add your professional experience, most recent first.
        </p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, expIndex) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Experience {expIndex + 1}
              </span>
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Company</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Acme Corp"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Position</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Senior Engineer"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="New York, NY"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Start Date</label>
                <input
                  type="month"
                  className={inputClass}
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>End Date</label>
                <input
                  type="month"
                  className={inputClass}
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  id={`current-${exp.id}`}
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={exp.current}
                  onChange={(e) => {
                    updateExperience(exp.id, 'current', e.target.checked);
                    if (e.target.checked) {
                      updateExperience(exp.id, 'endDate', '');
                    }
                  }}
                />
                <label
                  htmlFor={`current-${exp.id}`}
                  className="text-sm font-medium text-gray-700"
                >
                  Currently working here
                </label>
              </div>
            </div>

            {/* Bullet Points */}
            <div>
              <label className={labelClass}>Key Responsibilities / Achievements</label>
              <div className="space-y-2">
                {(exp.bullets ?? []).map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm select-none">•</span>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Describe a key responsibility or achievement..."
                      value={bullet}
                      onChange={(e) => updateBullet(exp, bulletIndex, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(exp, bulletIndex)}
                      className="text-red-500 hover:text-red-700 flex-shrink-0 text-sm font-medium"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {(exp.bullets?.length ?? 0) < MAX_BULLETS && (
                <button
                  type="button"
                  onClick={() => addBullet(exp)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <span>+</span> Add bullet
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addExperience}
        className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        <span>+</span> Add experience
      </button>
    </div>
  );
}
