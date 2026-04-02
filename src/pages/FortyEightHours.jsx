import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import CtaSection from '../components/CtaSection';
import Seo from '../components/Seo';
import { fortyEightHoursPage } from '../content';

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
      <Seo page="fortyEightHours" />
      <PageHero
        tag={fortyEightHoursPage.hero.tag}
        title={fortyEightHoursPage.hero.title}
        subtitle={fortyEightHoursPage.hero.subtitle}
      />

      {/* USP Section */}
      <section className="usp-section">
        <div className="container">
          <div className="usp-grid">
            <div className="usp-content" data-animate="fade-right">
              <h2 className="section-title" dangerouslySetInnerHTML={{ __html: fortyEightHoursPage.usp.title }}></h2>
              <p className="usp-description" dangerouslySetInnerHTML={{ __html: fortyEightHoursPage.usp.description }}></p>
              <div className="usp-features">
                {fortyEightHoursPage.features.map((f, i) => (
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
                    {fortyEightHoursPage.timer.digits.map((d, i) => (
                      <span key={i} className="timer-digit" data-target={d}>0</span>
                    ))}
                  </div>
                  <div className="timer-label">{fortyEightHoursPage.timer.label}</div>
                </div>
                <div className="timer-subtitle">{fortyEightHoursPage.timer.subtitle}</div>
                <div className="timer-steps">
                  {fortyEightHoursPage.timer.milestones.map((m, i) => (
                    <div key={i} className="timer-step active">
                      <div className="step-dot"></div>
                      <span>{m}</span>
                    </div>
                  ))}
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
            <span className="section-tag">{fortyEightHoursPage.processSection.tag}</span>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: fortyEightHoursPage.processSection.title }}></h2>
          </div>
          <div className="process-timeline">
            <div className="process-line"></div>
            {fortyEightHoursPage.steps.map((s, i) => (
              <div key={i} className="process-step" data-animate="fade-up" data-delay={i * 100}>
                <div className="step-number">{s.number}</div>
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
