import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CtaSection from '../components/CtaSection';
import ShimmerButton from '../components/ui/shimmer-button.tsx';
import Seo from '../components/Seo';
import { leistungenPage, ctaPerPage } from '../content';

export default function Leistungen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <Seo page="leistungen" />
      <PageHero
        tag={leistungenPage.hero.tag}
        title={leistungenPage.hero.title}
        subtitle={leistungenPage.hero.subtitle}
      />

      <section className="services-section">
        <div className="container">
          <div className="services-accordion-layout">
            <div className="services-text" data-animate="fade-right">
              <span className="section-tag">{leistungenPage.section.tag}</span>
              <h2 className="section-title" dangerouslySetInnerHTML={{ __html: leistungenPage.section.title }}></h2>
              <p className="services-description">
                {leistungenPage.section.description}
              </p>
              <ShimmerButton label={leistungenPage.section.button} onClick={() => navigate('/#kontakt')} />
            </div>
            <div className="services-accordion" data-animate="fade-left">
              <div className="accordion-track" id="serviceAccordion">
                {leistungenPage.services.map((item, i) => (
                  <div
                    key={i}
                    className={`accordion-item${i === activeIndex ? ' active' : ''}`}
                    data-index={i}
                    onMouseEnter={() => {
                      if (!('ontouchstart' in window)) setActiveIndex(i);
                    }}
                    onClick={() => setActiveIndex(i)}
                  >
                    <img src={item.image} alt={item.label} loading="lazy" />
                    <div className="accordion-overlay"></div>
                    <div className="accordion-icon"><i className={item.icon}></i></div>
                    <span className="accordion-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection title={ctaPerPage.leistungen.title} subtitle={ctaPerPage.leistungen.subtitle} />
    </>
  );
}
