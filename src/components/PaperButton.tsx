import {Link} from "@/i18n/routing";
import {ReactNode} from "react";

type PaperButtonType = "link" | "anchor" | "external";

type PaperButtonVariant = "solid" | "outline" | "sticker";

type PaperButtonColor = "emerald" | "yellow" | "slate" | "white";

type PaperButtonSize = "sm" | "md" | "lg";

type PaperButtonProps = {
  href: string;
  children: ReactNode;
  type?: PaperButtonType;
  locale?: string;
  variant?: PaperButtonVariant;
  color?: PaperButtonColor;
  size?: PaperButtonSize;
  className?: string;
};

export function PaperButton({
  href,
  children,
  type = "external",
  locale,
  variant = "solid",
  color = "emerald",
  size = "md",
  className,
}: PaperButtonProps) {
  const sizeClassMap: Record<PaperButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const solidColorMap: Record<PaperButtonColor, string> = {
    emerald: "bg-emerald-600 text-white hover:bg-emerald-700",
    yellow: "bg-[#FCD34D] text-slate-900 hover:bg-[#fbbf24]",
    slate: "bg-slate-900 text-white hover:bg-slate-800",
    white: "bg-white/90 text-slate-900 hover:bg-white",
  };

  const outlineColorMap: Record<PaperButtonColor, string> = {
    emerald: "bg-emerald-50 text-slate-700 border-2 border-emerald-100 hover:bg-emerald-100",
    yellow: "bg-amber-50 text-slate-800 border-2 border-amber-100 hover:bg-amber-100",
    slate: "bg-white text-slate-800 border-2 border-slate-200 hover:bg-slate-50",
    white: "border border-white/70 text-white hover:bg-white/10",
  };

  const stickerColorMap: Record<PaperButtonColor, string> = {
    emerald: "bg-emerald-200/80 text-slate-900 border border-emerald-300",
    yellow: "bg-[#ffdd55] text-slate-900 border border-amber-300",
    slate: "bg-slate-200/80 text-slate-900 border border-slate-300",
    white: "bg-white/85 text-slate-900 border border-white/70",
  };

  const variantClassMap: Record<PaperButtonVariant, string> = {
    solid: solidColorMap[color],
    outline: outlineColorMap[color],
    sticker: stickerColorMap[color],
  };

  const baseClass =
    "inline-flex items-center justify-center rounded-full font-semibold select-none transition-transform transition-shadow duration-150 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0.5 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2";

  const combinedClassName = `${baseClass} ${sizeClassMap[size]} ${variantClassMap[variant]}${
    className ? ` ${className}` : ""
  }`;

  if (type === "link") {
    return (
      <Link href={href} locale={locale} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  const isExternal = type === "external";

  return (
    <a
      href={href}
      className={combinedClassName}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
