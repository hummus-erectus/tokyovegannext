'use client';

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
    emerald: "btn-sticker--emerald",
    yellow: "btn-sticker--yellow",
    slate: "btn-sticker--slate",
    white: "btn-sticker--paper",
  };

  const outlineColorMap: Record<PaperButtonColor, string> = {
    emerald: "btn-sticker--paper !text-emerald-800",
    yellow: "btn-sticker--paper !text-amber-700",
    slate: "btn-sticker--paper !text-slate-800",
    white: "btn-sticker--paper",
  };

  const stickerColorMap: Record<PaperButtonColor, string> = {
    emerald: "btn-sticker--emerald",
    yellow: "btn-sticker--yellow",
    slate: "btn-sticker--slate",
    white: "btn-sticker--paper",
  };

  const variantClassMap: Record<PaperButtonVariant, string> = {
    solid: solidColorMap[color],
    outline: outlineColorMap[color],
    sticker: stickerColorMap[color],
  };

  const baseClass =
    "btn-sticker inline-flex items-center justify-center font-semibold select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2";

  const sanitizedClassName = (className ?? "").replace(/\bshadow-(?:xs|sm|md|lg|xl|2xl|inner|none)\b/g, "").replace(/\s+/g, " ").trim();

  const combinedClassName = `${baseClass} ${sizeClassMap[size]} ${variantClassMap[variant]}${
    sanitizedClassName ? ` ${sanitizedClassName}` : ""
  }`;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (type === "link") {
    // If it's a hash link disguised as a Next.js link, still handle smooth scrolling
    if (href.startsWith('#')) {
       return (
         <a href={href} className={combinedClassName} onClick={handleAnchorClick}>
           {children}
         </a>
       );
    }
    return (
      <Link href={href} locale={locale} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  const isExternal = type === "external" && !href.startsWith('#');

  return (
    <a
      href={href}
      className={combinedClassName}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      onClick={handleAnchorClick}
    >
      {children}
    </a>
  );
}
