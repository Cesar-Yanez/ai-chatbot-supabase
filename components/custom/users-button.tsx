'use client';

import { UsersIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function UsersButton() {
  const router = useRouter();

  return (
    <Button variant="ghost"
      className="cursor-pointer"
      onClick={() => router.push('/users')}
    >
      <UsersIcon className="mr-2 size-4" />
      <span>Gestionar Usuarios</span>
    </Button>
  );
  
} 