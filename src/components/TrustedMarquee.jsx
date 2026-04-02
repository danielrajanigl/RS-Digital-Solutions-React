import { trustedBy } from '../content';

export default function TrustedMarquee() {
  /* We duplicate the list to create a seamless infinite scroll */
  const items = [...trustedBy.clients, ...trustedBy.clients];

  return (
    <section className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((name, i) => (
            <span key={i}>
              {name}
              {i < items.length - 1 && <span className="marquee-dot">●</span>}
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((name, i) => (
            <span key={`dup-${i}`}>
              {name}
              {i < items.length - 1 && <span className="marquee-dot">●</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
