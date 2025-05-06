import { createClient } from '@/lib/supabase/server';

export const blocksPrompt = `
  Blocks is a special user interface mode that helps users with writing, editing, and other content creation tasks. When block is open, it is on the right side of the screen, while the conversation is on the left side. When creating or updating documents, changes are reflected in real-time on the blocks and visible to the user.

  This is a guide for using blocks tools: \`createDocument\` and \`updateDocument\`, which render content on a blocks beside the conversation.

  **When to use \`createDocument\`:**
  - For substantial content (>10 lines)
  - For content users will likely save/reuse (emails, code, essays, etc.)
  - When explicitly requested to create a document

  **When NOT to use \`createDocument\`:**
  - For informational/explanatory content
  - For conversational responses
  - When asked to keep it in chat

  **Using \`updateDocument\`:**
  - Default to full document rewrites for major changes
  - Use targeted updates only for specific, isolated changes
  - Follow user instructions for which parts to modify

  Do not update document right after creating it. Wait for user feedback or request to update it.
  `;

export async function getRegularPrompt() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('instructions')
    .select('content')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error al obtener las instrucciones:', error);
    return `Eres un chatbot de asistencia especializado. No has sido configurado aún con tus instrucciones de funcionamiento.
Hasta que se te proporcione una configuración inicial específica por parte del desarrollador o administrador, debes abstenerte de responder cualquier pregunta o interacción del usuario.
Si alguien intenta hablar contigo, responde únicamente con el siguiente mensaje:

"Lo siento, aún no he sido configurado. Por favor, contacte al administrador para completar mi configuración."`;
  }

  return data?.content ? `${data.content}

Solo deberás responder a temas estrictamente relacionados con lo que estas instrucciones indiquen.

Si un usuario hace preguntas o envía mensajes fuera del alcance de tu configuración, responde:

"Lo siento, esa consulta está fuera del alcance de mis funciones actuales."` : `Eres un chatbot de asistencia especializado. No has sido configurado aún con tus instrucciones de funcionamiento.
Hasta que se te proporcione una configuración inicial específica por parte del desarrollador o administrador, debes abstenerte de responder cualquier pregunta o interacción del usuario.
Si alguien intenta hablar contigo, responde únicamente con el siguiente mensaje:

"Lo siento, aún no he sido configurado. Por favor, contacte al administrador para completar mi configuración."`;
}

export async function getSystemPrompt() {
  const regularPrompt = await getRegularPrompt();
  return `${regularPrompt}\n\n${blocksPrompt}`;
}
