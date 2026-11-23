import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type BaseFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> & {
  label: ReactNode;
  hint?: string;
};

const FieldShell = ({ id, label, hint, children }: { id: string; label: ReactNode; hint?: string; children: ReactNode }) => (
  <div>
    <label htmlFor={id} className="field-label">
      {label}
    </label>
    {children}
    {hint ? (
      <p id={`${id}-hint`} className="mt-1.5 text-xs text-text-muted">
        {hint}
      </p>
    ) : null}
  </div>
);

/** Labelled text/email input with an optional hint wired via aria-describedby. */
export const TextField = ({ label, hint, ...inputProps }: BaseFieldProps) => {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint}>
      <input id={id} aria-describedby={hint ? `${id}-hint` : undefined} className="field-input" {...inputProps} />
    </FieldShell>
  );
};

/** Password input with a 44px show/hide toggle. */
export const PasswordField = ({ label, hint, ...inputProps }: Omit<BaseFieldProps, 'type'>) => {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOff : Eye;
  return (
    <FieldShell id={id} label={label} hint={hint}>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="field-input pr-12"
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center rounded-r-xl text-text-muted transition hover:text-text"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </FieldShell>
  );
};
