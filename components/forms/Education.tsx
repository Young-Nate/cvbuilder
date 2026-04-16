'use client';

import { v4 as uuid } from 'uuid';
import { useResume } from '@/context/ResumeContext';
import { Education as EducationType } from '@/lib/types';

const inputClass =
  'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

export default function Education() {
  const { state, dispatch } = useResume();
  const educationList: EducationType[] = state.resume.education ?? [];

  const addEducation = () => {
    const newEdu: EducationType = {
      id: uuid(),
      degree: '',
      institution: '',
      location: '',
      year: '',
      coursework: '',
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEdu });
  };

  const updateEducation = (id: string, field: keyof EducationType, value: string) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { id, data: { [field]: value } },
    });
  };

  const removeEducation = (id: string) => {
    dispatch({ type: 'REMOVE_EDUCATION', payload: id });
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Education</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Add your academic qualifications and degrees.
        </p>
      </div>

      <div className="space-y-6">
        {educationList.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Education {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Degree / Qualification</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="B.Sc. Computer Science"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Institution</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="MIT"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Cambridge, MA"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Year</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="2020"
                  value={edu.year}
                  onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Relevant Coursework{' '}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Algorithms, Machine Learning, Systems Design..."
                  value={edu.coursework ?? ''}
                  onChange={(e) => updateEducation(edu.id, 'coursework', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addEducation}
        className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        <span>+</span> Add education
      </button>
    </div>
  );
}
