export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    deleted_at?: string;
    height?: number;
    weight?: number;
    age?: number;
    gender?: Gender;
    goal?: Goal;
    activityLevel?: ActivityLevel;
}

export enum Gender {
    Male = 'Masculino',
    Female = 'Femenino'
}

export enum Goal {
    LoseWeight = 'Perder peso',
    MaintainWeight = 'Mantener peso',
    GainWeight = 'Ganar peso'
}

export enum ActivityLevel {
    Sedentary = 'Sedentario',
    LightlyActive = 'Ligeramente activo',
    ModeratelyActive = 'Moderadamente activo',
    VeryActive = 'Muy activo',
    ExtraActive = 'Extra activo'
}