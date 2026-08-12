import { useEffect, useState, type ReactNode } from 'react';
import type { Lang, SiteContent } from '../content/types';
import { homePath } from '../routes';
import { SoundToggle } from './motion';

/* ── Card ────────────────────────────────────────────────────────────────── */

export function Card({
  padding = 'md',
  tone = 'surface',
  children,
}: {
  padding?: 'md' | 'lg';
  tone?: 'surface' | 'sunken';
  children: ReactNode;
}) {
  return (
    <div className={`mc-card${padding === 'lg' ? ' mc-card--lg' : ''}${tone === 'sunken' ? ' mc-card--sunken' : ''}`}>
      {children}
    </div>
  );
}

/* ── Language switch ─────────────────────────────────────────────────────── */

export function LangSwitch({ lang, alternates }: { lang: Lang; alternates: Record<Lang, string> }) {
  return (
    <div className="mc-lang">
      <a href={alternates.en} hrefLang="en" aria-current={lang === 'en'} lang="en">
        en
      </a>
      <a href={alternates.pt} hrefLang="pt-BR" aria-current={lang === 'pt'} lang="pt-BR">
        pt
      </a>
    </div>
  );
}

/* ── NavBar ──────────────────────────────────────────────────────────────────
   Anchors, not buttons: navigation works before hydration and without JS. The
   only JS here is the 12px-scroll glass state and the active-section spy. */

export function NavBar({
  content,
  alternates,
  sectionLinks = true,
}: {
  content: SiteContent;
  alternates: Record<Lang, string>;
  sectionLinks?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const home = homePath(content.lang);

  useEffect(() => {
    const onScroll = () => setScrolled((document.scrollingElement ?? document.documentElement).scrollTop > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!sectionLinks) return;
    const sections = content.nav.items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [sectionLinks, content.nav.items]);

  const nav = (
    <nav className="mc-navbar__nav" aria-label={content.nav.items.map((i) => i.label).join(', ')}>
      {content.nav.items.map((it) => (
        <a
          key={it.id}
          className="mc-navbar__link"
          href={`${home}#${it.id}`}
          aria-current={active === it.id ? 'true' : undefined}
        >
          {it.label}
        </a>
      ))}
    </nav>
  );

  return (
    <header className={`mc-navbar${scrolled ? ' mc-navbar--scrolled' : ''}`}>
      <div className="mc-navbar__row">
        <a className="mc-navbar__brand" href={home}>
          Mateus Cardoso
        </a>
        <div className="mc-navbar__aside">
          {sectionLinks && nav}
          <LangSwitch lang={content.lang} alternates={alternates} />
          <SoundToggle label={content.nav.soundLabel} onText={content.nav.soundOn} offText={content.nav.soundOff} />
        </div>
      </div>
      {sectionLinks && <div className="mc-navbar__scroller">{nav}</div>}
    </header>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */

export function Footer({ links }: { links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <footer className="mc-footer">
      <div className="mc-footer__row">
        <span className="mc-footer__name">Mateus Cardoso</span>
        <div className="mc-footer__links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
