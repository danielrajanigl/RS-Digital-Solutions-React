import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CtaSection from '../components/CtaSection';
import { LiquidMetalButton } from '../components/ui/liquid-metal-button.tsx';

const benefits = [
  'Automatische Kundenberatung in Echtzeit',
  'Intelligente Terminvereinbarung',
  'Personalisierte Produktempfehlungen',
  'Mehrsprachiger Support',
  'Nahtlose CRM-Integration',
  'Lernfähig & kontinuierlich besser',
];

export default function KI() {
  const navigate = useNavigate();
  return (
    <>
      <PageHero
        tag="Intelligente Websites"
        title='Ihre Website <span class="highlight">spricht</span> mit Ihren Kunden'
        subtitle="KI-Chatbots, die beraten, verkaufen und Termine buchen – vollautomatisch und rund um die Uhr."
      />

      {/* KI Section */}
      <section className="ki-section">
        <div className="container">
          <div className="ki-grid">
            <div className="ki-visual" data-animate="fade-right">
              <div className="ki-mockup">
                <div className="ki-chat-window">
                  <div className="chat-header">
                    <div className="chat-avatar">
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="chat-info">
                      <span className="chat-name">KI-Assistent</span>
                      <span className="chat-status"><span className="status-dot"></span> Online</span>
                    </div>
                  </div>
                  <div className="chat-messages">
                    <div className="chat-message bot">
                      <p>Hallo! 👋 Willkommen bei RS Digital Solutions. Wie kann ich Ihnen helfen?</p>
                    </div>
                    <div className="chat-message user">
                      <p>Ich brauche eine neue Website für mein Restaurant.</p>
                    </div>
                    <div className="chat-message bot">
                      <p>Perfekt! Für Restaurants empfehle ich unser 48h-Paket mit integrierter Speisekarte, Online-Reservierung und Google Maps Integration. Soll ich einen Beratungstermin vereinbaren? 📅</p>
                    </div>
                    <div className="chat-message user">
                      <p>Ja bitte, am liebsten morgen Vormittag.</p>
                    </div>
                    <div className="chat-message bot typing">
                      <div className="typing-indicator">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ki-content" data-animate="fade-left">
              <span className="section-tag">KI-Chatbots</span>
              <h2 className="section-title">
                Automatische Beratung <span className="highlight">rund um die Uhr</span>
              </h2>
              <p className="ki-description">
                Stellen Sie sich vor, Ihre Website berät Kunden, beantwortet Fragen,
                bucht Termine und generiert Leads – vollautomatisch und rund um die Uhr.
                Mit unseren KI-Chatbots wird das Realität.
              </p>
              <div className="ki-benefits">
                {benefits.map((b, i) => (
                  <div key={i} className="ki-benefit">
                    <i className="fas fa-check-circle"></i>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <LiquidMetalButton label="KI-Demo anfordern" onClick={() => navigate('/#kontakt')} />
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
