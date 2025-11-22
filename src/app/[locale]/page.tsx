import {Link} from "@/i18n/routing";
import {getLocale, getTranslations} from "next-intl/server";
import {MeetupEventCard} from "@/components/MeetupEventCard";
import {InstagramFeed} from "@/components/InstagramFeed";
import {getNextMeetupEvent} from "@/lib/meetup";

const activityCardKeys = ["outreach", "support", "community"] as const;
const resourceItemKeys = ["starterKits", "restaurants", "shopping", "community"] as const;
const blogPostKeys = ["maff", "chicken", "council"] as const;

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const stats = t.raw("stats") as Record<string, {value: string; label: string}>;
  const entries = Object.entries(stats) as [string, {value: string; label: string}][ ];

  const nextEvent = await getNextMeetupEvent();

  return (
    <div className="flex flex-col gap-24 pb-24 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-900 text-white">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full bg-emerald-400 blur-3xl" />
           <div className="absolute -bottom-20 -left-20 h-[600px] w-[600px] rounded-full bg-emerald-600 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col justify-center space-y-8 lg:min-h-[500px]">
              <div className="space-y-6">
                <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
                  {t("hero.eyebrow")}
                </p>
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {t("hero.title")}
                </h1>
                <p className="max-w-lg text-lg text-emerald-100 sm:text-xl">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.meetup.com/tokyovegan/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-emerald-900 transition hover:bg-emerald-50"
                >
                  {t("hero.primaryCta")}
                </a>
                <Link
                  href="/resources"
                  locale={locale}
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400 bg-transparent px-8 py-4 text-base font-bold text-white transition hover:bg-emerald-800/50"
                >
                  {t("hero.secondaryCta")}
                </Link>
              </div>

              <div className="flex flex-wrap gap-12 border-t border-emerald-800 pt-8">
                {entries.map(([key, value]) => (
                  <div key={key}>
                    <p className="text-3xl font-bold text-white">{value.value}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                      {value.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
               <div className="relative overflow-hidden rounded-3xl bg-emerald-800/50 ring-1 ring-white/10">
                  <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-emerald-500/20 blur-2xl" />
                  <div className="relative h-[600px] w-full overflow-hidden rounded-3xl">
                    <img 
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" 
                      alt="Delicious vegan food"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-8 pt-24 text-center">
                      <p className="text-lg font-medium leading-relaxed text-white">
                        &ldquo;{t("hero.communityBlurb")}&rdquo;
                      </p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meetup Section */}
      {nextEvent && (
        <section className="mx-auto w-full max-w-6xl px-4">
          <MeetupEventCard
            title={nextEvent.title}
            startDate={nextEvent.startDate}
            endDate={nextEvent.endDate}
            imageUrl="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000"
            eventUrl={nextEvent.url}
          />
        </section>
      )}

      {/* Activities Section */}
      <section id="activities" className="mx-auto w-full max-w-6xl space-y-12 px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-600">
                {t("sections.activities.title")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {t("sections.activities.description")}
              </h2>
            </div>
            <a 
              href="https://www.meetup.com/tokyovegan/" 
              target="_blank" 
              rel="noreferrer"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              {t("nav.events")} →
            </a>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {activityCardKeys.map((key) => {
              const getCardHref = (k: typeof activityCardKeys[number]) => {
                 if (k === "outreach") return "/about-vegan";
                 if (k === "support") return "/resources";
                 return "https://www.meetup.com/tokyovegan/";
              };
              const href = getCardHref(key);
              const isExternal = href.startsWith("http");
              
              return (
              <div key={key} className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600">
                   {key === 'outreach' && '📣'}
                   {key === 'support' && '🤝'}
                   {key === 'community' && '🌱'}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {t(`sections.activities.cards.${key}.title`)}
                </h3>
                <p className="mt-3 flex-1 text-slate-600">
                  {t(`sections.activities.cards.${key}.description`)}
                </p>
                {isExternal ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center font-semibold text-emerald-600 group-hover:text-emerald-700"
                  >
                    {t(`sections.activities.cards.${key}.linkLabel`)} →
                  </a>
                ) : (
                  <Link
                    href={href}
                    locale={locale}
                    className="mt-6 inline-flex items-center font-semibold text-emerald-600 group-hover:text-emerald-700"
                  >
                    {t(`sections.activities.cards.${key}.linkLabel`)} →
                  </Link>
                )}
              </div>
              );
            })}
          </div>
      </section>

      {/* Resources Preview Section */}
      <section className="bg-slate-50 py-24" id="resources-preview">
         <div className="mx-auto max-w-6xl space-y-12 px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-600">
                {t("sections.resources.title")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {t("sections.resources.description")}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {resourceItemKeys.map((key) => (
                <div key={key} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md">
                  <h3 className="text-lg font-bold text-slate-900">
                    {t(`sections.resources.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">
                    {t(`sections.resources.items.${key}.description`)}
                  </p>
                  <Link
                    href={`/resources#${key}`}
                    locale={locale}
                    className="mt-4 inline-flex items-center text-sm font-bold text-emerald-600"
                  >
                    {t(`sections.resources.items.${key}.linkLabel`)} →
                  </Link>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Blog Section */}
      <section className="mx-auto w-full max-w-6xl space-y-12 px-4" id="blog">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-600">
                {t("sections.blog.title")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">{t("sections.blog.description")}</h2>
            </div>
            <a
              className="font-semibold text-emerald-700 hover:text-emerald-800"
              href="https://www.tokyovegan.org/jp/blog"
              target="_blank"
              rel="noreferrer"
            >
              {t("sections.blog.cta")} →
            </a>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {blogPostKeys.map((key) => {
              const post = t.raw(`sections.blog.posts.${key}`) as {title: string; excerpt: string; href: string};
              return (
                <a
                  key={key}
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
                      {t("nav.blog")}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700">{post.title}</h3>
                    <p className="text-slate-600">{post.excerpt}</p>
                  </div>
                  <span className="mt-6 text-sm font-bold text-emerald-700 group-hover:underline">Read more →</span>
                </a>
              );
            })}
          </div>
      </section>

      {/* Instagram Section */}
      <section className="mx-auto w-full max-w-6xl px-4">
        <InstagramFeed />
      </section>
    </div>
  );
}
