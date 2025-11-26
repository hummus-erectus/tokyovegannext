"use client";

import { Mail, Instagram, Facebook } from "lucide-react";
import { FaMeetup, FaLinkedin } from "react-icons/fa";

const contactItems = [
  {
    key: "email",
    icon: Mail,
    label: "tokyovegan.org@gmail.com",
    href: "mailto:tokyovegan.org@gmail.com",
  },
  {
    key: "meetup",
    icon: FaMeetup,
    label: "Tokyo Vegan Meetup",
    href: "https://www.meetup.com/tokyovegan/",
  },
  {
    key: "instagram",
    icon: Instagram,
    label: "@tokyoveganofficial",
    href: "https://www.instagram.com/tokyoveganofficial/",
  },
  {
    key: "facebook",
    icon: Facebook,
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
        <h2 className="font-hand text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
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
                className="flyer-link-wrapper"
                aria-label={item.label}
              >
                <Icon className="flyer-icon" aria-hidden="true" />
                <span className="flyer-link-text">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
