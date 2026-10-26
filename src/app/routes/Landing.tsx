import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import ThemeToggle from '../../components/ThemeToggle';
import Seo from '../../seo/Seo';
import { FAQ, FEATURES, PRODUCTS, STEPS, homeJsonLd } from '../../seo/site';

const Landing = () => (
  <>
    <Seo path="/" jsonLd={homeJsonLd} />
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <Link to="/" aria-label="DevMinds Notes home" className="inline-flex items-center">
        <BrandLogo className="h-10" />
      </Link>
      <nav aria-label="Account" className="flex items-center gap-3 text-sm font-semibold">
        <ThemeToggle />
        <Link to="/login" className="rounded-xl px-3 py-2 text-text/80 hover:text-text">
          Sign in
        </Link>
        <Link to="/register" className="rounded-xl bg-accent px-4 py-2 text-on-accent hover:brightness-110">
          Sign up free
        </Link>
      </nav>
    </header>

    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6">
      <section className="py-12 text-center sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text/60">Free online notes by DevMinds</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-text sm:text-6xl">
          DevMinds Notes — the free note taking app for your online notes
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-text/75 sm:text-lg">
          Write rich-text notes, organize them with tags and favorites, search instantly and open them on any device.
          Simple, fast and free.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-on-accent hover:brightness-110">
            Create a free account <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/login" className="rounded-xl border border-border bg-card-bg px-5 py-3 text-sm font-semibold text-text hover:border-accent">
            Sign in to your notes
          </Link>
        </div>
      </section>

      <section aria-labelledby="features" className="py-10">
        <h2 id="features" className="text-center font-display text-3xl text-text sm:text-4xl">Note taking features</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.title} className="rounded-2xl border border-border bg-paper p-6">
              <h3 className="flex items-center gap-2 font-semibold text-text">
                <Check className="h-4 w-4 text-accent" aria-hidden="true" /> {f.title}
              </h3>
              <p className="mt-2 text-sm text-text/70">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="py-10">
        <h2 id="how" className="text-center font-display text-3xl text-text sm:text-4xl">How it works</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-card-bg p-6">
              <span className="text-sm font-bold text-accent">Step {i + 1}</span>
              <h3 className="mt-1 font-semibold text-text">{s.title}</h3>
              <p className="mt-2 text-sm text-text/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq" className="mx-auto max-w-3xl py-10">
        <h2 id="faq" className="text-center font-display text-3xl text-text sm:text-4xl">Frequently asked questions</h2>
        <div className="mt-8 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="rounded-2xl border border-border bg-paper p-5" open>
              <summary className="cursor-pointer font-semibold text-text">{f.q}</summary>
              <p className="mt-2 text-sm text-text/75">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <nav aria-labelledby="products" className="py-10">
        <h2 id="products" className="text-center font-display text-2xl text-text">More DevMinds products</h2>
        <ul className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          {PRODUCTS.map((p) => (
            <li key={p.url}>
              <a href={p.url} className="inline-block rounded-full border border-border bg-card-bg px-4 py-2 text-text/80 hover:text-text">
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  </>
);

export default Landing;
