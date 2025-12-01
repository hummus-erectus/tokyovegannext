import {ResourcePageTemplate, type CategoryConfig} from "@/components/ResourcePageTemplate";
import {getTranslations} from "next-intl/server";

// ISR revalidation time (10 mins)
export const revalidate = 600;

const SHEET_ID = process.env.GOOGLE_SHEET_ID_COOKING || "YOUR_SHEET_ID_HERE";

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "ResourcesPage.sections.essentials.items.cooking",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

// Category-specific icons and colors
const categoryConfig: Record<string, CategoryConfig> = {
  "Recipes": {icon: "📖", accentColor: "amber"},
  "Cooking Class": {icon: "👨‍🍳", accentColor: "emerald"},
};

export default async function CookingPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations({locale: params.locale, namespace: "ResourcesPage"});
  const locale = params.locale as "en" | "ja";

  // Category labels for Japanese
  const categoryLabels: Record<string, string> =
    locale === "ja"
      ? {
          "Recipes": "レシピ",
          "Cooking Class": "料理教室",
        }
      : {}; // English uses the type as-is

  return (
    <ResourcePageTemplate
      config={{
        sheetId: SHEET_ID,
        translationNamespace: "cooking",
        icon: "🥢",
        accentColor: "amber",
        groupByType: true,
      }}
      locale={locale}
      translations={{
        eyebrow: t("hero.eyebrow"),
        title: t("sections.essentials.items.cooking.title"),
        description: t("sections.essentials.items.cooking.description"),
        backLabel: t("hero.ctaSecondary"),
        emptyMessage:
          locale === "ja"
            ? "現在料理情報はありません。"
            : "No cooking resources found at the moment.",
        categoryLabels,
      }}
      categoryConfig={categoryConfig}
    />
  );
}
