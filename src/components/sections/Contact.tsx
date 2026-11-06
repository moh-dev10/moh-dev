"use client";

import MotionLink from "../ui/MotionLink";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-padding">
      <div className="container-main">
        <div className="max-w-3xl">
          <p className="font-mono text-accent uppercase text-xs tracking-wider">
            {t.contact.eyebrow}
          </p>

          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-6xl">
            {t.contact.titleLine1}
            <br />
            <span className="font-serif font-normal italic text-accent">
              {t.contact.titleHighlight}
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            {t.contact.leadText}
          </p>

          <MotionLink href={t.contact.whatsappUrl}>
            {t.contact.whatsappCta}
          </MotionLink>
        </div>

        <div className="mt-20 grid gap-10 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              {t.contact.emailLabel}
            </p>
            <a
              href="mailto:mohamedhadou820@email.com"
              className="mt-2 inline-block hover:text-accent font-mono text-sm"
              dir="ltr"
            >
              mohamedhadou820@email.com
            </a>
          </div>

          <div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              {t.contact.locationLabel}
            </p>
            <p className="mt-2 text-sm">{t.contact.locationValue}</p>
          </div>

          <div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              {t.contact.socialLabel}
            </p>

            <div className="mt-2 flex gap-4 text-sm">
              <a
                href="https://github.com/moh-dev10"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/moh-dev10"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/mohdev10"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}