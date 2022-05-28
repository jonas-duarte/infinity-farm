import { useEffect, useState } from "react";
import { GameManager } from "../../application/game-manager";
import { Zoom } from "../../application/zoom";
import { Farm } from "../../domain/entities/farm";
import { FieldComponent } from "./FieldComponent";

function* fields(rows: number, columns: number) {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      yield { row, column };
    }
  }
}

const gameManager = GameManager.getInstance();

export function FarmComponent(props: { farm: Farm }) {
  const [fieldSize, setFieldSize] = useState(gameManager.zoom.fieldSize);

  useEffect(() => {
    Zoom.onUpdateZoom((zoom: Zoom) => {
      setFieldSize(zoom.fieldSize);
    });
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${props.farm.columns}, 1fr)`,
        gridTemplateRows: `repeat(${props.farm.rows}, 1fr)`,
        gridGap: "1px",
        width: "min-content",
        height: "min-content",
      }}
    >
      {/* @ts-ignore */}
      {[...fields(props.farm.rows, props.farm.columns)].map(({ row, column }) => (
        <FieldComponent key={`${row}-${column}`} row={row} column={column} fieldSize={fieldSize} />
      ))}
    </div>
  );
}
