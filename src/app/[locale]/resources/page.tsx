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
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 pt-8">
      {sectionItemMap[section].map((itemKey, idx) => {
        const item = t.raw(`sections.${section}.items.${itemKey}`) as {
          title: string;
          description: string;
          href: string;
        };
        const meta = itemMeta[itemKey] ?? {icon: "", accent: "text-emerald-700", gradient: ""};
        
        // Alternating rotations for a natural feel
        const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2"];
        const rotation = rotations[idx % rotations.length];

        const isExternal = item.href.startsWith("http");

        const cardContent = (
          <div className="flex h-full flex-col bg-white p-6 shadow-lg shadow-slate-300/60 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between">
              <span className={`inline-flex h-12 w-12 items-center justify-center text-3xl ${meta.accent}`}>
                {meta.icon}
              </span>
              <span className={`text-sm font-bold ${meta.accent} opacity-0 transition group-hover:opacity-100`}>
                Visit →
              </span>
            </div>
            
            <h3 className={`mt-4 font-hand text-2xl font-bold text-slate-900 ${meta.accent.replace('text-', 'group-hover:text-')}`}>
              {item.title}
            </h3>
            
            <p className="mt-3 flex-1 text-base text-slate-600">
              {item.description}
            </p>
          </div>
        );

        return (
          <div key={itemKey} className={`tape-section ${rotation}`}>
            <div className="tape-top-center" />
            {isExternal ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group block h-full"
              >
                {cardContent}
              </a>
            ) : (
              <Link
                href={item.href}
                locale={locale}
                className="group block h-full"
              >
                {cardContent}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen text-slate-900 pb-24">
      {/* Custom "Pinned Paper" Hero */}
      <section className="relative pt-12 pb-12 px-4">
         <div className="mx-auto max-w-4xl">
            <div className="tape-section rotate-1">
               <div className="tape-top-center" />
               <div className="bg-white p-8 md:p-16 shadow-xl shadow-slate-300/60 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-600 mb-4">{t("hero.eyebrow")}</p>
                  <h1 className="font-hand text-5xl md:text-7xl font-bold text-slate-900 mb-6">{t("hero.title")}</h1>
                  <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">{t("hero.description")}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <a href="#essentials" className="inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-emerald-600 rounded-full shadow-md hover:bg-emerald-700 transition">
                        {t("hero.ctaPrimary")}
                     </a>
                     <Link href="/" locale={locale} className="inline-flex items-center justify-center px-8 py-3 font-bold text-slate-700 bg-emerald-50 border-2 border-emerald-100 rounded-full hover:bg-emerald-100 transition">
                        {t("hero.ctaSecondary")}
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-8">
        {sectionKeys.map((sectionKey) => (
          <section
            key={sectionKey}
            id={sectionKey === "essentials" ? "essentials" : undefined}
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
