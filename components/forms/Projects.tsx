'use client';

import { v4 as uuid } from 'uuid';
import { useResume } from '@/context/ResumeContext';
import { Project } from '@/lib/types';

const inputClass =
  'w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

export default function Projects() {
  const { state, dispatch } = useResume();
  const projects: Project[] = state.resume.projects ?? [];

  const addProject = () => {
    const newProject: Project = {
      id: uuid(),
      name: '',
      description: '',
      link: '',
      tech: '',
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { id, data: { [field]: value } },
    });
  };

  const removeProject = (id: string) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: id });
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Projects</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Highlight notable projects that demonstrate your skills.
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Project {index + 1}</span>
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Project Name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="My Awesome App"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Link</label>
                <input
                  type="url"
                  className={inputClass}
                  placeholder="https://github.com/user/project"
                  value={project.link ?? ''}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Technologies Used</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="React, Node.js, PostgreSQL"
                  value={project.tech ?? ''}
                  onChange={(e) => updateProject(project.id, 'tech', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white resize-none"
                  placeholder="Briefly describe the project, your role, and its impact..."
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addProject}
        className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        <span>+</span> Add project
      </button>
    </div>
  );
}
