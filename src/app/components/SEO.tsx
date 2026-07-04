import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  /** Optional: path to OG image (absolute URL). Defaults to the Chola FC logo. */
  ogImage?: string;
  /** Optional: JSON-LD structured data object. Merged on top of the default Organization schema. */
  structuredData?: Record<string, unknown>;
}

const DEFAULT_OG_IMAGE = "https://www.cholafc.com/logo.png";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Chola FC",
  url: "https://www.cholafc.com",
  logo: DEFAULT_OG_IMAGE,
  description:
    "Chola FC is a premier football academy in Chennai offering professional football training, youth development programs, and elite coaching.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sport: "Football",
  sameAs: [],
};

export function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  structuredData,
}: SEOProps) {
  const jsonLd = structuredData
    ? { ...ORGANIZATION_SCHEMA, ...structuredData }
    : ORGANIZATION_SCHEMA;

  return (
    <Helmet>
      {/* ── Standard SEO ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* ── Open Graph / Facebook ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Chola FC" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Chola FC Logo" />
      <meta property="og:locale" content="en_IN" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── JSON-LD Structured Data ── */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
