import {ReactNode} from "react";
import {PaperButton} from "@/components/PaperButton";

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
      <section className="relative pt-12 pb-12 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="tape-section rotate-1">
            <div className="tape-top-center" />
            <div className="bg-white p-8 md:p-16 shadow-xl shadow-slate-300/60 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-600 mb-4">{eyebrow}</p>
              <h1 className="font-hand text-5xl md:text-7xl font-bold text-slate-900 mb-6">{title}</h1>
              <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8">{description}</p>

              <div className="flex justify-center">
                <PaperButton
                  href={backHref}
                  type="link"
                  locale={locale}
                  variant="outline"
                  color="emerald"
                  size="md"
                  className="font-bold"
                >
                  {backLabel}
                </PaperButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12">
        {children}
      </main>
    </div>
  );
}
