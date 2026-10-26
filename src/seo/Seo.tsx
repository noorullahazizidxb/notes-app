import { Helmet } from 'react-helmet-async';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, SITE_NAME, SITE_URL } from './site';

type SeoProps = {
  title?: string;
  description?: string;
  /** Path for the canonical URL, e.g. "/login". Omit on private pages. */
  path?: string;
  noindex?: boolean;
  jsonLd?: object;
};

/** Owns every SEO tag in <head> for the current route. */
const Seo = ({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, path, noindex = false, jsonLd }: SeoProps) => {
  const url = path ? `${SITE_URL}${path}` : undefined;
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'} />
      {url && !noindex ? <link rel="canonical" href={url} /> : null}
      {url && !noindex ? <link rel="alternate" hrefLang="en" href={url} /> : null}
      {url && !noindex ? <link rel="alternate" hrefLang="x-default" href={url} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="DevMinds Notes — the free note taking app for online notes" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="DevMinds Notes — the free note taking app for online notes" />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
};

export default Seo;
