import EventEmitter from "events";

export class GameEvents {
  private static _instance: GameEvents;

  private constructor(public readonly eventEmitter: EventEmitter) {}

  public static getInstance() {
    if (!GameEvents._instance) {
      const eventEmitter = new EventEmitter();
      eventEmitter.setMaxListeners(0);
      GameEvents._instance = new GameEvents(eventEmitter);
    }
    return GameEvents._instance;
  }
}
