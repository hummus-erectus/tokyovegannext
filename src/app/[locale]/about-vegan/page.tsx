"use client";

import {PageHero} from "@/components/PageHero";
import {Modal} from "@/components/Modal";
import {Link} from "@/i18n/routing";
import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {useState} from "react";

type WhyGoVeganCard = {
  key: "animals" | "planet" | "health" | "publicHealth" | "humanRights";
  image: {src: string; alt: string};
  accent: string;
};

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

const whyGoVeganCards: WhyGoVeganCard[] = [
  {
    key: "animals",
    image: {
      src: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1600&q=80",
      alt: "Rescued calf nuzzling a caretaker's hand"
    },
    accent: "from-rose-50"
    // Replace with a portrait of animals you've met via outreach or sanctuary visits.
  },
  {
    key: "planet",
    image: {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
      alt: "Lush forest landscape with morning sunlight"
    },
    accent: "from-blue-50"
    // Swap in a recognizable Japanese landscape showing forests, oceans, or agriculture projects.
  },
  {
    key: "health",
    image: {
      src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80",
      alt: "Colorful vegan bowls filled with fresh produce"
    },
    accent: "from-amber-50"
    // Consider a photo from one of your meetup potlucks or local plant-based chefs.
  },
  {
    key: "publicHealth",
    image: {
      src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
      alt: "Scientist preparing samples in a laboratory"
    },
    accent: "from-orange-50"
    // Replace with imagery from workshops or partner organizations discussing food safety.
  },
  {
    key: "humanRights",
    image: {
      src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1600&q=80",
      alt: "Hands passing bread around a shared table"
    },
    accent: "from-purple-50"
    // Use photography from community mutual-aid events or volunteering moments.
  }
];

const faqKeys = ["difficult", "eat", "nutrition", "religion", "unsure"] as const;

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

export default function AboutVeganPage() {
  const t = useTranslations("AboutVeganPage");
  const locale = useLocale();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeReason, setActiveReason] = useState<WhyGoVeganCard["key"] | null>(null);
  const heroBackground =
    "linear-gradient(120deg, rgba(6,95,70,0.7), rgba(52,211,153,0.55)), url('https://images.unsplash.com/photo-1506086679524-493c64fdfaa6?auto=format&fit=crop&w=1600&q=80')";

  const getReasonCopy = (key: WhyGoVeganCard["key"]) =>
    t.raw(`whyGoVegan.sections.${key}`) as {title: string; content: string; full: string};
  const activeReasonCopy = activeReason ? getReasonCopy(activeReason) : null;
  const activeReasonMedia = activeReason ? whyGoVeganCards.find((card) => card.key === activeReason) : null;

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-white text-slate-900">
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.subtitle")}
        locale={locale}
        backgroundImage={heroBackground}
        actions={[
          {label: t("hero.ctaPrimary"), href: "#why-go-vegan", variant: "solid", type: "anchor"},
          {label: t("hero.ctaSecondary"), href: "#faqs", variant: "outline", type: "anchor"}
        ]}
      />

      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-12">
        {/* What is Veganism? */}
        <section id="what-is-veganism" className="grid gap-8 scroll-mt-32 rounded-3xl bg-white/80 p-8 shadow-lg shadow-emerald-100 lg:grid-cols-[1.1fr_2fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">{t("whatIsVeganism.title")}</p>
            <p className="text-lg text-slate-700">{t("whatIsVeganism.definition")}</p>
          </div>
          <figure className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-6">
            <blockquote className="text-xl font-medium italic leading-relaxed text-emerald-900">
              {t("whatIsVeganism.description")}
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold uppercase tracking-wide text-emerald-600">
              — {t("whatIsVeganism.quoteSource")}
            </figcaption>
          </figure>
        </section>

        {/* Why Go Vegan? */}
        <section id="why-go-vegan" className="scroll-mt-32 space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">{t("whyGoVegan.title")}</p>
            <p className="text-lg text-slate-600">{t("hero.subtitle")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whyGoVeganCards.map(({key, image, accent}) => (
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
                  <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-emerald-800">{t(`whyGoVegan.sections.${key}.title`)}</h3>
                  <p className="mt-3 flex-1 text-slate-600">{t(`whyGoVegan.sections.${key}.content`)}</p>
                  <span className="mt-4 inline-flex w-fit items-center text-sm font-semibold text-emerald-700 underline-offset-2 transition-colors group-hover:text-emerald-900 group-hover:underline">
                    {t("whyGoVegan.readMore")}
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="rounded-3xl bg-emerald-50/70 p-8 text-center text-slate-900 shadow-inner shadow-emerald-100">
            <p
              className="text-lg font-medium leading-relaxed"
              dangerouslySetInnerHTML={{__html: t.raw("kindnessCallout.lineOne")}}
            />
            <p
              className="mt-4 text-2xl font-bold text-emerald-800"
              dangerouslySetInnerHTML={{__html: t.raw("kindnessCallout.lineTwo")}}
            />
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="scroll-mt-32 space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">{t("faqs.title")}</p>
            <p className="text-lg text-slate-600">{t("hero.subtitle")}</p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white px-6 py-2 shadow-lg shadow-emerald-50">
            {faqKeys.map((key) => (
              <AccordionItem
                key={key}
                question={t(`faqs.items.${key}.question`)}
                answer={t(`faqs.items.${key}.answer`)}
                isOpen={openFaq === key}
                onClick={() => setOpenFaq(openFaq === key ? null : key)}
              />
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="rounded-3xl bg-emerald-900 px-8 py-12 text-center text-white shadow-xl shadow-emerald-100">
          <h2 className="text-2xl font-bold md:text-3xl">{t("footer.tagline")}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/resources"
              locale={locale}
              className="rounded-full bg-white/90 px-8 py-3 font-semibold text-emerald-800 shadow-lg shadow-black/30 transition hover:bg-white"
            >
              {t("footer.ctaPrimary")}
            </Link>
            <Link
              href="/"
              locale={locale}
              className="rounded-full border border-white/70 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {t("footer.ctaSecondary")}
            </Link>
          </div>
        </section>
      </main>

      <Modal isOpen={!!activeReason && !!activeReasonCopy && !!activeReasonMedia} onCloseAction={() => setActiveReason(null)}>
        {activeReason && activeReasonCopy && activeReasonMedia ? (
          <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative h-56 w-full shrink-0 overflow-hidden bg-slate-100">
              <Image src={activeReasonMedia.image.src} alt={activeReasonMedia.image.alt} fill className="object-cover" />
              <button
                type="button"
                className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-slate-700 backdrop-blur-sm transition hover:bg-white hover:text-emerald-700"
                aria-label={t("modal.close")}
                onClick={() => setActiveReason(null)}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8 text-slate-700">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">{t("whyGoVegan.title")}</p>
                <h3 className="text-2xl font-bold text-slate-900">{activeReasonCopy.title}</h3>
                <p className="whitespace-pre-line leading-relaxed">{activeReasonCopy.full}</p>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-emerald-200 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  onClick={() => setActiveReason(null)}
                >
                  {t("modal.close")}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
