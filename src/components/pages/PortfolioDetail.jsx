import { ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LOCALES, useLocale } from '../../i18n/LocaleContext'
import SiteHead from '../../i18n/SiteHead'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import WhatsAppFloatingButton from '../layout/WhatsAppFloatingButton'
import { COVERS } from '../portfolio/ProjectCovers'
import DetailBackLink from './DetailBackLink'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function PortfolioDetail() {
  const { slug } = useParams()
  const { t, locale } = useLocale()
  const homePath = LOCALES[locale].path
  const portfolioPath = LOCALES[locale].portfolioPath
  const projects = t.portfolio.items
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to={homePath} replace />
  }

  const Cover = COVERS[project.cover]
  const otherProjects = projects.filter((item) => item.slug !== slug)

  return (
    <>
      <SiteHead
        title={`${project.title} | Brixa`}
        description={project.detail.intro}
        path={`${portfolioPath}/${slug}`}
        alternatePaths={{ id: `${LOCALES.id.portfolioPath}/${slug}`, en: `${LOCALES.en.portfolioPath}/${slug}` }}
      />
      <div className="min-h-screen bg-paper">
        <Navbar />
        <main>
          <section className="px-6 pb-16 pt-32 md:pb-24 md:pt-40">
            <div className="mx-auto max-w-3xl">
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
                <DetailBackLink fallbackTo={`${homePath}#portfolio`} label={t.portfolioDetail.backLabel} />
              </motion.div>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.05}
                className="mt-8 font-label text-xs font-medium uppercase tracking-[0.15em] text-primary-600"
              >
                {t.portfolioDetail.eyebrow} · {project.category}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.1}
                className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-5xl"
              >
                {project.title}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.13}
                className="mt-4 text-base leading-relaxed text-ink-900/70 md:text-lg"
              >
                {project.detail.intro}
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.2}
                className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 p-5"
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-ink-800">
                  <Cover />
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.25}
                className="mt-10 rounded-2xl border border-ink-900/10 p-6 md:p-8"
              >
                <p className="font-label text-xs font-medium uppercase tracking-[0.15em] text-ink-900/40">
                  {t.portfolioDetail.highlightsLabel}
                </p>
                <ul className="mt-5 space-y-4">
                  {project.detail.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600/10">
                        <Check size={12} className="text-primary-600" />
                      </span>
                      <span className="text-sm leading-relaxed text-ink-900/80 md:text-base">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.3}
                className="mt-14 rounded-2xl bg-ink-900 p-8 text-center md:p-12"
              >
                <h2 className="font-display text-2xl font-bold text-paper md:text-3xl">
                  {t.portfolioDetail.ctaTitle}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-paper/60 md:text-base">
                  {t.portfolioDetail.ctaDescription}
                </p>
                <Link
                  to={`${homePath}#contact`}
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 font-label text-xs font-medium uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-primary-500"
                >
                  {t.portfolioDetail.ctaButton}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.35} className="mt-16">
                <p className="font-label text-xs font-medium uppercase tracking-[0.15em] text-ink-900/40">
                  {t.portfolioDetail.otherProjectsLabel}
                </p>
                <ul className="mt-5 divide-y divide-ink-900/10 border-t border-ink-900/10">
                  {otherProjects.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`${portfolioPath}/${item.slug}`}
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

export default PortfolioDetail
