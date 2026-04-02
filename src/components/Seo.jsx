import { Helmet } from 'react-helmet-async';
import { seo, company } from '../content';

export default function Seo({ page, customTitle, customDescription }) {
  const pageData = seo.pages[page] || {};
  const title = customTitle || pageData.title || seo.defaults.title;
  const description = customDescription || pageData.description || seo.defaults.description;
  const url = `${seo.siteUrl}${pageData.path || '/'}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={seo.defaults.type} />
      <meta property="og:locale" content={seo.defaults.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:image" content={`${seo.siteUrl}${seo.defaults.ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data – LocalBusiness */}
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: company.name,
        url: seo.siteUrl,
        email: company.email,
        telephone: company.phone,
        description: seo.defaults.description,
        areaServed: { '@type': 'Country', name: 'DE' },
        sameAs: Object.values(company.social).filter(u => u !== '#'),
      })}</script>
    </Helmet>
  );
}
