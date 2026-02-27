'use client';

import { useTranslations } from "next-intl";
import { RoughHighlight } from "./RoughHighlight";

export function NewsletterSignup() {
  const t = useTranslations("HomePage.newsletter");

  return (
    <div className="relative mx-auto w-full max-w-sm -rotate-1">
      {/* Push Pin */}
      <div className="absolute -top-3 left-1/2 z-20 h-6 w-6 -translate-x-1/2 rounded-full bg-emerald-500 shadow-md ring-2 ring-emerald-600/50" />

      <div className="overflow-hidden rounded-sm bg-white p-6 shadow-xl shadow-slate-400/50">
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="font-hand text-4xl font-bold text-emerald-800 leading-tight">
            {t("title")}
          </h3>
          <div className="mt-2 mx-auto w-16 border-t-2 border-dashed border-emerald-200" />
        </div>

        {/* Description */}
        <p className="text-center text-slate-600 leading-relaxed mb-6">
          {t("description")}
        </p>

        {/* Mail icon decoration */}
        <div className="flex justify-center mb-4">
          <svg className="w-10 h-10 text-emerald-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        {/* SendFox Form */}
        <form
          method="post"
          action="https://sendfox.com/form/1d8w65/1goor6"
          className="sendfox-form"
          id="1goor6"
          data-async="true"
          data-recaptcha="true"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="sendfox_form_email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="sendfox_form_email"
                name="email"
                placeholder={t("emailPlaceholder")}
                required
                className="w-full border-0 border-b-2 border-dashed border-slate-300 bg-transparent px-2 py-3 font-hand text-xl text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-0 transition-colors"
              />
            </div>

            {/* Honeypot */}
            <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
              <input type="text" name="a_password" tabIndex={-1} defaultValue="" autoComplete="off" />
            </div>

            <button
              type="submit"
              className="group w-full bg-emerald-600 hover:bg-emerald-700 text-white font-hand text-2xl font-bold py-3 px-6 shadow-md hover:shadow-lg transition-all duration-200 active:translate-y-px"
            >
              <RoughHighlight type="highlight" multiline={true} color="rgba(255, 255, 255, 0.15)" trigger="hover">
                <span>{t("submit")}</span>
              </RoughHighlight>
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400 leading-relaxed">
            {t("privacy")}
          </p>
        </form>
      </div>
    </div>
  );
}
