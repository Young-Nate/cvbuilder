import { TemplateName, ResumeData } from '@/lib/types';
import { ComponentType } from 'react';

import TemplateMinimal from './TemplateMinimal';
import TemplateModernSplit from './TemplateModernSplit';
import TemplateExecutive from './TemplateExecutive';
import TemplateCreative from './TemplateCreative';
import TemplateTechnical from './TemplateTechnical';
import TemplateAcademic from './TemplateAcademic';
import TemplatePortfolio from './TemplatePortfolio';
import TemplateCompact from './TemplateCompact';
import TemplateElegant from './TemplateElegant';
import TemplateATS from './TemplateATS';

export interface TemplateProps {
  data: ResumeData;
  accentColor?: string;
}

export const templateComponents: Record<TemplateName, ComponentType<TemplateProps>> = {
  'minimal': TemplateMinimal,
  'modern-split': TemplateModernSplit,
  'executive': TemplateExecutive,
  'creative': TemplateCreative,
  'technical': TemplateTechnical,
  'academic': TemplateAcademic,
  'portfolio': TemplatePortfolio,
  'compact': TemplateCompact,
  'elegant': TemplateElegant,
  'ats': TemplateATS,
};
