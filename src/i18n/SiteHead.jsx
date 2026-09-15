import { Helmet } from 'react-helmet-async'
import { LOCALES, useLocale } from './LocaleContext'

// TODO: ganti dengan domain asli setelah deploy.
const SITE_URL = 'https://brixa.id'

function SiteHead() {
  const { locale, t } = useLocale()
  const path = LOCALES[locale].path
  const url = `${SITE_URL}${path}`

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
      <link rel="canonical" href={url} />

      {/* Tell search engines both language versions exist and how they relate */}
      <link rel="alternate" hrefLang="id" href={`${SITE_URL}${LOCALES.id.path}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${LOCALES.en.path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${LOCALES.id.path}`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Brixa" />
      <meta property="og:locale" content={locale === 'id' ? 'id_ID' : 'en_US'} />
      <meta property="og:title" content={t.meta.title} />
      <meta property="og:description" content={t.meta.description} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t.meta.title} />
      <meta name="twitter:description" content={t.meta.description} />
    </Helmet>
  )
}

export default SiteHead
