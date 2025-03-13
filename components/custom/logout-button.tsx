'use client';

import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { signOut } from '@/db/auth';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut();
      router.push('/login');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      <LogOutIcon className="mr-2 size-4" />
      Cerrar sesión
    </Button>
  );
}
