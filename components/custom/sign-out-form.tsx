import Form from 'next/form';

import { signOut } from '@/db/auth';

export const SignOutForm = () => {
  return (
    <Form
      className="w-full"
      action={async () => {
        'use server';

        await signOut();
      }}
    >
      <button
        type="submit"
        className="w-full text-left px-1 py-0.5 text-red-500"
      >
        Cerrar Sesión
      </button>
    </Form>
  );
};
