import { X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotesStore } from '../store/notesStore';
import { NAV_ITEMS } from '../constants/nav';

const Drawer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { drawerOpen, setDrawerOpen } = useNotesStore();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/35 backdrop-blur-sm transition-opacity duration-200 ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-[color:var(--color-nav-bg)] p-5 shadow-2xl transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!drawerOpen}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl text-text">Notebook</p>
            <p className="text-xs uppercase tracking-[0.2em] text-text/55">Navigation</p>
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="rounded-lg border border-border bg-card-bg p-2 text-text transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to || (pathname === '/' && item.to === '/notes');
            const Icon = item.icon;
            return (
              <button
                key={item.to}
                type="button"
                onClick={() => { navigate(item.to); setDrawerOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  active
                    ? 'bg-[color:var(--color-accent)] text-white'
                    : 'bg-card-bg/70 text-text hover:bg-card-bg'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-border bg-card-bg/70 p-4 text-sm text-text/70">
          <p className="font-semibold text-text">Tip</p>
          <p className="mt-1 leading-relaxed">
            Use #hashtags inside notes to auto-capture topic tags while writing.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Drawer;

