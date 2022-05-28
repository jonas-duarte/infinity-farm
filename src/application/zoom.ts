import { GameEvents } from "../domain/event/game-events";

export class Zoom {
  public static onUpdateZoom(callback: (zoom: Zoom) => void) {
    GameEvents.getInstance().eventEmitter.on("updateZoom", (zoom: Zoom) => {
      callback(zoom);
    });
  }

  public static emitUpdateZoom(zoom: Zoom) {
    GameEvents.getInstance().eventEmitter.emit("updateZoom", zoom);
  }

  constructor(private _fieldSize: number) {}

  public zoomIn() {
    if (this._fieldSize >= 256) return;
    this._fieldSize += 8;
    Zoom.emitUpdateZoom(this);
  }

  public zoomOut() {
    if (this._fieldSize <= 8) return;
    this._fieldSize -= 8;
    Zoom.emitUpdateZoom(this);
  }

  public get fieldSize(): number {
    return this._fieldSize;
  }
}
