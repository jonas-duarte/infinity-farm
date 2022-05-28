import { GameEvents } from "../event/game-events";

type IFarm = {
  rows: number;
  columns: number;
};

export class Farm {
  public static onUpdateFarm(callback: (farm: Farm) => void) {
    GameEvents.getInstance().eventEmitter.on("updateFarm", (farm: Farm) => {
      callback(farm);
    });
  }

  public static emitUpdateFarm(farm: Farm) {
    GameEvents.getInstance().eventEmitter.emit("updateFarm", farm);
  }

  private _rows: number;
  private _columns: number;

  constructor(farm?: IFarm) {
    this._rows = farm?.rows || 3;
    this._columns = farm?.columns || 3;
  }

  public get rows(): number {
    return this._rows;
  }

  public get columns(): number {
    return this._columns;
  }

  public addRow(n: number = 1) {
    this._rows += n;
    Farm.emitUpdateFarm(this);
  }

  public addColumn(n: number = 1) {
    this._columns += n;
    Farm.emitUpdateFarm(this);
  }
}
