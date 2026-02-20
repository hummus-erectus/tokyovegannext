"use client";

import {useEffect, useRef, useState, type CSSProperties} from "react";

function FaqCard({
  question,
  answer,
  isOpen,
  isClosing,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  isClosing: boolean;
  onClick: () => void;
}) {
  const isElevated = isOpen || isClosing;
  const slipStyle: CSSProperties = {
    clipPath: isOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
    transform: isOpen ? "translateY(0)" : "translateY(-12px)",
    transition: "clip-path 0.3s ease-out, transform 0.3s ease-out",
  };

  return (
    <div className={`tape-section relative ${isElevated ? "z-20" : "z-10"}`}>
      <div className="tape-top-center" />
      {/* Question card */}
      <button
        className="relative z-2 w-full text-left bg-white p-6 shadow-md shadow-slate-300/40 transition-shadow duration-300 hover:shadow-lg"
        onClick={onClick}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-hand text-xl font-bold text-slate-800 sm:text-2xl">{question}</h3>
          <svg
            viewBox="0 0 24 24"
            className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-emerald-600" : "text-slate-400"
            }`}
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
      {/* Paper slip answer — pulled out without moving other cards */}
      <div
        className={`absolute left-4 right-4 top-full ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className="bg-paper-texture border border-slate-200/60 px-5 py-5 shadow-lg shadow-slate-300/40 overflow-hidden"
          style={slipStyle}
        >
          <div className="h-px w-full border-t border-dashed border-emerald-200/70" />
          <p className="mt-4 text-slate-600 leading-relaxed overflow-wrap-break-word">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export type FaqItem = {
  key: string;
  question: string;
  answer: string;
};

export function FaqAccordion({items}: {items: FaqItem[]}) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [closingFaq, setClosingFaq] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextOpenRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const startClose = (key: string, nextKey: string | null = null) => {
    setClosingFaq(key);
    setOpenFaq(null);
    nextOpenRef.current = nextKey;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setClosingFaq(null);
      if (nextOpenRef.current) {
        setOpenFaq(nextOpenRef.current);
      }
      nextOpenRef.current = null;
    }, 300);
  };

  const handleToggle = (key: string) => {
    if (openFaq === key) {
      startClose(key);
      return;
    }

    if (openFaq) {
      startClose(openFaq, key);
      return;
    }

    if (closingFaq) {
      nextOpenRef.current = key;
      return;
    }

    setOpenFaq(key);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {items.map((item) => (
        <FaqCard
          key={item.key}
          question={item.question}
          answer={item.answer}
          isOpen={openFaq === item.key}
          isClosing={closingFaq === item.key}
          onClick={() => handleToggle(item.key)}
        />
      ))}
    </div>
  );
}
