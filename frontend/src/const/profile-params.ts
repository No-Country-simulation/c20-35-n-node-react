import { z } from 'zod';
import { Gender, Goal, ActivityLevel } from '../models/User';

export const GOALS = [
  { label: 'Ganar peso', value: Goal.GainWeight, icon: 'muscle.svg' },
  { label: 'Perder peso', value: Goal.LoseWeight, icon: 'weight.svg' },
  { label: 'Mantener peso', value: Goal.MaintainWeight, icon: 'equal.svg' },
];

export const ACTIVITY_LEVELS = [
  { label: 'Sedentario', value: ActivityLevel.Sedentary, icon: '' },
  { label: 'Ligeramente activo', value: ActivityLevel.LightlyActive, icon: '' },
  { label: 'Moderadamente activo', value: ActivityLevel.ModeratelyActive, icon: '' },
  { label: 'Muy activo', value: ActivityLevel.VeryActive, icon: '' },

];

export const userProfileSchema = z.object({
  age: z.string().min(1, {
    message: 'La edad es requerida',
  }),
  gender: z.nativeEnum(Gender),
  weight: z.string().min(1, {
    message: 'El peso es requerido',
  }),
  height: z.string().min(1, {
    message: 'La altura es requerida',
  }),
  goal: z.nativeEnum(Goal),
  activityLevel: z.nativeEnum(ActivityLevel),
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
      { value: Gender.Male, label: 'Masculino', icon: 'male.svg' },
      { value: Gender.Female, label: 'Femenino', icon: 'female.svg' },
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
