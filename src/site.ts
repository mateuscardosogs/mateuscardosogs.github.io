/** Single source of truth for identity, links and third-party keys. */
export const SITE = {
  origin: 'https://mateuscardosogs.com',
  name: 'Mateus Cardoso',
  email: 'contato@mateuscardosogs.com',
  phoneDisplay: '+55 81 98245-4758',
  phoneE164: '5581982454758',
  github: 'https://github.com/mateuscardosogs',
  githubHandle: 'github.com/mateuscardosogs',
  linkedin: 'https://www.linkedin.com/in/mateuscardosogs',
  linkedinHandle: 'linkedin.com/in/mateuscardosogs',
  instagram: 'https://www.instagram.com/mateuscardosogs/',
  siteHandle: 'mateuscardosogs.com',

  /**
   * Web3Forms access key. Public by design — it can only send mail to the
   * address the key was issued for, so committing it is safe.
   *
   * Issue it for **mateuscardosogs@gmail.com** at https://web3forms.com (no
   * account needed): that is where form messages land, while `email` above
   * stays the address shown to visitors.
   *
   * While this is empty the form still validates, then falls back to opening a
   * prefilled mailto — so it degrades instead of silently dropping messages.
   */
  web3formsKey: '',
} as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${SITE.phoneE164}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
