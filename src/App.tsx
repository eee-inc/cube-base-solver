import { useState } from "react";
import styles from "./style.module.css";

function App() {
  // sq inside the outer base frame
  const size = 96.704;
  // distance to tube edge from centerline of the tube
  const parallelDistance = 4;

  const evapWd = 9;
  const scale = 3;

  // Distance between centerlines of parallel fork tubes
  const [distance, setDistance] = useState(20);
  const [evapRows, setEvapRows] = useState(20);
  const [evapRowDp, setEvapRowDp] = useState(0.5);

  const pct = (num: number) =>
    `${parseFloat(((num / size) * 100).toFixed(2))}%`;

  const forkGap = distance * 2 - parallelDistance * 2;
  const forkWallGap = size / 2 - distance - parallelDistance;

  const lines = (
    <>
      <line
        x1={0}
        y1={pct(size / 2 - distance)}
        x2={pct(size)}
        y2={pct(size / 2 - distance)}
        className={styles.midline}
      />
      <line
        x1={0}
        y1={pct(size / 2 + distance)}
        x2={pct(size)}
        y2={pct(size / 2 + distance)}
        className={styles.midline}
      />
      <line
        x1={0}
        y1={pct(forkWallGap)}
        x2={pct(size)}
        y2={pct(forkWallGap)}
        className={styles.parallelLines}
      />
      <line
        x1={0}
        y1={pct(size / 2 - distance + parallelDistance)}
        x2={pct(size)}
        y2={pct(size / 2 - distance + parallelDistance)}
        className={styles.parallelLines}
      />
      <line
        x1={0}
        y1={pct(size / 2 + distance - parallelDistance)}
        x2={pct(size)}
        y2={pct(size / 2 + distance - parallelDistance)}
        className={styles.parallelLines}
      />
      <line
        x1={0}
        y1={pct(size / 2 + distance + parallelDistance)}
        x2={pct(size)}
        y2={pct(size / 2 + distance + parallelDistance)}
        className={styles.parallelLines}
      />
    </>
  );

  return (
    <div className={styles.container}>
      <svg width={size * scale} height={size * scale}>
        <rect
          x={0}
          y={0}
          width={pct(size)}
          height={pct(size)}
          fill="none"
          stroke="black"
        />
        <g transform={`rotate(90,${scale * (size / 2)},${scale * (size / 2)})`}>
          {lines}

          <rect
            x={pct(size / 2 - (evapRowDp * evapRows) / 2)}
            y={0}
            height={pct(forkWallGap)}
            width={pct(evapRowDp * evapRows)}
            fill="green"
          />
          <rect
            x={pct(size / 2 - (evapRowDp * evapRows) / 2)}
            y={pct(size - forkWallGap)}
            height={pct(forkWallGap)}
            width={pct(evapRowDp * evapRows)}
            fill="green"
          />
        </g>
        <g>
          {lines}

          <rect
            x={pct(size / 2 - distance + parallelDistance)}
            y={0}
            height={pct(forkWallGap)}
            width={pct(forkGap)}
            fill="blue"
          />
          <rect
            x={pct(size / 2 - distance + parallelDistance)}
            y={pct(size - forkWallGap)}
            height={pct(forkWallGap)}
            width={pct(forkGap)}
            fill="blue"
          />
        </g>
      </svg>
      <div className={styles.flexColumn}>
        <b>Distance between centerlines of parallel fork tubes</b>
        <div className={styles.flexRow}>
          <label>Tube on-center (in):</label>
          <input
            type="number"
            min={20}
            max={60}
            step={0.125}
            value={parseFloat((distance * 2).toFixed(2))}
            onChange={(e) => setDistance(Number(e.target.value) / 2)}
          />
        </div>
        <b>Evaporators (green):</b>
        <div className={styles.flexRow}>
          <label>Length (in):</label>
          <input
            type="number"
            min={5}
            max={35}
            step={0.125}
            value={parseFloat(forkWallGap.toFixed(2))}
            onChange={(e) =>
              setDistance(size / 2 - parallelDistance - Number(e.target.value))
            }
          />
        </div>
        <div className={styles.flexRow}>
          <span>Width (in):</span>
          <span>{evapWd}</span>
        </div>
        <div className={styles.flexRow}>
          <span>Area (in):</span>
          <span>{parseFloat((forkWallGap * evapWd).toFixed(2))}</span>
        </div>
        <div className={styles.flexRow}>
          <label>Row Depth (in):</label>
          <input
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={parseFloat(evapRowDp.toFixed(2))}
            onChange={(e) => setEvapRowDp(Number(e.target.value))}
          />
        </div>
        <div className={styles.flexRow}>
          <label>Rows (#):</label>
          <input
            type="number"
            min={5}
            max={35}
            value={evapRows}
            onChange={(e) => setEvapRows(Math.round(Number(e.target.value)))}
          />
        </div>
        <b>Condensers (blue):</b>
        <div className={styles.flexRow}>
          <span>Length (in):</span>

          <input
            type="number"
            min={5}
            max={35}
            step={0.125}
            value={parseFloat(forkGap.toFixed(2))}
            onChange={(e) =>
              setDistance((Number(e.target.value) + 2 * parallelDistance) / 2)
            }
          />
        </div>
        <div className={styles.flexRow}>
          <span>Width (in):</span>
          <input
            type="number"
            min={5}
            max={35}
            step={0.125}
            value={parseFloat(forkWallGap.toFixed(2))}
            onChange={(e) =>
              setDistance(size / 2 - parallelDistance - Number(e.target.value))
            }
          />
        </div>
        <div className={styles.flexRow}>
          <span>Area (in):</span>
          <span>{parseFloat((forkGap * forkWallGap).toFixed(2))}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
