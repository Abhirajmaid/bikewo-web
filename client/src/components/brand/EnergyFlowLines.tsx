import { cn } from "@/lib/utils";

/**
 * Ambient energy lines — solid traces with drifting dashed currents.
 * Fill a relatively positioned parent; pass className to clip or fade.
 */
const TRACES = [
  "M-40 72 C 180 18 340 148 540 76 C 760 4 980 148 1220 52 C 1320 16 1400 68 1480 44",
  "M-40 148 C 220 228 420 52 680 128 C 920 200 1120 44 1480 112",
  "M-40 228 C 200 168 460 288 760 208 C 1020 136 1240 268 1480 188",
  "M-60 318 C 160 318 260 86 520 78 C 780 70 860 248 1140 200 C 1280 172 1360 74 1500 62",
  "M-40 398 C 240 398 360 168 620 176 C 880 184 980 348 1240 292 C 1360 264 1420 168 1500 148",
  "M-40 498 C 200 438 460 568 760 498 C 1020 436 1240 568 1480 508",
  "M-40 598 C 240 668 480 528 760 598 C 1020 664 1240 548 1480 618",
  "M-40 708 C 180 648 440 778 740 708 C 1000 648 1220 778 1480 718",
  "M-40 818 C 260 758 520 868 820 798 C 1080 738 1280 868 1480 818",
  "M120 8 C 168 200 236 420 340 890",
  "M1080 4 C 1036 220 1148 460 1288 890",
  "M720 0 C 700 240 760 520 740 900",
];

const CURRENTS = [
  { d: TRACES[0], duration: "22s", delay: "-6s" },
  { d: TRACES[1], duration: "18s", delay: "-11s", reverse: true },
  { d: TRACES[2], duration: "26s", delay: "-3s" },
  { d: TRACES[3], duration: "20s", delay: "-14s", reverse: true },
  { d: TRACES[4], duration: "28s", delay: "-8s" },
  { d: TRACES[5], duration: "24s", delay: "-16s" },
  { d: TRACES[6], duration: "19s", delay: "-5s", reverse: true },
  { d: TRACES[7], duration: "23s", delay: "-12s" },
  { d: TRACES[8], duration: "21s", delay: "-2s", reverse: true },
  { d: TRACES[9], duration: "16s", delay: "-4s" },
  { d: TRACES[10], duration: "19s", delay: "-9s", reverse: true },
  { d: TRACES[11], duration: "27s", delay: "-7s" },
];

const NODES = [
  [180, 70],
  [540, 76],
  [980, 112],
  [1220, 52],
  [680, 128],
  [260, 216],
  [760, 208],
  [520, 78],
  [1140, 200],
  [760, 498],
  [240, 598],
  [1240, 618],
  [740, 708],
  [820, 798],
] as const;

export function EnergyFlowLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {TRACES.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="#241f5d"
            strokeWidth={1.15}
            vectorEffect="non-scaling-stroke"
            className="opacity-[0.14]"
          />
        ))}

        {CURRENTS.map((line) => (
          <path
            key={`${line.duration}-${line.delay}`}
            d={line.d}
            fill="none"
            stroke={line.reverse ? "#241f5d" : "#2ab77c"}
            strokeWidth={1.35}
            strokeLinecap="round"
            strokeDasharray="12 188"
            vectorEffect="non-scaling-stroke"
            className={line.reverse ? "opacity-30" : "opacity-[0.48]"}
            style={{
              animation: `bw-line-flow ${line.duration} linear ${line.delay} infinite${
                line.reverse ? " reverse" : ""
              }`,
            }}
          />
        ))}

        {NODES.map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={2.25}
            fill="#2ab77c"
            className="opacity-40"
          />
        ))}
      </svg>
    </div>
  );
}
