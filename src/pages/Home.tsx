import type { SiteContent } from '../content/types';
import { About, Experience } from '../sections/AboutExperience';
import { Cases } from '../sections/Cases';
import { Contact } from '../sections/Contact';
import { Hero } from '../sections/Hero';
import { Method } from '../sections/Method';
import { Proof } from '../sections/Proof';

/** Section order is fixed by the content base §6: proof before prose. */
export function Home({ content }: { content: SiteContent }) {
  return (
    <>
      <Hero content={content} />
      <Proof content={content} />
      <Cases content={content} />
      <Method content={content} />
      <About content={content} />
      <Experience content={content} />
      <Contact content={content} />
    </>
  );
}
