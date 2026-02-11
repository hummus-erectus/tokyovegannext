import {FaqAccordion} from "@/components/FaqAccordion";
import {WhyGoVeganCards, type ReasonCopy} from "@/components/WhyGoVeganCards";
import {PaperButton} from "@/components/PaperButton";
import {getLocale, getTranslations} from "next-intl/server";

const whyGoVeganCards = [
  {
    key: "animals" as const,
    image: {
      src: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1600&q=80",
      alt: "Rescued calf nuzzling a caretaker's hand"
    },
    accent: "from-rose-50"
    // Replace with a portrait of animals you've met via outreach or sanctuary visits.
  },
  {
    key: "planet" as const,
    image: {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
      alt: "Lush forest landscape with morning sunlight"
    },
    accent: "from-blue-50"
    // Swap in a recognizable Japanese landscape showing forests, oceans, or agriculture projects.
  },
  {
    key: "health" as const,
    image: {
      src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80",
      alt: "Colorful vegan bowls filled with fresh produce"
    },
    accent: "from-amber-50"
    // Consider a photo from one of your meetup potlucks or local plant-based chefs.
  },
  {
    key: "publicHealth" as const,
    image: {
      src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
      alt: "Scientist preparing samples in a laboratory"
    },
    accent: "from-orange-50"
    // Replace with imagery from workshops or partner organizations discussing food safety.
  },
  {
    key: "humanRights" as const,
    image: {
      src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1600&q=80",
      alt: "Hands passing bread around a shared table"
    },
    accent: "from-purple-50"
    // Use photography from community mutual-aid events or volunteering moments.
  }
];

const reasonKeys = ["animals", "planet", "health", "publicHealth", "humanRights"] as const;
const faqKeys = ["difficult", "eat", "nutrition", "religion", "unsure"] as const;

export default async function AboutVeganPage() {
  const t = await getTranslations("AboutVeganPage");
  const locale = await getLocale();

  const reasons = Object.fromEntries(
    reasonKeys.map((key) => [key, t.raw(`whyGoVegan.sections.${key}`) as ReasonCopy])
  ) as Record<(typeof reasonKeys)[number], ReasonCopy>;

  const faqItems = faqKeys.map((key) => ({
    key,
    question: t(`faqs.items.${key}.question`),
    answer: t(`faqs.items.${key}.answer`)
  }));

  return (
    <div className="min-h-screen pb-24 text-slate-900">
      {/* Hero — taped paper card */}
      <section className="relative pt-12 pb-12 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="tape-section -rotate-1">
            <div className="tape-top-center" />
            <div className="bg-white p-8 md:p-16 shadow-xl shadow-slate-300/60 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-600 mb-4">{t("hero.eyebrow")}</p>
              <h1 className="font-hand text-5xl md:text-7xl font-bold text-slate-900 mb-6">{t("hero.title")}</h1>
              <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">{t("hero.subtitle")}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PaperButton
                  href="#why-go-vegan"
                  type="anchor"
                  variant="solid"
                  color="emerald"
                  size="md"
                  className="font-bold shadow-md"
                >
                  {t("hero.ctaPrimary")}
                </PaperButton>
                <PaperButton
                  href="#faqs"
                  type="anchor"
                  variant="outline"
                  color="emerald"
                  size="md"
                  className="font-bold"
                >
                  {t("hero.ctaSecondary")}
                </PaperButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-8">
        {/* What is Veganism? — taped paper with blockquote */}
        <section id="what-is-veganism" className="scroll-mt-32">
          <div className="grid gap-12 lg:grid-cols-[250px_1fr] items-start">
            <div className="space-y-4 lg:self-start pt-4">
              <h2 className="font-hand text-5xl font-bold text-emerald-700 rotate-1">{t("whatIsVeganism.title")}</h2>
              <p className="text-lg text-slate-700">{t("whatIsVeganism.definition")}</p>
            </div>
            <div className="tape-section rotate-1">
              <div className="tape-top-center" />
              <figure className="bg-white p-8 md:p-10 shadow-xl shadow-slate-300/60">
                <blockquote className="font-hand text-2xl md:text-3xl font-bold leading-relaxed text-slate-800">
                  &ldquo;{t("whatIsVeganism.description")}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold uppercase tracking-wide text-emerald-600">
                  — {t("whatIsVeganism.quoteSource")}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Why Go Vegan? */}
        <section id="why-go-vegan" className="scroll-mt-32 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-hand text-6xl font-bold text-emerald-800 -rotate-1">{t("whyGoVegan.title")}</h2>
            <p className="font-hand text-2xl text-slate-600">{t("hero.subtitle")}</p>
          </div>
          <WhyGoVeganCards
            cards={whyGoVeganCards}
            reasons={reasons}
            readMoreLabel={t("whyGoVegan.readMore")}
            sectionTitle={t("whyGoVegan.title")}
            closeLabel={t("modal.close")}
          />

          {/* Kindness callout — sticky note style */}
          <div className="flex justify-center pt-4">
            <div className="tape-section rotate-2 max-w-lg w-full">
              <div className="tape-top-center" />
              <div className="bg-[#FEF3C7] p-8 shadow-lg shadow-slate-300/40 text-center">
                <p
                  className="font-hand text-xl md:text-2xl font-bold leading-relaxed text-slate-800"
                  dangerouslySetInnerHTML={{__html: t.raw("kindnessCallout.lineOne")}}
                />
                <p
                  className="mt-4 font-hand text-3xl md:text-4xl font-bold text-emerald-700"
                  dangerouslySetInnerHTML={{__html: t.raw("kindnessCallout.lineTwo")}}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="scroll-mt-32 space-y-2">
          <div className="text-center space-y-2">
            <h2 className="font-hand text-6xl font-bold text-slate-900 rotate-1">{t("faqs.title")}</h2>
            <p className="font-hand text-2xl text-slate-600">{t("hero.subtitle")}</p>
          </div>
          <FaqAccordion items={faqItems} />
        </section>

        {/* Footer CTA — paper flyer style */}
        <section className="flex justify-center">
          <div className="tape-section rotate-1 max-w-xl w-full">
            <div className="tape-top-center" />
            <div className="bg-white p-8 md:p-12 shadow-xl shadow-slate-300/60 text-center">
              <h2 className="font-hand text-4xl md:text-5xl font-bold text-slate-900">{t("footer.tagline")}</h2>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <PaperButton
                  href="/resources"
                  type="link"
                  locale={locale}
                  variant="solid"
                  color="emerald"
                  size="md"
                  className="font-bold shadow-md"
                >
                  {t("footer.ctaPrimary")}
                </PaperButton>
                <PaperButton
                  href="/"
                  type="link"
                  locale={locale}
                  variant="outline"
                  color="emerald"
                  size="md"
                  className="font-bold"
                >
                  {t("footer.ctaSecondary")}
                </PaperButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
