'use client';

export async function generatePdf(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  template: string,
  accentColor?: string
): Promise<Blob> {
  const { pdf } = await import('@react-pdf/renderer');
  const { createElement } = await import('react');
  const { pdfTemplates } = await import('./pdfTemplates');
  
  const PdfComponent = pdfTemplates[template] || pdfTemplates['minimal'];
  const element = createElement(PdfComponent, { data, accentColor });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blob = await pdf(element as any).toBlob();
  return blob;
}

export function downloadPdf(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
