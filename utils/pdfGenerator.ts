'use client';

export async function generatePdfFromElement(element: HTMLElement, filename: string): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;

  // Clone element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Create offscreen container
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    width: 210mm;
    z-index: -9999;
    opacity: 0;
    pointer-events: none;
    background: white;
  `;
  clone.style.transform = 'none';
  clone.style.width = '100%';
  clone.style.minHeight = '297mm';
  container.appendChild(clone);
  document.body.appendChild(container);

  // Wait for layout
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    await html2pdf()
      .set({
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      })
      .from(clone)
      .save();
  } finally {
    document.body.removeChild(container);
  }
}
