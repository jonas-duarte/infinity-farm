import { Plant } from "../entities/plant";

const collection: Map<string, Plant> = new Map();

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
