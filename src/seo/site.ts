export const SITE_URL = 'https://notes.devminds.net';
export const SITE_NAME = 'DevMinds Notes';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const DEFAULT_TITLE = 'DevMinds Notes — Free Note Taking App for Online Notes';
export const DEFAULT_DESCRIPTION =
  'DevMinds Notes is a free online note taking app. Write rich-text notes, organize them with tags and favorites, search instantly and sync across devices. Sign in with Google.';

export const FEATURES = [
  { title: 'Rich-text editor', body: 'Headings, lists, quotes and code in a clean, distraction-free note editor.' },
  { title: 'Tags and favorites', body: 'Add #tags inside any note and star the ones you need most to find them in a click.' },
  { title: 'Instant search', body: 'Search titles, content and tags across every note and sort by date or title.' },
  { title: 'Synced online notes', body: 'Your notes are saved to your account so they follow you to any browser and device.' },
  { title: 'Secure sign-in', body: 'Email and password or one-tap Google sign-in, protected by reCAPTCHA.' },
  { title: 'Light and dark themes', body: 'A calm reading experience day and night, with a theme that follows your system.' },
] as const;

export const STEPS = [
  { title: 'Create a free account', body: 'Sign up with your email or continue with Google in seconds.' },
  { title: 'Write your first note', body: 'Capture ideas, meeting notes, to-dos or drafts in the rich-text editor.' },
  { title: 'Organize and find', body: 'Tag, favorite and search your online notes whenever you need them.' },
] as const;

export const FAQ = [
  { q: 'Is DevMinds Notes free?', a: 'Yes. DevMinds Notes is a free note taking app. Create an account and start writing notes online at no cost.' },
  { q: 'Can I access my notes on any device?', a: 'Yes. Your notes are stored in your DevMinds Notes account, so you can open them from any modern browser on desktop or mobile.' },
  { q: 'How do I organize my notes?', a: 'Add #tags inside a note, mark notes as favorites and use instant search and sorting on the dashboard.' },
  { q: 'Can I sign in with Google?', a: 'Yes. You can sign up and sign in with your Google account or with an email and password.' },
  { q: 'Who makes DevMinds Notes?', a: 'DevMinds Notes is built by DevMinds, the software studio of Noorullah Azizi, alongside the DevMinds Budget App, Marketplace and Jobs.' },
] as const;

export const PRODUCTS = [
  { name: 'DevMinds', label: 'DevMinds — software studio', url: 'https://devminds.net' },
  { name: 'DevMinds Budget App', label: 'DevMinds Budget App — free budget planner and budget manager', url: 'https://budget-manager.devminds.net' },
  { name: 'DevMinds Marketplace', label: 'DevMinds Marketplace — buy and sell online', url: 'https://marketplace.devminds.net' },
  { name: 'DevMinds Jobs', label: 'DevMinds Jobs — jobs platform and education hub', url: 'https://jobs.devminds.net' },
  { name: 'DevMinds Works', label: 'DevMinds Works — our projects and work', url: 'https://ourworks.devminds.net' },
  { name: 'Noorullah Azizi', label: 'Noorullah Azizi — founder portfolio', url: 'https://noorullah-azizi.devminds.net' },
] as const;

const organization = {
  '@type': 'Organization',
  '@id': 'https://devminds.net/#organization',
  name: 'DevMinds',
  url: 'https://devminds.net',
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
  founder: { '@type': 'Person', name: 'Noorullah Azizi', url: 'https://noorullah-azizi.devminds.net' },
  sameAs: ['https://github.com/noorullahazizidxb', 'https://noorullah-azizi.devminds.net'],
};

export const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: ['DevMinds Notes App', 'Notes by DevMinds'],
      url: `${SITE_URL}/`,
      inLanguage: 'en',
      publisher: { '@id': 'https://devminds.net/#organization' },
    },
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: SITE_NAME,
      alternateName: ['DevMinds Note Taking App', 'DevMinds Online Notes'],
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web browser',
      browserRequirements: 'Requires JavaScript and a modern browser',
      url: `${SITE_URL}/`,
      image: OG_IMAGE,
      description: DEFAULT_DESCRIPTION,
      featureList: FEATURES.map((f) => f.title),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      publisher: { '@id': 'https://devminds.net/#organization' },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [{ '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` }],
    },
  ],
};

export const pageJsonLd = (name: string, path: string) => ({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', '@id': `${SITE_URL}${path}#webpage`, url: `${SITE_URL}${path}`, name, isPartOf: { '@id': `${SITE_URL}/#website` } },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
      ],
    },
  ],
});
