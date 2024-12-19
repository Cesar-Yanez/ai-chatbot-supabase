'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/db/auth';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      await signUp(email, password);
      toast.success('Revisa tu correo electrónico para confirmar tu cuenta');
      router.push('/login');
    } catch (error: any) {
      toast.error('Error al registrarse: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Registro</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Ingresa tus datos para crear una cuenta
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
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
            {isLoading ? 'Cargando...' : 'Registrarse'}
          </Button>
        </form>
        <div className="text-center text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link className="underline" href="/login">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
