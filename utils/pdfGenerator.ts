'use client';

export async function generatePdfFromPreview(
  previewElement: HTMLElement,
  filename: string
): Promise<void> {
  // Get all stylesheets
  const styleSheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
  const styles: string[] = [];
  
  for (const sheet of styleSheets) {
    if (sheet.tagName === 'STYLE') {
      styles.push(sheet.outerHTML);
    } else if (sheet.tagName === 'LINK') {
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

  // Open a clean window with just the resume
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Veuillez autoriser les popups pour ce site, puis réessayez.');
    return;
  }

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${filename}</title>
  ${styles.join('\n')}
  <style>
    @page { size: A4; margin: 0; }
    @media print {
      html, body { margin: 0; padding: 0; width: 210mm; }
    }
    *, *::before, *::after {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 210mm;
      background: white;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    /* Hide everything except the resume when printing */
    .print-instructions { padding: 20px; text-align: center; font-family: system-ui; }
    .print-instructions h2 { margin-bottom: 8px; }
    .print-instructions p { color: #666; margin-bottom: 16px; }
    .print-instructions button {
      background: #7c3aed; color: white; border: none; padding: 12px 32px;
      border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: 600;
    }
    .print-instructions button:hover { background: #6d28d9; }
    @media print { .print-instructions { display: none !important; } }
  </style>
</head>
<body>
  <div class="print-instructions">
    <h2>📄 Votre CV est prêt</h2>
    <p>Cliquez sur le bouton ci-dessous, puis choisissez "Enregistrer en PDF" comme destination.</p>
    <button onclick="window.print()">Enregistrer en PDF</button>
  </div>
  ${previewElement.outerHTML}
</body>
</html>`);
  
  printWindow.document.close();
}
