import { useEffect, useState } from "react";
import { FarmComponent } from "./FarmComponent";

import { GameManager } from "../../application/game-manager";
import { Farm } from "../../domain/entities/farm";
import { Cash } from "../../application/cash";
import { ClickController, ClickAction } from "../../application/click-controller";
import { Plant } from "../../domain/entities/plant";

import styles from "../../styles/Game.module.css";
import { Zoom } from "../../application/zoom";

const gameManager = GameManager.getInstance();

const CLICK_MODE_OPTIONS: {
  label: string;
  name: ClickAction;
}[] = [
  {
    label: "Plow",
    name: "plow",
  },
  {
    label: "Water",
    name: "water",
  },
  {
    label: "Fertilize",
    name: "fertilize",
  },
  {
    label: "Harvest",
    name: "harvest",
  },
  {
    label: "Seed",
    name: "seed",
  },
];

export function Game() {
  const [farm, setFarm] = useState<Farm>(gameManager.farm);
  const [cash, setCash] = useState<Cash>(gameManager.cash);
  const [clickAction, setClickAction] = useState<string>(gameManager.clickController.clickAction);
  const [seeds] = useState<Plant[]>(gameManager.seeds);

  useEffect(() => {
    Farm.onUpdateFarm((farm: Farm) => {
      setFarm(new Farm(farm));
    });

    Cash.onUpdateCash((cash: Cash) => {
      const _cash: Cash = Object.assign(new Cash(0), cash);
      setCash(_cash);
    });

    ClickController.onUpdateClick((click: ClickController) => {
      setClickAction(click.clickAction);
    });
  }, []);

  return (
    <div className={styles.game}>
      <div className={styles.menu}>
        {cash.amount}
        <button onClick={() => gameManager.zoom.zoomIn()}>Zoom In</button>
        <button onClick={() => gameManager.zoom.zoomOut()}>Zoom Out</button>
        <button onClick={() => gameManager.buyRow()}>Buy Row</button>
        <button onClick={() => gameManager.buyColumn()}>Buy Column</button>
        <div>
          {CLICK_MODE_OPTIONS.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                gameManager.clickController.setClickAction(option.name);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div>
          {seeds.map((seed) => (
            <button key={seed.name} onClick={() => console.log(seed)}>
              {seed.name}
            </button>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <FarmComponent farm={farm} />
    </div>
  );
}
