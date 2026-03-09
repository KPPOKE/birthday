import { useEffect, useRef, useState } from 'react'
import TypewriterText from '../TypewriterText/TypewriterText'
import './LoveLetter.css'

export default function LoveLetter() {
    const sectionRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isReading, setIsReading] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active')
                    }
                })
            },
            { threshold: 0.2 }
        )

        const reveals = sectionRef.current?.querySelectorAll('.reveal')
        if (reveals) {
            reveals.forEach((el) => observer.observe(el))
        }

        return () => observer.disconnect()
    }, [])

    const handleOpenEnvelope = () => {
        if (!isOpen) {
            setIsOpen(true)
            // Wait for envelope open animation before showing full letter
            setTimeout(() => {
                setIsReading(true)
            }, 1200)
        }
    }

    return (
        <section className="love-letter" id="love-letter" ref={sectionRef}>
            <div className="love-letter__bg-glow" />

            <div className="container">
                <div className="love-letter__header reveal">
                    <p className="love-letter__label">✦ Love Letter ✦</p>
                    <h2 className="love-letter__title">
                        <span className="gradient-text-pink">
                            <TypewriterText text="Untuk Adek Tersayang" speed={150} />
                        </span>
                    </h2>
                </div>

                {!isReading ? (
                    <div className="envelope-wrapper reveal">
                        <div
                            className={`envelope ${isOpen ? 'open' : ''}`}
                            onClick={handleOpenEnvelope}
                        >
                            <div className="envelope__front">
                                <div className="envelope__flap" />
                                <div className="envelope__pocket" />
                                <div className="envelope__wax-seal">
                                    <span className="envelope__seal-heart">❤</span>
                                </div>
                            </div>
                            <div className="envelope__paper">
                                <div className="envelope__paper-content">
                                    <p>Untuk Kucil...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="love-letter__content reading-mode">
                        <div className="love-letter__paper">
                            <div className="love-letter__sparkle love-letter__sparkle--1">✨</div>
                            <div className="love-letter__sparkle love-letter__sparkle--2">✨</div>

                            <p className="love-letter__greeting">
                                Hai Dede, <span className="love-letter__highlight">selamat ulang tahun yang ke-18!</span> 🎂
                            </p>
                            <p>
                                Dede kesayangan Keni sudah tambah besar sekarang. Setiap hari keni selalu doain Dede,
                                Semoga semua impian dan cita - cita dede terwujud ya
                                <span className="love-letter__highlight"> sayangku
                                </span>
                            </p>
                            <p>
                                Di hari spesial ini, aku juga mau bilang <span className="love-letter__highlight">
                                    terima kasih aku bisa kenal sama kamu.</span> semoga kamu juga senang juga bisa kenal sama aku
                                💕
                            </p>
                            <p className="love-letter__closing">
                                I love you, Kucil. More than words could ever say. 💗
                                <br /><br />
                                <span className="love-letter__signature">— Hug keni 🫂</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
