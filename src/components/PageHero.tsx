import {PaperButton} from "@/components/PaperButton";

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
    const type = action.type === "link" ? "link" : action.type === "external" ? "external" : "anchor";
    const variant = action.variant ?? "solid";

    return (
      <PaperButton
        key={idx}
        href={action.href}
        type={type}
        locale={locale}
        variant={variant}
        color="white"
        size="md"
        className={variant === "solid" ? "shadow-lg shadow-black/20" : ""}
      >
        {action.label}
      </PaperButton>
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
