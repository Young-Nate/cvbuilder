'use client';

export async function generatePdfFromElement(element: HTMLElement, filename: string): Promise<void> {
  // Dynamically import html2canvas and jspdf
  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');
  
  // A4 dimensions in mm
  const a4Width = 210;
  const a4Height = 297;
  
  // Temporarily reset transform for accurate capture
  const container = element.closest('.resume-preview-container') as HTMLElement;
  const originalTransform = container?.style.transform || '';
  if (container) {
    container.style.transform = 'scale(1)';
  }
  
  // Capture the element
  const canvas = await html2canvas(element, {
    scale: 2, // High quality
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    width: element.scrollWidth,
    height: element.scrollHeight,
  });
  
  // Restore transform
  if (container) {
    container.style.transform = originalTransform;
  }
  
  // Create PDF
  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Calculate dimensions to fit A4
  const imgWidth = a4Width;
  const imgHeight = (canvas.height * a4Width) / canvas.width;
  
  // If content is taller than one page, add multiple pages
  let heightLeft = imgHeight;
  let position = 0;
  
  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
  heightLeft -= a4Height;
  
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= a4Height;
  }
  
  pdf.save(filename);
}
