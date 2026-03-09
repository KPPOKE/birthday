import './WaveDivider.css'

export default function WaveDivider({ color = 'rgba(139, 92, 246, 0.03)', flip = false }) {
    return (
        <div className={`wave-divider ${flip ? 'wave-divider--flip' : ''}`}>
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z"
                    fill={color}
                />
                <path
                    d="M0,35 C320,10 640,55 960,25 C1120,10 1280,50 1440,35 L1440,60 L0,60 Z"
                    fill={color}
                    opacity="0.5"
                />
            </svg>
        </div>
    )
}
