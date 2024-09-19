export const calculatePercentage = (actual: number, objetivo: number) => {
  return Math.min(Math.round((actual / objetivo) * 100), 100);
};

export const calculateCalorieChange = (consumed: number, burned: number, goal: number) => {
  return ((consumed - burned) / goal) * 100;
};

export const calculateMacroGoal = (totalCalories: number, percentage: number, caloriesPerGram: number) => {
  return (totalCalories * percentage) / caloriesPerGram;
};