'use client';

export async function generatePdfFromElement(element: HTMLElement, filename: string): Promise<void> {
  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');

  // A4 dimensions
  const a4WidthMm = 210;
  const a4HeightMm = 297;

  // Clone the element into an offscreen container to avoid transform issues
  const offscreen = document.createElement('div');
  offscreen.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: 794px;
    background: white;
    z-index: -1;
  `;
  
  // Deep clone the preview element
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.width = '794px';
  clone.style.minHeight = '1122px';
  clone.style.overflow = 'visible';
  
  offscreen.appendChild(clone);
  document.body.appendChild(offscreen);

  // Wait for fonts and layout to settle
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: clone.scrollHeight || 1122,
      logging: false,
      foreignObjectRendering: false,
      removeContainer: false,
    });

    // Verify canvas has content
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas rendered with zero dimensions');
    }

    // Use PNG to avoid CORS/taint issues with toDataURL
    let imgData: string;
    try {
      imgData = canvas.toDataURL('image/png');
    } catch {
      // If tainted, try with allowTaint disabled
      const canvas2 = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: clone.scrollHeight || 1122,
        logging: false,
        foreignObjectRendering: false,
        removeContainer: false,
      });
      imgData = canvas2.toDataURL('image/png');
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = a4WidthMm;
    const imgHeight = (canvas.height * a4WidthMm) / canvas.width;

    // Safety check for valid dimensions
    if (!isFinite(imgHeight) || imgHeight <= 0) {
      throw new Error('Invalid image dimensions');
    }

    let heightLeft = imgHeight;
    let position = 0;
    let page = 0;

    while (heightLeft > 0) {
      if (page > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= a4HeightMm;
      position -= a4HeightMm;
      page++;

      // Safety: max 10 pages
      if (page > 10) break;
    }

    pdf.save(filename);
  } finally {
    // Clean up offscreen element
    document.body.removeChild(offscreen);
  }
}
