import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { createClient } from '@supabase/supabase-js';

import type { Experimental_LanguageModelV1Middleware } from 'ai';

export const ragMiddleware: Experimental_LanguageModelV1Middleware = {
    async transformParams({ params }) {
      const lastMessageContent = params.prompt[params.prompt.length - 1].content[0];
      let lastMessage = '';
      
      if (typeof lastMessageContent !== 'string') {
        if ('text' in lastMessageContent) {
          lastMessage = lastMessageContent.text;
          console.log(lastMessage);
        }
      }

      if (!lastMessage) {
          console.log('no params messages found');
        return params;
      }
  
  
      // Inicializar el cliente de Supabase
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
  
      // Crear el vector store
      const vectorStore = new SupabaseVectorStore(
        new OpenAIEmbeddings(),
        {
          client: supabase,
          tableName: 'company_knowledge',
          queryName: 'match_company_knowledge'
        }
      );
  
      // Buscar documentos relevantes
      const results = await vectorStore.similaritySearch(
        lastMessage  as string, // Se usa el contenido del último mensaje
        3
      );
  
      // Formatear el contexto a partir de los documentos recuperados
      const context = results
        .map(doc => `Contenido de ${doc.metadata.source} página ${doc.metadata.page}:\n${doc.pageContent}`)
        .join('\n\n');
  
      // Agregar el contexto al prompt
      params.prompt.push({
        role: 'system',
        content: `Contexto relevante:\n${context}`
      });

      console.log(params.prompt);
  
      return params;
    }
  };