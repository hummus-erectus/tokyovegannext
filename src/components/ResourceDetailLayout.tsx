import {ReactNode} from "react";
import {PageHero} from "@/components/PageHero";

interface ResourceDetailLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  locale: "en" | "ja";
  backHref?: string;
  backLabel: string;
  children: ReactNode;
}

export function ResourceDetailLayout({
  eyebrow,
  title,
  description,
  locale,
  backHref = "/resources",
  backLabel,
  children
}: ResourceDetailLayoutProps) {
  return (
    <div className="min-h-screen text-slate-900 pb-24">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        locale={locale}
        actions={[{label: backLabel, href: backHref, type: "link", variant: "outline"}]}
      />

      <main className="mx-auto max-w-5xl px-4 py-12">
        {children}
      </main>
    </div>
  );
}
