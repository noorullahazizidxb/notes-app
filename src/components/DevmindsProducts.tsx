import "./devminds-products.css";

import { m } from "framer-motion";
import { VIEWPORT_ONCE, fadeUp, staggerChildren } from "../lib/motion/tokens";
import { DEVMINDS_PRODUCTS, LOGO_HEIGHT, productLogoSrc, type DevmindsProduct, type LogoVariant, type ProductSlug } from "../seo/devminds-products";

interface DevmindsProductsProps {
  /** The product this app is; highlighted as "You are here". */
  current: ProductSlug;
}

function Logo({ product, variant, className }: { product: DevmindsProduct; variant: LogoVariant; className: string }) {
  const decorative = variant.startsWith("icon");
  return (
    <img
      className={`dmp-img ${className}`}
      src={productLogoSrc(product.slug, variant)}
      alt={decorative ? "" : product.name}
      width={product.logoWidths[variant]}
      height={LOGO_HEIGHT}
      loading="lazy"
      decoding="async"
    />
  );
}

function CardBody({ product, isCurrent }: { product: DevmindsProduct; isCurrent: boolean }) {
  return (
    <>
      <span className="dmp-logo">
        <Logo product={product} variant="light" className="dmp-light" />
        <Logo product={product} variant="dark" className="dmp-dark" />
      </span>
      <span className="dmp-compact">
        <Logo product={product} variant="icon-light" className="dmp-light" />
        <Logo product={product} variant="icon-dark" className="dmp-dark" />
        <span className="dmp-text">
          <span className="dmp-name">{product.name}</span>
          <span className="dmp-desc">{product.descriptor}</span>
        </span>
      </span>
      <span className="dmp-desc dmp-desc--wordmark">{product.descriptor}</span>
      {isCurrent && <span className="dmp-badge">You are here</span>}
    </>
  );
}

/** "More from DevMinds" footer section: every DevMinds product in two rows of four on desktop. */
export function DevmindsProducts({ current }: DevmindsProductsProps) {
  return (
    <nav className="dmp" aria-labelledby="dmp-title">
      <h2 id="dmp-title" className="dmp-title">More from DevMinds</h2>
      <m.ul className="dmp-grid" variants={staggerChildren} initial="hidden" whileInView="show" viewport={VIEWPORT_ONCE}>
        {DEVMINDS_PRODUCTS.map((product) => {
          const isCurrent = product.slug === current;
          const label = `${product.name}: ${product.descriptor}`;
          return (
            <m.li key={product.slug} className="dmp-item" variants={fadeUp}>
              {isCurrent ? (
                <div className="dmp-card" aria-current="page">
                  <CardBody product={product} isCurrent />
                </div>
              ) : (
                <a className="dmp-card" href={product.url} target="_blank" rel="noopener" aria-label={`${label} (opens in new tab)`}>
                  <CardBody product={product} isCurrent={false} />
                </a>
              )}
            </m.li>
          );
        })}
      </m.ul>
    </nav>
  );
}
