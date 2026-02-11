import {ResourceCard} from "@/components/ResourceCard";
import {PaperButton} from "@/components/PaperButton";
import {useLocale, useTranslations} from "next-intl";

const sectionKeys = ["essentials", "knowledge"] as const;
const sectionItemMap = {
  essentials: ["starterKits", "restaurants", "shopping", "cooking", "community"] as const,
  knowledge: ["books", "movies"] as const
};

const itemMeta: Record<string, {icon: string; accent: string}> = {
  starterKits: {icon: "🎒", accent: "text-emerald-700"},
  restaurants: {icon: "🍜", accent: "text-amber-700"},
  shopping: {icon: "🧺", accent: "text-rose-700"},
  cooking: {icon: "🥢", accent: "text-slate-700"},
  community: {icon: "🤝", accent: "text-indigo-700"},
  books: {icon: "📚", accent: "text-blue-700"},
  movies: {icon: "🎬", accent: "text-teal-700"}
};

const accentColorMap: Record<string, string> = {
  "text-emerald-700": "emerald",
  "text-amber-700": "amber",
  "text-rose-700": "rose",
  "text-blue-700": "blue",
  "text-slate-700": "slate",
  "text-indigo-700": "blue",
  "text-teal-700": "blue"
};

type SectionKey = (typeof sectionKeys)[number];

export default function ResourcesPage() {
  const t = useTranslations("ResourcesPage");
  const rawLocale = useLocale();
  const locale: "en" | "ja" = rawLocale === "en" ? "en" : "ja";

  const renderCards = (section: SectionKey) => (
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 pt-8">
      {sectionItemMap[section].map((itemKey, idx) => {
        const item = t.raw(`sections.${section}.items.${itemKey}`) as {
          title: string;
          description: string;
          href: string;
        };
        const meta = itemMeta[itemKey] ?? {icon: "", accent: "text-emerald-700"};

        const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2"];
        const rotation = rotations[idx % rotations.length];

        const isExternal = item.href.startsWith("http");
        const accentColor = accentColorMap[meta.accent] ?? "emerald";

        return (
          <div key={itemKey} className={`relative ${rotation} washi-tape-top`}>
            <ResourceCard
              title={item.title}
              description={item.description}
              href={item.href}
              icon={meta.icon}
              accentColor={accentColor}
              isExternal={isExternal}
              locale={locale}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen text-slate-900 pb-24">
      <section className="relative pt-12 pb-12 px-4">
         <div className="mx-auto max-w-4xl">
            <div className="tape-section rotate-1">
               <div className="tape-top-center" />
               <div className="bg-white p-8 md:p-16 shadow-xl shadow-slate-300/60 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-600 mb-4">{t("hero.eyebrow")}</p>
                  <h1 className="font-hand text-5xl md:text-7xl font-bold text-slate-900 mb-6">{t("hero.title")}</h1>
                  <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">{t("hero.description")}</p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <PaperButton
                        href="#essentials"
                        type="anchor"
                        variant="solid"
                        color="emerald"
                        size="md"
                        className="font-bold shadow-md"
                     >
                        {t("hero.ctaPrimary")}
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
                        {t("hero.ctaSecondary")}
                     </PaperButton>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-8">
        {sectionKeys.map((sectionKey) => (
          <section
            key={sectionKey}
            id={sectionKey}
            className="grid gap-8 lg:grid-cols-[250px_1fr]"
          >
            <div className="space-y-4 lg:self-start pt-8">
              <h2 className="font-hand text-5xl font-bold text-emerald-700 -rotate-2">
                {t(`sections.${sectionKey}.title`)}
              </h2>
              <p className="text-xl text-slate-700 font-hand">
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
