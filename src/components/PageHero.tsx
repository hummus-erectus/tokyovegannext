import {PaperButton} from "@/components/PaperButton";
import {RoughHighlight} from "@/components/RoughHighlight";

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
        variant={variant === "solid" ? "solid" : "outline"}
        color="emerald"
        size="md"
        className="font-bold shadow-sm"
      >
        {action.label}
      </PaperButton>
    );
  };

  return (
    <section className="relative pt-12 pb-8 px-4" style={style}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-block mb-4">
          <RoughHighlight type="box" color="#10b981" strokeWidth={2} show={true}>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-700 px-3 py-1">{eyebrow}</p>
          </RoughHighlight>
        </div>
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-slate-900 mb-4 -rotate-1">{title}</h1>
        <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8 font-medium">{description}</p>
        
        {actions.length > 0 && <div className="flex flex-col sm:flex-row gap-4 justify-center">{actions.map(renderAction)}</div>}
      </div>
    </section>
  );
}
