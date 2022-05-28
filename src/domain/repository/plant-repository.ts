import { Plant } from "../entities/plant";

const collection: Map<string, Plant> = new Map();

collection.set("aubergine", {
  name: "aubergine",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("avocado", {
  name: "avocado",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("beetroot", {
  name: "beetroot",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("bell-pepper", {
  name: "bell-pepper",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("carrot", {
  name: "carrot",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("corn", {
  name: "corn",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("lemon", {
  name: "lemon",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("pear", {
  name: "pear",

  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("pineapple", {
  name: "pineapple",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("pumpkin", {
  name: "pumpkin",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("strawberry", {
  name: "strawberry",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("watermelon", {
  name: "watermelon",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("tomato", {
  name: "tomato",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("apple", {
  name: "apple",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("banana", {
  name: "banana",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
});

collection.set("potato", {
  name: "potato",
  price: 10,
  growingTime: 10,
  harvestTime: 10,
  harvestMinQuantity: 1,
  harvestMaxQuantity: 10,
  harvestCharge: 10,
  livingTime: 10,
  wateringTime: 10,
  fertilizingTime: 10,
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
}
