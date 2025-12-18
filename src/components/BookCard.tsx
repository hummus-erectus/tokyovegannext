"use client";

import Image from "next/image";
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

type BookCoverProps = {
  title: string;
  imageUrl?: string;
  reverse: boolean;
};

function BookCover({ title, imageUrl, reverse }: BookCoverProps) {
  return (
    <>
      {/* Book Cover - styled as a polaroid/photo pinned to the board */}
      {imageUrl && (
        <div className={`relative shrink-0 mx-auto md:mx-0 md:self-start`}>
          {/* Tape/clip at the top */}
          <div className="tape-top-center" />

          {/* Polaroid-style frame */}
          <div
            className="relative bg-white p-3 pb-6 shadow-lg"
            style={{
              transform: reverse ? "rotate(2deg)" : "rotate(-2deg)",
            }}
          >
            <div className="relative w-36 h-52 md:w-44 md:h-64 overflow-hidden bg-slate-100">
              <Image src={imageUrl} alt={title} fill className="object-cover" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type NoteCardProps = {
  title: string;
  author?: string;
  description: string;
  href: string;
  languages?: ("en" | "ja")[];
  locale: "en" | "ja";
  reverse: boolean;
};

function NoteCard({ title, author, description, href, languages, locale, reverse }: NoteCardProps) {
  const isJaPage = locale === "ja";
  const buyLabel = isJaPage ? "Amazonで購入" : "Buy on Amazon";

  return (
    <>
      {/* Description Card - styled as an index card */}
      <div
        className="relative w-full flex-1 min-w-0"
        style={{
          transform: reverse ? "rotate(-1deg)" : "rotate(1deg)",
        }}
      >
        <div className="pointer-events-none absolute right-2 top-2 z-20 h-7 w-28 origin-center translate-x-1/3 -translate-y-1/3 rotate-40 rounded-sm bg-amber-200/70 shadow-sm" />
        <div className="pointer-events-none absolute bottom-2 left-2 z-20 h-7 w-28 origin-center -translate-x-1/3 translate-y-1/3 rotate-40 rounded-sm bg-amber-200/70 shadow-sm" />
        <div
          className="relative overflow-hidden bg-white shadow-md font-mono"
          style={{
            backgroundImage:
              "repeating-linear-gradient(#ffffff, #ffffff 25px, #9198e5 26px, #9198e5 27px)",
            backgroundPosition: "0 34px",
          }}
        >
          <header
            className="relative z-10 h-9"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff, #ffffff 33px, #f9a8d4 35px, #f9a8d4 36px)",
            }}
          >
            <span className="relative left-3 top-2 text-xl md:text-2xl font-bold text-slate-900">
              {title}
            </span>
          </header>

          <div className="relative z-10 px-5 pb-6 pt-7">
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

            <p className="text-slate-800 text-[15px] md:text-base leading-[27px] whitespace-pre-line">
              {description}
            </p>

            <div className="mt-5 flex justify-end">
              <PaperButton
                href={href}
                type="external"
                variant="sticker"
                color="yellow"
                size="sm"
                className="px-4 py-2 font-bold shadow-md"
              >
                <span
                  style={{
                    transform: reverse ? "rotate(-2deg)" : "rotate(2deg)",
                  }}
                >
                  {buyLabel}
                </span>
              </PaperButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
  return (
    <div
      className={`w-full flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-6 md:gap-10 items-center md:items-start`}
    >
      <BookCover title={title} imageUrl={imageUrl} reverse={reverse} />
      <NoteCard
        title={title}
        author={author}
        description={description}
        href={href}
        languages={languages}
        locale={locale}
        reverse={reverse}
      />
    </div>
  );
}

export const BookCard = BookListItem;
