import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocale } from '../../i18n/LocaleContext'
import { WHATSAPP_NUMBER } from '../../constants/contact'

// Persistent contact shortcut, styled to match the site's own button
// language (ink pill + primary-blue fill-sweep on hover) rather than the
// generic bright-green WhatsApp badge most sites bolt on.
function WhatsAppFloatingButton() {
  const { t } = useLocale()

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsappFloating.label}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="group fixed bottom-6 right-6 z-40 flex items-center overflow-hidden rounded-full bg-ink-900 p-4 shadow-xl shadow-ink-900/25"
    >
      <span className="absolute inset-0 -translate-x-full bg-primary-600 transition-transform duration-300 ease-out group-hover:translate-x-0" />
      <MessageCircle size={22} strokeWidth={1.75} className="relative shrink-0 text-paper" />
      <span className="relative max-w-0 overflow-hidden whitespace-nowrap font-label text-[13px] font-medium uppercase tracking-[0.12em] text-paper transition-[max-width] duration-300 ease-out group-hover:max-w-[160px] group-hover:pl-2.5">
        {t.whatsappFloating.label}
      </span>
    </motion.a>
  )
}

export default WhatsAppFloatingButton
