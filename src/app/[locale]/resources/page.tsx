import {Link} from "@/i18n/routing";
import {useLocale, useTranslations} from "next-intl";

const sectionKeys = ["essentials", "knowledge", "business"] as const;
const sectionItemMap = {
  essentials: ["starterKits", "restaurants", "shopping", "cooking", "community"] as const,
  knowledge: ["books", "movies"] as const,
  business: ["catering"] as const
};

const itemMeta: Record<string, {icon: string; accent: string; gradient: string}> = {
  starterKits: {icon: "🎒", accent: "text-emerald-700", gradient: "from-emerald-50 to-white"},
  restaurants: {icon: "🍜", accent: "text-amber-700", gradient: "from-amber-50 to-white"},
  shopping: {icon: "🧺", accent: "text-rose-700", gradient: "from-rose-50 to-white"},
  cooking: {icon: "🥢", accent: "text-slate-700", gradient: "from-slate-50 to-white"},
  community: {icon: "🤝", accent: "text-indigo-700", gradient: "from-indigo-50 to-white"},
  books: {icon: "📚", accent: "text-blue-700", gradient: "from-blue-50 to-white"},
  movies: {icon: "🎬", accent: "text-teal-700", gradient: "from-teal-50 to-white"},
  catering: {icon: "🍱", accent: "text-lime-700", gradient: "from-lime-50 to-white"}
};

type SectionKey = (typeof sectionKeys)[number];

export default function ResourcesPage() {
  const t = useTranslations("ResourcesPage");
  const locale = useLocale();

  const renderCards = (section: SectionKey) => (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {sectionItemMap[section].map((itemKey) => {
        const item = t.raw(`sections.${section}.items.${itemKey}`) as {
          title: string;
          description: string;
          href: string;
        };
        const meta = itemMeta[itemKey] ?? {icon: "", accent: "text-emerald-700", gradient: "from-emerald-50 to-white"};
        return (
          <a
            key={itemKey}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={`group flex h-full flex-col rounded-3xl border border-white/50 bg-gradient-to-br ${meta.gradient} p-6 text-slate-900 shadow-lg shadow-emerald-50 transition hover:-translate-y-1 hover:shadow-emerald-200`}
          >
            <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-2xl ${meta.accent}`}>
              {meta.icon}
            </span>
            <h3 className="mt-6 text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-3 flex-1 text-sm text-slate-600">{item.description}</p>
            <span className="mt-4 text-sm font-semibold text-emerald-700">Visit →</span>
          </a>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-slate-900">
      <section
        className="relative isolate overflow-hidden border-b border-emerald-100"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(6,95,70,0.65), rgba(16,185,129,0.6)), url('https://images.unsplash.com/photo-1474073705359-5da2a8270c64?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 text-white md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-100">
              {t("hero.eyebrow")}
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">{t("hero.title")}</h1>
            <p className="text-base text-emerald-50 md:text-lg">{t("hero.description")}</p>
          </div>
          <div className="flex flex-col gap-3 text-sm font-semibold md:flex-row">
            <a
              href="#essentials"
              className="rounded-full bg-white/90 px-6 py-3 text-center text-emerald-700 shadow-lg shadow-emerald-900/20 transition hover:bg-white"
            >
              {t("hero.ctaPrimary")}
            </a>
            <Link
              href="/"
              locale={locale}
              className="rounded-full border border-white/70 px-6 py-3 text-center text-white transition hover:bg-white/10"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-12">
        {sectionKeys.map((sectionKey) => (
          <section
            key={sectionKey}
            id={sectionKey === "essentials" ? "essentials" : undefined}
            className="grid gap-8 lg:grid-cols-[1.1fr_2fr]"
          >
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
                {t(`sections.${sectionKey}.title`)}
              </p>
              <p className="text-lg text-slate-600">
                {t(`sections.${sectionKey}.description`)}
              </p>
            </div>
            {renderCards(sectionKey)}
          </section>
        ))}
      </main>
    </div>
  );
}
