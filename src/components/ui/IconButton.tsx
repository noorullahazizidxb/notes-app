import { forwardRef, type ButtonHTMLAttributes } from 'react';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Accessible name; icon-only buttons must have one. */
  label: string;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, className = '', children, type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card-bg text-text transition hover:border-accent hover:text-accent ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
);

IconButton.displayName = 'IconButton';

export default IconButton;
