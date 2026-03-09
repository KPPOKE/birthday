import { useState, useRef, useEffect } from 'react'
import useMagneticHover from '../../hooks/useMagneticHover'
import './MusicToggle.css'

export default function MusicToggle() {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef(null)
    const toggleRef = useRef(null)

    useMagneticHover(toggleRef)

    // Initialize audio instance synchronously exactly once so it's ready before the very first render and click
    if (!audioRef.current && typeof window !== 'undefined') {
        audioRef.current = new Audio()
        audioRef.current.loop = true
        audioRef.current.volume = 0.3
        audioRef.current.src = '/Mitski - My Love Mine All Mine (Official Lyric Video).mp3'
    }

    const toggle = () => {
        if (!audioRef.current) return

        if (playing) {
            audioRef.current.pause()
        } else {
            audioRef.current.play().catch(() => { })
        }
        setPlaying(!playing)
    }

    // Listen for custom event from LoadingScreen to trigger autoplay safely
    useEffect(() => {
        const handleAutoPlay = () => {
            if (!playing) toggle()
        }
        window.addEventListener('playMusic', handleAutoPlay)
        return () => window.removeEventListener('playMusic', handleAutoPlay)
    }, [playing])

    return (
        <button
            ref={toggleRef}
            className={`music-toggle ${playing ? 'playing' : ''}`}
            onClick={toggle}
            aria-label={playing ? 'Pause music' : 'Play music'}
            title={playing ? 'Pause music' : 'Play music'}
        >
            <div className="music-toggle__bars">
                <div className="music-toggle__bar" style={{ height: '8px' }} />
                <div className="music-toggle__bar" style={{ height: '14px' }} />
                <div className="music-toggle__bar" style={{ height: '6px' }} />
                <div className="music-toggle__bar" style={{ height: '12px' }} />
            </div>
        </button>
    )
}
