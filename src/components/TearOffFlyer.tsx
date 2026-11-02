"use client";

import { FaEnvelope, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { PeatixIcon } from "@/components/PeatixIcon";

const contactItems = [
  {
    key: "email",
    icon: FaEnvelope,
    label: "info@tokyovegan.org",
    href: "mailto:info@tokyovegan.org",
  },
  {
    key: "peatix",
    icon: PeatixIcon,
    label: "Tokyo Vegan",
    href: "https://peatix.com/group/16486093",
  },
  {
    key: "instagram",
    icon: FaInstagram,
    label: "@tokyoveganofficial",
    href: "https://www.instagram.com/tokyoveganofficial/",
  },
  {
    key: "facebook",
    icon: FaFacebook,
    label: "Tokyo Vegan",
    href: "https://www.facebook.com/tokyoveganmeetup",
  },
  {
    key: "linkedin",
    icon: FaLinkedin,
    label: "Tokyo Vegan",
    href: "https://www.linkedin.com/company/tokyo-vegan/",
  },
];

interface TearOffFlyerProps {
  title?: string;
  subtitle?: string;
}

export function TearOffFlyer({
  title = "Connect With Us",
  subtitle = "Tear off a tab and get in touch!",
}: TearOffFlyerProps) {
  return (
    <div className="flyer-container">
      {/* Main Paper */}
      <div className="flyer-paper">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
          {title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">{subtitle}</p>
      </div>

      {/* Tear-off Strips */}
      <ul className="flyer-strips" role="list">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li
              key={item.key}
              className={`flyer-strip flyer-strip-${index + 1}`}
              role="listitem"
            >
              <a
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto") ? undefined : "noreferrer"}
                className="absolute inset-0 z-10"
                aria-label={item.label}
              >
                <span className="sr-only">{item.label}</span>
              </a>
              <div className="flyer-link-wrapper">
                <Icon className="flyer-icon" aria-hidden="true" />
                <span className="flyer-link-text">{item.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
