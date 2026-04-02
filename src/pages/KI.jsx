import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CtaSection from '../components/CtaSection';
import ShimmerButton from '../components/ui/shimmer-button.tsx';
import Seo from '../components/Seo';
import { kiPage } from '../content';

export default function KI() {
  const navigate = useNavigate();
  return (
    <>
      <Seo page="ki" />
      <PageHero
        tag={kiPage.hero.tag}
        title={kiPage.hero.title}
        subtitle={kiPage.hero.subtitle}
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
                      <span className="chat-name">{kiPage.chat.name}</span>
                      <span className="chat-status"><span className="status-dot"></span> {kiPage.chat.status}</span>
                    </div>
                  </div>
                  <div className="chat-messages">
                    {kiPage.chat.messages.map((msg, i) => (
                      <div key={i} className={`chat-message ${msg.role}`}>
                        <p>{msg.text}</p>
                      </div>
                    ))}
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
              <span className="section-tag">{kiPage.section.tag}</span>
              <h2 className="section-title" dangerouslySetInnerHTML={{ __html: kiPage.section.title }}></h2>
              <p className="ki-description">{kiPage.section.description}</p>
              <div className="ki-benefits">
                {kiPage.benefits.map((b, i) => (
                  <div key={i} className="ki-benefit">
                    <i className="fas fa-check-circle"></i>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <ShimmerButton label={kiPage.section.button} onClick={() => navigate('/#kontakt')} />
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
