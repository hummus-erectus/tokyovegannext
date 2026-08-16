'use client';

import { useTranslations } from "next-intl";
import { useId, useState, FormEvent, ReactNode } from "react";

export interface NewsletterLabels {
  title: ReactNode;
  description: ReactNode;
  /** Accessible label for the email field — must be plain text. */
  emailLabel: string;
  /** Placeholder for the email field — must be plain text. */
  emailPlaceholder: string;
  submit: ReactNode;
  successTitle: ReactNode;
  successMessage: ReactNode;
  /** Fallback shown when the server gives no message — must be plain text. */
  errorMessage: string;
  privacy: ReactNode;
}

interface NewsletterSignupCardProps {
  labels: NewsletterLabels;
  /** Show the corkboard pushpins (off for pages that aren't a corkboard). */
  pinned?: boolean;
  /** Reduce internal padding/margins for tighter layouts. */
  compact?: boolean;
  /** Classes for the outer wrapper: width, alignment and rotation. */
  className?: string;
}

/**
 * Presentational signup card. Text comes in via `labels` so it can be driven by
 * next-intl (localised site) or hard-coded bilingual copy (coming-soon page).
 */
export function NewsletterSignupCard({
  labels,
  pinned = true,
  compact = false,
  className = "mx-auto max-w-sm rotate-1",
}: NewsletterSignupCardProps) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? labels.errorMessage);
        setStatus("error");
      }
    } catch {
      setErrorMsg(labels.errorMessage);
      setStatus("error");
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Pushpins — top corners, pinned to corkboard */}
      {pinned && (
        <>
          <div className="pushpin pushpin-red" style={{ top: "4px", left: "12px", transform: "none" }} />
          <div className="pushpin pushpin-blue" style={{ top: "4px", right: "12px", left: "auto", transform: "none" }} />
        </>
      )}

      <div className={`relative bg-emerald-50 paper-shadow-rest border border-emerald-100/60 ${compact ? "p-4 pt-5 pb-5" : "p-6 pt-8 pb-7"}`}>
        {/* Decorative corner fold */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-28 border-t-white border-l-28 border-l-transparent z-10" />

        {/* Both states rendered in the same grid cell so the card is always
            as tall as the taller of the two. The inactive state is invisible
            (visibility:hidden) so it occupies space but isn't seen or interacted with. */}
        <div className="grid">
          {/* ── Form state (icon + title + description + form) ── */}
          <div className={status === "success" ? "invisible" : ""} style={{ gridArea: "1 / 1" }}>
            <div className={`text-center ${compact ? "mb-2" : "mb-4"}`}>
              <div className={`inline-block ${compact ? "mb-1" : "mb-2"}`}>
                <svg className={`text-emerald-500 mx-auto ${compact ? "w-6 h-6" : "w-8 h-8"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="font-heading text-5xl font-bold text-emerald-800 leading-none">
                {labels.title}
              </h3>
            </div>

            <div className={`text-center text-slate-600 text-sm leading-relaxed ${compact ? "mb-3" : "mb-5"}`}>
              {labels.description}
            </div>

            <form onSubmit={handleSubmit} noValidate={false}>
              <div className={compact ? "space-y-2" : "space-y-3"}>
                <div>
                  <label htmlFor={emailId} className="sr-only">
                    {labels.emailLabel}
                  </label>
                  <input
                    type="email"
                    id={emailId}
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={labels.emailPlaceholder}
                    required
                    autoComplete="email"
                    inputMode="email"
                    aria-invalid={status === "error" || undefined}
                    className={`w-full rounded-sm border border-emerald-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-colors shadow-inner font-normal ${compact ? "px-4 py-2.5 text-base" : "px-4 py-3 text-lg"}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`btn-sticker btn-sticker--emerald w-full font-ui font-bold disabled:opacity-60 disabled:pointer-events-none ${compact ? "text-xl py-2.5 px-5" : "text-2xl py-3.5 px-6"}`}
                >
                  {status === "submitting" ? "..." : labels.submit}
                </button>
              </div>

              <div aria-live="polite">
                {status === "error" && (
                  <p className="mt-2 text-center text-sm text-red-500">{errorMsg}</p>
                )}
              </div>

              <div className="mt-3 text-center text-xs text-slate-400 leading-relaxed">
                {labels.privacy}
              </div>
            </form>
          </div>

          {/* ── Success state (success title + message, no icon, no form) ── */}
          <div
            className={status === "success" ? "" : "invisible"}
            style={{ gridArea: "1 / 1" }}
            role="status"
            aria-live="polite"
          >
            <div className={`text-center ${compact ? "mb-2" : "mb-4"}`}>
              <h3 className="font-heading text-5xl font-bold text-emerald-800 leading-none">
                {labels.successTitle}
              </h3>
            </div>

            <div className={`text-center text-slate-600 text-sm leading-relaxed ${compact ? "mb-3" : "mb-5"}`}>
              {labels.successMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewsletterSignup() {
  const t = useTranslations("HomePage.newsletter");

  return (
    <NewsletterSignupCard
      labels={{
        title: t("title"),
        description: t("description"),
        emailLabel: t("emailLabel"),
        emailPlaceholder: t("emailPlaceholder"),
        submit: t("submit"),
        successTitle: t("successTitle"),
        successMessage: t("successMessage"),
        errorMessage: t("errorMessage"),
        privacy: t("privacy"),
      }}
    />
  );
}
