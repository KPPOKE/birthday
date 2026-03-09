import { useEffect, useRef, useCallback } from 'react'

export default function CursorTrail() {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const animFrameRef = useRef(null)

    const createParticle = useCallback((x, y) => {
        const colors = ['#ff6b9d', '#e84393', '#ffd700', '#a78bfa', '#ffc2d4', '#ff9ebb']
        return {
            x,
            y,
            size: Math.random() * 4 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 - 1,
            life: 1,
            decay: Math.random() * 0.02 + 0.015,
            type: Math.random() > 0.5 ? 'circle' : 'star',
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let lastSpawnTime = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX
            mouseRef.current.y = e.clientY

            const now = Date.now()
            if (now - lastSpawnTime > 30) {
                for (let i = 0; i < 2; i++) {
                    particlesRef.current.push(createParticle(e.clientX, e.clientY))
                }
                lastSpawnTime = now
            }
        }

        const drawStar = (ctx, x, y, size) => {
            ctx.beginPath()
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI) / 2
                const dx = Math.cos(angle) * size
                const dy = Math.sin(angle) * size
                if (i === 0) ctx.moveTo(x + dx, y + dy)
                else ctx.lineTo(x + dx, y + dy)
            }
            ctx.closePath()
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesRef.current = particlesRef.current.filter((p) => p.life > 0)

            for (const p of particlesRef.current) {
                p.x += p.vx
                p.y += p.vy
                p.life -= p.decay
                p.size *= 0.98

                ctx.globalAlpha = p.life
                ctx.fillStyle = p.color

                if (p.type === 'star') {
                    ctx.save()
                    ctx.translate(p.x, p.y)
                    ctx.rotate(p.life * Math.PI)
                    drawStar(ctx, 0, 0, p.size)
                    ctx.fill()
                    ctx.restore()
                } else {
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                    ctx.fill()
                }

                // Glow
                ctx.globalAlpha = p.life * 0.3
                ctx.shadowBlur = 8
                ctx.shadowColor = p.color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2)
                ctx.fill()
                ctx.shadowBlur = 0
            }

            ctx.globalAlpha = 1
            animFrameRef.current = requestAnimationFrame(animate)
        }

        resize()
        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouseMove)
        animFrameRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        }
    }, [createParticle])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9998,
            }}
        />
    )
}
