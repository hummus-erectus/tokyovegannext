import {ResourceDetailLayout} from "@/components/ResourceDetailLayout";
import {ResourceCard} from "@/components/ResourceCard";
import {getResources} from "@/lib/google-sheets";

export interface ResourcePageConfig {
  sheetId: string;
  translationNamespace: string; // e.g. "starterKits", "restaurants"
  icon: string;
  accentColor: string;
}

interface ResourcePageTemplateProps {
  config: ResourcePageConfig;
  locale: "en" | "ja";
  translations: {
    eyebrow: string;
    title: string;
    description: string;
    backLabel: string;
    emptyMessage: string;
  };
}

export async function ResourcePageTemplate({
  config,
  locale,
  translations,
}: ResourcePageTemplateProps) {
  const resources = await getResources(config.sheetId);

  return (
    <ResourceDetailLayout
      eyebrow={translations.eyebrow}
      title={translations.title}
      description={translations.description}
      locale={locale}
      backHref="/resources"
      backLabel={translations.backLabel}
    >
      {resources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          <p>{translations.emptyMessage}</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pt-4">
          {resources.map((resource, idx) => {
            const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2"];
            const rotation = rotations[idx % rotations.length];

            return (
              <div key={resource.id} className={`relative ${rotation} washi-tape-top`}>
                <ResourceCard
                  title={resource.title[locale] || resource.title["en"]}
                  description={resource.description[locale] || resource.description["en"]}
                  href={resource.url}
                  imageUrl={resource.imageUrl}
                  accentColor={config.accentColor}
                  icon={config.icon}
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
