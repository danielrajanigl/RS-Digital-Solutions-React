import { Helmet } from 'react-helmet-async';
import { seo, company, navigation, leistungenPage, referenzenPage } from '../content';

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
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
      addressLocality: company.location,
    },
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

  // Service ItemList schema for /leistungen
  const serviceListSchema = page === 'leistungen'
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: leistungenPage.services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: service.label.replace(/\u00AD/g, ''),
            description: service.label.replace(/\u00AD/g, ''),
            provider: {
              '@type': 'Organization',
              name: company.name,
            },
          },
        })),
      }
    : null;

  // AggregateRating + Review schema for /referenzen
  const reviewSchema = page === 'referenzen'
    ? (() => {
        const testimonials = referenzenPage.testimonials;
        const avgRating = (
          testimonials.reduce((sum, t) => sum + t.stars, 0) / testimonials.length
        ).toFixed(1);
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: company.name,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: avgRating,
            reviewCount: String(testimonials.length),
            bestRating: '5',
          },
          review: testimonials.map((t) => ({
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: t.name,
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: String(t.stars),
              bestRating: '5',
            },
            reviewBody: t.text.replace(/[„"]/g, ''),
          })),
        };
      })()
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
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

      {/* Structured Data – Service ItemList (Leistungen page) */}
      {serviceListSchema && (
        <script type="application/ld+json">{JSON.stringify(serviceListSchema)}</script>
      )}

      {/* Structured Data – AggregateRating + Reviews (Referenzen page) */}
      {reviewSchema && (
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      )}
    </Helmet>
  );
}
