import { useNavigate } from 'react-router-dom';
import ShimmerButton from './ui/shimmer-button.tsx';
import { ctaDefaults, company } from '../content';

export default function CtaSection({ title, subtitle, showPhone = false }) {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-bg-effect"></div>
      <div className="container">
        <div className="cta-content" data-animate="fade-up">
          <h2 dangerouslySetInnerHTML={{ __html: title || ctaDefaults.title }}></h2>
          <p>{subtitle || ctaDefaults.subtitle}</p>
          <div className="cta-buttons">
            <ShimmerButton label={ctaDefaults.primaryButton} onClick={() => navigate('/#kontakt')} />
            {showPhone && (
              <ShimmerButton label={ctaDefaults.secondaryButton} onClick={() => { window.location.href = company.phoneTel; }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
