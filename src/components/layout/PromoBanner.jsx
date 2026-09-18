import { Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { useLocale } from '../../i18n/LocaleContext'
import { handleSectionLinkClick } from '../../utils/scrollToSection'

const STORAGE_KEY = 'promo-banner-dismissed'

function isDismissed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

// Slim announcement strip stacked above the nav row inside the same fixed
// header — the only way most visitors will ever learn the promo section
// exists, since it otherwise sits four sections down the homepage. Dismissal
// is remembered per-browser so it doesn't nag repeat visitors.
function PromoBanner() {
  const { t } = useLocale()
  const [dismissed, setDismissed] = useState(isDismissed)

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Ignore storage failures (private browsing, quota, etc.) — the
      // banner still hides for the current session either way.
    }
  }

  return (
    <div className="flex items-center justify-center gap-3 bg-primary-600 px-4 py-2 text-paper">
      <a
        href="#promo"
        onClick={(e) => handleSectionLinkClick(e, '#promo')}
        className="flex min-w-0 items-center gap-2 text-center font-label text-[12px] font-medium uppercase tracking-[0.08em] transition-opacity hover:opacity-80 md:text-[13px]"
      >
        <Sparkles size={14} className="hidden shrink-0 sm:block" />
        <span className="truncate normal-case tracking-normal">{t.promo.bannerText}</span>
        <span className="shrink-0 underline underline-offset-2">{t.promo.bannerCta}</span>
      </a>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={t.promo.bannerDismiss}
        className="shrink-0 rounded-full p-1 text-paper/80 transition-colors hover:bg-paper/15 hover:text-paper"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export default PromoBanner
