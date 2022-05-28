import { GameEvents } from "../event/game-events";

type IGarden = {
  rows: number;
  columns: number;
};

export class Garden {
  public static onUpdateGarden(callback: (garden: Garden) => void) {
    GameEvents.getInstance().eventEmitter.on("updateGarden", (garden: Garden) => {
      callback(garden);
    });
  }

  public static emitUpdateGarden(garden: Garden) {
    GameEvents.getInstance().eventEmitter.emit("updateGarden", garden);
  }

  private _rows: number;
  private _columns: number;

  constructor(garden?: IGarden) {
    this._rows = garden?.rows || 30;
    this._columns = garden?.columns || 30;
  }

  public get rows(): number {
    return this._rows;
  }

  public get columns(): number {
    return this._columns;
  }

  public addRow(n: number = 1) {
    this._rows += n;
    Garden.emitUpdateGarden(this);
  }

  public addColumn(n: number = 1) {
    this._columns += n;
    Garden.emitUpdateGarden(this);
  }
}
