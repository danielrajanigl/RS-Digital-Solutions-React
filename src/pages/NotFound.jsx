import { useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import ShimmerButton from '../components/ui/shimmer-button.tsx';
import { ui } from '../content';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Seo page="notFound" />
      <section
        className="hero-section"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '600px' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', marginBottom: '0.25em' }}>
            {ui.notFound.title}
          </h1>
          <h2 className="section-title" style={{ marginBottom: '0.5em' }}>
            {ui.notFound.heading}
          </h2>
          <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '1.1rem' }}>
            {ui.notFound.text}
          </p>
          <ShimmerButton label={ui.notFound.button} onClick={() => navigate('/')} />
        </div>
      </section>
    </>
  );
}
