import { Helmet } from 'react-helmet-async';
import { seo, company, navigation } from '../content';

export default function Seo({ page, customTitle, customDescription, faqItems }) {
  const pageData = seo.pages[page] || {};
  const title = customTitle || pageData.title || seo.defaults.title;
  const description = customDescription || pageData.description || seo.defaults.description;
  const url = `${seo.siteUrl}${pageData.path || '/'}`;
  const ogImageUrl = `${seo.siteUrl}${seo.defaults.ogImage}`;

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: seo.siteUrl },
      ...(page && page !== 'home'
        ? [{
            '@type': 'ListItem',
            position: 2,
            name: title.split('–')[0]?.trim() || title,
            item: url,
          }]
        : []),
    ],
  };

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: company.name,
    url: seo.siteUrl,
    email: company.email,
    telephone: company.phone,
    description: seo.defaults.description,
    areaServed: { '@type': 'Country', name: 'DE' },
    sameAs: Object.values(company.social).filter(u => u !== '#'),
  };

  const faqSchema = faqItems?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null;

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
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:alt" content={company.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Structured Data – LocalBusiness */}
      <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>

      {/* Structured Data – Breadcrumbs */}
      <script type="application/ld+json">{JSON.stringify(breadcrumbList)}</script>

      {/* Structured Data – FAQ (if provided) */}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
}
