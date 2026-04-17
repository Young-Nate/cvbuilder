'use client';

export async function generatePdfFromPreview(
  previewElement: HTMLElement,
  filename: string
): Promise<void> {
  // Get all stylesheets from the page
  const styleSheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
  const styles: string[] = [];
  
  for (const sheet of styleSheets) {
    if (sheet.tagName === 'STYLE') {
      styles.push(sheet.outerHTML);
    } else if (sheet.tagName === 'LINK') {
      // Fetch external stylesheet content to inline it
      const href = (sheet as HTMLLinkElement).href;
      if (href) {
        try {
          const resp = await fetch(href);
          const css = await resp.text();
          styles.push(`<style>${css}</style>`);
        } catch {
          styles.push(sheet.outerHTML);
        }
      }
    }
  }

  // Get Google Fonts links
  const fontLinks = Array.from(document.querySelectorAll('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]'))
    .map(el => el.outerHTML)
    .join('\n');

  // Build a complete standalone HTML page with the resume content
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  ${fontLinks}
  ${styles.join('\n')}
  <style>
    @page { size: A4; margin: 0; }
    *, *::before, *::after {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 210mm;
      min-height: 297mm;
      background: white;
      overflow-wrap: break-word;
      word-break: break-word;
    }
  </style>
</head>
<body>
  ${previewElement.outerHTML}
</body>
</html>`;

  // Send to server for Puppeteer rendering
  const response = await fetch('/api/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || error.error || 'PDF generation failed');
  }

  // Download the PDF blob
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
