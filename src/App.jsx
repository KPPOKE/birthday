import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero/Hero'
import LoveLetter from './components/LoveLetter/LoveLetter'
import Gallery from './components/Gallery/Gallery'
import BirthdayWish from './components/BirthdayWish/BirthdayWish'
import Footer from './components/Footer/Footer'
import CursorTrail from './components/CursorTrail/CursorTrail'
import NavDots from './components/NavDots/NavDots'
import WaveDivider from './components/WaveDivider/WaveDivider'
import BackgroundParticles from './components/BackgroundParticles/BackgroundParticles'
import MusicToggle from './components/MusicToggle/MusicToggle'
import useMagneticHover from './hooks/useMagneticHover'
import './App.css'

function LoadingScreen({ onFinish }) {
  const [hidden, setHidden] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const btnRef = useRef(null)

  useMagneticHover(btnRef)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setHidden(true)
    // Send a custom event that MusicToggle listens for
    window.dispatchEvent(new CustomEvent('playMusic'))
    onFinish?.()
  }

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <span className="loading-screen__heart">💕</span>
      {!isReady ? (
        <>
          <p className="loading-screen__text">Preparing something special...</p>
          <div className="loading-screen__bar">
            <div className="loading-screen__bar-fill" />
          </div>
        </>
      ) : (
        <button className="loading-screen__enter-btn" onClick={handleEnter} ref={btnRef}>
          Buka Hadiah 🎁
        </button>
      )}
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef(null)

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <LoadingScreen onFinish={() => setLoaded(true)} />

      {/* Global enhancements */}
      <CursorTrail />
      <NavDots lenisRef={lenisRef} />
      <BackgroundParticles />
      <MusicToggle />

      <div className="app">
        <Hero />

        <WaveDivider color="rgba(232, 67, 147, 0.06)" />

        <LoveLetter />

        <WaveDivider color="rgba(139, 92, 246, 0.06)" flip />
        <WaveDivider color="rgba(139, 92, 246, 0.06)" />

        <Gallery />

        <WaveDivider color="rgba(232, 67, 147, 0.06)" flip />
        <WaveDivider color="rgba(232, 67, 147, 0.06)" />

        <BirthdayWish />

        <Footer />
      </div>
    </>
  )
}
