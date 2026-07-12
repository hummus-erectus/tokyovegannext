'use client';

import {CSSProperties, ReactNode, useId, useMemo} from "react";

type PaperEdge = "deckle" | "torn" | "straight";
type PaperCorner = "none" | "bottom-left" | "bottom-right" | "top-right";
type PaperShadow = "sm" | "md" | "lg";
type PaperTexture = "grain" | "washi" | "none";
type PaperVariant = "paper" | "polaroid";

type PaperSurfaceProps = {
  children: ReactNode;
  /** Extra classes for the outer (transformed/shadowed) wrapper */
  className?: string;
  /** Extra classes for the inner paper element (padding, layout, etc.) */
  contentClassName?: string;
  style?: CSSProperties;
  /** Paper tint. Defaults to a seeded pick from warm off-whites. */
  color?: string;
  /** Rotation in degrees. Defaults to a seeded value between -2.5 and 2.5. */
  rotation?: number;
  /** Shadow strength */
  shadow?: PaperShadow;
  /** Curled/lifted corner shadow */
  liftedCorner?: PaperCorner;
  /** 0..1 grain opacity multiplier */
  textureIntensity?: number;
  /** Paper surface texture style */
  texture?: PaperTexture;
  /** Edge irregularity style */
  edge?: PaperEdge;
  /** Visual variant: "paper" (matte, warm, wobbly) or "polaroid" (glossy, white, rigid) */
  variant?: PaperVariant;
  /** Enable hover lift behaviour: true = uniform lift, "hinge" = pivot from top edge */
  hover?: boolean | "hinge";
  /** Content rendered outside the clipped paper area (e.g. decorative elements that overflow) */
  overlay?: ReactNode;
  /** Stable seed for the randomised imperfections. Defaults to React useId. */
  seed?: string;
};

const PAPER_TINTS = ["#FFFDF8", "#FCFAF4", "#F8F4EA", "#FDFBF2", "#FAF7EE"];
const POLAROID_TINTS = ["#FFFFFF", "#FDFDFB", "#FCFCFA"];

/* FNV-1a string hash → 32-bit seed */
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* Small deterministic PRNG */
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a wobbly polygon clip-path so the paper edges are
 * irregular/deckled instead of mathematically straight.
 * Jitter is in px so it stays subtle regardless of element size.
 */
function paperClipPath(rand: () => number, amp: number): string {
  const steps = 12;
  const j = () => (rand() * amp).toFixed(1);
  const pts: string[] = [];
  // top edge, left → right
  for (let i = 0; i <= steps; i++) {
    pts.push(`${((i / steps) * 100).toFixed(2)}% ${j()}px`);
  }
  // right edge, top → bottom
  for (let i = 1; i <= steps; i++) {
    pts.push(`calc(100% - ${j()}px) ${((i / steps) * 100).toFixed(2)}%`);
  }
  // bottom edge, right → left
  for (let i = 1; i <= steps; i++) {
    pts.push(`${(100 - (i / steps) * 100).toFixed(2)}% calc(100% - ${j()}px)`);
  }
  // left edge, bottom → top
  for (let i = 1; i < steps; i++) {
    pts.push(`${j()}px ${(100 - (i / steps) * 100).toFixed(2)}%`);
  }
  return `polygon(${pts.join(", ")})`;
}

type ShadowLayer = [x: number, y: number, blur: number, alpha: number];

function toDropShadows(layers: ShadowLayer[], mult: number): string {
  return layers
    .map(
      ([x, y, blur, a]) =>
        `drop-shadow(${x.toFixed(1)}px ${y.toFixed(1)}px ${blur.toFixed(1)}px rgba(46, 32, 18, ${(a * mult).toFixed(3)}))`
    )
    .join(" ");
}

const CORNER_CLASS: Record<PaperCorner, string> = {
  none: "",
  "bottom-left": "paper-surface--curl-bl",
  "bottom-right": "paper-surface--curl-br",
  "top-right": "paper-surface--curl-tr",
};

