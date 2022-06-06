import { ReactComponentElement, useEffect, useState } from "react";
import { FarmComponent } from "./FarmComponent";

import { GameManager } from "../../application/game-manager";
import { Farm } from "../../domain/entities/farm";
import { Cash } from "../../application/cash";
import { ClickController, ClickAction } from "../../application/click-controller";
import { Plant } from "../../domain/entities/plant";

import styles from "../../styles/Game.module.css";
import { Zoom } from "../../application/zoom";
import { Icon } from "../Icon";

const gameManager = GameManager.getInstance();

const GAME_ACTIONS: {
  label: string;
  name: ClickAction;
  icon: ReactComponentElement<any>;
}[] = [
  {
    label: "Plow",
    name: "plow",
    icon: <Icon name="rake" />,
  },
  {
    label: "Water",
    name: "water",
    icon: <Icon name="water" />,
  },
  {
    label: "Fertilize",
    name: "fertilize",
    icon: <Icon name="fertilizer" />,
  },
  {
    label: "Harvest",
    name: "harvest",
    icon: <Icon name="harvest" />,
  },
  {
    label: "Seed",
    name: "seed",
    icon: <Icon name="seed" />,
  },
];

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function Game() {
  const [farm, setFarm] = useState<Farm>(gameManager.farm);
  const [cash, setCash] = useState<Cash>(gameManager.cash);
  const [clickAction, setClickAction] = useState<string>(gameManager.clickController.clickAction);
  const [seeds] = useState<Plant[]>(gameManager.seeds);
  const [selectedSeed, setSelectedSeed] = useState<string>(gameManager.seed?.name ?? "");

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
        <div className={styles.menuRow}>
          <div className={styles.cashMenu}>
            <Icon name="cash" />
            <div>{cash.amount}</div>
          </div>
          <div className={styles.farmMenu}>
            <button onClick={() => gameManager.buyRow()}>
              <Icon name="cash" />+ Row
            </button>
            <button onClick={() => gameManager.buyColumn()}>
              <Icon name="cash" />+ Column
            </button>
          </div>
          <div className={styles.zoomMenu}>
            <button onClick={() => gameManager.zoom.zoomIn()}>
              <Icon name="zoom-in" />
              Zoom In
            </button>
            <button onClick={() => gameManager.zoom.zoomOut()}>
              <Icon name="zoom-out" />
              Zoom Out
            </button>
          </div>
          <div className={styles.actionMenu}>
            {GAME_ACTIONS.map((option) => (
              <button
                style={{ backgroundColor: clickAction === option.name ? "#00000055" : "" }}
                key={option.name}
                onClick={() => {
                  gameManager.clickController.setClickAction(option.name);
                }}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.menuRow}>
          <div className={styles.seedMenu}>
            {seeds.map((seed) => (
              <button
                key={seed.name}
                style={{ backgroundColor: selectedSeed === seed.name ? "#00000055" : "" }}
                onClick={() => {
                  gameManager.clickController.setClickAction("seed");
                  gameManager.selectSeed(seed);
                  setSelectedSeed(seed.name);
                }}
              >
                <Icon name={seed.name} />
                {/* {capitalizeFirstLetter(seed.name)} */}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.gameBoard}>
        <FarmComponent farm={farm} />
      </div>
    </div>
  );
}
