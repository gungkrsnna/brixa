import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

// Prefers actually going back (browser history), so a visitor who scrolled
// into a section on the homepage before clicking through lands back at
// that exact scroll position — not just the top of the section. Falls
// back to a direct link only when there's no in-app history to return to
// (e.g. the detail page was opened directly from a shared URL).
function DetailBackLink({ fallbackTo, label }) {
  const navigate = useNavigate()
  const location = useLocation()
  const canGoBack = location.key !== 'default'

  return (
    <button
      type="button"
      onClick={() => (canGoBack ? navigate(-1) : navigate(fallbackTo))}
      className="group inline-flex items-center gap-2 font-label text-xs font-medium uppercase tracking-[0.12em] text-ink-900/50 transition-colors hover:text-ink-900"
    >
      <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
      {label}
    </button>
  )
}

export default DetailBackLink
