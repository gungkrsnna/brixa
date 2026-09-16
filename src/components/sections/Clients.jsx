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

// Real client logos, as provided in public/images. Shown at full colour and
// even height (not greyed out or faded) — a small, deliberate list deserves
// to read as prominent, not like filler.
const CLIENTS = [
  { src: '/images/bankaruna.webp', alt: 'BPR Aruna' },
  { src: '/images/logo-itb-stikom-bali.webp', alt: 'Institut Teknologi dan Bisnis STIKOM Bali' },
  {
    src: '/images/Group%202.webp',
    alt: 'Pusat Unggulan Ipteks Perguruan Tinggi, Universitas Udayana, dan Center for Public Health Innovation',
    wide: true,
  },
  { src: '/images/logopikat.webp', alt: 'Pikat' },
  { src: '/images/logo-DTp3nBCm.webp', alt: 'KK DMC' },
  { src: '/images/logo-fitwash.webp', alt: 'Fit Wash Laundry Bali' },
  { src: '/images/logo-blast.webp', alt: 'Blast Barbershop Bali-Legian' },
]

function Clients() {
  const { t } = useLocale()
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

  return (
    <section ref={sectionRef} className="relative bg-paper py-16 md:py-20">
      <motion.div style={focusStyle} className="mx-auto max-w-6xl px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={0}
          className="text-center font-label text-xs uppercase tracking-[0.2em] text-ink-900/40"
        >
          {t.clients.label}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={0.1}
          className="mt-12 grid grid-cols-2 items-center gap-x-10 gap-y-10 sm:grid-cols-3 md:flex md:flex-wrap md:items-center md:justify-center md:gap-16"
        >
          {CLIENTS.map((client) => (
            <div
              key={client.src}
              className={`flex h-20 items-center justify-center md:h-28 ${
                client.wide ? 'col-span-2 sm:col-span-3' : ''
              }`}
            >
              <img
                src={client.src}
                alt={client.alt}
                className={`h-full w-auto object-contain ${client.wide ? 'max-w-[460px]' : 'max-w-[200px]'}`}
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Clients
