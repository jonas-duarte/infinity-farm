import { Field } from "./../domain/entities/field";
import { Garden } from "../domain/entities/garden";
import { Plant } from "../domain/entities/plant";
import { PlantRepository } from "../domain/repository/plant-repository";
import { Cash } from "./cash";
import { ClickAction, ClickController } from "./click-controller";
import { Zoom } from "./zoom";
import { FieldRepository } from "../domain/repository/field-repository";
import { ActionResult } from "../domain/contracts/action-result";
import { Random } from "../utils/random";

export class GameManager {
  private static _instance: GameManager;

  private _garden: Garden;
  private _cash: Cash;
  private _clickController: ClickController;
  private _zoom: Zoom;
  private constructor() {
    this._garden = new Garden({ columns: 10, rows: 10 });
    this._cash = new Cash(15000000);
    this._clickController = new ClickController();
    this._zoom = new Zoom(64);
  }

  public static getInstance() {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager();
    }
    return GameManager._instance;
  }

  public get garden() {
    return this._garden;
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
    if (!this._seed) {
      return { status: "failure", message: "No seed selected" };
    }
    return field.seed(this._seed);
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
    const totalPrice = FIELD_PRICE * this.garden.columns;
    if (this.cash.amount < totalPrice) {
      return { status: "failure", message: "Not enough cash" };
    }
    this.cash.subtractAmount(FIELD_PRICE * this.garden.columns);
    this.garden.addRow();
    return { status: "success", message: "Row bought" };
  }

  public buyColumn(): ActionResult {
    const FIELD_PRICE = 10000;
    const totalPrice = FIELD_PRICE * this.garden.rows;
    if (this.cash.amount < totalPrice) {
      return { status: "failure", message: "Not enough cash" };
    }
    this.cash.subtractAmount(FIELD_PRICE * this.garden.rows);
    this.garden.addColumn();
    return { status: "success", message: "Column bought" };
  }
}
