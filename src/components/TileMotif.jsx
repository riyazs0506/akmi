// The stepped rounded-tile pattern from the AKMI brand book, drawn as SVG.
// Purely decorative.
const TILES = [
  [3, 0, 1],
  [2, 1, 0.9],
  [3, 1, 0.55],
  [1, 2, 0.95],
  [2, 2, 0.35],
  [3, 2, 0.6],
  [0, 3, 1],
  [1, 3, 0.45],
  [2, 3, 0.2],
  [3, 3, 0.5],
  [1, 4, 0.9],
  [2, 4, 0.4],
  [3, 4, 0.65],
  [2, 5, 0.85],
  [3, 5, 0.5],
  [3, 6, 1],
];

export default function TileMotif({ className = '', color = 'var(--blue)', mirror = false }) {
  const size = 40;
  const gap = 6;
  const step = size + gap;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${step * 4 - gap} ${step * 7 - gap}`}
      aria-hidden="true"
      focusable="false"
      style={mirror ? { transform: 'scaleX(-1)' } : undefined}
    >
      {TILES.map(([x, y, o]) => (
        <rect
          key={`${x}-${y}`}
          x={x * step}
          y={y * step}
          width={size}
          height={size}
          rx="10"
          fill={color}
          opacity={o}
        />
      ))}
    </svg>
  );
}
