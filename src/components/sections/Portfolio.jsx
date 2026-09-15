import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useLocale } from '../../i18n/LocaleContext'

// Shared spring config for the focus (blur/fade/scale) transitions — makes
// the values glide/settle toward the scroll position instead of tracking it
// 1:1, which is what gives scroll-linked motion that softer, physical feel.
const FOCUS_SPRING = { stiffness: 120, damping: 20, mass: 0.4 }

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

// Wireframe-style mockups — stand in for real project screenshots until
// there are live case studies to show. Each one is laid out like the actual
// UI it represents (nav+hero, product grid, dashboard, phone screen) using
// plain colour blocks, so it reads as a structural preview rather than a
// literal (and misleading) screenshot.
function CoverProfile() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 px-6 pb-5 pt-9">
      {/* nav bar */}
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-8 rounded-full bg-paper/40" />
        <div className="hidden items-center gap-3 sm:flex">
          <div className="h-1.5 w-4 rounded-full bg-paper/30" />
          <div className="h-1.5 w-4 rounded-full bg-paper/15" />
          <div className="h-1.5 w-4 rounded-full bg-paper/15" />
        </div>
        <div className="h-4 w-9 rounded-full bg-primary-500" />
      </div>

      {/* hero: eyebrow + heading + two CTAs + layered image */}
      <div className="flex flex-1 items-center gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-1.5 w-12 rounded-full bg-primary-500/70" />
          <div className="h-3 w-full rounded-full bg-paper/30" />
          <div className="h-3 w-4/5 rounded-full bg-paper/30" />
          <div className="h-1.5 w-2/3 rounded-full bg-paper/10" />
          <div className="mt-2 flex gap-1.5">
            <div className="h-4 w-11 rounded-full bg-primary-500" />
            <div className="h-4 w-11 rounded-full border border-paper/25" />
          </div>
        </div>
        <div className="relative aspect-square w-[30%] shrink-0">
          <div className="absolute inset-0 rounded-xl bg-primary-500/20" />
          <div className="absolute -bottom-2 -left-2 h-1/2 w-1/2 rounded-lg bg-primary-500/60" />
        </div>
      </div>

      {/* client logo strip */}
      <div className="flex items-center justify-between border-y border-paper/10 py-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1.5 w-6 rounded-full bg-paper/15" />
        ))}
      </div>

      {/* feature cards with icon token */}
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 rounded-md bg-paper/[0.06] p-2">
            <div className="h-3 w-3 rounded-full bg-primary-500/70" />
            <div className="h-1.5 w-full rounded-full bg-paper/20" />
            <div className="h-1.5 w-2/3 rounded-full bg-paper/10" />
          </div>
        ))}
      </div>
    </div>
  )
}

function CoverCommerce() {
  return (
    <div className="absolute inset-0 flex flex-col px-6 pb-6 pt-10">
      {/* search + cart */}
      <div className="flex items-center gap-2">
        <div className="h-5 flex-1 rounded-full bg-paper/10" />
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500">
          <span className="h-1.5 w-1.5 rounded-full bg-paper" />
        </div>
      </div>

      {/* product grid */}
      <div className="mt-4 grid flex-1 grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className={`aspect-square rounded-lg ${i === 1 || i === 4 ? 'bg-primary-500/50' : 'bg-paper/10'}`} />
            <div className="h-1.5 w-3/4 rounded-full bg-paper/20" />
            <div className="h-1.5 w-1/2 rounded-full bg-primary-500/70" />
          </div>
        ))}
      </div>
    </div>
  )
}

function CoverSystem() {
  return (
    <div className="absolute inset-0 flex px-6 pb-6 pt-10">
      {/* sidebar */}
      <div className="mr-4 flex flex-col items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-primary-500" />
        <div className="h-2 w-2 rounded-full bg-paper/20" />
        <div className="h-2 w-2 rounded-full bg-paper/20" />
        <div className="h-2 w-2 rounded-full bg-paper/20" />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {/* stat cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 rounded-lg bg-paper/10" />
          <div className="h-8 rounded-lg bg-paper/10" />
          <div className="h-8 rounded-lg bg-paper/10" />
        </div>
        {/* bar chart */}
        <div className="flex flex-1 items-end gap-1.5 rounded-lg bg-paper/[0.06] p-3">
          {[40, 65, 35, 80, 55, 90, 45].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-primary-500' : 'bg-paper/25'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function CoverMobile() {
  return (
    <div className="absolute inset-0 flex items-center justify-center py-6">
      <div className="flex h-full w-[42%] flex-col rounded-[1.4rem] border border-paper/20 p-2.5">
        {/* status bar */}
        <div className="flex items-center justify-between px-1">
          <div className="h-1 w-6 rounded-full bg-paper/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-paper/30" />
        </div>
        {/* screen title */}
        <div className="mt-2.5 h-2 w-1/2 rounded-full bg-paper/30" />
        {/* date grid */}
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`aspect-square rounded-md ${i === 3 ? 'bg-primary-500' : 'bg-paper/10'}`} />
          ))}
        </div>
        {/* booking list */}
        <div className="mt-3 flex-1 space-y-1.5">
          <div className="h-4 rounded-md bg-paper/10" />
          <div className="h-4 rounded-md bg-primary-500/40" />
          <div className="h-4 rounded-md bg-paper/10" />
        </div>
        {/* bottom nav */}
        <div className="mt-2 flex justify-around border-t border-paper/10 pt-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-primary-500' : 'bg-paper/20'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Locale content stores a `cover` key ('profile' | 'commerce' | 'system' |
// 'mobile') rather than a component reference, keeping the i18n data plain.
const COVERS = {
  profile: CoverProfile,
  commerce: CoverCommerce,
  system: CoverSystem,
  mobile: CoverMobile,
}

function Portfolio() {
  const { t } = useLocale()
  const projects = t.portfolio.items
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
            <motion.a
              key={project.title}
              href="#contact"
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
            </motion.a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default Portfolio
