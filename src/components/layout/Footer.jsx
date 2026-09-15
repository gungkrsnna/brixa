import { ArrowUp } from 'lucide-react'
import { useLocale } from '../../i18n/LocaleContext'
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../../constants/contact'

function Footer() {
  const { t } = useLocale()
  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.portfolio, href: '#portfolio' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <footer className="relative overflow-hidden bg-ink-900 pb-8 pt-20 text-paper">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-paper">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-paper">
                B
              </span>
              Brixa
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/50">{t.footer.tagline}</p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-label text-xs uppercase tracking-[0.15em] text-paper/40">{t.footer.navLabel}</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-paper/70 transition-colors duration-300 hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-label text-xs uppercase tracking-[0.15em] text-paper/40">{t.footer.contactLabel}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-paper/70 transition-colors duration-300 hover:text-paper"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-paper/70 transition-colors duration-300 hover:text-paper"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-6 border-t border-paper/10 pt-8 md:flex-row">
          <span className="font-label text-xs uppercase tracking-[0.15em] text-paper/40">
            © {new Date().getFullYear()} Brixa. {t.footer.copyright}
          </span>

          <a
            href="#home"
            className="group flex items-center gap-2 font-label text-xs uppercase tracking-[0.15em] text-paper/40 transition-colors duration-300 hover:text-paper"
          >
            {t.footer.backToTop}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-paper/20 transition-colors duration-300 group-hover:border-paper/40">
              <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Giant faint wordmark — closing visual, echoes the "01" motif in Hero */}
      <span
        aria-hidden="true"
        className="pointer-events-none mt-16 block select-none text-center font-display text-[16vw] font-bold leading-none text-paper/[0.04]"
      >
        BRIXA
      </span>
    </footer>
  )
}

export default Footer
