import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Beams from '../components/Beams';
import ShimmerButton from '../components/ui/shimmer-button.tsx';
import Seo from '../components/Seo';
import TrustedMarquee from '../components/TrustedMarquee';
import { homePage, company } from '../content';


export default function Home() {
  const navigate = useNavigate();
  const heroContentRef = useRef(null);

  // Hero parallax
  useEffect(() => {
    const onScroll = () => {
      const heroContent = heroContentRef.current;
      if (heroContent && window.scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.8));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => {
        setFormState('idle');
        e.target.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <Seo page="home" />
      {/* Hero Section */}
      <section id="hero" className="hero-section" style={{ opacity: 1, visibility: 'visible', position: 'relative', minHeight: '100vh' }}>
        <div className="beams-canvas">
          <Beams
            beamWidth={2.5}
            beamHeight={18}
            beamNumber={15}
            lightColor="#ffffff"
            speed={2.5}
            noiseIntensity={2}
            scale={0.15}
            rotation={43}
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content" ref={heroContentRef} style={{ opacity: 1, visibility: 'visible', position: 'relative', zIndex: 2 }}>
          <div className="hero-float-wrapper" style={{ opacity: 1, visibility: 'visible', transform: 'none' }}>
            <h1 className="hero-title-new">
              {homePage.hero.titleLine1}
              <span className="hero-gradient-text">{homePage.hero.titleGradient}</span>
              {homePage.hero.titleLine3}
            </h1>
            <p className="hero-subtitle-new">
              {homePage.hero.subtitle}
            </p>
          </div>
          <div className="hero-buttons-new" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <ShimmerButton label={homePage.hero.primaryButton} onClick={() => { const el = document.getElementById('kontakt'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
            <ShimmerButton label={homePage.hero.secondaryButton} onClick={() => navigate('/leistungen')} />
          </div>
        </div>
      </section>

      {/* Trusted By Marquee */}
      <TrustedMarquee />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg-effect"></div>
        <div className="container">
          <div className="cta-content" style={{ opacity: 1, visibility: 'visible', transform: 'none' }}>
            <h2>{homePage.cta.heading}</h2>
            <p>{homePage.cta.subtitle}</p>
            <div className="cta-buttons">
              <ShimmerButton label={homePage.cta.primaryButton} onClick={() => { const el = document.getElementById('kontakt'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
              <ShimmerButton label={homePage.cta.secondaryButton} onClick={() => { window.location.href = company.phoneTel; }} />
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="kontakt-section">
        <div className="container">
          <div className="kontakt-grid">
            <div className="kontakt-info" style={{ opacity: 1, visibility: 'visible', transform: 'none' }}>
              <span className="section-tag">{homePage.contact.tag}</span>
              <h2 className="section-title">{homePage.contact.title}</h2>
              <p className="kontakt-text">
                {homePage.contact.intro}
              </p>
              <div className="kontakt-details">
                <div className="kontakt-item">
                  <div className="kontakt-icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <span className="kontakt-label">{homePage.contact.labels.email}</span>
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </div>
                </div>
                <div className="kontakt-item">
                  <div className="kontakt-icon"><i className="fas fa-phone"></i></div>
                  <div>
                    <span className="kontakt-label">{homePage.contact.labels.phone}</span>
                    <a href={company.phoneTel}>{company.phone}</a>
                  </div>
                </div>
                <div className="kontakt-item">
                  <div className="kontakt-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div>
                    <span className="kontakt-label">{homePage.contact.labels.location}</span>
                    <span>{company.location}</span>
                  </div>
                </div>
              </div>
              <div className="kontakt-social">
                <a href={company.social.instagram} className="social-link"><i className="fab fa-instagram"></i></a>
                <a href={company.social.linkedin} className="social-link"><i className="fab fa-linkedin-in"></i></a>
                <a href={company.social.facebook} className="social-link"><i className="fab fa-facebook-f"></i></a>
              </div>
            </div>
            <div className="kontakt-form-wrapper" style={{ opacity: 1, visibility: 'visible', transform: 'none' }}>
              <form className="kontakt-form" id="contactForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{homePage.contact.form.name.label}</label>
                    <input type="text" id="name" name="name" required placeholder={homePage.contact.form.name.placeholder} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{homePage.contact.form.email.label}</label>
                    <input type="email" id="email" name="email" required placeholder={homePage.contact.form.email.placeholder} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{homePage.contact.form.phone.label}</label>
                  <input type="tel" id="phone" name="phone" placeholder={homePage.contact.form.phone.placeholder} />
                </div>
                <div className="form-group">
                  <label htmlFor="service">{homePage.contact.form.service.label}</label>
                  <select id="service" name="service">
                    <option value="">{homePage.contact.form.service.placeholder}</option>
                    {homePage.contact.form.service.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">{homePage.contact.form.message.label}</label>
                  <textarea id="message" name="message" rows="5" required placeholder={homePage.contact.form.message.placeholder}></textarea>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ShimmerButton
                    label={formState === 'idle' ? homePage.contact.form.submit.default : formState === 'sending' ? homePage.contact.form.submit.loading : homePage.contact.form.submit.success}
                    onClick={() => {
                      if (formState === 'idle') {
                        document.getElementById('contactForm').requestSubmit();
                      }
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
