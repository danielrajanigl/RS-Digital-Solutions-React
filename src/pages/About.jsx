import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import CtaSection from '../components/CtaSection';

const faqData = [
  { q: 'Was kostet eine Website bei RS Digital Solutions?', a: 'Unsere Preise richten sich nach dem Umfang Ihres Projekts. Eine professionelle Website beginnt ab 1.500 €. Bei unserem 48h-Express-Service, Online-Shops oder KI-Integrationen kalkulieren wir individuell. Wir arbeiten transparent – keine versteckten Kosten, keine Überraschungen.' },
  { q: 'Schafft ihr wirklich eine Website in 48 Stunden?', a: 'Ja! Mit unserem optimierten Workflow und einem eingespielten Team setzen wir professionelle Websites in 48 Stunden um. Voraussetzung: Sie liefern uns Texte, Bilder und Ihr Logo zeitnah. Je besser vorbereitet, desto schneller das Ergebnis.' },
  { q: 'Was ist ein KI-Chatbot und brauche ich das?', a: 'Ein KI-Chatbot ist ein intelligenter Assistent auf Ihrer Website, der automatisch mit Besuchern kommuniziert. Er beantwortet Fragen, berät Kunden, bucht Termine und generiert Leads – rund um die Uhr, ohne Personal. Ideal für Praxen, Restaurants, Shops und Dienstleister.' },
  { q: 'Bietet ihr auch Wartung und Support nach dem Launch?', a: 'Selbstverständlich! Nach der Liveschaltung betreuen wir Ihre Website weiter – mit Updates, Sicherheits-Checks, Content-Pflege und technischem Support. Wir bieten flexible Wartungspakete, die zu Ihrem Budget passen.' },
  { q: 'Kann ich meine Website selbst bearbeiten?', a: 'Ja! Wir bauen Ihre Website auf einem benutzerfreundlichen CMS auf. Nach der Fertigstellung erhalten Sie eine Schulung, damit Sie Texte, Bilder und Inhalte selbst ändern können – ohne technische Vorkenntnisse.' },
  { q: 'Wie läuft die Terminbuchungsintegration ab?', a: 'Wir integrieren ein professionelles Buchungssystem direkt in Ihre Website. Ihre Kunden können online Termine auswählen, buchen und erhalten automatische Bestätigungen. Das System synchronisiert sich mit Ihrem Kalender (Google, Outlook, etc.).' },
];

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const step = target / (duration / 16);
  let done = false;
  function update() {
    if (done) return;
    current += step;
    if (current >= target) {
      element.textContent = target;
      done = true;
      return;
    }
    element.textContent = Math.floor(current);
    requestAnimationFrame(update);
  }
  update();
}

export default function About() {
  const [activeFaq, setActiveFaq] = useState(null);

  // Counter animation
  useEffect(() => {
    const elements = document.querySelectorAll('.about-stat-number[data-count]');
    if (elements.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          animateCounter(entry.target, target, 2000);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => counterObserver.observe(el));
    return () => counterObserver.disconnect();
  }, []);

  return (
    <>
      <PageHero
        tag="Über uns"
        title='Uns liegt Ihr <span class="highlight">Erfolg</span> am Herzen'
        subtitle="Mehr als nur Webdesign – wir sind Ihr Partner für digitale Exzellenz."
      />

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content" data-animate="fade-right">
              <span className="section-tag">Wer wir sind</span>
              <h2 className="section-title">
                Leidenschaft für <span className="highlight">digitale Exzellenz</span>
              </h2>
              <p className="about-text">
                Bei RS Digital Solutions geht es um mehr als nur Webdesign.
                Uns liegt es am Herzen, dass Ihr Unternehmen die bestmögliche
                Internetpräsenz hat. Wir glauben daran, dass jedes Unternehmen –
                ob klein oder groß – einen professionellen digitalen Auftritt verdient.
              </p>
              <p className="about-text">
                Unser Team verbindet kreatives Design mit technischer Exzellenz und
                einem tiefen Verständnis für digitales Marketing. Wir denken nicht in
                Vorlagen – wir denken in Lösungen, die wirken.
              </p>
              <div className="about-values">
                <div className="value-item">
                  <div className="value-icon"><i className="fas fa-heart"></i></div>
                  <h4>Leidenschaft</h4>
                  <p>Jedes Projekt ist eine Herzensangelegenheit</p>
                </div>
                <div className="value-item">
                  <div className="value-icon"><i className="fas fa-handshake"></i></div>
                  <h4>Partnerschaft</h4>
                  <p>Auf Augenhöhe, ehrlich und transparent</p>
                </div>
                <div className="value-item">
                  <div className="value-icon"><i className="fas fa-gem"></i></div>
                  <h4>Qualität</h4>
                  <p>Keine Kompromisse, nur Exzellenz</p>
                </div>
              </div>
            </div>
            <div className="about-visual" data-animate="fade-left">
              <div className="about-card">
                <div className="about-card-bg"></div>
                <div className="about-card-content">
                  <div className="about-stat">
                    <span className="about-stat-number" data-count="5">0</span><span className="about-stat-plus">+</span>
                    <span className="about-stat-label">Jahre Erfahrung</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat-number" data-count="150">0</span><span className="about-stat-plus">+</span>
                    <span className="about-stat-label">Projekte realisiert</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat-number" data-count="100">0</span><span className="about-stat-plus">%</span>
                    <span className="about-stat-label">Weiterempfehlungsrate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header" data-animate="fade-up">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Häufig gestellte <span className="highlight">Fragen</span></h2>
          </div>
          <div className="faq-grid" data-animate="fade-up">
            {faqData.map((item, i) => (
              <div key={i} className={`faq-item${activeFaq === i ? ' active' : ''}`}>
                <button className="faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <i className="fas fa-plus"></i>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
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
