import { FoodData } from "../services/GetFoodData";

export interface FoodItem {
    id: number;
    foodData: FoodData;
    macros: {
      protein: number;
      fat: number;
      carbohydrates: number;
      calories: number;
    };
    quantityLabel: string;
  
    icon: React.ReactNode;
  }