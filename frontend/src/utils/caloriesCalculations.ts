import { User, Gender, ActivityLevel, Goal } from '../models/User';
import { CalorieRequirement } from '../models/CalorieRequirement';

export function calculateBMR(user: User): number {
  const { weight, height, age, gender } = user;
  if (gender === Gender.Male) {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const activityMultipliers = {
    [ActivityLevel.Sedentary]: 1.2,
    [ActivityLevel.LightlyActive]: 1.375,
    [ActivityLevel.ModeratelyActive]: 1.55,
    [ActivityLevel.VeryActive]: 1.725,
    [ActivityLevel.ExtraActive]: 1.9
  };
  return bmr * activityMultipliers[activityLevel];
}

export function calculateGoalCalories(tdee: number, goal: Goal): number {
  switch (goal) {
    case Goal.LoseWeight:
      return tdee - 500;
    case Goal.GainWeight:
      return tdee + 500;
    default:
      return tdee;
  }
}

export function calculateCalorieRequirement(user: User): CalorieRequirement {
  const bmr = calculateBMR(user);
  const tdee = calculateTDEE(bmr, user.activity_level);
  const goalCalories = calculateGoalCalories(tdee, user.goal);

  return {
    bmr,
    tdee,
    goal: goalCalories
  };
}