import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import BackToTop from './components/BackToTop'
import { useScrollAnimations } from './components/ScrollAnimations'
import Home from './pages/Home'
import Leistungen from './pages/Leistungen'
import Referenzen from './pages/Referenzen'
import About from './pages/About'
import FortyEightHours from './pages/FortyEightHours'
import KI from './pages/KI'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  useScrollAnimations()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leistungen" element={<Leistungen />} />
        <Route path="/referenzen" element={<Referenzen />} />
        <Route path="/about" element={<About />} />
        <Route path="/48h" element={<FortyEightHours />} />
        <Route path="/ki" element={<KI />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  )
}

export default App
