'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/db/auth';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw error;
      }

      // No necesitamos verificar el estado aquí ya que se hará en el callback
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al iniciar sesión');
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // Intentar iniciar sesión
      await signIn(email, password);

      // Verificar si el usuario está habilitado
      const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('is_enabled')
        .eq('email', email)
        .single();

      if (dbError) throw dbError;

      if (userData?.is_enabled === false) {
        // Cerrar sesión si el usuario está deshabilitado
        await supabase.auth.signOut();
        router.push('/disabled');
        return;
      }

      router.push('/');
      router.refresh();
    } catch (error: any) {
      toast.error('Error al iniciar sesión: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Ingresa tu correo electrónico para acceder a tu cuenta
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="correo@ejemplo.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" required type="password" />
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
        </form>
        <div className="text-center text-sm">
          ¿No tienes una cuenta?{' '}
          <Link className="underline" href="/register">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
