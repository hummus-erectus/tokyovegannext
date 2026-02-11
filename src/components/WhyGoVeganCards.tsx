"use client";

import {useState} from "react";
import Image from "next/image";
import {Modal} from "@/components/Modal";
import {usePaperLift} from "@/hooks/usePaperLift";

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

function WhyGoVeganCard({
  image,
  accent,
  reason,
  readMoreLabel,
  onSelect,
}: {
  image: {src: string; alt: string};
  accent: string;
  reason: ReasonCopy;
  readMoreLabel: string;
  onSelect: () => void;
}) {
  const {isActive, containerProps, cardStyle} = usePaperLift();

  return (
    <div className="h-full" {...containerProps}>
      <button
        onClick={onSelect}
        className={`group flex h-full w-full flex-col overflow-hidden bg-paper-texture text-left text-slate-900 ${isActive ? "card-is-active" : ""}`}
        style={cardStyle}
      >
        <div className={`relative h-48 w-full overflow-hidden bg-linear-to-br ${accent}`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col px-6 py-6">
          <h3 className="font-hand text-2xl font-bold text-slate-900 transition-colors group-hover:text-emerald-800">{reason.title}</h3>
          <p className="mt-3 flex-1 text-slate-600">{reason.content}</p>
          <span className="mt-4 inline-flex w-fit items-center font-hand text-lg font-bold text-emerald-700 underline-offset-2 transition-colors group-hover:text-emerald-900 group-hover:underline">
            {readMoreLabel}
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>
    </div>
  );
}

export function WhyGoVeganCards({cards, reasons, readMoreLabel, sectionTitle, closeLabel}: WhyGoVeganCardsProps) {
  const [activeReason, setActiveReason] = useState<CardKey | null>(null);
  const activeReasonCopy = activeReason ? reasons[activeReason] : null;
  const activeReasonMedia = activeReason ? cards.find((card) => card.key === activeReason) : null;

  const rotations = ["rotate-2", "-rotate-1", "rotate-1", "-rotate-2", "rotate-1"];

  return (
    <>
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 pt-4">
        {cards.map(({key, image, accent}, idx) => (
          <div key={key} className={`relative ${rotations[idx % rotations.length]} washi-tape-top`}>
            <WhyGoVeganCard
              image={image}
              accent={accent}
              reason={reasons[key]}
              readMoreLabel={readMoreLabel}
              onSelect={() => setActiveReason(key)}
            />
          </div>
        ))}
      </div>

      <Modal isOpen={!!activeReason && !!activeReasonCopy && !!activeReasonMedia} onCloseAction={() => setActiveReason(null)}>
        {activeReason && activeReasonCopy && activeReasonMedia ? (
          <div className="tape-section -rotate-1">
            <div className="tape-top-center" />
            <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl shadow-slate-400/30">
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
                  <h3 className="font-hand text-3xl font-bold text-slate-900">{activeReasonCopy.title}</h3>
                  <p className="whitespace-pre-line leading-relaxed">{activeReasonCopy.full}</p>
                </div>
                <div className="mt-8 border-t border-slate-200 pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-full border-2 border-emerald-200 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                    onClick={() => setActiveReason(null)}
                  >
                    {closeLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
