'use client';

import { Settings2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export function InstructionsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadInstructions();
    }
  }, [isOpen]);

  const loadInstructions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/instructions');
      
      if (!response.ok) {
        throw new Error('Error al cargar las instrucciones');
      }
      
      const data = await response.json();
      setInstructions(data.instructions);
    } catch (error) {
      toast.error('Error al cargar las instrucciones');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/instructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructions }),
      });
      
      if (!response.ok) {
        throw new Error('Error al guardar las instrucciones');
      }
      
      toast.success('Instrucciones guardadas exitosamente');
      setIsOpen(false);
    } catch (error) {
      toast.error('Error al guardar las instrucciones');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Settings2Icon className="mr-2 size-4" />
          Instrucciones
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Instrucciones del Asistente</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Ingresa las instrucciones para el asistente..."
            className="min-h-[300px]"
            disabled={isLoading}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Guardar Instrucciones'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 