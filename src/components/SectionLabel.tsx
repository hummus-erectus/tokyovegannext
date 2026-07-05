import Link from "next/link";
import { ReactNode } from "react";
import { RoughHighlight } from "./RoughHighlight";

interface SectionLabelProps {
  children: ReactNode;
  href?: string;
  locale?: string;
  highlightColor?: string;
  highlightType?: "underline" | "highlight" | "box" | "circle";
  highlightTrigger?: "hover" | "visible" | "none";
  multiline?: boolean;
  rotation?: string;
  className?: string;
  textClassName?: string;
}

export function SectionLabel({
  children,
  href,
  locale,
  highlightColor = "#10b981",
  highlightType = "underline",
  highlightTrigger = "hover",
  multiline,
  rotation = "-rotate-1",
  className = "",
  textClassName = "text-slate-900",
}: SectionLabelProps) {
  const content = (
    <div className={`${rotation} ${className}`}>
      <div className="tape-section">
        <div className="tape-top-center" />
      </div>
      <div className="paper-strip">
        <h2 className={`font-heading text-4xl sm:text-5xl font-bold ${textClassName}`}>
          <RoughHighlight
            type={highlightType}
            color={highlightColor}
            strokeWidth={3}
            trigger={highlightTrigger}
            multiline={multiline}
          >
            <span>{children}</span>
          </RoughHighlight>
        </h2>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} locale={locale} className="group inline-block">
        {content}
      </Link>
    );
  }

  return <div className="inline-block">{content}</div>;
}
