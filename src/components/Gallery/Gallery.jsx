import { useEffect, useRef } from 'react'
import './Gallery.css'

const photos = [
    { src: '/images/Screenshot 2026-03-09 205634.png', caption: 'Cantik banget', delay: '0s' },
    { src: '/images/IMG_7341.JPG', caption: 'GEMEZ BANGET', delay: '0.1s' },
    { src: '/images/KBER7918.JPG', caption: 'Kucil mode galak 😨', delay: '0.2s' },
    { src: '/images/Screenshot 2026-03-09 214008.png', caption: 'Kembaran Kucil', delay: '0.3s' },
    { src: '/images/IMG_7434.JPG', caption: 'My favorite gueh', delay: '0.4s' },
    { src: '/images/IMG_7901.JPG', caption: 'Always Lucu', delay: '0.5s' },
]

export default function Gallery() {
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

        const reveals = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')
        reveals?.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section className="gallery" id="gallery" ref={sectionRef}>
            <div className="container">
                <div className="gallery__header reveal">
                    <p className="gallery__label">✦ Gallery ✦</p>
                    <h2 className="gallery__title">
                        <span className="gradient-text">Moment</span>
                    </h2>
                    <p className="gallery__subtitle">Setiap foto yang kamu kirim, aku simpan dengan baik 💕</p>
                    <div className="gallery__divider" />
                </div>

                <div className="gallery__scattered">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className={`gallery__polaroid reveal polaroid-${index + 1}`}
                            style={{ transitionDelay: photo.delay }}
                        >
                            <div className="gallery__polaroid-tape" />
                            <div className="gallery__polaroid-image-wrapper">
                                <img src={photo.src} alt={photo.caption} className="gallery__image" loading="lazy" />
                            </div>
                            <div className="gallery__polaroid-caption">
                                <p>{photo.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="gallery__note reveal" style={{ transitionDelay: '0.6s' }}>
                    <p className="gallery__note-text">
                        "Meskipun kita belum pernah foto bareng...
                        tapi setiap foto yang kamu kirim itu precious banget buat aku 🥺💕"
                    </p>
                </div>
            </div>
        </section>
    )
}
