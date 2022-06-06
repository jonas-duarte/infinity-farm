import { Field } from "./../domain/entities/field";
import { Farm } from "../domain/entities/farm";
import { Plant } from "../domain/entities/plant";
import { PlantRepository } from "../domain/repository/plant-repository";
import { Cash } from "./cash";
import { ClickAction, ClickController } from "./click-controller";
import { Zoom } from "./zoom";
import { FieldRepository } from "../domain/repository/field-repository";
import { ActionResult } from "../domain/contracts/action-result";
import { Random } from "../utils/random";
import { Timer } from "./timer";

export class GameManager {
  private static _instance: GameManager;

  private _farm: Farm;
  private _cash: Cash;
  private _clickController: ClickController;
  private _zoom: Zoom;
  private _timer: Timer = Timer.getInstance();
  private constructor() {
    this._farm = new Farm({ columns: 3, rows: 3 });
    this._cash = new Cash(10);
    this._clickController = new ClickController();
    this._zoom = new Zoom(64);
  }

  public static getInstance() {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager();
    }
    return GameManager._instance;
  }

  public get farm() {
    return this._farm;
  }

  public get cash() {
    return this._cash;
  }

  public get clickController() {
    return this._clickController;
  }

  public get zoom() {
    return this._zoom;
  }

  private _seeds: Plant[] | null = null;
  public get seeds(): Plant[] {
    if (!this._seeds) {
      this._seeds = PlantRepository.getInstance().getAllPlants();
    }
    return this._seeds;
  }

  private _seed: Plant | null = null;
  public get seed(): Plant | null {
    return this._seed;
  }

  public selectSeed(seed: Plant): void {
    this._seed = seed;
  }

  public getField(row: number, column: number): Field {
    return FieldRepository.getInstance().getField(row, column);
  }

  private _clickPlow = (field: Field): ActionResult => {
    return field.plow();
  };

  private _clickSeed = (field: Field): ActionResult => {
    const seed = this.seed;
    if (!seed) {
      return { status: "failure", message: "No seed selected" };
    }
    if (seed.price > this.cash.amount) {
      return { status: "failure", message: "Not enough cash" };
    }
    const result = field.seed(seed);
    if (result.status === "success") {
      this.cash.subtractAmount(seed.price);
    }
    return result;
  };

  private _clickHarvest = (field: Field): ActionResult => {
    const plantName: string = field.plant ?? "";
    const result = field.harvest();
    if (result.status === "success") {
      const plant = PlantRepository.getInstance().getPlant(plantName);
      if (!plant) return { status: "failure", message: "No plant found" };
      this._cash.addAmount(Random.getRandomInt(plant.harvestMinQuantity, plant.harvestMaxQuantity) * plant.harvestCharge);
    }
    return result;
  };

  private _clickWater = (field: Field): ActionResult => {
    return field.water();
  };

  private _clickFertilize = (field: Field): ActionResult => {
    const FERTILIZE_COST = 1;
    if (this._cash.amount < FERTILIZE_COST) {
      return { status: "failure", message: "Not enough cash" };
    }
    this._cash.subtractAmount(FERTILIZE_COST);
    return field.fertilize();
  };

  private _clickMap: { [key in ClickAction]: (field: Field) => ActionResult } = {
    plow: this._clickPlow,
    seed: this._clickSeed,
    harvest: this._clickHarvest,
    water: this._clickWater,
    fertilize: this._clickFertilize,
  };

  public clickOnField(field: Field): ActionResult {
    return this._clickMap[this._clickController.clickAction](field);
  }

  public buyRow(): ActionResult {
    const FIELD_PRICE = 10000;
    const totalPrice = FIELD_PRICE * this.farm.columns;
    if (this.cash.amount < totalPrice) {
      return { status: "failure", message: "Not enough cash" };
    }
    this.cash.subtractAmount(FIELD_PRICE * this.farm.columns);
    this.farm.addRow();
    return { status: "success", message: "Row bought" };
  }

  public buyColumn(): ActionResult {
    const FIELD_PRICE = 10000;
    const totalPrice = FIELD_PRICE * this.farm.rows;
    if (this.cash.amount < totalPrice) {
      return { status: "failure", message: "Not enough cash" };
    }
    this.cash.subtractAmount(FIELD_PRICE * this.farm.rows);
    this.farm.addColumn();
    return { status: "success", message: "Column bought" };
  }
}
