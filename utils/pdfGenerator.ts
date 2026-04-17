'use client';

export async function generatePdfFromElement(element: HTMLElement, filename: string): Promise<void> {
  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');

  // A4 dimensions in mm and px at 96 DPI
  const a4WidthMm = 210;
  const a4HeightMm = 297;
  const a4WidthPx = 794; // 210mm at 96 DPI

  // Find the scaling container and temporarily reset it
  const scaleContainer = element.closest('.resume-preview-container') as HTMLElement;
  const originalTransform = scaleContainer ? scaleContainer.style.transform : '';
  const originalTransformOrigin = scaleContainer ? scaleContainer.style.transformOrigin : '';
  const originalOverflow = element.parentElement ? element.parentElement.style.overflow : '';

  // Reset scale to 1:1 for accurate capture
  if (scaleContainer) {
    scaleContainer.style.transform = 'none';
    scaleContainer.style.transformOrigin = 'top left';
  }

  // Ensure the parent scrollable area doesn't clip
  const scrollParent = element.closest('.overflow-y-auto') as HTMLElement;
  if (scrollParent) {
    scrollParent.style.overflow = 'visible';
  }

  // Force a layout recalculation
  void element.offsetHeight;

  // Wait a tick for layout to settle
  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: a4WidthPx,
      height: element.scrollHeight,
      windowWidth: a4WidthPx,
      logging: false,
      removeContainer: true,
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    // Calculate proper dimensions
    const imgWidth = a4WidthMm;
    const imgHeight = (canvas.height * a4WidthMm) / canvas.width;

    // Handle multi-page content
    let heightLeft = imgHeight;
    let position = 0;
    let page = 0;

    while (heightLeft > 0) {
      if (page > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= a4HeightMm;
      position -= a4HeightMm;
      page++;
    }

    pdf.save(filename);
  } finally {
    // Always restore original styles
    if (scaleContainer) {
      scaleContainer.style.transform = originalTransform;
      scaleContainer.style.transformOrigin = originalTransformOrigin;
    }
    if (scrollParent) {
      scrollParent.style.overflow = originalOverflow || '';
    }
  }
}
