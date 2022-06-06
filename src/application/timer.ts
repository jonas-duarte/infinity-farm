import { GameEvents } from "../domain/event/game-events";

export class Timer {
  public static onTick(callback: (time: number) => void) {
    GameEvents.getInstance().eventEmitter.on("tick", (time: number) => {
      callback(time);
    });
  }

  public static emitTick(time: number) {
    GameEvents.getInstance().eventEmitter.emit("tick", time);
  }

  private static _instance: Timer;

  private constructor() {}

  public static getInstance(): Timer {
    if (!Timer._instance) {
      Timer._instance = new Timer();
      Timer._instance.start();
    }
    return Timer._instance;
  }

  private _time: number = 0;
  public get time(): number {
    return this._time;
  }

  private tick(): void {
    this._time++;
    Timer.emitTick(this._time);
  }

  public start(): void {
    setInterval(() => {
      this.tick();
    }, 1000);
  }
}
