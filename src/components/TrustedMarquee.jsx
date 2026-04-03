import { trustedBy } from '../content';

function ClientItem({ client }) {
  return (
    <span className="marquee-client">
      {client.logo && (
        <img src={client.logo} alt={client.name} className="marquee-logo" loading="lazy" />
      )}
      {client.showName && (
        <span className="marquee-text-logo">{client.name}</span>
      )}
    </span>
  );
}

export default function TrustedMarquee() {
  const items = [...trustedBy.clients, ...trustedBy.clients];

  return (
    <section className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((client, i) => (
            <span key={i}>
              <ClientItem client={client} />
              <span className="marquee-dot">●</span>
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((client, i) => (
            <span key={`dup-${i}`}>
              <ClientItem client={client} />
              <span className="marquee-dot">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
