"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";

interface ResourceCardProps {
  title: string;
  description: string;
  href: string;
  imageUrl?: string;
  icon?: string;
  accentColor?: string; // e.g. "emerald", "amber"
  isExternal?: boolean;
  languages?: ("en" | "ja")[];
  locale?: "en" | "ja";
}

export function ResourceCard({
  title,
  description,
  href,
  imageUrl,
  icon = "📄",
  accentColor = "emerald",
  isExternal = true,
  languages,
  locale = "en"
}: ResourceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isJaPage = locale === "ja";
  
  const colors: Record<string, {text: string}> = {
    emerald: {text: "text-emerald-700"},
    amber: {text: "text-amber-700"},
    rose: {text: "text-rose-700"},
    blue: {text: "text-blue-700"},
    slate: {text: "text-slate-700"}
  };

  const theme = colors[accentColor] || colors.emerald;
  const Component = isExternal ? "a" : Link;
  const linkProps = isExternal ? { target: "_blank" as const, rel: "noreferrer" } : {};

  return (
    <div 
      className="h-full"
      style={{perspective: "800px"}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Component
        href={href}
        {...linkProps}
        className="flex h-full flex-col overflow-hidden bg-white text-slate-900"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "top center",
          transform: isHovered ? "rotateX(8deg)" : "rotateX(0deg)",
          boxShadow: isHovered 
            ? "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
            : "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
        }}
      >
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      )}
      
      <div className="flex flex-1 flex-col p-6">
        {!imageUrl && (
          <span className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-2xl ${theme.text}`}>
            {icon}
          </span>
        )}
        {languages && languages.length > 0 && (
          <div className="mb-2 flex gap-1 text-xs font-semibold text-slate-500">
            {languages.includes("en") && (
              <span className="rounded-full bg-white/80 px-2 py-0.5 shadow-sm">{isJaPage ? "英語" : "EN"}</span>
            )}
            {languages.includes("ja") && (
              <span className="rounded-full bg-white/80 px-2 py-0.5 shadow-sm">{isJaPage ? "日本語" : "JP"}</span>
            )}
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 flex-1 text-sm text-slate-600">{description}</p>
        
        <span className={`mt-4 text-sm font-semibold ${theme.text}`}>
          {isExternal ? "Visit →" : "Read more →"}
        </span>
      </div>
      </Component>
    </div>
  );
}
