import {ResourceCard} from "@/components/ResourceCard";
import {PageHero} from "@/components/PageHero";
import {FeaturedResourceCard} from "@/components/FeaturedResourceCard";
import {WashiTape} from "@/components/WashiTape";
import {PaperSurface} from "@/components/PaperSurface";
import {washiPick} from "@/lib/washiPick";
import {getLocale, getTranslations} from "next-intl/server";

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

export default async function ResourcesPage() {
  const t = await getTranslations("ResourcesPage");
  const rawLocale = await getLocale();
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
        const variants = ["emerald", "sakura", "indigo", "mustard", "mint"] as const;
        const rotation = rotations[idx % rotations.length];
        const variant = variants[washiPick(itemKey, 0, variants.length)];
        const variant2 = variants[washiPick(itemKey, 1, variants.length)];
        const useCenterTape = washiPick(itemKey, 7, 100) < 40;

        const isExternal = item.href.startsWith("http");
        const accentColor = accentColorMap[meta.accent] ?? "emerald";

        return (
          <div key={itemKey} className={`relative card-stack-z ${rotation}`}>
            {useCenterTape ? (
              <WashiTape variant={variant} placement="top-center" rotation={-2} size="md" widthPct={60} />
            ) : (
              <>
                <WashiTape variant={variant} placement="top-left" rotation={-36} size="md" />
                <WashiTape variant={variant2} placement="top-right" rotation={36} size="md" />
              </>
            )}
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
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        locale={locale}
        actions={[
          {label: t("hero.ctaPrimary"), href: "#featured", type: "anchor", variant: "solid"},
          {label: t("hero.ctaSecondary"), href: "/", type: "link", variant: "outline"}
        ]}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-8">
        {/* Featured: Vegan 101 */}
        <section id="featured" className="scroll-mt-32">
          <FeaturedResourceCard
            locale={locale}
            href="/about-vegan"
            badge={t("featured.badge")}
            eyebrow={t("featured.eyebrow")}
            title={t("featured.title")}
            description={t("featured.description")}
            cta={t("featured.cta")}
            imageSrc="/images/speaker.webp"
            imageAlt="Vegan 101 — introduction to veganism"
          />
        </section>

        {/* Resource sections */}
        {sectionKeys.map((sectionKey) => (
          <section
            key={sectionKey}
            id={sectionKey}
            className="grid gap-8 lg:grid-cols-[250px_1fr] scroll-mt-32"
          >
            <PaperSurface
              seed={`resources-${sectionKey}`}
              texture="washi"
              edge="torn"
              shadow="sm"
              rotation={-2}
              className="lg:max-w-[250px]"
              contentClassName="px-5 py-5 space-y-4"
              overlay={
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-7 bg-white/40 backdrop-blur-sm rotate-2 border border-white/20 shadow-sm pointer-events-none z-30" />
              }
            >
              <h2 className="font-heading text-5xl font-bold text-emerald-700">
                {t(`sections.${sectionKey}.title`)}
              </h2>
              <p className="text-xl text-slate-700 font-decorative">
                {t(`sections.${sectionKey}.description`)}
              </p>
            </PaperSurface>
            {renderCards(sectionKey)}
          </section>
        ))}
      </main>
    </div>
  );
}
