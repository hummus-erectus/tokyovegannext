import {PageHero} from "@/components/PageHero";
import {FaqAccordion} from "@/components/FaqAccordion";
import {WhyGoVeganCards, type ReasonCopy} from "@/components/WhyGoVeganCards";
import {Link} from "@/i18n/routing";
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
  const heroBackground =
    "linear-gradient(120deg, rgba(6,95,70,0.7), rgba(52,211,153,0.55)), url('https://images.unsplash.com/photo-1506086679524-493c64fdfaa6?auto=format&fit=crop&w=1600&q=80')";

  const reasons = Object.fromEntries(
    reasonKeys.map((key) => [key, t.raw(`whyGoVegan.sections.${key}`) as ReasonCopy])
  ) as Record<(typeof reasonKeys)[number], ReasonCopy>;

  const faqItems = faqKeys.map((key) => ({
    key,
    question: t(`faqs.items.${key}.question`),
    answer: t(`faqs.items.${key}.answer`)
  }));

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
          <WhyGoVeganCards
            cards={whyGoVeganCards}
            reasons={reasons}
            readMoreLabel={t("whyGoVegan.readMore")}
            sectionTitle={t("whyGoVegan.title")}
            closeLabel={t("modal.close")}
          />
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
          <FaqAccordion items={faqItems} />
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
    </div>
  );
}
