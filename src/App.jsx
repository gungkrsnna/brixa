import { Navigate, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page locale="id" />} />
      <Route path="/en" element={<Page locale="en" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
