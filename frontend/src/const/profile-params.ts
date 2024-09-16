import { z } from 'zod';

export const GOALS = [
  { label: 'Ganar masa muscular', value: 'gain_muscle', icon: 'muscle.svg' },
  { label: 'Perder grasa', value: 'lose_weight', icon: 'weight.svg' },
  { label: 'Mantener peso', value: 'keep_weight', icon: 'equal.svg' },
];

export const ACTIVITY_LEVELS = [
  { label: 'Sedentario', value: '1', icon: '' },
  { label: 'Mínima actividad', value: '2', icon: '' },
  { label: 'Entrenamiento moderado', value: '3', icon: '' },
  { label: 'Entrenamiento intensivo', value: '4', icon: '' },
];

export const userProfileSchema = z.object({
  age: z.string().min(1, {
    message: 'La edad es requerida',
  }),
  gender: z.string().min(1, { message: 'Se debe seleccionar un Género' }),
  weight: z.string().min(1, {
    message: 'El peso es requerido',
  }),
  height: z.string().min(1, {
    message: 'La altura es requerida',
  }),
  goal: z.string().min(1, { message: 'Selecciona una opción' }),
  activityLevel: z.string().min(1, { message: 'Selecciona una opción' }),
});
export type FormData = z.infer<typeof userProfileSchema>;
