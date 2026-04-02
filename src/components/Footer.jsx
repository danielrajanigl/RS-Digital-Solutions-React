import { Link } from 'react-router-dom';
import Logo from './Logo';
import { company, footer } from '../content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
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

          {/* Dynamic link columns */}
          {footer.columns.map((col) => (
            <div key={col.heading} className="footer-links">
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <a href={link.href}>{link.label}</a>
                    ) : (
                      <Link to={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="footer-links footer-contact-col">
            <h4>{footer.contactHeading}</h4>
            <ul>
              <li>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <a href={company.phoneTel}>{company.phone}</a>
              </li>
              <li>
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
