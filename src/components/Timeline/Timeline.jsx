import { useEffect, useRef } from 'react'
import './Timeline.css'

const milestones = [
    {
        date: 'Awal Cerita',
        emoji: '💬',
        title: 'Pertama Kali Kenal',
        description: 'Dari chat biasa, ternyata jadi sesuatu yang spesial. Siapa sangka ya? 😊',
    },
    {
        date: 'Getting Closer',
        emoji: '💕',
        title: 'Mulai Jatuh Hati',
        description: 'Makin sering ngobrol, makin nggak bisa sehari tanpa kabar dari kamu.',
    },
    {
        date: 'The Moment',
        emoji: '💖',
        title: 'Jadian!',
        description: 'Akhirnya resmi! Meskipun LDR, tapi perasaan ini nyata banget.',
    },
    {
        date: 'Every Day',
        emoji: '🌙',
        title: 'Melewati Hari Bersama',
        description: 'Good morning texts, video call malam, dan "udah makan belum?" yang nggak pernah absen.',
    },
    {
        date: '9 Maret 2026',
        emoji: '🎂',
        title: 'Ulang Tahun Kamu!',
        description: 'Hari ini! Happy 18th birthday, Kucil! Semoga ini jadi awal dari chapter yang lebih indah. 🥳✨',
    },
]

export default function Timeline() {
    const sectionRef = useRef(null)

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
        <section className="timeline" id="timeline" ref={sectionRef}>
            <div className="container">
                <div className="timeline__header reveal">
                    <p className="timeline__label">✦ Our Journey ✦</p>
                    <h2 className="timeline__title">
                        <span className="gradient-text">Perjalanan Kita</span>
                    </h2>
                    <div className="timeline__divider" />
                </div>

                <div className="timeline__track">
                    <div className="timeline__line" />

                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className="timeline__item reveal"
                            style={{ transitionDelay: `${index * 0.15}s` }}
                        >
                            <div className="timeline__dot" />
                            <p className="timeline__date">{milestone.date}</p>
                            <div className="timeline__card">
                                <span className="timeline__card-emoji">{milestone.emoji}</span>
                                <h3 className="timeline__card-title">{milestone.title}</h3>
                                <p className="timeline__card-desc">{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
