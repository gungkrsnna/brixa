import { ArrowUpRight, Check } from 'lucide-react'
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { useLocale } from '../../i18n/LocaleContext'
import { WHATSAPP_NUMBER } from '../../constants/contact'
import { handleSectionLinkClick } from '../../utils/scrollToSection'

// Shared spring config for the focus (blur/fade/scale) transitions — makes
// the values glide/settle toward the scroll position instead of tracking it
// 1:1, which is what gives scroll-linked motion that softer, physical feel.
const FOCUS_SPRING = { stiffness: 120, damping: 20, mass: 0.4 }

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Promo() {
  const { t } = useLocale()
  const promo = t.promo
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Same free-scroll focus effect as every other section: enter/exit each
  // tied to exactly one viewport height of scrolling, spring-smoothed so it
  // glides rather than tracking the scroll position 1:1.
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

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(promo.waMessage)}`

  return (
    <section
      ref={sectionRef}
      id="promo"
      className="relative flex min-h-screen min-h-[100svh] scroll-mt-20 flex-col justify-center bg-ink-900 py-24 text-paper md:py-32"
    >
      <motion.div style={focusStyle} className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-20">
          {/* Left: pitch + what's included */}
          <div>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
              className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-[0.2em] text-primary-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              {promo.eyebrow}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.1}
              className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl"
            >
              {promo.headingPrefix}
              <span className="text-primary-400">{promo.headingHighlight}</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.2}
              className="mt-6 max-w-md text-base leading-relaxed text-paper/70 md:text-lg"
            >
              {promo.description}
            </motion.p>

            <motion.ul
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.3}
              className="mt-10 space-y-4"
            >
              {promo.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-400/15 text-primary-400">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-paper/80">{feature}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: price card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.2}
            className="rounded-2xl bg-primary-600 p-8 shadow-xl shadow-ink-900/30 md:p-10"
          >
            <span className="font-label text-xs uppercase tracking-[0.2em] text-paper/70">
              {promo.cardLabel}
            </span>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="whitespace-nowrap font-display text-4xl font-bold tracking-tight md:text-5xl">
                {promo.price}
              </span>
              <span className="text-paper/70">{promo.pricePeriod}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-paper/70">{promo.cardNote}</p>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-paper px-7 py-3.5 font-label text-[13px] font-medium uppercase tracking-[0.12em] text-ink-900 transition-colors duration-300 hover:bg-paper/90"
            >
              {promo.ctaLabel}
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={0.4}
          className="mt-16 text-sm text-paper/50"
        >
          {promo.finePrintPrefix}{' '}
          <a
            href="#services"
            onClick={(e) => handleSectionLinkClick(e, '#services')}
            className="underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
          >
            {promo.finePrintLink}
          </a>
        </motion.p>
      </motion.div>
    </section>
  )
}

export default Promo
