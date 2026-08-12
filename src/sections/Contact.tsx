import { useState, type FormEvent } from 'react';
import type { SiteContent } from '../content/types';
import { Button } from '../ds/Button';
import { Input, Textarea } from '../ds/fields';
import { Card } from '../ds/layout';
import { Section, SectionHeader } from '../ds/primitives';
import { cvPath } from '../routes';
import { SITE, whatsappUrl } from '../site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Last-resort path: no access key configured, or the network refused. */
function mailtoFallback(name: string, email: string, message: string) {
  const body = `${message}\n\n— ${name} (${email})`;
  window.location.href = `mailto:${SITE.inboxEmail}?subject=${encodeURIComponent(
    `Site contact — ${name}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function Contact({ content }: { content: SiteContent }) {
  const t = content.contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const reset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setStatus('idle');
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot: bots fill hidden fields, humans never see this one.
    const form = e.currentTarget;
    if ((form.elements.namedItem('botcheck') as HTMLInputElement | null)?.checked) return;

    const next: Errors = {};
    if (!name.trim()) next.name = t.required;
    if (!email.trim()) next.email = t.required;
    else if (!EMAIL_RE.test(email.trim())) next.email = t.invalidEmail;
    if (!message.trim()) next.message = t.required;
    setErrors(next);
    if (Object.keys(next).length) return;

    if (!SITE.web3formsKey) {
      mailtoFallback(name, email, message);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: SITE.web3formsKey,
          subject: `${content.meta.siteName} — new message from ${name}`,
          from_name: 'mateuscardosogs.com',
          name,
          email,
          message,
          replyto: email,
        }),
      });
      const data: { success?: boolean } = await res.json();
      setStatus(res.ok && data.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <Section id="contact">
      <div className="mc-contact">
        <div>
          <SectionHeader index={t.index} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

          <div className="mc-contact__actions">
            <Button variant="secondary" href={cvPath(content.lang)}>
              {t.cvButton}
            </Button>
            <Button variant="ghost" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Button>
            <Button variant="ghost" href={SITE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </Button>
          </div>

          <div className="mc-contact__direct">
            <span className="eyebrow">{t.directLabel}</span>
            <a href={`mailto:${SITE.inboxEmail}`}>{SITE.inboxEmail}</a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <Card padding="lg">
          {status === 'sent' ? (
            <div className="mc-contact__sent">
              <span className="eyebrow" style={{ color: 'var(--text-signal)' }}>
                {t.sentLabel}
              </span>
              <p>{t.sentBody}</p>
              <Button variant="ghost" size="sm" onClick={reset}>
                {t.sendAnother}
              </Button>
            </div>
          ) : (
            <form className="mc-contact__form" onSubmit={onSubmit} noValidate>
              <Input
                label={t.formName}
                name="name"
                autoComplete="name"
                placeholder={t.formNamePlaceholder}
                value={name}
                error={errors.name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label={t.formEmail}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t.formEmailPlaceholder}
                value={email}
                error={errors.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Textarea
                label={t.formMessage}
                name="message"
                rows={4}
                placeholder={t.formMessagePlaceholder}
                value={message}
                error={errors.message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <label className="mc-honey" aria-hidden="true">
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
              </label>

              <Button type="submit" variant="primary" fullWidth disabled={status === 'sending'}>
                {status === 'sending' ? t.sending : t.submit}
              </Button>

              {status === 'error' && (
                <p className="mc-field__hint mc-field__hint--error" role="alert">
                  <strong>{t.errorLabel}.</strong> {t.errorBody}
                </p>
              )}
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
}
