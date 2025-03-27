import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { instructions } = await request.json();
    const supabase = await createClient();

    // Guardar las instrucciones en la base de datos
    const { error } = await supabase
      .from('instructions')
      .upsert({
        id: 1, // Asumimos que solo hay un registro de instrucciones
        content: instructions,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al guardar las instrucciones:', error);
    return NextResponse.json(
      { error: 'Error al guardar las instrucciones' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();

    // Obtener las instrucciones de la base de datos
    const { data, error } = await supabase
      .from('instructions')
      .select('content')
      .eq('id', 1)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ instructions: data?.content || '' });
  } catch (error) {
    console.error('Error al obtener las instrucciones:', error);
    return NextResponse.json(
      { error: 'Error al obtener las instrucciones' },
      { status: 500 }
    );
  }
} 