import {ResourceDetailLayout} from "@/components/ResourceDetailLayout";
import {ResourceCard} from "@/components/ResourceCard";
import {getResources, type ResourceItem} from "@/lib/google-sheets";

export interface ResourcePageConfig {
  sheetId: string;
  translationNamespace: string; // e.g. "starterKits", "restaurants"
  icon: string;
  accentColor: string;
  groupByType?: boolean; // If true, groups resources by their "type" field
  categoryOrder?: string[]; // Optional order for categories when groupByType is true
}

// Category configuration for icons and accent colors per type
export interface CategoryConfig {
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
    // Category labels keyed by type (e.g., "Online Shop" -> "オンラインショップ")
    categoryLabels?: Record<string, string>;
  };
  // Optional per-category config (icons/colors by type key)
  categoryConfig?: Record<string, CategoryConfig>;
}

// Helper to render a grid of resource cards
function ResourceGrid({
  resources,
  locale,
  icon,
  accentColor,
}: {
  resources: ResourceItem[];
  locale: "en" | "ja";
  icon: string;
  accentColor: string;
}) {
  const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2"];

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pt-4">
      {resources.map((resource, idx) => {
        const rotation = rotations[idx % rotations.length];
        return (
          <div key={resource.id} className={`relative ${rotation} washi-tape-top`}>
            <ResourceCard
              title={resource.title[locale] || resource.title["en"]}
              description={resource.description[locale] || resource.description["en"]}
              href={resource.url}
              imageUrl={resource.imageUrl}
              accentColor={accentColor}
              icon={icon}
              languages={resource.languages}
              locale={locale}
            />
          </div>
        );
      })}
    </div>
  );
}

export async function ResourcePageTemplate({
  config,
  locale,
  translations,
  categoryConfig,
}: ResourcePageTemplateProps) {
  const resources = await getResources(config.sheetId);

  // Group resources by type if configured
  const groupedResources = config.groupByType
    ? resources.reduce((acc, resource) => {
        const type = resource.type || "Other";
        if (!acc[type]) acc[type] = [];
        acc[type].push(resource);
        return acc;
      }, {} as Record<string, ResourceItem[]>)
    : null;

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
      ) : groupedResources ? (
        // Grouped display by type
        <div className="space-y-16">
          {(config.categoryOrder
            ? config.categoryOrder
                .filter((type) => groupedResources[type])
                .concat(Object.keys(groupedResources).filter((t) => !config.categoryOrder!.includes(t)))
            : Object.keys(groupedResources)
          ).map((type) => {
            const items = groupedResources[type];
            const catConfig = categoryConfig?.[type];
            const icon = catConfig?.icon || config.icon;
            const accentColor = catConfig?.accentColor || config.accentColor;
            const label = translations.categoryLabels?.[type] || type;

            return (
              <section key={type} className="space-y-6">
                <h2 className="font-hand text-4xl font-bold text-slate-800 -rotate-1">
                  {label}
                </h2>
                <ResourceGrid
                  resources={items}
                  locale={locale}
                  icon={icon}
                  accentColor={accentColor}
                />
              </section>
            );
          })}
        </div>
      ) : (
        // Flat display (no grouping)
        <ResourceGrid
          resources={resources}
          locale={locale}
          icon={config.icon}
          accentColor={config.accentColor}
        />
      )}
    </ResourceDetailLayout>
  );
}
