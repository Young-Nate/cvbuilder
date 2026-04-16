'use client';

import { v4 as uuid } from 'uuid';
import { useResume } from '@/context/ResumeContext';
import { Certification } from '@/lib/types';

const inputClass =
  'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

export default function Certifications() {
  const { state, dispatch } = useResume();
  const certifications: Certification[] = state.resume.certifications ?? [];

  const addCertification = () => {
    const newCert: Certification = {
      id: uuid(),
      name: '',
      issuer: '',
      year: '',
    };
    dispatch({ type: 'ADD_CERTIFICATION', payload: newCert });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    dispatch({
      type: 'UPDATE_CERTIFICATION',
      payload: { id, data: { [field]: value } },
    });
  };

  const removeCertification = (id: string) => {
    dispatch({ type: 'REMOVE_CERTIFICATION', payload: id });
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Certifications</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Professional certifications and licenses.
        </p>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={cert.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Certification {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeCertification(cert.id)}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Certification Name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="AWS Certified Solutions Architect"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Year</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="2023"
                  value={cert.year}
                  onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                />
              </div>

              <div className="sm:col-span-3">
                <label className={labelClass}>Issuing Organization</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Amazon Web Services"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addCertification}
        className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        <span>+</span> Add certification
      </button>
    </div>
  );
}
