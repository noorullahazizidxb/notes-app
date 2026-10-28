import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import ThemeToggle from '../../components/ThemeToggle';
import Seo from '../../seo/Seo';
import { FAQ, FEATURES, STEPS, homeJsonLd } from '../../seo/site';

export const Landing = () => (
  <>
    <Seo path="/" jsonLd={homeJsonLd} />
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <Link to="/" aria-label="DevMinds Notes home" className="inline-flex items-center">
        <BrandLogo className="h-9 sm:h-10" />
      </Link>
      <nav aria-label="Account" className="flex items-center gap-1.5 sm:gap-3">
        <ThemeToggle compact className="hidden sm:inline-flex" />
        <Link
          to="/login"
          className="btn btn-ghost"
        >
          Sign in
        </Link>
        <Link
          to="/register"
          className="btn btn-primary"
        >
          Sign up free
        </Link>
      </nav>
    </header>

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6">
      <section className="py-14 text-center sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Free online notes by DevMinds
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-text sm:text-6xl font-bold">
          The free note taking app for your online ideas
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-text-muted sm:text-lg leading-relaxed">
          Write rich-text notes, organize them with tags and favorites, search instantly, and access them
          from any device. Offline-first, fast, and completely free.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-text hover:bg-accent-hover shadow-md transition-all hover:-translate-y-0.5"
          >
            <span>Create a free account</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center rounded-xl border border-border bg-paper px-6 py-3 text-sm font-semibold text-text hover:border-accent hover:text-accent shadow-xs transition-colors"
          >
            Sign in to your notes
          </Link>
        </div>
      </section>

      <section aria-labelledby="features" className="py-12">
        <h2 id="features" className="text-center font-display text-3xl font-bold text-text sm:text-4xl">
          Note taking features
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <li
              key={f.title}
              className="rounded-2xl border border-border bg-paper p-6 shadow-sm transition-all hover:border-accent/40"
            >
              <h3 className="flex items-center gap-2.5 font-semibold text-text">
                <Check className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                <span>{f.title}</span>
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="py-12">
        <h2 id="how" className="text-center font-display text-3xl font-bold text-text sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="rounded-2xl border border-border bg-paper p-6 shadow-sm"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Step 0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-text">{s.title}</h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq" className="py-12">
        <h2 id="faq" className="text-center font-display text-3xl font-bold text-text sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-4">
          {FAQ.map((f) => (
            <article
              key={f.q}
              className="rounded-2xl border border-border bg-paper p-6 shadow-sm"
            >
              <h3 className="font-semibold text-text">{f.q}</h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">{f.a}</p>
            </article>
          ))}
        </div>
      </section>

    </main>
  </>
);

export default Landing;
