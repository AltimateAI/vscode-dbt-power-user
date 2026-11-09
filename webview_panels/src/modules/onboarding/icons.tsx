// Tabler Icons (MIT, https://tabler.io/icons) used by the onboarding design,
// inlined so the panel needs no icon font. Outline icons are stroked, filled
// icons are painted with the current colour.

const OUTLINE = {
  code: ["M7 8l-4 4l4 4", "M17 8l4 4l-4 4", "M14 4l-4 16"],
  "git-merge": [
    "M5 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M5 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M15 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
    "M7 8l0 8",
    "M7 8a4 4 0 0 0 4 4h4",
  ],
  table: [
    "M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14",
    "M3 10h18",
    "M10 3v18",
  ],
  "player-play": ["M7 4v16l13 -8l-13 -8"],
  "file-text": [
    "M14 3v4a1 1 0 0 0 1 1h4",
    "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2",
    "M9 9l1 0",
    "M9 13l6 0",
    "M9 17l6 0",
  ],
  scan: [
    "M4 7v-1a2 2 0 0 1 2 -2h2",
    "M4 17v1a2 2 0 0 0 2 2h2",
    "M16 4h2a2 2 0 0 1 2 2v1",
    "M16 20h2a2 2 0 0 0 2 -2v-1",
    "M5 12l14 0",
  ],
  "message-2": [
    "M8 9h8",
    "M8 13h6",
    "M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3",
  ],
  wand: [
    "M6 21l15 -15l-3 -3l-15 15l3 3",
    "M15 6l3 3",
    "M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2",
    "M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2",
  ],
  bolt: ["M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"],
  language: [
    "M9 6.371c0 4.418 -2.239 6.629 -5 6.629",
    "M4 6.371h7",
    "M5 9c0 2.144 2.252 3.908 6 4",
    "M12 20l4 -9l4 9",
    "M19.1 18h-6.2",
    "M6.694 3l.793 .582",
  ],
  "shield-check": [
    "M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06",
    "M15 19l2 2l4 -4",
  ],
  "stack-2": ["M12 4l-8 4l8 4l8 -4l-8 -4", "M4 12l8 4l8 -4", "M4 16l8 4l8 -4"],
  users: [
    "M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",
    "M16 3.13a4 4 0 0 1 0 7.75",
    "M21 21v-2a4 4 0 0 0 -3 -3.85",
  ],
  "switch-horizontal": [
    "M16 3l4 4l-4 4",
    "M10 7l10 0",
    "M8 13l-4 4l4 4",
    "M4 17l9 0",
  ],
  check: ["M5 12l5 5l10 -10"],
  "external-link": [
    "M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6",
    "M11 13l9 -9",
    "M15 4h5v5",
  ],
  search: ["M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", "M21 21l-6 -6"],
  folder: [
    "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2",
  ],
  "terminal-2": [
    "M8 9l3 3l-3 3",
    "M13 15l3 0",
    "M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12",
  ],
  refresh: [
    "M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4",
    "M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4",
  ],
  book: [
    "M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
    "M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0",
    "M3 6l0 13",
    "M12 6l0 13",
    "M21 6l0 13",
  ],
  "arrow-right": ["M5 12l14 0", "M13 18l6 -6", "M13 6l6 6"],
  "chevron-left": ["M15 6l-6 6l6 6"],
  "chevron-right": ["M9 6l6 6l-6 6"],
  "info-circle": [
    "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0",
    "M12 9h.01",
    "M11 12h1v4h1",
  ],
} satisfies Record<string, string[]>;

const FILLED = {
  "circle-check": [
    "M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z",
  ],
  "alert-triangle": [
    "M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z",
  ],
} satisfies Record<string, string[]>;

export type IconName = keyof typeof OUTLINE | keyof typeof FILLED;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon = ({
  name,
  size = 16,
  className,
}: IconProps): JSX.Element => {
  const filled = name in FILLED;
  const paths: string[] = filled
    ? FILLED[name as keyof typeof FILLED]
    : OUTLINE[name as keyof typeof OUTLINE];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
};
