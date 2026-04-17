'use client';

import React, { memo } from 'react';
import { ResumeData, TemplateName } from '@/lib/types';
import { templateComponents } from './templates';

interface Props {
  data: ResumeData;
  template: TemplateName;
  scale?: number;
  accentColor?: string;
}

function ResumePreviewInner({ data, template, scale = 1, accentColor }: Props) {
  const Template = templateComponents[template] || templateComponents['minimal'];

  return (
    <div className="resume-preview-container" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      <div
        className="bg-white shadow-xl mx-auto"
        style={{
          width: '210mm',
          minHeight: '297mm',
          overflow: 'hidden',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <Template data={data} accentColor={accentColor} />
      </div>
    </div>
  );
}

export const ResumePreview = memo(ResumePreviewInner);
