import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { LOCALES, useLocale } from '../../i18n/LocaleContext'
import { COVERS } from '../portfolio/ProjectCovers'

// Shared spring config for the focus (blur/fade/scale) transitions — makes
// the values glide/settle toward the scroll position instead of tracking it
// 1:1, which is what gives scroll-linked motion that softer, physical feel.
const FOCUS_SPRING = { stiffness: 120, damping: 20, mass: 0.4 }

const MotionLink = motion.create(Link)

// This section's signature entrance is a soft zoom-in rather than the
// fade-up used elsewhere — one of a few distinct "arrival" feels between
// sections as the page snap-scrolls.
const zoomIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Portfolio() {
  const { t, locale } = useLocale()
  const projects = t.portfolio.items
  const portfolioPath = LOCALES[locale].portfolioPath
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Free, continuous scroll — the section softens into and out of focus
  // (blur + fade + slight shrink) as it crosses the viewport edges. Enter
  // and exit are each tied to exactly one viewport height of scrolling
  // (not a % of this section's own height), so the transition takes the
  // same amount of scrolling regardless of how much content is inside.
  const { scrollYProgress: enterProgressRaw } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  })
  const { scrollYProgress: exitProgressRaw } = useScroll({
    target: sectionRef,
    offset: ['end end', 'end start'],
  })
  const enterProgress = useSpring(enterProgressRaw, FOCUS_SPRING)
  const exitProgress = useSpring(exitProgressRaw, FOCUS_SPRING)

  const enterOpacity = useTransform(enterProgress, [0, 0.6], [0, 1])
  const exitOpacity = useTransform(exitProgress, [0.4, 1], [1, 0])
  const focusOpacity = useTransform([enterOpacity, exitOpacity], ([e, x]) => Math.min(e, x))

  const enterScale = useTransform(enterProgress, [0, 0.6], [0.96, 1])
  const exitScale = useTransform(exitProgress, [0.4, 1], [1, 0.96])
  const focusScale = useTransform([enterScale, exitScale], ([e, x]) => Math.min(e, x))

  const enterBlur = useTransform(enterProgress, [0, 0.6], [12, 0])
  const exitBlur = useTransform(exitProgress, [0.4, 1], [0, 12])
  const focusBlurPx = useTransform([enterBlur, exitBlur], ([e, x]) => Math.max(e, x))
  const focusFilter = useMotionTemplate`blur(${focusBlurPx}px)`
  const focusStyle = prefersReducedMotion
    ? undefined
    : { opacity: focusOpacity, scale: focusScale, filter: focusFilter }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative flex min-h-screen min-h-[100svh] scroll-mt-20 flex-col justify-center bg-paper py-24 md:py-32"
    >
      <motion.div
        style={focusStyle}
        className="mx-auto max-w-6xl px-6"
      >
        <div className="grid gap-8 border-b border-ink-900/10 pb-12 md:grid-cols-2 md:items-end md:gap-16">
          <motion.h2
            variants={zoomIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-5xl"
          >
            {t.portfolio.headingPrefix}
            <span className="text-primary-600">{t.portfolio.headingHighlight}</span>
          </motion.h2>
          <motion.p
            variants={zoomIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
            className="text-base leading-relaxed text-ink-900/70 md:text-lg"
          >
            {t.portfolio.description}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {projects.map((project, i) => {
            const Cover = COVERS[project.cover]
            return (
            <MotionLink
              key={project.title}
              to={`${portfolioPath}/${project.slug}`}
              variants={zoomIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.15 + i * 0.1}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 p-5">
                <div className="relative h-full w-full scale-100 overflow-hidden rounded-xl bg-ink-800 transition-transform duration-500 ease-out group-hover:scale-105">
                  <Cover />
                </div>
                <span className="absolute left-5 top-5 rounded-full bg-paper/95 px-3 py-1 font-label text-[11px] font-medium uppercase tracking-[0.12em] text-ink-900">
                  {project.category}
                </span>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-primary-600 md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 max-w-sm text-sm text-ink-900/60 md:text-base">
                    {project.description}
                  </p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="mt-1 shrink-0 text-ink-900/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-600"
                />
              </div>
            </MotionLink>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default Portfolio
