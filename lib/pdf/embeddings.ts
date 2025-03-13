import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from '@supabase/supabase-js';

export async function storeDocumentEmbeddings(
  documents: Document[],
  supabaseUrl: string,
  supabaseKey: string
) {
  const client = createClient(supabaseUrl, supabaseKey);
  
  const embeddings = new OpenAIEmbeddings();
  
  const vectorStore = await SupabaseVectorStore.fromDocuments(
    documents,
    embeddings,
    {
      client,
      tableName: 'company_knowledge',
      queryName: 'match_company_knowledge'
    }
  );
  
  return vectorStore;
}