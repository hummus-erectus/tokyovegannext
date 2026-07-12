"use client";

export type WashiTapeVariant = "emerald" | "indigo" | "sakura" | "mustard" | "mint";
export type WashiTapePlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center";
export type WashiTapeSize = "sm" | "md" | "lg";

interface WashiTapeProps {
  variant?: WashiTapeVariant;
  placement?: WashiTapePlacement;
  rotation?: number;
  size?: WashiTapeSize;
  className?: string;
  /** Override width as a percentage of the parent (e.g. 60 for 60%) */
  widthPct?: number;
  /** Scale horizontal offset (>1 pushes further out from the corner) */
  offsetXMultiplier?: number;
  /** Scale vertical offset (>1 pushes further out from the corner) */
  offsetYMultiplier?: number;
}

const variantMap: Record<WashiTapeVariant, string> = {
  emerald: "washi-emerald",
  indigo: "washi-indigo",
  sakura: "washi-sakura",
  mustard: "washi-mustard",
  mint: "washi-mint",
};

const placementBase: Record<WashiTapePlacement, string> = {
  "top-left": "",
  "top-right": "",
  "bottom-left": "",
  "bottom-right": "",
  "top-center": "",
};

const sizeMap: Record<WashiTapeSize, { width: number; height: number }> = {
  sm: { width: 72, height: 20 },
  md: { width: 100, height: 28 },
  lg: { width: 132, height: 36 },
};

export function WashiTape({
  variant = "emerald",
  placement = "top-center",
  rotation = 0,
  size = "md",
  className = "",
  widthPct,
  offsetXMultiplier = 1,
  offsetYMultiplier = 1,
}: WashiTapeProps) {
  const { width: defaultWidth, height } = sizeMap[size];
  const width = widthPct ? `${widthPct}%` : defaultWidth;
  const transform =
    placement === "top-center"
      ? `translateX(-50%) rotate(${rotation}deg)`
      : `rotate(${rotation}deg)`;

  const halfWidth = defaultWidth / 2;
  const halfHeight = height / 2;
  // Slightly less than half so the tape sits a little more on the card and a little closer to the center
  const offsetX = halfWidth * 0.45 * offsetXMultiplier;
  const offsetY = halfHeight * 0.45 * offsetYMultiplier;

  // When stretched wide, use fixed-pixel torn edges so they don't stretch
  const wideClipPath =
    "polygon(2px 0, 34% 2%, 67% 0, calc(100% - 2px) 3%, calc(100% - 4px) 11%, 100% 19%, calc(100% - 3px) 28%, 100% 39%, calc(100% - 3px) 51%, 100% 63%, calc(100% - 4px) 74%, calc(100% - 1px) 84%, calc(100% - 4px) 93%, calc(100% - 2px) 100%, 65% 98%, 33% 100%, 2px 97%, 4px 88%, 0 79%, 3px 68%, 0 57%, 3px 46%, 0 35%, 4px 25%, 1px 14%, 4px 7%)";

  const positionStyle: React.CSSProperties =
    placement === "top-center"
      ? { top: -offsetY, left: "50%" }
      : placement === "top-left"
        ? { top: -offsetY, left: -offsetX }
        : placement === "top-right"
          ? { top: -offsetY, right: -offsetX }
          : placement === "bottom-left"
            ? { bottom: -offsetY, left: -offsetX }
            : { bottom: -offsetY, right: -offsetX };

  return (
    <div
      aria-hidden="true"
      className={`washi-piece pointer-events-none z-30 ${variantMap[variant]} ${placementBase[placement]} ${className}`}
      style={{
        width,
        height,
        transform,
        ...(widthPct ? { clipPath: wideClipPath } : {}),
        ...positionStyle,
      }}
    />
  );
}
