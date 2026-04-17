import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60; // 60 seconds timeout (Vercel Pro)
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let browser = null;
  
  try {
    const { html } = await req.json();
    
    if (!html || typeof html !== 'string') {
      return NextResponse.json({ error: 'Missing html body' }, { status: 400 });
    }

    const chromium = await import('@sparticuz/chromium');
    const puppeteer = await import('puppeteer-core');

    browser = await puppeteer.default.launch({
      args: chromium.default.args,
      defaultViewport: { width: 794, height: 1123 },
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    
    await page.setContent(html, { 
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for fonts
    await page.evaluate(() => document.fonts.ready);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

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
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
