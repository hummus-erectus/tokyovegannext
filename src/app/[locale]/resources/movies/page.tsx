import {ResourceDetailLayout} from "@/components/ResourceDetailLayout";
import {MovieListItem} from "@/components/movies/MovieListItem";
import {getResources} from "@/lib/google-sheets";
import {getTranslations} from "next-intl/server";

export const revalidate = 600;

const SHEET_ID = process.env.GOOGLE_SHEET_ID_MOVIES || "YOUR_SHEET_ID_HERE";

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "ResourcesPage.sections.knowledge.items.movies",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MoviesPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations({locale: params.locale, namespace: "ResourcesPage"});
  const locale = params.locale as "en" | "ja";

  const resources = await getResources(SHEET_ID);
  const visibleResources = resources.filter((movie) => {
    if (!movie.displayOn) return true;
    if (movie.displayOn === "both") return true;
    return movie.displayOn === locale;
  });

  return (
    <ResourceDetailLayout
      eyebrow={t("hero.eyebrow")}
      title={t("sections.knowledge.items.movies.title")}
      description={t("sections.knowledge.items.movies.description")}
      locale={locale}
      backHref="/resources"
      backLabel={t("hero.ctaSecondary")}
    >
      {visibleResources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          <p>
            {locale === "ja"
              ? "現在おすすめの映画はありません。"
              : "No movie recommendations found at the moment."}
          </p>
        </div>
      ) : (
        <div className="space-y-16 md:space-y-20">
          {visibleResources.map((movie, idx) => {
            const imageUrl =
              locale === "ja" ? movie.imageUrlJa || movie.imageUrl : movie.imageUrlEn || movie.imageUrl;

            return (
              <MovieListItem
                key={movie.id}
                title={movie.title[locale] || movie.title["en"]}
                description={movie.description[locale] || movie.description["en"]}
                href={movie.url}
                imageUrl={imageUrl}
                locale={locale}
                reverse={idx % 2 === 1}
              />
            );
          })}
        </div>
      )}
    </ResourceDetailLayout>
  );
}
