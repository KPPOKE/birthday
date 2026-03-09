import { useEffect, useState } from 'react';
import './ClickableHearts.css';

export default function ClickableHearts() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            // Ignore clicks on buttons/links to not interfere too much with UI
            if (e.target.closest('button, a')) return;

            const newHeart = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY,
                // random offset for explosion effect
                offsetX: (Math.random() - 0.5) * 50,
                offsetY: (Math.random() - 1) * 50,
                scale: 0.5 + Math.random() * 0.8,
                rotation: (Math.random() - 0.5) * 60,
            };

            setHearts((prev) => [...prev, newHeart]);

            // Clean up heart after animation ends (1.5s)
            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
            }, 1000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="clickable-hearts-container">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="clickable-heart"
                    style={{
                        left: heart.x,
                        top: heart.y,
                        '--offsetX': `${heart.offsetX}px`,
                        '--offsetY': `${heart.offsetY - 100}px`, // Float up
                        '--scale': heart.scale,
                        '--rotation': `${heart.rotation}deg`,
                    }}
                >
                    💖
                </div>
            ))}
        </div>
    );
}