export function PaperSurface({
  children,
  className,
  contentClassName,
  style,
  color,
  rotation,
  shadow = "md",
  liftedCorner = "none",
  textureIntensity = 0.5,
  texture = "grain",
  edge = "deckle",
  variant = "paper",
  hover = false,
  overlay,
  seed,
}: PaperSurfaceProps) {
  const autoId = useId();
  const effectiveSeed = seed ?? autoId;

  const vars = useMemo(() => {
    const rand = mulberry32(hashSeed(effectiveSeed));

    const isPolaroid = variant === "polaroid";

    // Seeded imperfections — all deliberately tiny
    // Polaroid: less rotation, less tilt, pure white, no grain
    const rz = rotation ?? (rand() * 2 - 1) * (isPolaroid ? 1.5 : 2.5);
    const rx = (rand() * 2 - 1) * (isPolaroid ? 0.4 : 0.9);
    const ry = (rand() * 2 - 1) * (isPolaroid ? 0.4 : 0.9);
    const tints = isPolaroid ? POLAROID_TINTS : PAPER_TINTS;
    const tint = color ?? tints[Math.floor(rand() * tints.length)];
    const shadowMult = 0.85 + rand() * 0.3;
    const grain = isPolaroid ? 0 : Math.max(0, Math.min(1, textureIntensity)) * (0.3 + rand() * 0.15);
    // Horizontal shadow bias so one corner reads slightly heavier
    const dirX = (rand() < 0.5 ? -1 : 1) * (1 + rand() * 1.5);
    // Hover: tiny rotation adjustment toward level
    const hoverRz = rz * 0.6 + (rand() * 2 - 1) * 0.4;

    // Polaroid: much less edge wobble — rigid card stock
    const baseAmp = edge === "torn" ? 5 : edge === "deckle" ? 2.5 : 0;
    const edgeAmp = isPolaroid ? Math.min(baseAmp, 1) : baseAmp;
    const clip = edgeAmp > 0 ? paperClipPath(rand, edgeAmp) : "none";

    const restLayers: Record<PaperShadow, ShadowLayer[]> = {
      sm: [
        [0, 1, 1, 0.16],
        [dirX * 0.5, 3, 4, 0.09],
        [dirX, 6, 9, 0.06],
      ],
      md: [
        [0, 1, 1, 0.18],
        [dirX * 0.6, 4, 6, 0.11],
        [dirX, 10, 16, 0.09],
      ],
      lg: [
        [0, 2, 2, 0.2],
        [dirX * 0.8, 6, 8, 0.13],
        [dirX * 1.4, 16, 24, 0.12],
      ],
    };
    const liftLayers: ShadowLayer[] = restLayers[shadow].map(([x, y, blur, a]) => [
      x * 1.3,
      y * 1.6,
      blur * 1.5,
      a * 1.15,
    ]);

    return {
      "--paper-tint": tint,
      "--paper-rx": `${rx.toFixed(2)}deg`,
      "--paper-ry": `${ry.toFixed(2)}deg`,
      "--paper-rz": `${rz.toFixed(2)}deg`,
      "--paper-hover-rz": `${hoverRz.toFixed(2)}deg`,
      "--paper-clip": clip,
      "--paper-grain": grain.toFixed(3),
      "--paper-shadow": toDropShadows(restLayers[shadow], shadowMult),
      "--paper-shadow-hover": toDropShadows(liftLayers, shadowMult),
      "--paper-curl-alpha": (0.2 * shadowMult).toFixed(3),
    } as CSSProperties;
  }, [effectiveSeed, rotation, color, textureIntensity, edge, shadow, variant]);

  const isPolaroid = variant === "polaroid";

  const wrapperClass = [
    "paper-surface",
    isPolaroid ? "paper-surface--polaroid" : "",
    hover === true ? "paper-surface--hover" : hover === "hinge" ? "paper-surface--hinge" : "",
    !isPolaroid && texture === "washi" ? "paper-surface--washi" : "",
    !isPolaroid && texture === "none" ? "paper-surface--flat" : "",
    CORNER_CLASS[liftedCorner],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass} style={{...vars, ...style}}>
      <div className={`paper-surface__inner ${contentClassName ?? ""}`.trim()}>{children}</div>
      {overlay ? <div className="paper-surface__overlay">{overlay}</div> : null}
    </div>
  );
}
