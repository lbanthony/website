"use client";

import { useState } from "react";
import { intersection } from "@/lib/profile";

const circles = [
  { id: "ai", cx: 215, cy: 215, label: ["AI and", "engineering"], lx: 168, ly: 160 },
  { id: "product", cx: 385, cy: 215, label: ["Product", "strategy"], lx: 432, ly: 160 },
  { id: "people", cx: 300, cy: 362, label: ["Education and", "leadership"], lx: 300, ly: 452 },
];

export function Intersection() {
  const [active, setActive] = useState<string | null>(null);
  const current = intersection.find((item) => item.id === active);

  return (
    <div className="intersection" onMouseLeave={() => setActive(null)}>
      <svg
        viewBox="0 0 600 580"
        className={`venn ${active ? "has-active" : ""}`}
        role="img"
        aria-label="Three overlapping circles: AI and engineering, product strategy, and education and leadership. Laura works where all three overlap."
      >
        {circles.map((c) => (
          <circle
            key={c.id}
            cx={c.cx}
            cy={c.cy}
            r="172"
            className={`venn-circle venn-${c.id} ${active === c.id ? "is-active" : ""}`}
            onMouseEnter={() => setActive(c.id)}
          />
        ))}
        {circles.map((c) => (
          <text key={c.id} x={c.lx} y={c.ly} textAnchor="middle" className="venn-label">
            <tspan x={c.lx}>{c.label[0]}</tspan>
            <tspan x={c.lx} dy="26">{c.label[1]}</tspan>
          </text>
        ))}
        <text x="300" y="262" textAnchor="middle" className="venn-center">
          <tspan x="300">Where I</tspan>
          <tspan x="300" dy="24">work best</tspan>
        </text>
      </svg>

      <div className="intersection-copy">
        <div className="intersection-tabs" role="group" aria-label="Explore each area">
          {intersection.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={active === item.id}
              onMouseEnter={() => setActive(item.id)}
              onFocus={() => setActive(item.id)}
              onClick={() => setActive(active === item.id ? null : item.id)}
            >
              <span className="mono">0{i + 1}</span>
              {item.name}
            </button>
          ))}
        </div>
        <div className="intersection-detail" aria-live="polite">
          {current ? (
            <>
              <p>{current.evidence}</p>
              <p className="mono proof">See it in · {current.proof.join(" · ")}</p>
            </>
          ) : (
            <p>
              Most roles ask for one of these. My work has always needed all
              three: build the technology, decide what the product should be,
              and lead the people who make it real.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
