import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-[color:var(--color-paper)] p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.09)]">
        <p className="text-xs uppercase tracking-[0.2em] text-text/55">404</p>
        <h1 className="mt-3 font-display text-4xl text-text sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-text/70 sm:text-base">
          The page you requested does not exist in this workspace. Jump back to the notebook dashboard.
        </p>
        <button
          type="button"
          onClick={() => navigate('/notes')}
          className="mt-6 rounded-xl bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Back to notes
        </button>
      </div>
    </section>
  );
};

export default NotFound;