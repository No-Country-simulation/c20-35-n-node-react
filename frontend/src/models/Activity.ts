export interface Activity {
  id: number;
  calories_burned_per_hour: number;
  description: string;
  difficulty_level: DifficultyLevel;
  equipment_needed: string;
  muscles_targeted: string;
  name: string;
}

export enum DifficultyLevel {
  beginner = 'Principiante',
  intermediate = 'Intermedio',
  advanced = 'Avanzado',
}
