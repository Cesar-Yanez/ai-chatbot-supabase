'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function DisabledAccount() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-destructive">
            Cuenta Deshabilitada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-lg">
            Tu cuenta ha sido temporalmente deshabilitada.
          </p>
          <div className="space-y-2 text-muted-foreground">
            <p>
              Si crees que esto es un error o necesitas reactivar tu cuenta, por favor contacta al equipo de soporte:
            </p>
            <ul className="space-y-1">
              <li>📧 Email: <a href="mailto:soporte@ejemplo.com" className="text-primary hover:underline">soporte@ejemplo.com</a></li>
              <li>📱 Teléfono: <a href="tel:+34900000000" className="text-primary hover:underline">+34 900 000 000</a></li>
              <li>⚡ Portal de Soporte: <a href="https://soporte.ejemplo.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">soporte.ejemplo.com</a></li>
            </ul>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              Por favor, ten a mano tu dirección de correo electrónico y cualquier información relevante sobre tu cuenta cuando contactes con soporte.
            </p>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline" asChild>
            <Link href="/login" className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Volver al inicio de sesión
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 