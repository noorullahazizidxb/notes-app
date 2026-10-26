import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import Seo from '../../seo/Seo';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <Seo title="Page not found — DevMinds Notes" noindex />
      <div className="w-full max-w-lg rounded-3xl border border-border bg-paper p-8 sm:p-12 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
          <Compass className="h-7 w-7" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Error 404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-text-muted leading-relaxed">
          The note or page you are looking for does not exist in this workspace. Jump back to your dashboard.
        </p>
        <button
          type="button"
          onClick={() => navigate('/notes')}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-text transition hover:bg-accent-hover shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to notes</span>
        </button>
      </div>
    </section>
  );
};

export default NotFound;