import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CtaSection from '../components/CtaSection';
import { LiquidMetalButton } from '../components/ui/liquid-metal-button.tsx';

const accordionItems = [
  { img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop', icon: 'fas fa-laptop-code', label: 'Profes\u00ADsionelles Webdesign' },
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop', icon: 'fas fa-store', label: 'E-Commerce & Shops' },
  { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', icon: 'fas fa-bolt', label: '48h Website-Relaunch' },
  { img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop', icon: 'fas fa-robot', label: 'KI-Chatbots & Websites' },
  { img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop', icon: 'fas fa-search', label: 'SEO & Online-Marketing' },
  { img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop', icon: 'fas fa-calendar-alt', label: 'Termin\u00ADbuchungs\u00ADsoftware' },
];

export default function Leistungen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <PageHero
        tag="Unsere Leistungen"
        title='Full-Service für Ihren <span class="highlight">digitalen Erfolg</span>'
        subtitle="Von der ersten Idee bis zum fertigen Produkt – alles aus einer Hand."
      />

      <section className="services-section">
        <div className="container">
          <div className="services-accordion-layout">
            <div className="services-text" data-animate="fade-right">
              <span className="section-tag">Alles inklusive</span>
              <h2 className="section-title">Wir bieten alles, was Ihr <span className="highlight">Unternehmen</span> braucht</h2>
              <p className="services-description">
                Von der ersten Idee bis zum fertigen Produkt – wir bieten alles, was Ihr Unternehmen
                für eine beeindruckende Internetpräsenz braucht.
              </p>
              <LiquidMetalButton label="Projekt starten" onClick={() => navigate('/#kontakt')} />
            </div>
            <div className="services-accordion" data-animate="fade-left">
              <div className="accordion-track" id="serviceAccordion">
                {accordionItems.map((item, i) => (
                  <div
                    key={i}
                    className={`accordion-item${i === activeIndex ? ' active' : ''}`}
                    data-index={i}
                    onMouseEnter={() => {
                      if (!('ontouchstart' in window)) setActiveIndex(i);
                    }}
                    onClick={() => setActiveIndex(i)}
                  >
                    <img src={item.img} alt={item.label} loading="lazy" />
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

      <CtaSection />
    </>
  );
}
