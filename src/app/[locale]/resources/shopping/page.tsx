import {ResourcePageTemplate, type CategoryConfig} from "@/components/ResourcePageTemplate";
import {getTranslations} from "next-intl/server";

// ISR revalidation time (10 mins)
export const revalidate = 600;

const SHEET_ID = process.env.GOOGLE_SHEET_ID_SHOPPING || "YOUR_SHEET_ID_HERE";

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "ResourcesPage.sections.essentials.items.shopping",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

// Category-specific icons and colors
const categoryConfig: Record<string, CategoryConfig> = {
  "Online Shop": {icon: "🛒", accentColor: "emerald"},
  "Supermarket": {icon: "🏪", accentColor: "amber"},
  "Convenience Store": {icon: "🏬", accentColor: "blue"},
  "Health Food Store": {icon: "🌿", accentColor: "rose"},
};

export default async function ShoppingPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations({locale: params.locale, namespace: "ResourcesPage"});
  const locale = params.locale as "en" | "ja";

  // Category labels for Japanese
  const categoryLabels: Record<string, string> =
    locale === "ja"
      ? {
          "Online Shop": "オンラインショップ",
          "Supermarket": "スーパーマーケット",
          "Convenience Store": "コンビニエンスストア",
          "Health Food Store": "自然食品店",
        }
      : {}; // English uses the type as-is

  return (
    <ResourcePageTemplate
      config={{
        sheetId: SHEET_ID,
        translationNamespace: "shopping",
        icon: "🧺",
        accentColor: "rose",
        groupByType: true,
      }}
      locale={locale}
      translations={{
        eyebrow: t("hero.eyebrow"),
        title: t("sections.essentials.items.shopping.title"),
        description: t("sections.essentials.items.shopping.description"),
        backLabel: t("hero.ctaSecondary"),
        emptyMessage:
          locale === "ja"
            ? "現在ショッピング情報はありません。"
            : "No shopping resources found at the moment.",
        categoryLabels,
      }}
      categoryConfig={categoryConfig}
    />
  );
}
