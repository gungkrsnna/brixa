import { ArrowRight, Code2, Smartphone } from 'lucide-react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useLocale } from '../../i18n/LocaleContext'
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
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Hero() {
  const { t } = useLocale()
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const smoothScrollYProgress = useSpring(scrollYProgress, FOCUS_SPRING)

  // Parallax: each layer drifts at its own speed — floating image
  // placeholders fastest and in opposite directions, marquee opposite
  // the text — this is what creates the depth as the section scrolls away.
  // Spring-smoothed so it glides rather than tracking the scroll 1:1.
  const yText = useTransform(smoothScrollYProgress, [0, 1], [0, 30])
  const yMarquee = useTransform(smoothScrollYProgress, [0, 1], [0, -30])
  const yImageA = useTransform(smoothScrollYProgress, [0, 1], [0, -90])
  const yImageB = useTransform(smoothScrollYProgress, [0, 1], [0, 110])

  // Scroll is a normal, free scroll — nothing snaps or forces the next
  // section. Hero stays sharp, then softens out of focus (blur + fade +
  // slight shrink) as it hands off to the next section. Tied to the
  // section's BOTTOM edge crossing exactly one viewport height — not a
  // percentage of Hero's own height — so the transition takes the same
  // amount of scrolling no matter how tall the content is.
  const { scrollYProgress: exitProgress } = useScroll({
    target: sectionRef,
    offset: ['end end', 'end start'],
  })
  const smoothExitProgress = useSpring(exitProgress, FOCUS_SPRING)
  const heroOpacity = useTransform(smoothExitProgress, [0.3, 1], [1, 0.15])
  const heroScale = useTransform(smoothExitProgress, [0.3, 1], [1, 0.96])
  const heroBlurPx = useTransform(smoothExitProgress, [0.3, 1], [0, 12])
  const heroFilter = useMotionTemplate`blur(${heroBlurPx}px)`

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      style={
        prefersReducedMotion
          ? undefined
          : { opacity: heroOpacity, scale: heroScale, filter: heroFilter }
      }
      className="relative flex min-h-screen min-h-[100svh] flex-col justify-center overflow-hidden bg-paper pt-32 pb-16 md:pt-44 md:pb-20"
    >
      {/* Floating decorative icons — no card/box behind them, just a soft
          colour glow for weight. Positioned + parallaxed so they read as
          depth, not clutter. */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: yImageA }}
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-28 hidden -rotate-6 md:block"
      >
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary-600/25 blur-2xl" />
          <Code2 size={56} strokeWidth={1.5} className="text-primary-600 drop-shadow-lg" />
        </div>
      </motion.div>
      <motion.div
        style={prefersReducedMotion ? undefined : { y: yImageB }}
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-48 hidden rotate-6 lg:block"
      >
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-ink-900/15 blur-2xl" />
          <Smartphone size={44} strokeWidth={1.5} className="text-ink-900 drop-shadow-lg" />
        </div>
      </motion.div>

      <motion.div
        style={prefersReducedMotion ? undefined : { y: yText }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-6xl lg:text-7xl"
        >
          {t.hero.headlinePrefix}
          <span className="text-primary-600">{t.hero.headlineHighlight}</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink-900/70 md:text-lg"
        >
          {t.hero.paragraph}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#contact"
            onClick={(e) => handleSectionLinkClick(e, '#contact')}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-ink-900 px-7 py-3.5 font-label text-[13px] font-medium uppercase tracking-[0.12em] text-paper"
          >
            <span className="absolute inset-0 -translate-x-full bg-primary-600 transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative">{t.hero.ctaPrimary}</span>
            <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleSectionLinkClick(e, '#portfolio')}
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/25 px-7 py-3.5 font-label text-[13px] font-medium uppercase tracking-[0.12em] text-ink-900 transition-colors duration-300 hover:border-ink-900 hover:bg-ink-900/[0.04]"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </motion.div>

      {/* Full-bleed ticker band — fills the space where a visual would sit,
          doubles as a second, more playful pass through our services. */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: yMarquee }}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.45}
        className="group relative mt-20 border-y border-ink-900/10 py-5 md:mt-24"
      >
        <span className="absolute left-6 top-1/2 z-10 h-4 w-px -translate-y-1/2 bg-ink-900/30" />
        <span className="absolute right-6 top-1/2 z-10 h-4 w-px -translate-y-1/2 bg-ink-900/30" />

        {/* Text fades out (not a hard cut) as it nears the edges — sharp
            and fully visible only in the middle stretch. */}
        <div
          className="flex overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
          }}
        >
          <div className="flex w-max shrink-0 animate-marquee items-center gap-8 group-hover:[animation-play-state:paused]">
            {[...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee].map((item, i) => (
              <span key={i} className="flex shrink-0 items-center gap-8">
                <span className="font-label text-sm uppercase tracking-[0.15em] text-ink-900/50">
                  {item}
                </span>
                <span className="text-primary-600">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Actual optical blur on top of the fade, ramping smoothly from
            fully blurred at the very edge to none by mid-strip — this is
            what reads as "out of focus", not just faded. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 backdrop-blur-sm md:w-1/4"
          style={{
            maskImage: 'linear-gradient(to right, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 backdrop-blur-sm md:w-1/4"
          style={{
            maskImage: 'linear-gradient(to left, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
          }}
        />
      </motion.div>
    </motion.section>
  )
}

export default Hero
