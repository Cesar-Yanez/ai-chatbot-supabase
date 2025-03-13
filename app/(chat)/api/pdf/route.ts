import { NextResponse } from 'next/server';

import { storeDocumentEmbeddings } from '@/lib/pdf/embeddings';
import { loadPDFDocument } from '@/lib/pdf/loader';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const documents = await loadPDFDocument(buffer);
    
    await storeDocumentEmbeddings(
      documents,
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    );
  }
}