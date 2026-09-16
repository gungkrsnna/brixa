import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useLocale } from '../../i18n/LocaleContext'

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

// This section's signature: text and image slide in from opposite sides and
// converge — distinct from the fade-up/zoom used in the sections around it.
const slideFromLeft = {
  hidden: { opacity: 0, x: -48 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

const slideFromRight = {
  hidden: { opacity: 0, x: 48 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function About() {
  const { t } = useLocale()
  const principles = t.about.principles
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const smoothScrollYProgress = useSpring(scrollYProgress, FOCUS_SPRING)
  const yImage = useTransform(smoothScrollYProgress, [0, 1], [-50, 50])

  // Free, continuous scroll — the whole section softens into and out of
  // focus (blur + fade + slight shrink). Enter and exit are each tied to
  // exactly one viewport height of scrolling (not a % of this section's own
  // height), so the transition takes the same amount of scrolling no matter
  // how much content is inside.
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
      id="about"
      className="relative flex min-h-screen min-h-[100svh] scroll-mt-20 flex-col justify-center bg-paper py-24 md:py-32"
    >
      <motion.div style={focusStyle} className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
          <div>
            <motion.h2
              variants={slideFromLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
              className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-5xl"
            >
              {t.about.headingPrefix}
              <span className="text-primary-600">{t.about.headingHighlight}</span>
            </motion.h2>

            <motion.p
              variants={slideFromLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.1}
              className="mt-7 text-base leading-relaxed text-ink-900/70 md:text-lg"
            >
              {t.about.paragraph}
            </motion.p>
          </div>

          {/* AI-generated workspace photo — stands in for a real team/office
              photo until one is available. The small accent square reuses
              the same image at a tighter crop (object-position) rather than
              a second asset. */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.15}
            className="relative"
          >
            <motion.div style={prefersReducedMotion ? undefined : { y: yImage }} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-700 shadow-xl shadow-ink-900/10">
                <img
                  src="/images/about-workspace.webp"
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 overflow-hidden rounded-2xl shadow-lg shadow-ink-900/10 sm:block">
                <img
                  src="/images/about-workspace.webp"
                  alt=""
                  className="h-full w-full object-cover object-[85%_75%]"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink-900/10 pt-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink-900/10">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.2 + i * 0.1}
              className="md:px-10 md:first:pl-0 md:last:pr-0"
            >
              <span className="font-label text-sm text-ink-900/35">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900 md:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-3 text-ink-900/60">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default About
