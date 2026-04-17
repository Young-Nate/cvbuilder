'use client';

/**
 * Convert CSS lab() and oklch() color functions to rgb() equivalents.
 * html2canvas doesn't support modern CSS color functions.
 */
function convertModernColors(element: HTMLElement): void {
  const allElements = element.querySelectorAll('*');
  const elementsToFix = [element, ...Array.from(allElements)] as HTMLElement[];
  
  for (const el of elementsToFix) {
    const computed = window.getComputedStyle(el);
    const props = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'];
    
    for (const prop of props) {
      const value = computed.getPropertyValue(prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`));
      if (value && (value.includes('lab(') || value.includes('oklch(') || value.includes('oklab('))) {
        // Create a temporary element to resolve the color
        const temp = document.createElement('div');
        temp.style.color = value;
        document.body.appendChild(temp);
        const resolved = window.getComputedStyle(temp).color;
        document.body.removeChild(temp);
        
        // Apply the resolved RGB color
        if (resolved && resolved.startsWith('rgb')) {
          (el.style as unknown as Record<string, string>)[prop] = resolved;
        }
      }
    }
  }
}

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
  await new Promise(resolve => setTimeout(resolve, 300));

  // Convert lab()/oklch() colors to rgb() for html2canvas compatibility
  convertModernColors(clone);

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
