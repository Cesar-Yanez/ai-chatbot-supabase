import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { Document } from './types';

export async function loadPDFDocument(file: Buffer): Promise<Document[]> {
  const blob = new Blob([file]);
  const loader = new PDFLoader(blob);
  const docs = await loader.load();
  
  return docs.map((doc, index) => ({
    pageContent: doc.pageContent,
    metadata: {
      source: doc.metadata.source || 'unknown',
      page: index + 1
    }
  }));
}