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
import { m } from 'framer-motion';
import BrandLogo from '../../components/BrandLogo';
import HeroNotePreview from '../../components/landing/HeroNotePreview';
import ThemeToggle from '../../components/ThemeToggle';
import Seo from '../../seo/Seo';
import { FAQ, FEATURES, STEPS, homeJsonLd } from '../../seo/site';
import { VIEWPORT_ONCE, fadeUp, staggerChildren } from '../../lib/motion/tokens';

type FeatureTitle = (typeof FEATURES)[number]['title'];

const FEATURE_ICONS: Record<FeatureTitle, LucideIcon> = {
  'Rich-text editor': PenLine,
  'Tags and favorites': Tags,
  'Instant search': Search,
  'Synced online notes': Cloud,
  'Secure sign-in': ShieldCheck,
  'Light and dark themes': SunMoon,
};

/** Shared whileInView props: children with `fadeUp` variants reveal in sequence, once. */
const revealGroup = {
  variants: staggerChildren,
  initial: 'hidden',
  whileInView: 'show',
  viewport: VIEWPORT_ONCE,
} as const;

const SectionHeading = ({ id, title }: { id: string; title: string }) => (
  <m.h2
    id={id}
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={VIEWPORT_ONCE}
    className="text-center font-display text-3xl font-bold text-text sm:text-4xl"
  >
    {title}
  </m.h2>
);

export const Landing = () => (
  <>
    <Seo path="/" jsonLd={homeJsonLd} />
    <header className="sticky top-0 z-30 bg-bg-glass backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" aria-label="DevMinds Notes home" className="inline-flex min-h-[40px] shrink-0 items-center">
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
      <section className="hero-glow overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-16 text-center sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-28 lg:text-left">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-paper px-3.5 py-1.5 text-xs font-semibold text-accent shadow-sm sm:text-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              Free online notes by DevMinds
            </p>
            <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-text sm:text-6xl lg:mx-0">
              The free note taking app for your online ideas
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg lg:mx-0">
              Write rich-text notes, organize them with tags and favorites, search instantly, and access them
              from any device. Offline-first, fast, and completely free.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <Link to="/register" className="btn btn-primary btn-lg shadow-md hover:-translate-y-0.5">
                <span>Create a free account</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                Sign in to your notes
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroNotePreview />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-20 px-4 pb-20 pt-4 sm:space-y-24 sm:px-6">
        <section aria-labelledby="features">
          <SectionHeading id="features" title="Note taking features" />
          <m.ul {...revealGroup} className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = FEATURE_ICONS[f.title];
              return (
                <m.li key={f.title} variants={fadeUp} className="surface-card group p-6 transition-[border-color,box-shadow] hover:border-accent-line hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-accent transition group-hover:bg-accent group-hover:text-accent-text">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-text">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{f.body}</p>
                </m.li>
              );
            })}
          </m.ul>
        </section>

        <section aria-labelledby="how">
          <SectionHeading id="how" title="How it works" />
          <m.ol {...revealGroup} className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {STEPS.map((s, i) => (
              <m.li key={s.title} variants={fadeUp} className="surface-card relative p-6">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-base font-bold text-accent-text"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-text">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{s.body}</p>
              </m.li>
            ))}
          </m.ol>
        </section>

        <section aria-labelledby="faq">
          <SectionHeading id="faq" title="Frequently asked questions" />
          <m.div {...revealGroup} className="mx-auto mt-10 max-w-3xl space-y-3">
            {FAQ.map((f, i) => (
              <m.details key={f.q} variants={fadeUp} open={i === 0} className="surface-card group overflow-hidden open:border-accent-line">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-text transition hover:text-accent sm:px-6 [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180 group-open:text-accent"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted sm:px-6">{f.a}</p>
              </m.details>
            ))}
          </m.div>
        </section>

        <m.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="surface-card hero-glow overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-14"
          aria-labelledby="cta"
        >
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
        </m.section>
      </div>
    </main>
  </>
);

export default Landing;
