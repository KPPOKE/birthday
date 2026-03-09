import { useState, useEffect, useRef } from 'react';

export default function TypewriterText({ text, delay = 0, speed = 100, className = '' }) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsTyping(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isTyping) return;

        let i = 0;
        let timer;

        const startTimeout = setTimeout(() => {
            // Re-set text to empty in case this is a re-run
            setDisplayedText('');

            timer = setInterval(() => {
                i++;
                setDisplayedText(text.substring(0, i));

                if (i >= text.length) {
                    clearInterval(timer);
                }
            }, speed);
        }, delay);

        return () => {
            clearTimeout(startTimeout);
            clearInterval(timer);
        };
    }, [isTyping, text, delay, speed]);

    return (
        <span ref={ref} className={`typewriter-text ${className}`}>
            {displayedText}
            {isTyping && displayedText.length < text.length && (
                <span className="typewriter-cursor">|</span>
            )}
        </span>
    );
}
