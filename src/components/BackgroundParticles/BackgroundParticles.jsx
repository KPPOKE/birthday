import { useMemo } from 'react'
import './BackgroundParticles.css'

export default function BackgroundParticles() {
    const particles = useMemo(() => {
        const types = ['pink', 'purple', 'gold']
        return Array.from({ length: 30 }, (_, i) => ({
            id: i,
            type: types[i % types.length],
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 4 + 2}px`,
            duration: `${15 + Math.random() * 25}s`,
            delay: `${Math.random() * 20}s`,
        }))
    }, [])

    return (
        <div className="background-particles">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className={`bg-particle bg-particle--${p.type}`}
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                    }}
                />
            ))}
        </div>
    )
}
