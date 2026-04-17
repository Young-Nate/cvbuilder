import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30; // 30 seconds timeout
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();
    
    if (!html || typeof html !== 'string') {
      return NextResponse.json({ error: 'Missing html body' }, { status: 400 });
    }

    // Dynamic imports for serverless
    const chromium = await import('@sparticuz/chromium-min');
    const puppeteer = await import('puppeteer-core');

    const executablePath = await chromium.default.executablePath(
      'https://github.com/nicholasgasior/chromium-binaryes/releases/download/v131.0.0/chromium-v131.0.0-pack.tar'
    );

    const browser = await puppeteer.default.launch({
      args: chromium.default.args,
      defaultViewport: { width: 794, height: 1123 },
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    
    // Set the HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'PDF generation failed', details: String(error) },
      { status: 500 }
    );
  }
}
