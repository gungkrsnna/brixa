import { ArrowUpRight } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LOCALES, useLocale } from '../../i18n/LocaleContext'

// Shared spring config for the focus (blur/fade/scale) transitions — makes
// the values glide/settle toward the scroll position instead of tracking it
// 1:1, which is what gives scroll-linked motion that softer, physical feel.
const FOCUS_SPRING = { stiffness: 120, damping: 20, mass: 0.4 }

// AI-generated mockups standing in for real project screenshots, keyed by
// slug rather than stored in the locale data since the asset is the same
// regardless of language.
const SERVICE_IMAGES = {
  'company-profile': '/images/service-company-profile.webp',
  ecommerce: '/images/service-ecommerce.webp',
  'web-app': '/images/service-webapp.webp',
  'mobile-app': '/images/service-mobile-app.webp',
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Services() {
  const { t, locale } = useLocale()
  const services = t.services.items
  const servicesPath = LOCALES[locale].servicesPath
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Free, continuous scroll — no snapping. The header and list soften in and
  // out of focus (blur + fade + slight shrink) as they cross the viewport
  // edges. Applied to the header and list only, never to the preview panel
  // beside them.
  //
  // Enter/exit are tracked separately, each tied to exactly one viewport
  // height of scrolling (not a % of this section's own height) so every
  // section gets the same transition duration regardless of how much
  // content it has.
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
      id="services"
      className="relative flex min-h-screen min-h-[100svh] scroll-mt-20 flex-col justify-center bg-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          style={focusStyle}
          className="grid gap-8 border-b border-ink-900/10 pb-12 md:grid-cols-2 md:items-end md:gap-16"
        >
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-5xl"
          >
            {t.services.headingPrefix}
            <span className="text-primary-600">{t.services.headingHighlight}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
            className="text-base leading-relaxed text-ink-900/70 md:text-lg"
          >
            {t.services.description}
          </motion.p>
        </motion.div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px] lg:gap-16">
          {/* Service list */}
          <motion.div
            style={focusStyle}
            onMouseLeave={() => setActive(0)}
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                custom={0.1 + i * 0.08}
                onMouseEnter={() => setActive(i)}
                className="group relative border-b border-ink-900/10"
              >
                <Link
                  to={`${servicesPath}/${service.slug}`}
                  className="relative flex items-center gap-6 py-8 md:gap-10 md:py-10"
                >
                  <span
                    className="absolute inset-y-0 -inset-x-6 -z-10 origin-left scale-x-0 bg-ink-900/[0.03] transition-transform duration-500 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />

                  <span className="font-label text-sm text-ink-900/35 md:w-10">
                    0{i + 1}
                  </span>

                  <h3 className="flex-1 font-display text-2xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-primary-600 md:text-3xl">
                    {service.title}
                  </h3>

                  <ArrowUpRight
                    size={24}
                    className="shrink-0 text-ink-900/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-600"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Preview panel — image + description swap together to match
              whichever service is hovered. Height matches the list column
              exactly (grid stretch), so no more mismatched/awkward sizing.
              The mockup images have a flat white background, so they sit on
              a paper-coloured card rather than directly on the accent
              colour, which would otherwise show as a clashing white box. */}
          <div className="hidden h-full lg:block">
            <div
              className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-xl shadow-ink-900/10 transition-colors duration-500 ${services[active].accent}`}
            >
              <div className="relative overflow-hidden rounded-xl bg-paper shadow-lg shadow-ink-900/20">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={SERVICE_IMAGES[services[active].slug]}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-40 w-full object-contain p-3"
                  />
                </AnimatePresence>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base leading-relaxed text-paper"
                  >
                    {services[active].description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
