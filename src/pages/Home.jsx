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

  // Hero parallax (rAF optimized)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const heroContent = heroContentRef.current;
          if (heroContent && window.scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${window.scrollY * 0.3}px)`;
            heroContent.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.8));
          }
          ticking = false;
        });
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
      <section id="hero" className="hero-section">
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
        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-float-wrapper">
            <h1 className="hero-title-new">
              {homePage.hero.titleLine1}
              <span className="hero-gradient-text">{homePage.hero.titleGradient}</span>
              {homePage.hero.titleLine3}
            </h1>
            <p className="hero-subtitle-new">
              {homePage.hero.subtitle}
            </p>
          </div>
          <div className="hero-buttons-new">
            <ShimmerButton label={homePage.hero.primaryButton} onClick={() => { const el = document.getElementById('kontakt'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
            <button className="hero-text-link" onClick={() => navigate('/referenzen')}>
              {homePage.hero.secondaryButton} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Marquee */}
      <TrustedMarquee />

      {/* Kontakt Section */}
      <section id="kontakt" className="kontakt-section">
        <div className="container">
          <div className="kontakt-grid">
            <div className="kontakt-info" data-animate="fade-right">
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
            </div>
            <div className="kontakt-form-wrapper" data-animate="fade-left">
              <form className="kontakt-form" id="contactForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="sr-only">{homePage.contact.form.name.label}</label>
                    <input type="text" id="name" name="name" required placeholder={homePage.contact.form.name.placeholder} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">{homePage.contact.form.email.label}</label>
                    <input type="email" id="email" name="email" required placeholder={homePage.contact.form.email.placeholder} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="sr-only">{homePage.contact.form.phone.label}</label>
                  <input type="tel" id="phone" name="phone" placeholder={homePage.contact.form.phone.placeholder} />
                </div>
                <div className="form-group">
                  <label htmlFor="service" className="sr-only">{homePage.contact.form.service.label}</label>
                  <select id="service" name="service">
                    <option value="">{homePage.contact.form.service.placeholder}</option>
                    {homePage.contact.form.service.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="sr-only">{homePage.contact.form.message.label}</label>
                  <textarea id="message" name="message" rows="5" required placeholder={homePage.contact.form.message.placeholder}></textarea>
                </div>
                <div className="form-submit-wrapper">
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
