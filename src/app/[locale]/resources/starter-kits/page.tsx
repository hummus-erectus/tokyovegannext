import { PageHero } from "@/components/PageHero";
import { ResourceCard } from "@/components/ResourceCard";
import { getResources } from "@/lib/google-sheets";
import { getTranslations } from "next-intl/server";

// ISR revalidation time (1 hour)
export const revalidate = 3600;

// You can move this to an environment variable if you have multiple sheets
const SHEET_ID = process.env.GOOGLE_SHEET_ID_STARTER_KITS || "YOUR_SHEET_ID_HERE";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: "ResourcesPage.sections.essentials.items.starterKits" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function StarterKitsPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: "ResourcesPage" });
  const locale = params.locale as "en" | "ja"; // Simple narrowing for our usage

  const resources = await getResources(SHEET_ID);

  const heroBackground =
    "linear-gradient(120deg, rgba(6,95,70,0.65), rgba(16,185,129,0.6)), url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80')";

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-white text-slate-900">
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("sections.essentials.items.starterKits.title")}
        description={t("sections.essentials.items.starterKits.description")}
        locale={locale}
        backgroundImage={heroBackground}
        actions={[
          { label: t("hero.ctaSecondary"), href: "/resources", variant: "outline", type: "link" }
        ]}
      />

      <main className="mx-auto max-w-5xl px-4 py-12">
        {resources.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
            <p>{locale === "ja" ? "現在リソースはありません。" : "No resources found at the moment."}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title[locale] || resource.title["en"]} // Fallback to EN
                description={resource.description[locale] || resource.description["en"]}
                href={resource.url}
                imageUrl={resource.imageUrl}
                accentColor="emerald"
                icon="🎒"
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
