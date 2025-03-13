import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    
    try {
      // Intercambiar el código por una sesión
      await supabase.auth.exchangeCodeForSession(code);

      // Verificar si el usuario está habilitado
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user?.email) {
        console.error('Error getting user:', userError);
        return NextResponse.redirect(`${origin}/auth-error`);
      }

      const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('is_enabled')
        .eq('email', user.email)
        .single();

      if (dbError) {
        console.error('Error checking user status:', dbError);
        return NextResponse.redirect(`${origin}/auth-error`);
      }

      // Si el usuario está deshabilitado, cerrar sesión y redirigir
      if (userData?.is_enabled === false) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/disabled`);
      }

      // Si todo está bien, redirigir a la página principal
      return NextResponse.redirect(origin);
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(`${origin}/auth-error`);
    }
  }

  return NextResponse.redirect(`${origin}/auth-error`);
}
