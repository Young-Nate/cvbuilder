'use client';

export async function generatePdfFromElement(element: HTMLElement, filename: string): Promise<void> {
  // Use the browser's native print-to-PDF functionality
  // This produces pixel-perfect output since it uses the browser's own renderer
  
  const printContent = element.cloneNode(true) as HTMLElement;
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'width=794,height=1123');
  if (!printWindow) {
    throw new Error('Could not open print window. Please allow popups for this site.');
  }

  // Get all stylesheets from the current page
  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(el => el.outerHTML)
    .join('\n');

  // Build the print page
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${filename}</title>
      ${styles}
      <style>
        @page {
          size: A4;
          margin: 0;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        html, body {
          margin: 0;
          padding: 0;
          width: 210mm;
          background: white;
        }
        body > div {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          overflow: visible;
        }
        @media print {
          html, body {
            margin: 0;
            padding: 0;
            width: 210mm;
          }
        }
      </style>
    </head>
    <body>
      <div>${printContent.innerHTML}</div>
    </body>
    </html>
  `);
  
  printWindow.document.close();
  
  // Wait for fonts and images to load
  await new Promise<void>((resolve) => {
    printWindow.onload = () => resolve();
    // Fallback timeout if onload doesn't fire
    setTimeout(resolve, 1500);
  });

  // Additional wait for web fonts
  await new Promise(resolve => setTimeout(resolve, 500));

  // Trigger print dialog (user selects "Save as PDF")
  printWindow.print();

  // Close after a delay to allow the print dialog to open
  setTimeout(() => {
    printWindow.close();
  }, 1000);
}
