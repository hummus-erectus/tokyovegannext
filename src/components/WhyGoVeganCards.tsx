"use client";

import {useState} from "react";
import Image from "next/image";
import {Modal} from "@/components/Modal";

type CardKey = "animals" | "planet" | "health" | "publicHealth" | "humanRights";

type WhyGoVeganCardData = {
  key: CardKey;
  image: {src: string; alt: string};
  accent: string;
};

export type ReasonCopy = {
  title: string;
  content: string;
  full: string;
};

type WhyGoVeganCardsProps = {
  cards: WhyGoVeganCardData[];
  reasons: Record<CardKey, ReasonCopy>;
  readMoreLabel: string;
  sectionTitle: string;
  closeLabel: string;
};

export function WhyGoVeganCards({cards, reasons, readMoreLabel, sectionTitle, closeLabel}: WhyGoVeganCardsProps) {
  const [activeReason, setActiveReason] = useState<CardKey | null>(null);
  const activeReasonCopy = activeReason ? reasons[activeReason] : null;
  const activeReasonMedia = activeReason ? cards.find((card) => card.key === activeReason) : null;

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({key, image, accent}) => (
          <button
            key={key}
            onClick={() => setActiveReason(key)}
            className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/95 text-left shadow-lg shadow-emerald-50 transition hover:-translate-y-1 hover:shadow-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <div className={`relative h-48 w-full overflow-hidden bg-linear-to-br ${accent}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col px-6 py-6">
              <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-emerald-800">{reasons[key].title}</h3>
              <p className="mt-3 flex-1 text-slate-600">{reasons[key].content}</p>
              <span className="mt-4 inline-flex w-fit items-center text-sm font-semibold text-emerald-700 underline-offset-2 transition-colors group-hover:text-emerald-900 group-hover:underline">
                {readMoreLabel}
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      <Modal isOpen={!!activeReason && !!activeReasonCopy && !!activeReasonMedia} onCloseAction={() => setActiveReason(null)}>
        {activeReason && activeReasonCopy && activeReasonMedia ? (
          <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative h-56 w-full shrink-0 overflow-hidden bg-slate-100">
              <Image src={activeReasonMedia.image.src} alt={activeReasonMedia.image.alt} fill className="object-cover" />
              <button
                type="button"
                className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-slate-700 backdrop-blur-sm transition hover:bg-white hover:text-emerald-700"
                aria-label={closeLabel}
                onClick={() => setActiveReason(null)}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8 text-slate-700">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">{sectionTitle}</p>
                <h3 className="text-2xl font-bold text-slate-900">{activeReasonCopy.title}</h3>
                <p className="whitespace-pre-line leading-relaxed">{activeReasonCopy.full}</p>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-emerald-200 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  onClick={() => setActiveReason(null)}
                >
                  {closeLabel}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
