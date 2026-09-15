import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LOCALES, useLocale } from '../../i18n/LocaleContext'

// A visible ID/EN segmented toggle — both options always shown, active one
// highlighted, so it reads as a real language switch rather than a single
// muted link that's easy to miss.
function LanguageToggle({ locale, className = '' }) {
  return (
    <div className={`flex items-center gap-1 rounded-full border border-ink-900/15 bg-paper p-1 ${className}`}>
      {Object.values(LOCALES).map((option) => {
        const isActive = option.code === locale
        return (
          <Link
            key={option.code}
            to={option.path}
            aria-current={isActive ? 'true' : undefined}
            className={`rounded-full px-3 py-1.5 font-label text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
              isActive ? 'bg-ink-900 text-paper' : 'text-ink-900/45 hover:text-ink-900'
            }`}
          >
            {option.label}
          </Link>
        )
      })}
    </div>
  )
}

function Navbar() {
  const { t, locale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.portfolio, href: '#portfolio' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transform-gpu will-change-transform transition-colors duration-300 ${
        isScrolled ? 'bg-paper/90 shadow-[0_1px_0_0_rgba(13,13,12,0.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[height] duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-ink-900">
          <motion.span
            whileHover={{ rotate: 135 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-paper"
          >
            B
          </motion.span>
          Brixa
        </a>

        {/* Desktop nav — sliding hover indicator */}
        <ul onMouseLeave={() => setHovered(null)} className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => (
            <li key={link.href} className="relative" onMouseEnter={() => setHovered(i)}>
              {hovered === i && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-ink-900/[0.06]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <a
                href={link.href}
                className="relative z-10 block px-4 py-2 font-label text-[13px] font-medium uppercase tracking-[0.12em] text-ink-900/70 transition-colors hover:text-ink-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center md:flex">
          <LanguageToggle locale={locale} />
        </div>

        {/* Mobile: language toggle + menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle locale={locale} />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-full p-2 text-ink-900"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-paper md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pt-2 pb-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block border-b border-ink-900/10 py-3 font-label text-sm font-medium uppercase tracking-[0.12em] text-ink-900/80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
