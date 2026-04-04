import { Component } from 'react';
import PageHero from '../components/PageHero';
import CtaSection from '../components/CtaSection';
import ScannerCardStream from '../components/ScannerCardStream';
import Seo from '../components/Seo';
import { referenzenPage, ctaPerPage } from '../content';

class CardErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

export default function Referenzen() {
  return (
    <>
      <Seo page="referenzen" />
      <PageHero
        tag={referenzenPage.hero.tag}
        title={referenzenPage.hero.title}
        subtitle={referenzenPage.hero.subtitle}
      />

      {/* Scanner Card Stream */}
      <section className="card-stack-section">
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-tag">{referenzenPage.projectsSection.tag}</span>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: referenzenPage.projectsSection.title }}></h2>
          </div>
          <div style={{ marginTop: '3rem' }} data-animate="fade-up">
            <CardErrorBoundary>
              <ScannerCardStream projects={referenzenPage.projects} />
            </CardErrorBoundary>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-tag">{referenzenPage.testimonialsSection.tag}</span>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: referenzenPage.testimonialsSection.title }}></h2>
          </div>
          <div className="testimonials-grid">
            {referenzenPage.testimonials.map((t, i) => (
              <div key={i} className="testimonial-card" data-animate="fade-up" data-delay={i * 100}>
                <div className="testimonial-stars">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <i key={j} className="fas fa-star"></i>
                  ))}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div className="author-info">
                    <span className="author-name">{t.name}</span>
                    <span className="author-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection title={ctaPerPage.referenzen.title} subtitle={ctaPerPage.referenzen.subtitle} />
    </>
  );
}
