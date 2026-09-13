"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { x: 60, y: 70 },
  { x: 210, y: 30 },
  { x: 360, y: 80 },
  { x: 420, y: 200 },
  { x: 300, y: 190 },
  { x: 150, y: 180 },
  { x: 40, y: 260 },
  { x: 190, y: 320 },
  { x: 340, y: 330 },
  { x: 430, y: 350 },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [1, 5],
  [4, 2],
  [5, 6],
  [5, 7],
  [7, 8],
  [8, 9],
  [4, 8],
  [6, 7],
];

export function SignalMesh({
  label = "Animated diagram of connected software systems exchanging data across a network",
}: {
  label?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 480 420" className="h-full w-full" role="img" aria-label={label}>
      {edges.map(([a, b], i) => {
        const from = nodes[a];
        const to = nodes[b];
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--brand-signal-bright)"
            strokeWidth={1}
            strokeOpacity={0.28}
            strokeDasharray="2 7"
            animate={reduceMotion ? undefined : { strokeDashoffset: [0, -18] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.15,
            }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={16}
            fill="var(--brand-signal-bright)"
            fillOpacity={0.08}
            animate={
              reduceMotion ? undefined : { opacity: [0.2, 0.5, 0.2], scale: [1, 1.35, 1] }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.22,
            }}
          />
          <circle cx={n.x} cy={n.y} r={4} fill="var(--brand-signal-bright)" />
        </g>
      ))}
    </svg>
  );
}
