import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { LocaleProvider } from './i18n/LocaleContext'
import SiteHead from './i18n/SiteHead'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppFloatingButton from './components/layout/WhatsAppFloatingButton'
import Hero from './components/sections/Hero'
import Clients from './components/sections/Clients'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import ServiceDetail from './components/pages/ServiceDetail'
import PortfolioDetail from './components/pages/PortfolioDetail'

// React Router doesn't reset scroll position on client-side navigation —
// without this, clicking a Link while scrolled deep into the previous page
// (e.g. the Services section) lands on the same scrollY on the new,
// shorter page, which can put the viewport at its footer.
//
// This only applies to a forward navigation (PUSH/REPLACE — clicking a
// Link). A back/forward navigation (POP — the browser's back button, or
// `navigate(-1)`) is left untouched so the browser's own scroll
// restoration can put the user back exactly where they were, section or
// scroll position included, instead of snapping to the top.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    // Deferred two animation frames out: this component sits above
    // <Routes>, so its effect runs before the sections it's jumping to
    // have mounted and subscribed their own scroll listeners (each
    // section's scroll-linked fade/blur is driven by Framer Motion's
    // useScroll, which recomputes only on a 'scroll' event). Jumping
    // synchronously here fires that event before those listeners exist,
    // so they miss it and stay stuck at their initial (invisible) value —
    // the section renders with its cards/content permanently faded out
    // until the user scrolls again. Waiting two frames lets every
    // just-mounted component's effects — including those listeners —
    // attach first.
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (hash) {
          const target = document.getElementById(hash.slice(1))
          if (target) {
            target.scrollIntoView()
            return
          }
        }
        window.scrollTo(0, 0)
      })
    })

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [pathname, hash, navigationType])

  return null
}

function Page({ locale }) {
  return (
    <LocaleProvider locale={locale}>
      <SiteHead />
      <div className="min-h-screen bg-paper">
        <Navbar />
        <main>
          <Hero />
          <Clients />
          <Services />
          <Portfolio />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
      <WhatsAppFloatingButton />
    </LocaleProvider>
  )
}

function ServiceDetailPage({ locale }) {
  return (
    <LocaleProvider locale={locale}>
      <ServiceDetail />
    </LocaleProvider>
  )
}

function PortfolioDetailPage({ locale }) {
  return (
    <LocaleProvider locale={locale}>
      <PortfolioDetail />
    </LocaleProvider>
  )
}

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Page locale="id" />} />
        <Route path="/en" element={<Page locale="en" />} />
        <Route path="/layanan/:slug" element={<ServiceDetailPage locale="id" />} />
        <Route path="/en/services/:slug" element={<ServiceDetailPage locale="en" />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetailPage locale="id" />} />
        <Route path="/en/portfolio/:slug" element={<PortfolioDetailPage locale="en" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
