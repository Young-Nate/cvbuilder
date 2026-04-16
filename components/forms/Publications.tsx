'use client';

import { v4 as uuid } from 'uuid';
import { useResume } from '@/context/ResumeContext';
import { Publication } from '@/lib/types';

const inputClass =
  'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

export default function Publications() {
  const { state, dispatch } = useResume();
  const publications: Publication[] = state.resume.publications ?? [];

  const addPublication = () => {
    const newPub: Publication = {
      id: uuid(),
      title: '',
      journal: '',
      year: '',
      doi: '',
    };
    dispatch({ type: 'ADD_PUBLICATION', payload: newPub });
  };

  const updatePublication = (id: string, field: keyof Publication, value: string) => {
    dispatch({
      type: 'UPDATE_PUBLICATION',
      payload: { id, data: { [field]: value } },
    });
  };

  const removePublication = (id: string) => {
    dispatch({ type: 'REMOVE_PUBLICATION', payload: id });
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Publications</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Academic papers, articles, or other published works.
        </p>
      </div>

      <div className="space-y-4">
        {publications.map((pub, index) => (
          <div key={pub.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Publication {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removePublication(pub.id)}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Deep Learning for Natural Language Processing"
                  value={pub.title}
                  onChange={(e) => updatePublication(pub.id, 'title', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Journal / Conference</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Nature Machine Intelligence"
                  value={pub.journal}
                  onChange={(e) => updatePublication(pub.id, 'journal', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Year</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="2023"
                  value={pub.year}
                  onChange={(e) => updatePublication(pub.id, 'year', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>
                  DOI{' '}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="10.1000/xyz123"
                  value={pub.doi ?? ''}
                  onChange={(e) => updatePublication(pub.id, 'doi', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addPublication}
        className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        <span>+</span> Add publication
      </button>
    </div>
  );
}
