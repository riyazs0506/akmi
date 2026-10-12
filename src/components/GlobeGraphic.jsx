import styles from './GlobeGraphic.module.css';

// Abstract dotted globe centred near India, with arcs radiating outward.
// Illustrative only — it does not represent specific markets or destinations.
const R = 200;
const CX = 250;
const CY = 250;
const LAT0 = (18 * Math.PI) / 180;
const LON0 = (62 * Math.PI) / 180;
const rad = (d) => (d * Math.PI) / 180;

function project(lat, lon) {
  const cosc =
    Math.sin(LAT0) * Math.sin(lat) + Math.cos(LAT0) * Math.cos(lat) * Math.cos(lon - LON0);
  const x = R * Math.cos(lat) * Math.sin(lon - LON0);
  const y = R * (Math.cos(LAT0) * Math.sin(lat) - Math.sin(LAT0) * Math.cos(lat) * Math.cos(lon - LON0));
  return { x: CX + x, y: CY - y, depth: cosc };
}

const DOTS = (() => {
  const out = [];
  const n = 1400;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i += 1) {
    const yv = 1 - (i / (n - 1)) * 2;
    const lat = Math.asin(yv);
    const lon = (i * golden) % (Math.PI * 2);
    const p = project(lat, lon);
    if (p.depth > 0.05) out.push(p);
  }
  return out;
})();

const ORIGIN = project(rad(21), rad(78));
const TARGETS = [
  [52, 8],
  [38, 28],
  [25, 52],
  [2, 104],
  [-28, 132],
  [35, 118],
  [-8, 30],
].map(([la, lo]) => project(rad(la), rad(lo)));

function arc(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  // lift the control point perpendicular to the chord
  const lift = len * 0.32;
  const cx = mx + (dy / len) * lift * -1;
  const cy = my + (dx / len) * lift;
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

export default function GlobeGraphic({ className = '' }) {
  return (
    <figure className={`${styles.figure} ${className}`}>
      <svg viewBox="35 35 430 430" className={styles.svg} role="img" aria-labelledby="globe-title">
        <title id="globe-title">
          Abstract globe with connection lines radiating from India, illustrating international trade ambition
        </title>
        <circle cx={CX} cy={CY} r={R} className={styles.sphere} />
        <g className={styles.dots}>
          {DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.x.toFixed(1)}
              cy={d.y.toFixed(1)}
              r={(0.8 + d.depth * 1.1).toFixed(2)}
              opacity={(0.18 + d.depth * 0.5).toFixed(2)}
            />
          ))}
        </g>
        <g className={styles.arcs}>
          {TARGETS.map((t, i) => (
            <path key={i} d={arc(ORIGIN, t)} pathLength="1" style={{ '--d': `${i * 90}ms` }} />
          ))}
        </g>
        <g className={styles.nodes}>
          {TARGETS.map((t, i) => (
            <circle key={i} cx={t.x.toFixed(1)} cy={t.y.toFixed(1)} r="4" />
          ))}
        </g>
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="16" className={styles.halo} />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="7" className={styles.origin} />
        <text x={ORIGIN.x + 14} y={ORIGIN.y + 26} className={styles.label}>
          India
        </text>
      </svg>
      <figcaption className={styles.caption}>
        Illustrative graphic. It does not depict current export destinations.
      </figcaption>
    </figure>
  );
}
