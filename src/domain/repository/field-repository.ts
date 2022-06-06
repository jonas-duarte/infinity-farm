import { Field } from "../entities/field";
import { PlantRepository } from "./plant-repository";

type PosKey = `${number}-${number}`;
const collection: Map<PosKey, Field> = new Map();

function* generateFields(rows: number, columns: number): IterableIterator<any> {
  const plants = PlantRepository.getInstance().getAllPlantsNames();
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      yield {
        row,
        column,
        field: new Field(row, column, {
          plant: plants[Math.floor(Math.random() * plants.length)],
          isPlowed: true,
          isWatered: Boolean(Math.floor(Math.random() * 2)),
          isFertilized: Boolean(Math.floor(Math.random() * 2)),
        }),
      };
    }
  }
}

export class FieldRepository {
  private static instance: FieldRepository;

  private constructor() {}

  public static getInstance(): FieldRepository {
    if (!FieldRepository.instance) {
      FieldRepository.instance = new FieldRepository();
      // @ts-ignore
      // [...generateFields(100, 60)].forEach(({ row, column, field }) => {
      //   collection.set(`${row}-${column}`, field);
      // });
    }
    return FieldRepository.instance;
  }

  public getField(x: number, y: number): Field {
    const key: `${number}-${number}` = `${x}-${y}`;
    const value = collection.get(key);
    if (!value) {
      const field = new Field(x, y, {
        isPlowed: false,
        isWatered: false,
        isFertilized: false,
      });
      collection.set(key, field);
      return field;
    } else {
      return value;
    }
  }
}
