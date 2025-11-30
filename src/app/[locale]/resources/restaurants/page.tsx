import {ResourcePageTemplate} from "@/components/ResourcePageTemplate";
import {getTranslations} from "next-intl/server";

// ISR revalidation time (10 mins)
export const revalidate = 600;

const SHEET_ID = process.env.GOOGLE_SHEET_ID_RESTAURANTS || "YOUR_SHEET_ID_HERE";

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "ResourcesPage.sections.essentials.items.restaurants",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RestaurantsPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations({locale: params.locale, namespace: "ResourcesPage"});
  const locale = params.locale as "en" | "ja";

  return (
    <ResourcePageTemplate
      config={{
        sheetId: SHEET_ID,
        translationNamespace: "restaurants",
        icon: "🍽️",
        accentColor: "amber",
      }}
      locale={locale}
      translations={{
        eyebrow: t("hero.eyebrow"),
        title: t("sections.essentials.items.restaurants.title"),
        description: t("sections.essentials.items.restaurants.description"),
        backLabel: t("hero.ctaSecondary"),
        emptyMessage: locale === "ja" 
          ? "現在レストラン情報はありません。" 
          : "No restaurant guides found at the moment.",
      }}
    />
  );
}
