import { useState, useEffect, useRef, useCallback } from 'react';
import PageHero from '../components/PageHero';
import CtaSection from '../components/CtaSection';
import { LiquidMetalButton } from '../components/ui/liquid-metal-button.tsx';

const projectCards = [
  { title: 'Akkilinc Buchhaltung', desc: 'Unternehmenswebsite · 6 Sprachen', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop', url: 'https://akkilinc-fq2f.vercel.app' },
  { title: 'Antephaus Stuttgart', desc: 'Restaurant · Online-Bestellung', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop', url: 'http://76.13.0.11' },
  { title: 'Bera Gold & Diamond', desc: 'Juwelier · E-Commerce', image: 'https://images.unsplash.com/photo-1515562141589-67f0d936e5c8?q=80&w=800&auto=format&fit=crop', url: 'https://bera-gold-diamond.vercel.app' },
];

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
];

const testimonials = [
  { stars: 5, text: '„Unsere neue Website ist genau so geworden, wie wir es uns vorgestellt haben – modern, mehrsprachig und perfekt auf unsere Mandanten zugeschnitten. Die Zusammenarbeit war hervorragend!"', avatar: 'AA', name: 'Akkilinc Buchhaltungsservice', role: 'Buchhaltung, Stuttgart' },
  { stars: 5, text: '„Die Website mit Online-Bestellsystem hat unseren Betrieb auf ein neues Level gebracht. Unsere Kunden können jetzt bequem online bestellen und abholen. Absolute Empfehlung!"', avatar: 'AH', name: 'Antephaus', role: 'Restaurant, Stuttgart Nord' },
  { stars: 5, text: '„Professionelles Webdesign, schnelle Umsetzung und ein Team, das wirklich zuhört. Unsere Produktpräsentation online ist jetzt genauso hochwertig wie unser Schmuck."', avatar: 'BG', name: 'Bera Gold & Diamond', role: 'Juwelier' },
];

export default function Referenzen() {
  const [cardIds, setCardIds] = useState([0, 1, 2]);
  const [exitingCard, setExitingCard] = useState(null);
  const nextIdRef = useRef(3);
  const isAnimating = useRef(false);
  const intervalRef = useRef(null);
  const viewportRef = useRef(null);

  const animateStack = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setExitingCard(cardIds[0]);

    setTimeout(() => {
      setCardIds(prev => {
        const newIds = [...prev.slice(1), nextIdRef.current];
        nextIdRef.current++;
        return newIds;
      });
      setExitingCard(null);
      isAnimating.current = false;
    }, 650);
  }, [cardIds]);

  // Auto-animate
  useEffect(() => {
    intervalRef.current = setInterval(animateStack, 4000);
    return () => clearInterval(intervalRef.current);
  }, [animateStack]);

  const handleMouseEnter = () => clearInterval(intervalRef.current);
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(animateStack, 4000);
  };

  return (
    <>
      <PageHero
        tag="Referenzen"
        title='Beispiele unserer <span class="highlight">Arbeit</span>'
        subtitle="Was wir gestalten, soll nicht nur gut aussehen – es soll wirken."
      />

      {/* Card Stack Section */}
      <section className="card-stack-section">
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-tag">Live Projekte</span>
            <h2 className="section-title">Unsere Projekte <span className="highlight">im Überblick</span></h2>
          </div>
          <div className="card-stack-wrapper" data-animate="fade-up">
            <div
              className="card-stack-viewport"
              ref={viewportRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {cardIds.slice(0, 3).map((id, index) => {
                const project = projectCards[id % projectCards.length];
                const pos = positionStyles[index] || positionStyles[2];
                const zIndex = 3 - index;
                const isExiting = exitingCard === id && index === 0;

                return (
                  <div
                    key={id}
                    className={`card-stack-card${isExiting ? ' card-exit' : ''}`}
                    style={{
                      transform: isExiting
                        ? 'translateX(-50%) translateY(340px) scale(1)'
                        : `translateX(-50%) translateY(${pos.y}px) scale(${pos.scale})`,
                      opacity: isExiting ? 0 : 1,
                      zIndex: isExiting ? 10 : zIndex,
                      transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div className="card-stack-card-inner">
                      <div className="card-stack-image">
                        <img src={project.image} alt={project.title} loading="lazy" />
                      </div>
                      <div className="card-stack-info">
                        <div className="card-stack-text">
                          <span className="card-title">{project.title}</span>
                          <span className="card-desc">{project.desc}</span>
                        </div>
                        <a href={project.url} target="_blank" rel="noopener" className="card-stack-link">
                          Ansehen
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="M9.5 18L15.5 12L9.5 6"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="card-stack-controls">
              <LiquidMetalButton label="Nächstes Projekt" onClick={animateStack} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-tag">Kundenstimmen</span>
            <h2 className="section-title">Was unsere <span className="highlight">Kunden</span> sagen</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
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

      <CtaSection />
    </>
  );
}
