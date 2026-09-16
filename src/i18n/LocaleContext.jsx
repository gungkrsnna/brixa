import { createContext, useContext, useMemo } from 'react'
import id from './locales/id'
import en from './locales/en'

export const LOCALES = {
  id: { code: 'id', label: 'ID', path: '/', servicesPath: '/layanan', portfolioPath: '/portfolio', dictionary: id },
  en: { code: 'en', label: 'EN', path: '/en', servicesPath: '/en/services', portfolioPath: '/en/portfolio', dictionary: en },
}

const LocaleContext = createContext(null)

export function LocaleProvider({ locale, children }) {
  const value = useMemo(() => {
    const current = LOCALES[locale] ?? LOCALES.id
    const other = current.code === 'id' ? LOCALES.en : LOCALES.id
    return {
      locale: current.code,
      t: current.dictionary,
      otherLocale: other,
    }
  }, [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
