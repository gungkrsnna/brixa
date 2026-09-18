import { ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LOCALES, useLocale } from '../../i18n/LocaleContext'
import SiteHead from '../../i18n/SiteHead'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import WhatsAppFloatingButton from '../layout/WhatsAppFloatingButton'
import DetailBackLink from './DetailBackLink'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ServiceDetail() {
  const { slug } = useParams()
  const { t, locale } = useLocale()
  const homePath = LOCALES[locale].path
  const servicesPath = LOCALES[locale].servicesPath
  const services = t.services.items
  const service = services.find((item) => item.slug === slug)

  if (!service) {
    return <Navigate to={homePath} replace />
  }

  const otherServices = services.filter((item) => item.slug !== slug)

  return (
    <>
      <SiteHead
        title={`${service.title} | Bali Pro Dev`}
        description={service.detail.intro}
        path={`${servicesPath}/${slug}`}
        alternatePaths={{ id: `${LOCALES.id.servicesPath}/${slug}`, en: `${LOCALES.en.servicesPath}/${slug}` }}
      />
      <div className="min-h-screen bg-paper">
        <Navbar />
        <main>
          <section className="px-6 pb-16 pt-32 md:pb-24 md:pt-40">
            <div className="mx-auto max-w-3xl">
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
                <DetailBackLink fallbackTo={`${homePath}#services`} label={t.serviceDetail.backLabel} />
              </motion.div>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.05}
                className="mt-8 font-label text-xs font-medium uppercase tracking-[0.15em] text-primary-600"
              >
                {t.serviceDetail.eyebrow}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.1}
                className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-5xl"
              >
                {service.title}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.15}
                className="mt-6 text-base leading-relaxed text-ink-900/70 md:text-lg"
              >
                {service.detail.intro}
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.2}
                className={`mt-10 rounded-2xl p-6 md:p-8 ${service.accent}`}
              >
                <p className="font-label text-xs font-medium uppercase tracking-[0.15em] text-paper/60">
                  {t.serviceDetail.featuresLabel}
                </p>
                <ul className="mt-5 space-y-4">
                  {service.detail.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper/15">
                        <Check size={12} className="text-paper" />
                      </span>
                      <span className="text-sm leading-relaxed text-paper md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.25}
                className="mt-14 rounded-2xl border border-ink-900/10 p-8 text-center md:p-12"
              >
                <h2 className="font-display text-2xl font-bold text-ink-900 md:text-3xl">
                  {t.serviceDetail.ctaTitle}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-900/60 md:text-base">
                  {t.serviceDetail.ctaDescription}
                </p>
                <Link
                  to={`${homePath}#contact`}
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 font-label text-xs font-medium uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-primary-600"
                >
                  {t.serviceDetail.ctaButton}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.3} className="mt-16">
                <p className="font-label text-xs font-medium uppercase tracking-[0.15em] text-ink-900/40">
                  {t.serviceDetail.otherServicesLabel}
                </p>
                <ul className="mt-5 divide-y divide-ink-900/10 border-t border-ink-900/10">
                  {otherServices.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`${servicesPath}/${item.slug}`}
                        className="group flex items-center justify-between gap-4 py-4"
                      >
                        <span className="font-display text-base font-bold text-ink-900 transition-colors duration-300 group-hover:text-primary-600 md:text-lg">
                          {item.title}
                        </span>
                        <ArrowRight
                          size={18}
                          className="shrink-0 text-ink-900/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary-600"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      <WhatsAppFloatingButton />
    </>
  )
}

export default ServiceDetail
