import { Plant } from "../entities/plant";

const collection: Map<string, Plant> = new Map();

collection.set("watermelon", {
  name: "watermelon",
  price: 1,
  growingTime: 2,
  harvestTime: 2,
  harvestMinQuantity: 8,
  harvestMaxQuantity: 12,
  harvestCharge: 1,
  livingTime: 2,
  wateringTime: 1,
  fertilizingTime: 2,
});

collection.set("corn", {
  name: "corn",
  price: 1,
  growingTime: 1,
  harvestTime: 1,
  harvestMinQuantity: 5,
  harvestMaxQuantity: 10,
  harvestCharge: 1,
  livingTime: 1,
  wateringTime: 2,
  fertilizingTime: 1,
});

collection.set("lemon", {
  name: "lemon",
  price: 5,
  growingTime: 8,
  harvestTime: 1,
  harvestMinQuantity: 2,
  harvestMaxQuantity: 4,
  harvestCharge: 1,
  livingTime: 200,
  wateringTime: 2,
  fertilizingTime: 20,
});

collection.set("banana", {
  name: "banana",
  price: 30,
  growingTime: 4,
  harvestTime: 4,
  harvestMinQuantity: 5,
  harvestMaxQuantity: 10,
  harvestCharge: 2,
  livingTime: 80,
  wateringTime: 2,
  fertilizingTime: 20,
});

collection.set("pineapple", {
  name: "pineapple",
  price: 1,
  growingTime: 4,
  harvestTime: 4,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 2,
  harvestCharge: 3,
  livingTime: 8,
  wateringTime: 2,
  fertilizingTime: 8,
});

collection.set("aubergine", {
  name: "aubergine",
  price: 3,
  growingTime: 1,
  harvestTime: 1,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 3,
  harvestCharge: 3,
  livingTime: 5,
  wateringTime: 2,
  fertilizingTime: 1,
});

collection.set("avocado", {
  name: "avocado",
  price: 20,
  growingTime: 16,
  harvestTime: 4,
  harvestMinQuantity: 4,
  harvestMaxQuantity: 10,
  harvestCharge: 4,
  livingTime: 120,
  wateringTime: 2,
  fertilizingTime: 5,
});

collection.set("pumpkin", {
  name: "pumpkin",
  price: 2,
  growingTime: 2,
  harvestTime: 2,
  harvestMinQuantity: 5,
  harvestMaxQuantity: 7,
  harvestCharge: 4,
  livingTime: 2,
  wateringTime: 2,
  fertilizingTime: 2,
});

collection.set("carrot", {
  name: "carrot",
  price: 2,
  growingTime: 1,
  harvestTime: 1,
  harvestMinQuantity: 4,
  harvestMaxQuantity: 7,
  harvestCharge: 4,
  livingTime: 1,
  wateringTime: 2,
  fertilizingTime: 1,
});

collection.set("potato", {
  name: "potato",
  price: 5,
  growingTime: 1,
  harvestTime: 1,
  harvestMinQuantity: 10,
  harvestMaxQuantity: 14,
  harvestCharge: 5,
  livingTime: 1,
  wateringTime: 2,
  fertilizingTime: 1,
});

collection.set("bell-pepper", {
  name: "bell-pepper",
  price: 7,
  growingTime: 1,
  harvestTime: 1,
  harvestMinQuantity: 2,
  harvestMaxQuantity: 2,
  harvestCharge: 9,
  livingTime: 4,
  wateringTime: 2,
  fertilizingTime: 1,
});

collection.set("apple", {
  name: "apple",
  price: 40,
  growingTime: 10,
  harvestTime: 4,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 6,
  harvestCharge: 7,
  livingTime: 160,
  wateringTime: 2,
  fertilizingTime: 20,
});

collection.set("pear", {
  name: "pear",
  price: 40,
  growingTime: 10,
  harvestTime: 4,
  harvestMinQuantity: 3,
  harvestMaxQuantity: 4,
  harvestCharge: 7,
  livingTime: 160,
  wateringTime: 2,
  fertilizingTime: 20,
});

collection.set("beetroot", {
  name: "beetroot",
  price: 70,
  growingTime: 1,
  harvestTime: 4,
  harvestMinQuantity: 5,
  harvestMaxQuantity: 6,
  harvestCharge: 6,
  livingTime: 21,
  wateringTime: 2,
  fertilizingTime: 2,
});

collection.set("tomato", {
  name: "tomato",
  price: 100,
  growingTime: 1,
  harvestTime: 4,
  harvestMinQuantity: 3,
  harvestMaxQuantity: 4,
  harvestCharge: 7,
  livingTime: 15,
  wateringTime: 2,
  fertilizingTime: 1,
});

collection.set("strawberry", {
  name: "strawberry",
  price: 200,
  growingTime: 1,
  harvestTime: 1,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 2,
  harvestCharge: 20,
  livingTime: 20,
  wateringTime: 1,
  fertilizingTime: 1,
});

export class PlantRepository {
  private static instance: PlantRepository;

  private constructor() {}

  public static getInstance(): PlantRepository {
    if (!PlantRepository.instance) {
      PlantRepository.instance = new PlantRepository();
    }
    return PlantRepository.instance;
  }

  public getPlant(name: string): Plant | null {
    return collection.get(name) || null;
  }

  public getAllPlants(): Plant[] {
    return Array.from(collection.values());
  }

  public getAllPlantsNames(): string[] {
    return Array.from(collection.keys());
  }
}
