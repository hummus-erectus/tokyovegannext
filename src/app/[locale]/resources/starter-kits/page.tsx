import {ResourceDetailLayout} from "@/components/ResourceDetailLayout";
import {ResourceCard} from "@/components/ResourceCard";
import { getResources } from "@/lib/google-sheets";
import { getTranslations } from "next-intl/server";

// ISR revalidation time (10 mins)
export const revalidate = 600;

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
  return (
    <ResourceDetailLayout
      eyebrow={t("hero.eyebrow")}
      title={t("sections.essentials.items.starterKits.title")}
      description={t("sections.essentials.items.starterKits.description")}
      locale={locale}
      backHref="/resources"
      backLabel={t("hero.ctaSecondary")}
    >
      {resources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          <p>{locale === "ja" ? "現在リソースはありません。" : "No resources found at the moment."}</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pt-4">
          {resources.map((resource, idx) => {
            const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2"];
            const rotation = rotations[idx % rotations.length];

            return (
              <div key={resource.id} className={`tape-section ${rotation}`}>
                <div className="tape-top-center" />
                <ResourceCard
                  title={resource.title[locale] || resource.title["en"]} // Fallback to EN
                  description={resource.description[locale] || resource.description["en"]}
                  href={resource.url}
                  imageUrl={resource.imageUrl}
                  accentColor="emerald"
                  icon="🎒"
                  languages={resource.languages}
                  locale={locale}
                />
              </div>
            );
          })}
        </div>
      )}
    </ResourceDetailLayout>
  );
}
