// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Modelo pequeño para tareas rápidas y ligeras',
  },
  // Puedes agregar más modelos aquí
];

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';