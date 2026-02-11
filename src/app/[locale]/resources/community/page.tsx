import {ResourcePageTemplate, type CategoryConfig} from "@/components/ResourcePageTemplate";
import {getTranslations} from "next-intl/server";

// ISR revalidation time (10 mins)
export const revalidate = 600;

const SHEET_ID = process.env.GOOGLE_SHEET_ID_COMMUNITY || "YOUR_SHEET_ID_HERE";

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "ResourcesPage.sections.essentials.items.community",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

// Category-specific icons and colors
const categoryConfig: Record<string, CategoryConfig> = {
  "Organization": {icon: "🏛️", accentColor: "emerald"},
  "Info Site": {icon: "📚", accentColor: "blue"},
  "Social Group": {icon: "👥", accentColor: "amber"},
  "Media": {icon: "🎬", accentColor: "rose"},
};

// Define the order of categories
const categoryOrder = ["Organization", "Info Site", "Social Group", "Media"];

export default async function CommunityPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations({locale: params.locale, namespace: "ResourcesPage"});
  const locale = params.locale as "en" | "ja";

  // Category labels for Japanese
  const categoryLabels: Record<string, string> =
    locale === "ja"
      ? {
          "Organization": "団体・NPO",
          "Info Site": "情報サイト",
          "Social Group": "SNSグループ",
          "Media": "メディア・インフルエンサー",
        }
      : {
          "Organization": "Organizations & NPOs",
          "Info Site": "Information Sites",
          "Social Group": "Social Groups",
          "Media": "Media & Influencers",
        };

  return (
    <ResourcePageTemplate
      config={{
        sheetId: SHEET_ID,
        translationNamespace: "community",
        icon: "🤝",
        accentColor: "indigo",
        groupByType: true,
        categoryOrder,
      }}
      locale={locale}
      translations={{
        eyebrow: t("hero.eyebrow"),
        title: t("sections.essentials.items.community.title"),
        description: t("sections.essentials.items.community.description"),
        backLabel: t("hero.ctaSecondary"),
        emptyMessage:
          locale === "ja"
            ? "現在コミュニティ情報はありません。"
            : "No community resources found at the moment.",
        categoryLabels,
      }}
      categoryConfig={categoryConfig}
    />
  );
}
