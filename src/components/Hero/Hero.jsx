import { useState, useEffect, useRef } from 'react'
import TypewriterText from '../TypewriterText/TypewriterText'
import HeartsScene from './HeartsScene'
import './Hero.css'

export default function Hero() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const contentRef = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2
            const y = (e.clientY / window.innerHeight - 0.5) * 2
            setMousePos({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section className="hero" id="hero">
            {/* Background glows with parallax */}
            <div
                className="hero__bg-glow hero__bg-glow--pink"
                style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
            />
            <div
                className="hero__bg-glow hero__bg-glow--purple"
                style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
            />
            <div
                className="hero__bg-glow hero__bg-glow--gold"
                style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * 10}px)` }}
            />

            {/* Animated gradient border */}
            <div className="hero__gradient-border" />

            {/* 3D Hearts Canvas */}
            <HeartsScene />

            {/* Content with subtle parallax */}
            <div
                ref={contentRef}
                className="hero__content"
                style={{ transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)` }}
            >

                <p className="hero__greeting">Happy Birthday, my love</p>

                <h1 className="hero__title">
                    <TypewriterText text="Kucil" speed={100} delay={600} />
                </h1>

                <p className="hero__subtitle">
                    Selamat ulang tahun yang ke-18, Adek 💕
                </p>

                <p className="hero__date">✦ 09 • 03 • 2026 ✦</p>

                <div className="hero__scroll-indicator">
                    <span className="hero__scroll-text">Scroll Down Love</span>
                    <div className="hero__scroll-line" />
                </div>
            </div>
        </section>
    )
}
