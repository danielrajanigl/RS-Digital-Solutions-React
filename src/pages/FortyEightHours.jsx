import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import CtaSection from '../components/CtaSection';

const features = [
  { icon: 'fas fa-rocket', title: 'Blitzschnelle Umsetzung', desc: 'Vom Briefing bis zur Liveschaltung in nur 48 Stunden – ohne Kompromisse bei der Qualität.' },
  { icon: 'fas fa-shopping-cart', title: 'Kompletter Online-Shop', desc: 'Voll funktionsfähiger E-Commerce mit Zahlungsabwicklung, Produktmanagement & Versandintegration.' },
  { icon: 'fas fa-brain', title: 'Intelligente KI-Integration', desc: 'Chatbots, die mit Ihren Kunden sprechen – personalisiert und rund um die Uhr verfügbar.' },
  { icon: 'fas fa-calendar-check', title: 'Terminbuchungssystem', desc: 'Professionelle Buchungssoftware, die nahtlos in Ihre Website integriert wird.' },
];

const steps = [
  { num: '01', title: 'Briefing & Analyse', desc: 'Wir hören zu, analysieren Ihre Branche und verstehen Ihre Ziele. Gemeinsam definieren wir den perfekten digitalen Auftritt.' },
  { num: '02', title: 'Konzept & Design', desc: 'Unser Designteam erstellt ein maßgeschneidertes Konzept – modern, ansprechend und exakt auf Ihre Zielgruppe zugeschnitten.' },
  { num: '03', title: 'Entwicklung & Integration', desc: 'Technische Umsetzung mit modernsten Technologien. Shop, KI-Chatbot, Buchungssystem – alles wird nahtlos integriert.' },
  { num: '04', title: 'Go Live & Support', desc: 'Nach finalem Testing geht Ihre Website live. Danach stehen wir Ihnen weiterhin mit Support und Optimierung zur Seite.' },
];

export default function FortyEightHours() {
  // Timer digit animation
  useEffect(() => {
    const digits = document.querySelectorAll('.timer-digit[data-target]');
    if (digits.length === 0) return;

    const timerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute('data-target');
          let count = 0;
          const interval = setInterval(() => {
            entry.target.textContent = count;
            if (count >= parseInt(target)) {
              clearInterval(interval);
              entry.target.textContent = target;
            }
            count++;
          }, 100);
          timerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    digits.forEach(el => timerObserver.observe(el));
    return () => timerObserver.disconnect();
  }, []);

  return (
    <>
      <PageHero
        tag="Unser Versprechen"
        title='Die <span class="highlight">48-Stunden</span>-Präsenz'
        subtitle="Vom Briefing zur fertigen Website – in nur zwei Tagen."
      />

      {/* USP Section */}
      <section className="usp-section">
        <div className="container">
          <div className="usp-grid">
            <div className="usp-content" data-animate="fade-right">
              <h2 className="section-title">
                Ihre neue Website in <span className="highlight">48 Stunden</span>
              </h2>
              <p className="usp-description">
                Zeit ist Geld – und wir verschwenden weder das eine noch das andere.
                In nur <strong>zwei Tagen</strong> wird Ihre Website entweder komplett modernisiert
                oder von Grund auf neu erstellt. Hochprofessionell, inklusive aller Funktionen,
                die Ihr Unternehmen braucht.
              </p>
              <div className="usp-features">
                {features.map((f, i) => (
                  <div key={i} className="usp-feature">
                    <div className="feature-icon"><i className={f.icon}></i></div>
                    <div className="feature-text">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="usp-visual" data-animate="fade-left">
              <div className="timer-card">
                <div className="timer-glow"></div>
                <div className="timer-display">
                  <div className="timer-number">
                    <span className="timer-digit" data-target="4">0</span>
                    <span className="timer-digit" data-target="8">0</span>
                  </div>
                  <div className="timer-label">STUNDEN</div>
                </div>
                <div className="timer-subtitle">Vom Konzept zur fertigen Website</div>
                <div className="timer-steps">
                  <div className="timer-step active">
                    <div className="step-dot"></div>
                    <span>Briefing &amp; Konzept</span>
                  </div>
                  <div className="timer-step active">
                    <div className="step-dot"></div>
                    <span>Design &amp; Entwicklung</span>
                  </div>
                  <div className="timer-step active">
                    <div className="step-dot"></div>
                    <span>Testing &amp; Optimierung</span>
                  </div>
                  <div className="timer-step active">
                    <div className="step-dot"></div>
                    <span>Go Live!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-tag">Unser Prozess</span>
            <h2 className="section-title">In <span className="highlight">4 Schritten</span> zu Ihrer Traumwebsite</h2>
          </div>
          <div className="process-timeline">
            <div className="process-line"></div>
            {steps.map((s, i) => (
              <div key={i} className="process-step" data-animate="fade-up" data-delay={i * 100}>
                <div className="step-number">{s.num}</div>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title='Bereit für Ihre neue Website<br><span class="highlight">in nur 48 Stunden</span>?'
        showPhone={true}
      />
    </>
  );
}
