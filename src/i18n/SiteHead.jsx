import { Helmet } from 'react-helmet-async'
import { LOCALES, useLocale } from './LocaleContext'

// TODO: ganti dengan domain asli setelah deploy.
const SITE_URL = 'https://brixa.id'

// For a sub-page (not the homepage), pass `path` (this locale's URL) and
// `alternatePaths` ({ id, en }, the equivalent URL in each locale) so
// canonical/hreflang point at that sub-path instead of the site root, and
// `title`/`description` to override the default site meta.
function SiteHead({ title, description, path, alternatePaths } = {}) {
  const { locale, t } = useLocale()
  const currentPath = path ?? LOCALES[locale].path
  const idPath = alternatePaths?.id ?? LOCALES.id.path
  const enPath = alternatePaths?.en ?? LOCALES.en.path
  const url = `${SITE_URL}${currentPath}`
  const pageTitle = title ?? t.meta.title
  const pageDescription = description ?? t.meta.description

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={url} />

      {/* Tell search engines both language versions exist and how they relate */}
      <link rel="alternate" hrefLang="id" href={`${SITE_URL}${idPath}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${enPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${idPath}`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Brixa" />
      <meta property="og:locale" content={locale === 'id' ? 'id_ID' : 'en_US'} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
    </Helmet>
  )
}

export default SiteHead
