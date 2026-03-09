import { useState } from 'react';
import confetti from 'canvas-confetti';
import useMagneticHover from '../../hooks/useMagneticHover';
import { useRef } from 'react';
import './GiftBox.css';

export default function GiftBox() {
    const [isOpen, setIsOpen] = useState(false);
    const boxRef = useRef(null);

    useMagneticHover(boxRef);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);

        // Burst small confetti
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#ffb6c1', '#ff6b9d', '#e84393']
        });
    };

    return (
        <section className="gift-section">
            <div className={`gift-box-wrapper ${isOpen ? 'open' : ''}`} onClick={handleOpen} ref={boxRef}>
                <div className="gift-box">
                    <div className="gift-box__lid">
                        <div className="gift-box__ribbon-vertical" />
                        <div className="gift-box__ribbon-horizontal" />
                        <div className="gift-box__bow">
                            <div className="gift-box__bow-left" />
                            <div className="gift-box__bow-right" />
                        </div>
                    </div>
                    <div className="gift-box__body">
                        <div className="gift-box__ribbon-vertical" />
                    </div>
                </div>

                <div className="gift-box__coupon">
                    <div className="coupon-content">
                        <h3>🎫 Infinite Hugs 🎫</h3>
                        <p>Valid Selamanya.</p>
                    </div>
                </div>

                {!isOpen && (
                    <p className="gift-box__hint">Tap untuk buka hadiah Dede</p>
                )}
            </div>
        </section>
    );
}
