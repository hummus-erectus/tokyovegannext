import {Link} from "@/i18n/routing";
import {useLocale, useTranslations} from "next-intl";

const activityCardKeys = ["outreach", "support", "community"] as const;
const resourceItemKeys = ["starterKits", "restaurants", "shopping", "community"] as const;
const blogPostKeys = ["maff", "chicken", "council"] as const;

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const stats = t.raw("stats") as Record<string, {value: string; label: string}>;
  const entries = Object.entries(stats) as [string, {value: string; label: string}][ ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 text-slate-900">
      <section
        id="top"
        className="grid gap-10 rounded-3xl bg-white p-8 shadow-xl shadow-emerald-100 lg:grid-cols-[3fr_2fr]"
      >
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              {t("hero.eyebrow")}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-slate-600 md:text-xl">{t("hero.description")}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.meetup.com/tokyovegan/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
              >
                {t("hero.primaryCta")}
              </a>
              <Link
                href="/resources"
                locale={locale}
                className="inline-flex items-center rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400"
              >
                {t("hero.secondaryCta")}
              </Link>
            </div>
          </div>
          <div className="grid gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6">
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
              {t("brand")}
            </p>
            <p className="text-base text-emerald-900">{t("hero.communityBlurb")}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {entries.map(([key, value]) => (
                <div key={key} className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-emerald-700">{value.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                    {value.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
      </section>

      <section id="activities" className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-emerald-600">
                {t("sections.activities.title")}
              </p>
              <p className="text-xl text-slate-700">{t("sections.activities.description")}</p>
            </div>
            <Link href="/events" locale={locale} className="text-sm font-semibold text-emerald-700">
              {t("nav.events")} →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {activityCardKeys.map((key) => (
              <div key={key} className="flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold text-slate-900">
                  {t(`sections.activities.cards.${key}.title`)}
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  {t(`sections.activities.cards.${key}.description`)}
                </p>
                <Link
                  href={key === "outreach" ? "/about-vegan" : `/${key}`}
                  locale={locale}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-600"
                >
                  {t(`sections.activities.cards.${key}.linkLabel`)} →
                </Link>
              </div>
            ))}
          </div>
      </section>

      <section className="space-y-8 rounded-3xl bg-slate-900 p-8 text-slate-100" id="resources-preview">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wide text-emerald-200">
              {t("sections.resources.title")}
            </p>
            <p className="text-lg text-slate-300">
              {t("sections.resources.description")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {resourceItemKeys.map((key) => (
              <div key={key} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-lg font-semibold text-white">
                  {t(`sections.resources.items.${key}.title`)}
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  {t(`sections.resources.items.${key}.description`)}
                </p>
                <Link
                  href={`/resources#${key}`}
                  locale={locale}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-200"
                >
                  {t(`sections.resources.items.${key}.linkLabel`)} →
                </Link>
              </div>
            ))}
          </div>
      </section>

      <section className="space-y-8" id="blog">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-emerald-600">
                {t("sections.blog.title")}
              </p>
              <p className="text-xl text-slate-700">{t("sections.blog.description")}</p>
            </div>
            <a
              className="text-sm font-semibold text-emerald-700"
              href="https://www.tokyovegan.org/jp/blog"
              target="_blank"
              rel="noreferrer"
            >
              {t("sections.blog.cta")} →
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {blogPostKeys.map((key) => {
              const post = t.raw(`sections.blog.posts.${key}`) as {title: string; excerpt: string; href: string};
              return (
                <a
                  key={key}
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col justify-between rounded-2xl border border-emerald-100 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-300"
                >
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                      {t("nav.blog")}
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                    <p className="text-sm text-slate-600">{post.excerpt}</p>
                  </div>
                  <span className="mt-6 text-sm font-semibold text-emerald-700">Read more →</span>
                </a>
              );
            })}
          </div>
      </section>
    </div>
  );
}
