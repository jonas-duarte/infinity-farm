import { GameEvents } from "../domain/event/game-events";

export class Cash {
  public static onUpdateCash(callback: (cash: Cash) => void) {
    GameEvents.getInstance().eventEmitter.on("updateCash", (cash: Cash) => {
      callback(cash);
    });
  }

  public static emitUpdateCash(cash: Cash) {
    GameEvents.getInstance().eventEmitter.emit("updateCash", cash);
  }

  constructor(private _amount: number) {}

  public get amount(): number {
    return this._amount;
  }

  public addAmount(amount: number): void {
    this._amount += amount;
    Cash.emitUpdateCash(this);
  }

  public subtractAmount(amount: number): void {
    this._amount -= amount;
    Cash.emitUpdateCash(this);
  }
}