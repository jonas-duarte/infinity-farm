import { useEffect, useState } from "react";
import { Field, FieldProps } from "../../domain/entities/field";
import { GameManager } from "../../application/game-manager";

import styles from "../../styles/Game.module.css";
import { Icon } from "../Icon";
import { Timer } from "../../application/timer";

const gameManager = GameManager.getInstance();

function getStyle(field: FieldProps): any {
  if (!field.isPlowed) {
    return {
      backgroundColor: "#267A25",
    };
  }

  if (!field.isWatered && !field.isFertilized) {
    return {
      backgroundColor: "#D1BA96",
    };
  }

  if (!field.isWatered && field.isFertilized) {
    return {
      backgroundColor: "#896C40",
    };
  }

  if (field.isWatered && !field.isFertilized) {
    return {
      backgroundColor: "#B29972",
    };
  }

  return {
    backgroundColor: "#544130",
  };
}

export function FieldComponent(props: { row: number; column: number; fieldSize: number }) {
  const [field] = useState<Field>(gameManager.getField(props.row, props.column));
  const [fieldProps, setFieldProps] = useState<FieldProps>({
    plant: field.plant,
    isPlowed: field.isPlowed,
    isWatered: field.isWatered,
    isFertilized: field.isFertilized,
  });
  const [fieldLifeTime, setFieldLifeTime] = useState<number>(field.lifeTime);

  useEffect(() => {
    Field.onUpdateField(props.row, props.column, (field: Field) => {
      setFieldProps({
        plant: field.plant,
        isPlowed: field.isPlowed,
        isWatered: field.isWatered,
        isFertilized: field.isFertilized,
      });
    });

    Timer.onTick((time: number) => {
      field.grow();
      setFieldLifeTime(field.lifeTime);
    });
  }, [field, props.column, props.row]);

  return (
    <div
      className={styles.field}
      style={{
        width: `${props.fieldSize}px`,
        height: `${props.fieldSize}px`,
        ...getStyle(fieldProps),
      }}
      onClick={() => {
        gameManager.clickOnField(field);
      }}
    >
      <div className={styles.fieldIcon}>{fieldProps.plant && <Icon name={fieldProps.plant} />}</div>
      {props.fieldSize >= 64 && fieldProps.plant && <div className={styles.fieldCard}>{fieldLifeTime}</div>}
    </div>
  );
}
