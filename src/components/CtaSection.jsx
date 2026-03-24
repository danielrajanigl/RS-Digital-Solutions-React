import { useNavigate } from 'react-router-dom';
import { LiquidMetalButton } from './ui/liquid-metal-button.tsx';

export default function CtaSection({ title, subtitle, showPhone = false }) {
  const navigate = useNavigate();
  const defaultTitle = 'Bereit, Ihre digitale Präsenz<br><span class="highlight">auf das nächste Level</span> zu bringen?';
  const defaultSubtitle = 'Lassen Sie uns in einem unverbindlichen Gespräch herausfinden, wie wir Ihr Unternehmen online nach vorne bringen können.';

  return (
    <section className="cta-section">
      <div className="cta-bg-effect"></div>
      <div className="container">
        <div className="cta-content" data-animate="fade-up">
          <h2 dangerouslySetInnerHTML={{ __html: title || defaultTitle }}></h2>
          <p>{subtitle || defaultSubtitle}</p>
          <div className="cta-buttons">
            <LiquidMetalButton label="Beratungsgespräch" onClick={() => navigate('/#kontakt')} />
            {showPhone && (
              <LiquidMetalButton label="Jetzt anrufen" onClick={() => { window.location.href = 'tel:+4917612345678'; }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
