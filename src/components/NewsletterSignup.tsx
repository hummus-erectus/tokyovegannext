'use client';

import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";

export function NewsletterSignup() {
  const t = useTranslations("HomePage.newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("a_password", ""); // honeypot

      await fetch("https://sendfox.com/form/1d8w65/1goor6", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      // mode: no-cors means we can't read the response, but the request goes through
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-sm rotate-1">
      {/* Tape Element */}
      <div className="tape-section">
        <div className="tape-top-center" />
      </div>

      <div className="relative bg-emerald-50 p-6 pt-8 pb-7 shadow-xl shadow-slate-400/40 border border-emerald-100/60">
        {/* Decorative corner fold */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-28 border-t-white border-l-28 border-l-transparent z-10" />

        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-block mb-2">
            <svg className="w-8 h-8 text-emerald-500 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h3 className="font-hand text-5xl font-bold text-emerald-800 leading-none">
            {t("title")}
          </h3>
        </div>

        {/* Description */}
        <p className="text-center text-slate-600 text-sm leading-relaxed mb-5">
          {t("description")}
        </p>

        {status === "success" ? (
          <div className="text-center py-6">
            <p className="font-hand text-3xl font-bold text-emerald-700 mb-2">
              {t("successTitle")}
            </p>
            <p className="text-sm text-slate-600">
              {t("successMessage")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <label htmlFor="sendfox_form_email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="sendfox_form_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  className="w-full rounded-sm border border-emerald-200 bg-white px-4 py-3 text-lg text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-colors shadow-inner font-normal"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-hand text-2xl font-bold py-3.5 px-6 shadow-md hover:shadow-lg transition-all duration-200 active:translate-y-px rounded-sm"
              >
                {status === "submitting" ? "..." : t("submit")}
              </button>
            </div>

            {status === "error" && (
              <p className="mt-2 text-center text-sm text-red-500">
                {t("errorMessage")}
              </p>
            )}

            <p className="mt-3 text-center text-xs text-slate-400 leading-relaxed">
              {t("privacy")}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
