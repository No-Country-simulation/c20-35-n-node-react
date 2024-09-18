import axios from 'axios';

const API_KEY = 'IQ12gGzC2dRSibH0l10ctwYh3HVbDMXCf4zO8HbK';

export interface FoodData {
  foodDescription: string;
  foodNutrients: {
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
  };
  servingSize: number;
  servingUnit: string;
}

async function getFoodData(
  query: string,
  pageSize: number,
): Promise<FoodData[]> {
  try {
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${query}&pageSize=${pageSize}`,
    );

    const foodData = response.data.foods;
    const foodDataArray: FoodData[] = [];

    foodData.forEach((food: any) => {
      const protein = food.foodNutrients.find(
        (nutrient: any) =>
          nutrient.nutrientId === '203' || nutrient.nutrientName === 'Protein',
      );
      const fat = food.foodNutrients.find(
        (nutrient: any) =>
          nutrient.nutrientId === '204' ||
          nutrient.nutrientName === 'Total lipid (fat)',
      );
      const carbohydrates = food.foodNutrients.find(
        (nutrient: any) =>
          nutrient.nutrientId === '205' ||
          nutrient.nutrientName === 'Carbohydrate, by difference',
      );
      const calories = food.foodNutrients.find(
        (nutrient: any) =>
          nutrient.nutrientId === '208' || nutrient.nutrientName === 'Energy',
      );

      const foodItem: FoodData = {
        foodDescription: food.description
          .toLowerCase()
          .replace(/\b\w/g, (c: string) => c.toUpperCase()),
        foodNutrients: {
          calories: Number((calories?.value || 0).toFixed(1)),
          fat: Number((fat?.value || 0).toFixed(1)),
          carbohydrates: Number((carbohydrates?.value || 0).toFixed(1)),
          protein: Number((protein?.value || 0).toFixed(1)),
        },
        servingSize: food.servingSize ? food.servingSize : 100,
        servingUnit: food.servingSizeUnit
          ? food.servingSizeUnit === 'GRM'
            ? 'g'
            : food.servingSizeUnit
          : 'g',
      };

      foodDataArray.push(foodItem);
    });
    return foodDataArray;
  } catch (error) {
    console.error('Error fetching food data:', error);
  }
  return [];
}

export default getFoodData;
