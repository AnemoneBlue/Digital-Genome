/**
 * ⚗️ Metabolism System
 * Complete metabolism simulation
 */

class MetabolismSystem {
  constructor() {
    this.calories = 2000; // daily intake target
    this.macros = { proteins: 50, carbs: 250, fats: 65 };
    this.micronutrients = this.initializeVitamins();
    this.energyState = 100; // 0-100
    this.metabolicRate = 1.0;
  }

  initializeVitamins() {
    return {
      A: { name: 'Vitamin A', daily: 900, unit: 'mcg', sources: ['carrots', 'liver'] },
      B1: { name: 'Thiamine', daily: 1.2, unit: 'mg', sources: ['pork', 'beans'] },
      B2: { name: 'Riboflavin', daily: 1.3, unit: 'mg', sources: ['dairy', 'eggs'] },
      B3: { name: 'Niacin', daily: 16, unit: 'mg', sources: ['meat', 'fish'] },
      B6: { name: 'Vitamin B6', daily: 1.7, unit: 'mg', sources: ['meat', 'potatoes'] },
      B12: { name: 'Vitamin B12', daily: 2.4, unit: 'mcg', sources: ['meat', 'dairy'] },
      C: { name: 'Vitamin C', daily: 90, unit: 'mg', sources: ['citrus', 'peppers'] },
      D: { name: 'Vitamin D', daily: 600, unit: 'IU', sources: ['sunlight', 'fish'] },
      E: { name: 'Vitamin E', daily: 15, unit: 'mg', sources: ['nuts', 'seeds'] },
      K: { name: 'Vitamin K', daily: 120, unit: 'mcg', sources: ['leafygreens'] },
      Calcium: { name: 'Calcium', daily: 1000, unit: 'mg', sources: ['dairy', 'bones'] },
      Iron: { name: 'Iron', daily: 18, unit: 'mg', sources: ['meat', 'beans'] },
      Magnesium: { name: 'Magnesium', daily: 400, unit: 'mg', sources: ['nuts', 'greens'] },
      Zinc: { name: 'Zinc', daily: 11, unit: 'mg', sources: ['meat', 'shellfish'] }
    };
  }

  // Process food intake
  eat(food) {
    const nutrients = this.extractNutrients(food);
    this.macros.proteins += nutrients.proteins;
    this.macros.carbs += nutrients.carbs;
    this.macros.fats += nutrients.fats;
    
    return {
      consumed: true,
      calories: nutrients.calories,
      macros: this.macros
    };
  }

  extractNutrients(food) {
    const foodDatabase = {
      apple: { calories: 95, proteins: 0.5, carbs: 25, fats: 0.3 },
      chicken: { calories: 165, proteins: 31, carbs: 0, fats: 3.6 },
      rice: { calories: 206, proteins: 4.3, carbs: 45, fats: 0.4 },
      egg: { calories: 78, proteins: 6, carbs: 0.6, fats: 5 },
      bread: { calories: 79, proteins: 2.7, carbs: 15, fats: 1 },
      milk: { calories: 149, proteins: 8, carbs: 12, fats: 8 }
    };
    
    return foodDatabase[food.toLowerCase()] || { calories: 100, proteins: 5, carbs: 20, fats: 3 };
  }

  // Basal Metabolic Rate calculation
  calculateBMR(weight = 70, height = 175, age = 30, sex = 'male') {
    if (sex === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Total Daily Energy Expenditure
  calculateTDEE(bmr, activityLevel = 1.2) {
    return bmr * activityLevel;
  }

  // Simulate metabolism over time
  metabolize(timeMinutes) {
    const baseBurn = 60; // calories per hour at rest
    const burnRate = baseBurn * this.metabolicRate * (timeMinutes / 60);
    
    this.macros.carbs -= burnRate * 0.5;
    this.macros.fats -= burnRate * 0.3;
    this.macros.proteins -= burnRate * 0.1;
    
    this.energyState = Math.min(100, this.energyState + (burnRate / this.calories) * 100);
    
    return {
      burned: burnRate,
      energyState: this.energyState,
      macrosRemaining: this.macros
    };
  }

  // ATP energy simulation
  generateATP() {
    const atpLevels = {
      resting: 100,
      active: 50,
      exhausted: 20
    };
    
    return {
      current: this.energyState,
      mitochondria: Math.floor(this.energyState / 10),
      efficiency: this.metabolicRate,
      levels: atpLevels
    };
  }

  // Glycemic response
  processGlucose(amount) {
    const insulinSensitivity = 0.8;
    const glucoseProcessed = amount * insulinSensitivity;
    const storedAsFat = (amount - glucoseProcessed) * 0.3;
    
    return {
      processed: glucoseProcessed,
      stored: storedAsFat,
      bloodSugar: 100 - (glucoseProcessed * 0.5),
      insulin: glucoseProcessed * 0.5
    };
  }

  // Fat oxidation
  burnFat(intensity) {
    const fatBurnRate = intensity * 0.5; // grams per minute
    const caloriesBurned = fatBurnRate * 9;
    
    return {
      fatBurned: fatBurnRate,
      calories: caloriesBurned,
      duration: 30 // minutes needed
    };
  }

  // Thermic effect of food
  processTEF(nutrients) {
    const proteinTEF = nutrients.proteins * 0.3;
    const carbsTEF = nutrients.carbs * 0.1;
    const fatsTEF = nutrients.fats * 0.03;
    
    return {
      total: proteinTEF + carbsTEF + fatsTEF,
      breakdown: { protein: proteinTEF, carbs: carbsTEF, fats: fatsTEF }
    };
  }

  getMetabolicState() {
    return {
      calories: this.calories,
      macros: this.macros,
      micronutrients: this.micronutrients,
      energyState: this.energyState,
      metabolicRate: this.metabolicRate,
      bmr: this.calculateBMR()
    };
  }
}

module.exports = new MetabolismSystem();
