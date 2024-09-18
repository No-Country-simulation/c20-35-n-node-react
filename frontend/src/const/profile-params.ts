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

export const questions = [
  {
    id: 'age',
    label: '¿Cuántos años tienes?',
    type: 'number',
    text: 'Años',
    placeholder: '30',
  },
  {
    id: 'weight',
    label: '¿Cuál es tu peso?',
    type: 'number',
    placeholder: '80',
    text: 'kg',
  },
  {
    id: 'height',
    label: '¿Cuál es tu altura?',
    type: 'number',
    placeholder: '165',
    text: 'cm',
  },
  {
    id: 'gender',
    label: '¿Con qué sexo debemos hacer los cálculos de necesidades calóricas?',
    type: 'select',
    options: [
      { value: 'male', label: 'Masculino', icon: 'male.svg' },
      { value: 'female', label: 'Femenino', icon: 'female.svg' },
    ],
  },
  {
    id: 'goal',
    label: '¿Cuál es tu objetivo de fitness?',
    type: 'select',
    options: GOALS,
    placeholder: 'Selecciona tus objetivos',
  },
  {
    id: 'activityLevel',
    label: '¿Cuál es el nivel de actividad que tienes/tendrás?',
    type: 'select',
    options: ACTIVITY_LEVELS,
    placeholder: 'Selecciona tu nivel de actividad',
  },
];
