import { Field } from "../entities/field";

type PosKey = `${number}-${number}`;
const collection: Map<PosKey, Field> = new Map();

export class FieldRepository {
  private static instance: FieldRepository;

  private constructor() {}

  public static getInstance(): FieldRepository {
    if (!FieldRepository.instance) {
      FieldRepository.instance = new FieldRepository();
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
