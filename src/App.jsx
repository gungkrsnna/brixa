import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { LocaleProvider } from './i18n/LocaleContext'
import SiteHead from './i18n/SiteHead'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppFloatingButton from './components/layout/WhatsAppFloatingButton'
import Hero from './components/sections/Hero'
import Clients from './components/sections/Clients'
import Services from './components/sections/Services'
import Promo from './components/sections/Promo'
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
  // undefined (not yet committed) reads as "first run". Committed only from
  // inside the raf2 callback below, never synchronously in the effect body —
  // StrictMode double-invokes this effect (mount, cleanup, mount) on every
  // real mount, and cleanup cancels that first pass's rafs before they ever
  // fire, so only the surviving invocation's raf2 runs and commits. Flipping
  // it synchronously up here instead would have the discarded first pass
  // mark "first run" as done before the real pass reads it.
  const prevPathnameRef = useRef(undefined)

  useEffect(() => {
    const isFirstRun = prevPathnameRef.current === undefined
    const pathnameChanged = isFirstRun || prevPathnameRef.current !== pathname

    // POP (back/forward) is normally left to the browser's own scroll
    // restoration — except on the very first run: that also covers a hard
    // navigation that lands here with a hash from outside this SPA render
    // tree (e.g. a plain <a href="/#portfolio"> clicked from a detail page,
    // which is a full page load, not a client-side route change). The
    // browser's native "scroll to fragment on load" step already ran and
    // found nothing, because React hadn't rendered the target yet — so
    // without this, it silently lands at the top instead.
    if (navigationType === 'POP' && !isFirstRun) return

    // A same-page anchor (e.g. Hero's "Lihat Portofolio", clicking
    // "PORTOFOLIO" in the navbar while already on the homepage) is handled
    // by handleSectionLinkClick (src/utils/scrollToSection.js) instead —
    // it intercepts the click and scrolls itself, because letting the
    // browser's native anchor-jump run corrupts the Framer Motion
    // IntersectionObserver behind whileInView on whatever it jumps to
    // (repro was clicking straight from Hero to Portfolio and the project
    // cards never fading in). Only step in here when the route itself
    // changed — that's the case this effect exists for, where the target
    // section doesn't exist in the DOM yet for the browser to find on its
    // own.
    if (!pathnameChanged) return

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
        prevPathnameRef.current = pathname
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
          <Promo />
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
