import { Plant } from "./plant";
import { GameEvents } from "../event/game-events";
import { ActionResult } from "../contracts/action-result";

export type FieldProps = {
  plant?: string | undefined;
  isPlowed: boolean;
  isWatered: boolean;
  isFertilized: boolean;
};

export class Field {
  public static onUpdateField(row: number, column: number, callback: (field: Field) => void) {
    GameEvents.getInstance().eventEmitter.on(`updateField-${row}-${column}`, (field: Field) => {
      callback(field);
    });
  }

  public static emitUpdateField(row: number, column: number, field: Field) {
    GameEvents.getInstance().eventEmitter.emit(`updateField-${row}-${column}`, field);
  }

  private _plant?: string | undefined;
  private _isPlowed: boolean;
  private _isFertilized: boolean;
  private _isWatered: boolean;

  private _time: number = 0;

  constructor(private row: number, private column: number, field: FieldProps) {
    this._plant = field.plant;
    this._isPlowed = field.isPlowed;
    this._isWatered = field.isWatered;
    this._isFertilized = field.isFertilized;
  }

  public get plant(): string | undefined {
    return this._plant;
  }

  public get isPlowed(): boolean {
    return this._isPlowed;
  }

  public get isWatered(): boolean {
    return this._isWatered;
  }

  public get isFertilized(): boolean {
    return this._isFertilized;
  }

  public seed(plant: Plant): ActionResult {
    if (!this._isPlowed) {
      return { status: "failure", message: "Cannot seed unplowed field" };
    }
    if (this.plant) {
      return { status: "failure", message: "Field already has a plant" };
    }
    this._time = 0;
    this._plant = plant.name;
    Field.emitUpdateField(this.row, this.column, this);
    return { status: "success", message: "Seeded field" };
  }

  public harvest(): ActionResult {
    if (!this.plant) {
      return { status: "failure", message: "No plant to harvest" };
    }
    this._plant = undefined;
    this._isPlowed = false;
    this._time = 0;
    Field.emitUpdateField(this.row, this.column, this);
    return { status: "success", message: "Harvested plant" };
  }

  public fertilize(): ActionResult {
    if (!this._isPlowed) {
      return { status: "failure", message: "Cannot fertilize unplowed field" };
    }
    if (this._isFertilized) {
      return { status: "failure", message: "Field is already fertilized" };
    }
    this._isFertilized = true;
    Field.emitUpdateField(this.row, this.column, this);
    return { status: "success", message: "Fertilized field" };
  }

  public water(): ActionResult {
    if (!this._isPlowed) {
      return { status: "failure", message: "Cannot water unplowed field" };
    }
    if (this._isWatered) {
      return { status: "failure", message: "Field is already watered" };
    }
    this._isWatered = true;
    Field.emitUpdateField(this.row, this.column, this);
    return { status: "success", message: "Watered field" };
  }

  public plow(): ActionResult {
    if (this._isPlowed) {
      return { status: "failure", message: "Field is already plowed" };
    }
    this._isPlowed = true;
    Field.emitUpdateField(this.row, this.column, this);
    return { status: "success", message: "Plowed field" };
  }

  public grow(): ActionResult {
    if (!this._plant) {
      return { status: "failure", message: "No plant to grow" };
    }
    this._time++;
    return { status: "success", message: "Grown plant" };
  }

  public get lifeTime(): number {
    return this._time;
  }
}
