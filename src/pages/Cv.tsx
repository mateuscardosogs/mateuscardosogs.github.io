import type { ReactNode } from 'react';
import type { SiteContent } from '../content/types';
import { Button } from '../ds/Button';
import { cvPdfPath, homePath } from '../routes';
import { SITE } from '../site';
import '../styles/cv.css';

/* Lucide (ISC) outlines, inlined at 13px — icons only where they carry
   information, which on this page means the contact line and nothing else. */
const icon = (paths: ReactNode) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
);

const icons = {
  mail: icon(
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>,
  ),
  phone: icon(
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />,
  ),
  pin: icon(
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>,
  ),
  globe: icon(
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>,
  ),
  github: icon(
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>,
  ),
  linkedin: icon(
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>,
  ),
};

export function Cv({ content }: { content: SiteContent }) {
  const cv = content.cv;

  return (
    <div className="mc-cv">
      <div className="mc-cv__toolbar">
        <Button variant="ghost" size="sm" href={homePath(content.lang)}>
          {cv.backLabel}
        </Button>
        <div className="mc-cv__toolbar-actions">
          <Button variant="secondary" size="sm" href={cvPdfPath(content.lang)} download>
            {cv.downloadLabel}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => typeof window !== 'undefined' && window.print()}
          >
            {cv.printLabel}
          </Button>
        </div>
      </div>

      <article className="mc-cv__sheet">
        <header className="mc-cv__head">
          <h1>Mateus Cardoso</h1>
          <p className="mc-cv__role">{cv.role}</p>
          <ul className="mc-cv__contact">
            <li>
              {icons.mail}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              {icons.phone}
              {SITE.phoneDisplay}
            </li>
            <li>
              {icons.pin}
              {cv.location}
            </li>
            <li>
              {icons.globe}
              <a href={SITE.origin}>{SITE.siteHandle}</a>
            </li>
            <li>
              {icons.github}
              <a href={SITE.github}>{SITE.githubHandle}</a>
            </li>
            <li>
              {icons.linkedin}
              <a href={SITE.linkedin}>{SITE.linkedinHandle}</a>
            </li>
          </ul>
        </header>

        <section className="mc-cv__block">
          <h2>{cv.summaryLabel}</h2>
          <p className="mc-cv__summary">{cv.summary}</p>
        </section>

        <section className="mc-cv__block">
          <h2>{cv.experienceLabel}</h2>
          {cv.jobs.map((job) => (
            <article className="mc-cv__job" key={job.role + job.period}>
              <div className="mc-cv__job-head">
                <h3>{job.role}</h3>
                <span className="mc-cv__period">{job.period}</span>
              </div>
              <p className="mc-cv__org">{job.org}</p>
              {job.bullets && (
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>

        <section className="mc-cv__block">
          <h2>{cv.skillsLabel}</h2>
          <dl className="mc-cv__skills">
            {cv.skills.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mc-cv__block">
          <h2>{cv.educationLabel}</h2>
          <div className="mc-cv__edu">
            {cv.education.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
