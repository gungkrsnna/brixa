import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LOCALES, useLocale } from '../../i18n/LocaleContext'
import { handleSectionLinkClick } from '../../utils/scrollToSection'
import PromoBanner from './PromoBanner'

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
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [activeSection, setActiveSection] = useState('home')
  const homePath = LOCALES[locale].path

  // Prefixed with the locale's home path (not a bare hash) so these links
  // still resolve correctly from pages other than the homepage, e.g. a
  // service detail page.
  const navLinks = [
    { id: 'home', label: t.nav.home, href: `${homePath}#home` },
    { id: 'services', label: t.nav.services, href: `${homePath}#services` },
    { id: 'promo', label: t.nav.promo, href: `${homePath}#promo` },
    { id: 'portfolio', label: t.nav.portfolio, href: `${homePath}#portfolio` },
    { id: 'about', label: t.nav.about, href: `${homePath}#about` },
    { id: 'contact', label: t.nav.contact, href: `${homePath}#contact` },
  ]

  // On a detail page (no in-page sections to scrollspy) the relevant nav
  // item is still knowable from the URL — e.g. any /layanan/:slug route
  // means "Services" is the active item. On the homepage itself this is
  // null and the scroll-based activeSection below takes over instead.
  const routeActiveId = location.pathname.startsWith(LOCALES[locale].servicesPath)
    ? 'services'
    : location.pathname.startsWith(LOCALES[locale].portfolioPath)
      ? 'portfolio'
      : null
  const activeId = routeActiveId ?? activeSection

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy: whichever section crosses the horizontal midline of the
  // viewport becomes active. Only the homepage has these section ids in
  // the DOM, so this is a no-op (and harmless) on detail pages.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transform-gpu will-change-transform transition-colors duration-300 ${
        isScrolled ? 'bg-paper/90 shadow-[0_1px_0_0_rgba(13,13,12,0.08)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <PromoBanner />

      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[height] duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Logo */}
        <a
          href={`${homePath}#home`}
          onClick={(e) => handleSectionLinkClick(e, `${homePath}#home`)}
          className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-ink-900"
        >
          <motion.img
            src="/logo.png"
            alt=""
            width="36"
            height="36"
            whileHover={{ rotate: 135 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="h-9 w-9"
          />
          Bali Pro Dev
        </a>

        {/* Desktop nav — sliding hover indicator + a persistent underline
            that tracks whichever section/page is currently active */}
        <ul onMouseLeave={() => setHovered(null)} className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => {
            const isActive = link.id === activeId
            return (
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
                  onClick={(e) => handleSectionLinkClick(e, link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative z-10 block px-4 py-2 font-label text-[13px] font-medium uppercase tracking-[0.12em] transition-colors hover:text-ink-900 ${
                    isActive ? 'text-ink-900' : 'text-ink-900/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-primary-600"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
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
              {navLinks.map((link) => {
                const isActive = link.id === activeId
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        handleSectionLinkClick(e, link.href)
                        setIsOpen(false)
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      className={`flex items-center justify-between border-b border-ink-900/10 py-3 font-label text-sm font-medium uppercase tracking-[0.12em] ${
                        isActive ? 'text-ink-900' : 'text-ink-900/80'
                      }`}
                    >
                      {link.label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
