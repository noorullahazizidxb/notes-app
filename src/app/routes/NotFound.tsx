import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';
import { fadeUp } from '../../lib/motion/tokens';
import Seo from '../../seo/Seo';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4 py-12">
      <Seo title="Page not found — DevMinds Notes" noindex />
      <m.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="hero-glow w-full max-w-lg rounded-3xl border border-border bg-paper p-8 text-center shadow-sm sm:p-12"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
          <Compass className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-4 text-sm font-medium text-accent">Error 404</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-text sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-text-muted leading-relaxed">
          The note or page you are looking for does not exist in this workspace. Jump back to your dashboard.
        </p>
        <button
          type="button"
          onClick={() => navigate('/notes')}
          className="btn btn-primary mt-6"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to notes</span>
        </button>
      </m.div>
    </main>
  );
};

export default NotFound;