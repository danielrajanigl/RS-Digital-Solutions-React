import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-simple">
          <Link to="/" className="footer-logo-centered">
            <Logo width={90} height={87} className="logo-svg footer-logo-svg" />
            <span className="footer-brand-name">Digital Solutions</span>
          </Link>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 RS Digital Solutions. Alle Rechte vorbehalten.</p>
          <div className="footer-bottom-links">
            <a href="#">Datenschutz</a>
            <a href="#">Impressum</a>
            <a href="#">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
