"use client";

import {MediaListItem} from "@/components/MediaListItem";
import {PaperButton} from "@/components/PaperButton";

export interface BookListItemProps {
  title: string;
  author?: string;
  description: string;
  href: string;
  imageUrl?: string;
  languages?: ("en" | "ja")[];
  locale?: "en" | "ja";
  reverse?: boolean; // Flip layout (image on right)
}

export function BookListItem({
  title,
  author,
  description,
  href,
  imageUrl,
  languages,
  locale = "en",
  reverse = false,
}: BookListItemProps) {
  const isJaPage = locale === "ja";
  const buyLabel = isJaPage ? "Amazonで購入" : "Buy on Amazon";
  const tiltClass = reverse ? "-rotate-2" : "rotate-2";
  const counterTiltClass = reverse ? "rotate-2" : "-rotate-2";

  const meta = (
    <>
      {languages && languages.length > 0 && (
        <div className="mb-3 flex gap-2 text-xs font-semibold text-slate-500">
          {languages.includes("en") && (
            <span className="rounded-full bg-white/80 px-2 py-0.5 shadow-sm border border-slate-200">
              {isJaPage ? "英語" : "EN"}
            </span>
          )}
          {languages.includes("ja") && (
            <span className="rounded-full bg-white/80 px-2 py-0.5 shadow-sm border border-slate-200">
              {isJaPage ? "日本語" : "JP"}
            </span>
          )}
        </div>
      )}
      {author && (
        <p className="text-sm font-semibold text-slate-700 mb-2">
          {isJaPage ? "著者：" : "by "}
          {author}
        </p>
      )}
    </>
  );

  const action = (
    <PaperButton
      href={href}
      type="external"
      variant="sticker"
      color="yellow"
      size="sm"
      className={`px-4 py-2 font-bold shadow-md origin-center ${tiltClass}`}
    >
      <span className={`inline-block origin-center ${counterTiltClass}`}>
        {buyLabel}
      </span>
    </PaperButton>
  );

  return (
    <MediaListItem
      title={title}
      description={description}
      imageUrl={imageUrl}
      fallbackImage="/images/placeholder-book.svg"
      reverse={reverse}
      meta={meta}
      action={action}
    />
  );
}

export const BookCard = BookListItem;
