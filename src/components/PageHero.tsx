import {Link} from "@/i18n/routing";

const actionVariantMap: Record<"solid" | "outline", string> = {
  solid: "bg-white/90 text-slate-900 shadow-lg shadow-black/20 hover:bg-white",
  outline: "border border-white/70 text-white hover:bg-white/10"
};

export type HeroAction = {
  label: string;
  href: string;
  variant?: "solid" | "outline";
  type?: "link" | "anchor" | "external";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  locale: string;
  backgroundImage?: string;
  actions?: HeroAction[];
};

export function PageHero({eyebrow, title, description, locale, backgroundImage, actions = []}: PageHeroProps) {
  const style = backgroundImage
    ? {
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }
    : undefined;

  const renderAction = (action: HeroAction, idx: number) => {
    const variantClass = actionVariantMap[action.variant ?? "solid"];
    const baseClass = `rounded-full px-6 py-3 text-center text-sm font-semibold transition ${variantClass}`;

    if (action.type === "link") {
      return (
        <Link key={idx} href={action.href} locale={locale} className={baseClass}>
          {action.label}
        </Link>
      );
    }

    const isExternal = action.type === "external";
    return (
      <a
        key={idx}
        href={action.href}
        className={baseClass}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        {action.label}
      </a>
    );
  };

  return (
    <section className="header-ripped relative isolate overflow-visible" style={style}>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 text-white md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-100">{eyebrow}</p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
          <p className="text-base text-emerald-50 md:text-lg">{description}</p>
        </div>
        {actions.length > 0 && <div className="flex flex-col gap-3 text-sm font-semibold md:flex-row">{actions.map(renderAction)}</div>}
      </div>
    </section>
  );
}
