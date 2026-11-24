import type { Visual } from "@/lib/profile";

// Drawn illustrations for each case study. Each one shows how the work
// actually functions, in the site's mid-century palette.

function ArchitectureVisual() {
  return (
    <svg viewBox="0 0 640 560" className="visual-svg" aria-hidden="true">
      <path
        d="M60 540V270a260 260 0 0 1 520 0v270Z"
        className="v-arch"
      />
      <text x="320" y="78" textAnchor="middle" className="v-mono">
        ON THE DEVICE · NO NETWORK
      </text>

      <path
        d="M220 196C220 240 300 236 320 272M320 196V272M420 196C420 240 340 236 320 272"
        className="v-wire"
      />
      <circle cx="220" cy="150" r="40" className="v-sage" />
      <circle cx="320" cy="150" r="40" className="v-ochre" />
      <circle cx="420" cy="150" r="40" className="v-slate" />
      <text x="220" y="155" textAnchor="middle" className="v-label">Students</text>
      <text x="320" y="155" textAnchor="middle" className="v-label">Teachers</text>
      <text x="420" y="155" textAnchor="middle" className="v-label">Staff</text>

      <rect x="200" y="272" width="240" height="64" className="v-ink" />
      <text x="320" y="303" textAnchor="middle" className="v-title v-on-ink">
        Native app
      </text>
      <text x="320" y="323" textAnchor="middle" className="v-mono v-on-ink">
        SWIFTUI · MAC AND IPAD
      </text>

      <path d="M320 336V356H210V376M320 356H430V376" className="v-wire" />
      <rect x="110" y="376" width="200" height="92" className="v-rust" />
      <text x="210" y="418" textAnchor="middle" className="v-title v-on-ink">
        Foundation Models
      </text>
      <text x="210" y="440" textAnchor="middle" className="v-mono v-on-ink">
        FIRST CHOICE
      </text>
      <rect x="330" y="376" width="200" height="92" className="v-outline" />
      <text x="430" y="418" textAnchor="middle" className="v-title">
        MLX
      </text>
      <text x="430" y="440" textAnchor="middle" className="v-mono">
        FALLBACK
      </text>

      <text x="320" y="512" textAnchor="middle" className="v-mono">
        NOTHING LEAVES THE DEVICE · TEACHERS IN CONTROL
      </text>
    </svg>
  );
}

function TimelineVisual() {
  const x = (weeks: number) => 60 + weeks * 15;
  const ticks = Array.from({ length: 36 }, (_, i) => i);
  return (
    <svg viewBox="0 0 640 440" className="visual-svg" aria-hidden="true">
      <text x="60" y="48" className="v-mono">WEEKS PER DEPLOYMENT</text>

      <text x="60" y="98" className="v-label">Before</text>
      <rect x={x(0)} y="110" width={x(35) - x(0)} height="58" className="v-muted-bar" />
      <text x={x(35) - 12} y="152" textAnchor="end" className="v-num">35</text>

      <text x="60" y="218" className="v-label">After</text>
      <rect x={x(0)} y="230" width={x(14) - x(0)} height="58" className="v-rust" />
      <text x={x(14) - 12} y="272" textAnchor="end" className="v-num v-on-ink">14</text>
      <rect
        x={x(14)}
        y="230"
        width={x(35) - x(14)}
        height="58"
        className="v-saved"
      />
      <text x={(x(14) + x(35)) / 2} y="265" textAnchor="middle" className="v-mono">
        21 WEEKS SAVED
      </text>

      <line x1={x(0)} x2={x(35)} y1="314" y2="314" className="v-axis" />
      {ticks.map((t) => (
        <line
          key={t}
          x1={x(t)}
          x2={x(t)}
          y1="314"
          y2={t % 5 === 0 ? 326 : 320}
          className="v-axis"
        />
      ))}
      {[0, 5, 10, 15, 20, 25, 30, 35].map((t) => (
        <text key={t} x={x(t)} y="344" textAnchor="middle" className="v-mono v-small">
          {t}
        </text>
      ))}

      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={72 + i * 26} cy="398" r="9" className="v-ink" />
      ))}
      <text x="340" y="403" className="v-mono">10 ENGINEERS · 1,000+ INSTITUTIONS</text>
    </svg>
  );
}

function FieldVisual() {
  const cols = 34;
  const rows = 16;
  const clusters = [
    { c: 9, r: 5, size: 4.2, tone: "v-dot-rust" },
    { c: 24, r: 10, size: 3.6, tone: "v-dot-slate" },
  ];
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hash = Math.abs(Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1;
      let tone = "v-dot";
      for (const k of clusters) {
        const d = Math.hypot(c - k.c, (r - k.r) * 1.3);
        if (d < k.size && hash < 1 - d / (k.size + 1.2)) tone = k.tone;
      }
      dots.push(
        <circle
          key={`${c}-${r}`}
          cx={52 + c * 16}
          cy={70 + r * 16}
          r={tone === "v-dot" ? 3.2 : 4.6}
          className={tone}
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 640 400" className="visual-svg" aria-hidden="true">
      <text x="48" y="44" className="v-mono">5,000+ DATA POINTS · ILLUSTRATION</text>
      {dots}
      <circle cx="56" cy="356" r="6" className="v-dot-rust" />
      <text x="72" y="361" className="v-mono">ADOPTION BLOCKERS</text>
      <circle cx="260" cy="356" r="6" className="v-dot-slate" />
      <text x="276" y="361" className="v-mono">RELIABILITY PATTERNS</text>
    </svg>
  );
}

const descriptions: Record<Visual, string> = {
  architecture:
    "Diagram: students, teachers, and staff use a native SwiftUI app for Mac and iPad. It runs Apple’s Foundation Models framework first and falls back to MLX, entirely on the device with no network connection.",
  timeline:
    "Chart: deployment time fell from 35 weeks to 14 weeks, saving 21 weeks, with a team of 10 engineers supporting more than 1,000 institutions.",
  field:
    "Illustration: a field of data points with two highlighted clusters, labeled adoption blockers and reliability patterns.",
};

export function CaseVisual({ type }: { type: Visual }) {
  return (
    <figure className={`case-visual case-visual--${type}`} role="img" aria-label={descriptions[type]}>
      {type === "architecture" && <ArchitectureVisual />}
      {type === "timeline" && <TimelineVisual />}
      {type === "field" && <FieldVisual />}
    </figure>
  );
}
