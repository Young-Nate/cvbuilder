'use client';

import { useRef } from 'react';
import { useResume } from '@/context/ResumeContext';

const inputClass =
  'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

export default function PersonalInfo() {
  const { state, dispatch } = useResume();
  const personal = state.resume.personal;
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_PERSONAL',
      payload: { [field]: value },
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Photo must be under 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      handleChange('photo', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    handleChange('photo', '');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Personal Information</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Your contact details and professional links.
        </p>
      </div>

      {/* Photo upload */}
      <div className="mb-5">
        <label className={labelClass}>Profile Photo</label>
        <div className="flex items-center gap-4">
          {personal?.photo ? (
            <div className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personal.photo}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={removePhoto}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove photo"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
          <div>
            <label className="px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer inline-block">
              {personal?.photo ? 'Change photo' : 'Upload photo'}
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-gray-400 mt-1">JPG, PNG or WebP. Max 2 MB.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className={inputClass}
            placeholder="Jane Doe"
            value={personal?.fullName ?? ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="title">
            Professional Title
          </label>
          <input
            id="title"
            type="text"
            className={inputClass}
            placeholder="Software Engineer"
            value={personal?.title ?? ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder="jane@example.com"
            value={personal?.email ?? ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            placeholder="+1 (555) 000-0000"
            value={personal?.phone ?? ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            className={inputClass}
            placeholder="San Francisco, CA"
            value={personal?.location ?? ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="portfolio">
            Portfolio
          </label>
          <input
            id="portfolio"
            type="url"
            className={inputClass}
            placeholder="https://yoursite.com"
            value={personal?.portfolio ?? ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="linkedin">
            LinkedIn
          </label>
          <input
            id="linkedin"
            type="url"
            className={inputClass}
            placeholder="https://linkedin.com/in/janedoe"
            value={personal?.linkedin ?? ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
