'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { createClient } from '@/lib/supabase/client';

interface User {
  id: string;
  email: string;
  is_admin: boolean | null;
  is_enabled: boolean | null;
}

export default function UsersConfig() {
  const [users, setUsers] = useState<User[]>([]);
  const supabase = createClient();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    const { data: fetchedUsers, error } = await supabase
      .from('users')
      .select('id, email, is_admin, is_enabled')
      .order('email');

    if (error) {
      toast.error('Error al cargar usuarios');
      return;
    }

    setUsers(
      (fetchedUsers || []).map(user => ({
        id: user.id,
        email: user.email,
        is_admin: user.is_admin ?? false,
        is_enabled: user.is_enabled ?? true
      }))
    );
  };

  const toggleAdmin = async (userId: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('users')
      .update({ 
        is_admin: !currentValue,
        is_enabled: true 
      })
      .eq('id', userId);

    if (error) {
      toast.error('Error al actualizar el usuario');
      return;
    }

    setUsers(users.map(user => 
      user.id === userId ? { ...user, is_admin: !currentValue } : user
    ));

    toast.success('Usuario actualizado exitosamente');
  };

  const toggleEnabled = async (userId: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('users')
      .update({ is_enabled: !currentValue })
      .eq('id', userId);

    if (error) {
      toast.error('Error al actualizar el usuario');
      return;
    }

    setUsers(users.map(user => 
      user.id === userId ? { ...user, is_enabled: !currentValue } : user
    ));

    toast.success('Usuario actualizado exitosamente');
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <Button variant="ghost" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Volver al chat
          </Link>
        </Button>
      </div>
      <div className="bg-card rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Administrador</th>
                <th className="text-left p-4">Habilitado</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <Switch
                      checked={user.is_admin ?? false}
                      onCheckedChange={() => toggleAdmin(user.id, user.is_admin ?? false)}
                    />
                  </td>
                  <td className="p-4">
                    <Switch
                      checked={user.is_enabled ?? true}
                      onCheckedChange={() => toggleEnabled(user.id, user.is_enabled ?? true)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 