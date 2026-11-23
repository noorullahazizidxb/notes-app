import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Cloud,
  PenLine,
  Search,
  ShieldCheck,
  SunMoon,
  Tags,
  type LucideIcon,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import ThemeToggle from '../../components/ThemeToggle';
import Seo from '../../seo/Seo';
import { FAQ, FEATURES, STEPS, homeJsonLd } from '../../seo/site';

type FeatureTitle = (typeof FEATURES)[number]['title'];

const FEATURE_ICONS: Record<FeatureTitle, LucideIcon> = {
  'Rich-text editor': PenLine,
  'Tags and favorites': Tags,
  'Instant search': Search,
  'Synced online notes': Cloud,
  'Secure sign-in': ShieldCheck,
  'Light and dark themes': SunMoon,
};

const SectionHeading = ({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) => (
  <div className="text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
    <h2 id={id} className="mt-3 font-display text-3xl font-bold text-text sm:text-4xl">
      {title}
    </h2>
  </div>
);

export const Landing = () => (
  <>
    <Seo path="/" jsonLd={homeJsonLd} />
    <header className="sticky top-0 z-30 bg-bg-glass backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" aria-label="DevMinds Notes home" className="inline-flex shrink-0 items-center">
          <BrandLogo className="h-8 sm:h-10" />
        </Link>
        <nav aria-label="Account" className="flex items-center gap-1 sm:gap-3">
          <ThemeToggle compact className="hidden sm:inline-flex" />
          <Link to="/login" className="btn btn-ghost px-2.5 sm:px-3">
            Sign in
          </Link>
          <Link to="/register" className="btn btn-primary px-3.5 sm:px-4">
            Sign up free
          </Link>
        </nav>
      </div>
    </header>

    <main id="main-content" className="flex-1">
      <section className="hero-glow">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-paper px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent shadow-sm sm:text-xs sm:tracking-[0.18em]">
            Free online notes by DevMinds
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-text sm:text-6xl">
            The free note taking app for your online ideas
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            Write rich-text notes, organize them with tags and favorites, search instantly, and access them
            from any device. Offline-first, fast, and completely free.
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link to="/register" className="btn btn-primary btn-lg shadow-md hover:-translate-y-0.5">
              <span>Create a free account</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign in to your notes
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-20 px-4 pb-20 pt-4 sm:space-y-24 sm:px-6">
        <section aria-labelledby="features">
          <SectionHeading id="features" eyebrow="Features" title="Note taking features" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = FEATURE_ICONS[f.title];
              return (
                <li key={f.title} className="surface-card group p-6 transition hover:-translate-y-0.5 hover:border-accent-line hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-accent transition group-hover:bg-accent group-hover:text-accent-text">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-text">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{f.body}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="how">
          <SectionHeading id="how" eyebrow="Get started" title="How it works" />
          <ol className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="surface-card relative p-6">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-base font-bold text-accent-text"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-text">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq">
          <SectionHeading id="faq" eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {FAQ.map((f, i) => (
              <details key={f.q} open={i === 0} className="surface-card group overflow-hidden open:border-accent-line">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-text transition hover:text-accent sm:px-6 [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180 group-open:text-accent"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted sm:px-6">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="surface-card hero-glow overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-14" aria-labelledby="cta">
          <h2 id="cta" className="font-display text-3xl font-bold text-text sm:text-4xl">
            Start writing in seconds
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-text-muted">
            Create a free account with your email or Google and keep every idea in one place.
          </p>
          <div className="mt-7 flex justify-center">
            <Link to="/register" className="btn btn-primary btn-lg">
              <span>Create a free account</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  </>
);

export default Landing;
