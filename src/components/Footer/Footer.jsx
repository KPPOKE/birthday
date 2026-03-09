import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="container">
                <div className="footer__hearts">
                    <span className="footer__heart">💗</span>
                    <span className="footer__heart">💕</span>
                    <span className="footer__heart">💖</span>
                </div>

                <p className="footer__message">
                    Made with all my heart, for the one who has my heart 💕
                </p>

                <p className="footer__name">For Adek, Kucil, Dede</p>

                <p className="footer__made-with">
                    Built with <span>♥</span> just for you
                </p>
            </div>
        </footer>
    )
}
