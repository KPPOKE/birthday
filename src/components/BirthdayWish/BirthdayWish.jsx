import { useEffect, useRef, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import './BirthdayWish.css'

const wishes = [
    { emoji: '🌟', text: 'Sehat selalu' },
    { emoji: '💫', text: 'Mimpi tercapai' },
    { emoji: '📚', text: 'Sukses sekolahnya' },
    { emoji: '😊', text: 'Selalu bahagia' },
    { emoji: '💪', text: 'Makin kuat & percaya diri' },
    { emoji: '🌈', text: 'Dikelilingi orang baik' },
    { emoji: '✈️', text: 'Suatu hari kita ketemu' },
]

const emojiList = ['🎂', '🎉', '🎈', '💕', '✨', '🌟', '🎁', '💖', '🥳', '🌸', '💫', '🎊']

const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ffb6c1', '#ff6b9d', '#e84393', '#ffd700']
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ffb6c1', '#ff6b9d', '#e84393', '#ffd700']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function AnimatedCounter({ target }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    let current = 0
                    const duration = 1500
                    const increment = target / (duration / 16)
                    const timer = setInterval(() => {
                        current += increment
                        if (current >= target) {
                            setCount(target)
                            clearInterval(timer)
                            triggerConfetti()
                        } else {
                            setCount(Math.floor(current))
                        }
                    }, 16)
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target])

    return <div className="birthday-wish__age" ref={ref}>{count}</div>
}

export default function BirthdayWish() {
    const sectionRef = useRef(null)

    const emojiRainItems = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            emoji: emojiList[i % emojiList.length],
            left: `${Math.random() * 100}%`,
            duration: `${6 + Math.random() * 8}s`,
            delay: `${Math.random() * 8}s`,
            size: `${1 + Math.random() * 1.5}rem`,
        }))
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active')
                    }
                })
            },
            { threshold: 0.1 }
        )

        const reveals = sectionRef.current?.querySelectorAll('.reveal')
        reveals?.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section className="birthday-wish" id="birthday-wish" ref={sectionRef}>
            <div className="birthday-wish__bg-glow birthday-wish__bg-glow--1" />
            <div className="birthday-wish__bg-glow birthday-wish__bg-glow--2" />

            {/* Emoji rain */}
            <div className="birthday-wish__emoji-rain">
                {emojiRainItems.map((item, i) => (
                    <span
                        key={i}
                        className="birthday-wish__emoji"
                        style={{
                            left: item.left,
                            animationDuration: item.duration,
                            animationDelay: item.delay,
                            fontSize: item.size,
                        }}
                    >
                        {item.emoji}
                    </span>
                ))}
            </div>

            <div className="container birthday-wish__content">
                <div className="reveal">
                    <AnimatedCounter target={18} />
                </div>

                <div className="reveal" style={{ transitionDelay: '0.15s' }}>
                    <span className="birthday-wish__cake">🎂</span>
                </div>

                <h2 className="birthday-wish__heading reveal" style={{ transitionDelay: '0.3s' }}>
                    <span className="gradient-text">Happy Birthday</span>
                    <br />
                    <span className="gradient-text-pink">Kucil!</span>
                </h2>

                <p className="birthday-wish__message reveal" style={{ transitionDelay: '0.45s' }}>
                    Di hari spesialmu yang ke-18 ini, aku doakan yang terbaik untukmu, Dede.
                    Semoga tahun ini membawa lebih banyak kebahagiaan, kesuksesan, dan tentunya
                    kesehatan 💕
                </p>

                <div className="birthday-wish__wishes reveal" style={{ transitionDelay: '0.6s' }}>
                    {wishes.map((wish, index) => (
                        <span key={index} className="birthday-wish__wish-tag">
                            <span>{wish.emoji}</span>
                            {wish.text}
                        </span>
                    ))}
                </div>

                <p className="birthday-wish__closing reveal" style={{ transitionDelay: '0.75s' }}>
                    "Hug dede." 🫂
                </p>
            </div>
        </section>
    )
}
