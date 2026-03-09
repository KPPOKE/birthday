import { useState, useEffect } from 'react'
import './NavDots.css'

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'love-letter', label: 'Love Letter' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'birthday-wish', label: 'Birthday' },
]

export default function NavDots({ lenisRef }) {
    const [activeSection, setActiveSection] = useState('hero')

    useEffect(() => {
        const observerOptions = {
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0,
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }, observerOptions)

        sections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el && lenisRef?.current) {
            lenisRef.current.scrollTo(el, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
        }
    }

    return (
        <nav className="nav-dots" aria-label="Section navigation">
            {sections.map(({ id, label }) => (
                <button
                    key={id}
                    className={`nav-dots__dot ${activeSection === id ? 'active' : ''}`}
                    onClick={() => scrollTo(id)}
                    aria-label={`Go to ${label}`}
                >
                    <span className="nav-dots__tooltip">{label}</span>
                </button>
            ))}
        </nav>
    )
}
