import type { ReactNode } from 'react';
import type { Lang, SiteContent } from './content/types';
import { Footer, NavBar } from './ds/layout';
import { cvPath } from './routes';
import { SITE } from './site';

export interface Alternates {
  en: string;
  pt: string;
}

export function Shell({
  content,
  alternates,
  sectionLinks = true,
  children,
}: {
  content: SiteContent;
  alternates: Record<Lang, string>;
  sectionLinks?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <a className="mc-skip" href="#main">
        {content.nav.skip}
      </a>
      <NavBar content={content} alternates={alternates} sectionLinks={sectionLinks} />
      <main id="main">{children}</main>
      <Footer
        tagline={content.footer.tagline}
        note={content.footer.note}
        links={[
          { label: 'github', href: SITE.github, external: true },
          { label: 'linkedin', href: SITE.linkedin, external: true },
          { label: 'email', href: `mailto:${SITE.email}` },
          { label: content.footer.cvLink, href: cvPath(content.lang) },
        ]}
      />
    </>
  );
}
