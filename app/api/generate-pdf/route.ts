import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const CHROMIUM_PACK = 'https://github.com/nicholasgasior/chromium-binaryes/releases/download/v131.0.0/chromium-v131.0.0-pack.tar';

export async function POST(req: NextRequest) {
  let browser = null;
  
  try {
    const { html } = await req.json();
    
    if (!html || typeof html !== 'string') {
      return NextResponse.json({ error: 'Missing html body' }, { status: 400 });
    }

    const executablePath = await chromium.executablePath(CHROMIUM_PACK);

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 794, height: 1123 },
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    
    await page.setContent(html, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Small wait for rendering
    await new Promise(resolve => setTimeout(resolve, 1000));

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
