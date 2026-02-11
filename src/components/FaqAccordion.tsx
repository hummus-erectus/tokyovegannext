"use client";

import {useState} from "react";

const AccordionIcons = {
  open: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-600" aria-hidden>
      <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  closed: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-emerald-100 last:border-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left font-semibold text-slate-800 transition-colors hover:text-emerald-700"
        onClick={onClick}
      >
        <span>{question}</span>
        {isOpen ? AccordionIcons.open : AccordionIcons.closed}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-4 text-slate-600">{answer}</p>
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

  return (
    <div className="rounded-3xl border border-emerald-100 bg-white px-6 py-2 shadow-lg shadow-emerald-50">
      {items.map((item) => (
        <AccordionItem
          key={item.key}
          question={item.question}
          answer={item.answer}
          isOpen={openFaq === item.key}
          onClick={() => setOpenFaq(openFaq === item.key ? null : item.key)}
        />
      ))}
    </div>
  );
}
