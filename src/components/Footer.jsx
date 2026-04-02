import { Link } from 'react-router-dom';
import Logo from './Logo';
import { company, footer } from '../content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* Left: Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Logo width={36} height={35} className="logo-svg footer-logo-svg" />
              <span>{company.nameSuffix}</span>
            </Link>
            <p>{footer.description}</p>
            <div className="footer-social">
              <a href={company.social.instagram} target="_blank" rel="noopener" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href={company.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href={company.social.facebook} target="_blank" rel="noopener" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>

          {/* Right: Contact */}
          <div className="footer-contact">
            <h4>{footer.contactHeading}</h4>
            <ul>
              <li>
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a href={company.phoneTel}>{company.phone}</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>{company.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{company.copyright}</p>
          <div className="footer-bottom-links">
            {footer.legalLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
