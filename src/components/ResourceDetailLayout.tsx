import {ReactNode} from "react";
import {PageHero} from "@/components/PageHero";
import {PaperSurface} from "@/components/PaperSurface";

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

      <main className="mx-auto max-w-5xl px-4 py-2">
        <PaperSurface
          seed="resource-detail-content"
          texture="washi"
          edge="torn"
          shadow="md"
          rotation={0}
          className="w-full"
          contentClassName="px-6 py-8"
        >
          <div className="paper-pin paper-pin-yellow" style={{ top: '8px', left: '16px' }} />
          <div className="paper-pin paper-pin-green" style={{ top: '8px', right: '16px' }} />
          {children}
        </PaperSurface>
      </main>
    </div>
  );
}
