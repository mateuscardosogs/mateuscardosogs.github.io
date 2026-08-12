import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface FieldShell {
  label: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, ...rest }: FieldShell & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const msg = error ?? hint;
  return (
    <div className="mc-field">
      <label className="mc-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="mc-field__control"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={msg ? `${id}-msg` : undefined}
        {...rest}
      />
      {msg && (
        <span id={`${id}-msg`} className={`mc-field__hint${error ? ' mc-field__hint--error' : ''}`}>
          {msg}
        </span>
      )}
    </div>
  );
}

export function Textarea({ label, hint, error, rows = 4, ...rest }: FieldShell & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const msg = error ?? hint;
  return (
    <div className="mc-field">
      <label className="mc-field__label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="mc-field__control"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={msg ? `${id}-msg` : undefined}
        {...rest}
      />
      {msg && (
        <span id={`${id}-msg`} className={`mc-field__hint${error ? ' mc-field__hint--error' : ''}`}>
          {msg}
        </span>
      )}
    </div>
  );
}
