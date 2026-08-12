import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { sfx } from './soundKit';

type Variant = 'primary' | 'secondary' | 'ghost' | 'signal';
type Size = 'sm' | 'md' | 'lg';

interface Common {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonProps = Common & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = Common & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'md', fullWidth, className, children, ...rest } = props;
  const cls = [
    'mc-btn',
    `mc-btn--${variant}`,
    `mc-btn--${size}`,
    fullWidth ? 'mc-btn--block' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href !== undefined) {
    const { onMouseEnter, onClick, ...anchor } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchor}
        className={cls}
        onMouseEnter={(e) => {
          sfx.hover();
          onMouseEnter?.(e);
        }}
        onClick={(e) => {
          sfx.press();
          onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  }

  const { onMouseEnter, onClick, type = 'button', ...button } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...button}
      type={type}
      className={cls}
      onMouseEnter={(e) => {
        sfx.hover();
        onMouseEnter?.(e);
      }}
      onClick={(e) => {
        sfx.press();
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
