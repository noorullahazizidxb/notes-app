import "./devminds-products.css";

import { MotionConfig, motion } from "framer-motion";
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
    <MotionConfig reducedMotion="user">
      <nav className="dmp" aria-labelledby="dmp-title">
        <h2 id="dmp-title" className="dmp-title">More from DevMinds</h2>
        <ul className="dmp-grid">
          {DEVMINDS_PRODUCTS.map((product, index) => {
            const isCurrent = product.slug === current;
            const label = `${product.name}: ${product.descriptor}`;
            return (
              <motion.li
                key={product.slug}
                className="dmp-item"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
              >
                {isCurrent ? (
                  <div className="dmp-card" aria-current="page">
                    <CardBody product={product} isCurrent />
                  </div>
                ) : (
                  <a className="dmp-card" href={product.url} target="_blank" rel="noopener" aria-label={`${label} (opens in new tab)`}>
                    <CardBody product={product} isCurrent={false} />
                  </a>
                )}
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </MotionConfig>
  );
}
