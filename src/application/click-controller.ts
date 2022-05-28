import { Field } from "../domain/entities/field";
import { GameEvents } from "../domain/event/game-events";
import { Cash } from "./cash";

export type ClickAction = "plow" | "seed" | "harvest" | "water" | "fertilize";

export class ClickController {
  public static onUpdateClick(callback: (click: ClickController) => void) {
    GameEvents.getInstance().eventEmitter.on("updateClickController", (click: ClickController) => {
      callback(click);
    });
  }

  public static emitUpdateClick(click: ClickController) {
    GameEvents.getInstance().eventEmitter.emit("updateClickController", click);
  }

  private _clickAction: ClickAction;
  constructor() {
    this._clickAction = "plow";
  }

  public setClickAction(clickAction: ClickAction) {
    this._clickAction = clickAction;
    ClickController.emitUpdateClick(this);
  }

  public get clickAction(): ClickAction {
    return this._clickAction;
  }
}
