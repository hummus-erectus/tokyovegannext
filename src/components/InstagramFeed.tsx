"use client";

import {useEffect} from "react";
import {useTranslations} from "next-intl";

const SOCIABLEKIT_EMBED_ID = "25625520";

export function InstagramFeed() {
  const t = useTranslations("HomePage.instagram");

  useEffect(() => {
    const scriptId = "sociablekit-instagram-feed-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://widgets.sociablekit.com/instagram-feed/widget.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-slate-900 wrap-break-word sm:text-2xl">
          @tokyoveganofficial
        </h2>
        <a
          href="https://instagram.com/tokyoveganofficial"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 sm:text-base"
        >
          {t("followUs")}
        </a>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4">
        <div
          className="sk-instagram-feed"
          data-embed-id={SOCIABLEKIT_EMBED_ID}
        />
      </div>
    </div>
  );
}
