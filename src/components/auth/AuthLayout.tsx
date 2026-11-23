import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import GoogleButton from '../GoogleButton';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  /** The email/password form card. */
  children: ReactNode;
  /** Prompt under the Google button, e.g. "No account yet?". */
  switchPrompt: string;
  switchLabel: string;
  switchTo: string;
};

/** Shared shell for the sign-in and sign-up pages: brand, heading, form card, Google and switch link. */
export const AuthLayout = ({ title, subtitle, children, switchPrompt, switchLabel, switchTo }: AuthLayoutProps) => (
  <main id="main-content" className="hero-glow flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <Link to="/" aria-label="DevMinds Notes home" className="mb-5 inline-flex justify-center">
          <BrandLogo className="h-11 sm:h-12" />
        </Link>
        <h1 className="font-display text-3xl font-bold text-text sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-text-muted">{subtitle}</p>
      </div>

      {children}

      <GoogleButton />

      <p className="text-center text-sm text-text-muted">
        {switchPrompt}{' '}
        <Link to={switchTo} className="font-semibold text-accent underline-offset-4 hover:underline">
          {switchLabel}
        </Link>
      </p>
    </div>
  </main>
);

export default AuthLayout;
