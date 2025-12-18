import {ResourceDetailLayout} from "@/components/ResourceDetailLayout";
import {BookListItem} from "@/components/books/BookListItem";
import {getResources} from "@/lib/google-sheets";
import {getTranslations} from "next-intl/server";

// ISR revalidation time (10 mins)
export const revalidate = 600;

const SHEET_ID = process.env.GOOGLE_SHEET_ID_BOOKS || "YOUR_SHEET_ID_HERE";

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "ResourcesPage.sections.knowledge.items.books",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BooksPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations({locale: params.locale, namespace: "ResourcesPage"});
  const locale = params.locale as "en" | "ja";

  const resources = await getResources(SHEET_ID);
  const visibleResources = resources.filter((book) => {
    if (!book.displayOn) return true;
    if (book.displayOn === "both") return true;
    return book.displayOn === locale;
  });

  return (
    <ResourceDetailLayout
      eyebrow={t("hero.eyebrow")}
      title={t("sections.knowledge.items.books.title")}
      description={t("sections.knowledge.items.books.description")}
      locale={locale}
      backHref="/resources"
      backLabel={t("hero.ctaSecondary")}
    >
      {visibleResources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          <p>
            {locale === "ja"
              ? "現在おすすめの本はありません。"
              : "No book recommendations found at the moment."}
          </p>
        </div>
      ) : (
        <div className="space-y-16 md:space-y-20">
          {visibleResources.map((book, idx) => {
            // Get locale-specific image, fallback to generic imageUrl
            const imageUrl =
              locale === "ja"
                ? book.imageUrlJa || book.imageUrl
                : book.imageUrlEn || book.imageUrl;

            return (
              <BookListItem
                key={book.id}
                title={book.title[locale] || book.title["en"]}
                author={book.author?.[locale] || book.author?.["en"]}
                description={book.description[locale] || book.description["en"]}
                href={book.url}
                imageUrl={imageUrl}
                locale={locale}
                reverse={idx % 2 === 1} // Alternate layout
              />
            );
          })}
        </div>
      )}
    </ResourceDetailLayout>
  );
}
