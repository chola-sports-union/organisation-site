import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
}

export function SEO({ title, description, canonicalUrl }: SEOProps) {
  return (
    <Helmet>
      {/* Standard SEO tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Chola FC" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
