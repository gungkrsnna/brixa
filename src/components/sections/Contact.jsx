import { ArrowUpRight, Mail, MessageCircle, Send } from 'lucide-react'
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { useLocale } from '../../i18n/LocaleContext'
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../../constants/contact'

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

function Contact() {
  const { t } = useLocale()
  const fields = [
    { name: 'name', type: 'text', label: t.contact.form.nameLabel, placeholder: t.contact.form.namePlaceholder, required: true },
    { name: 'email', type: 'email', label: t.contact.form.emailLabel, placeholder: t.contact.form.emailPlaceholder, required: true },
  ]
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const smoothScrollYProgress = useSpring(scrollYProgress, FOCUS_SPRING)
  const yAccent = useTransform(smoothScrollYProgress, [0, 1], [-60, 60])

  // Free, continuous scroll — the form/content softens into and out of
  // focus (blur + fade + slight shrink). Enter and exit are each tied to
  // exactly one viewport height of scrolling, so the transition takes the
  // same amount of scrolling as every other section, never forced.
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

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { mailSubjectPrefix, mailFallbackName, mailBodyName, mailBodyEmail, mailBodyMessage } = t.contact
    const subject = encodeURIComponent(`${mailSubjectPrefix} ${form.name || mailFallbackName}`)
    const body = encodeURIComponent(
      `${mailBodyName}: ${form.name}\n${mailBodyEmail}: ${form.email}\n\n${mailBodyMessage}:\n${form.message}`
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen min-h-[100svh] scroll-mt-20 flex-col justify-center overflow-hidden bg-paper py-24 md:py-32"
    >
      {/* Decorative icon accent, tucked behind the form — no card/box, just
          a soft colour glow for weight — parallaxed */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: yAccent }}
        aria-hidden="true"
        className="pointer-events-none absolute right-12 top-24 hidden rotate-6 lg:block xl:right-20"
      >
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary-600/20 blur-2xl" />
          <Send size={52} strokeWidth={1.5} className="text-primary-600 drop-shadow-lg" />
        </div>
      </motion.div>

      <motion.div style={focusStyle} className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Left: heading + direct channels */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
              className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-5xl"
            >
              {t.contact.headingPrefix}
              <span className="text-primary-600">{t.contact.headingHighlight}</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.1}
              className="mt-6 max-w-md text-base leading-relaxed text-ink-900/70 md:text-lg"
            >
              {t.contact.paragraph}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              custom={0.2}
              className="mt-12"
            >
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center justify-between gap-4 border-t border-ink-900/10 py-6"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <Mail size={20} className="shrink-0 text-ink-900/40" />
                  <span className="min-w-0">
                    <span className="block font-label text-xs uppercase tracking-[0.15em] text-ink-900/40">
                      {t.contact.emailLabel}
                    </span>
                    <span className="block break-all font-display text-lg font-bold text-ink-900 transition-colors duration-300 group-hover:text-primary-600 md:text-xl">
                      {EMAIL}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-ink-900/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-600"
                />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-t border-ink-900/10 py-6 last:border-b"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <MessageCircle size={20} className="shrink-0 text-ink-900/40" />
                  <span className="min-w-0">
                    <span className="block font-label text-xs uppercase tracking-[0.15em] text-ink-900/40">
                      {t.contact.whatsappLabel}
                    </span>
                    <span className="block break-words font-display text-lg font-bold text-ink-900 transition-colors duration-300 group-hover:text-primary-600 md:text-xl">
                      {WHATSAPP_DISPLAY}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-ink-900/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-600"
                />
              </a>
            </motion.div>
          </div>

          {/* Right: form (submits via mailto, no backend needed) */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.2}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {fields.map((field) => (
              <label key={field.name} className="block">
                <span className="font-label text-xs uppercase tracking-[0.15em] text-ink-900/50">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange(field.name)}
                  className="mt-2 w-full border-b border-ink-900/20 bg-transparent py-2.5 text-lg text-ink-900 outline-none transition-colors duration-300 placeholder:text-ink-900/30 focus:border-ink-900"
                />
              </label>
            ))}

            <label className="block">
              <span className="font-label text-xs uppercase tracking-[0.15em] text-ink-900/50">
                {t.contact.form.messageLabel}
              </span>
              <textarea
                required
                rows={4}
                placeholder={t.contact.form.messagePlaceholder}
                value={form.message}
                onChange={handleChange('message')}
                className="mt-2 w-full resize-none border-b border-ink-900/20 bg-transparent py-2.5 text-lg text-ink-900 outline-none transition-colors duration-300 placeholder:text-ink-900/30 focus:border-ink-900"
              />
            </label>

            <button
              type="submit"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-ink-900 px-7 py-3.5 font-label text-[13px] font-medium uppercase tracking-[0.12em] text-paper"
            >
              <span className="absolute inset-0 -translate-x-full bg-primary-600 transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative">{t.contact.form.submit}</span>
              <ArrowUpRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
