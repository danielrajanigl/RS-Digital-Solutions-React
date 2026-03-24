import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import Preloader from '../components/Preloader';
import { LiquidMetalButton } from '../components/ui/liquid-metal-button.tsx';

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

export default function Home() {
  const navigate = useNavigate();
  const auroraRef = useRef(null);
  const heroContentRef = useRef(null);

  // Aurora Three.js background
  useEffect(() => {
    const mount = auroraRef.current;
    if (!mount) return;

    let renderer, material, geometry, animationFrameId, auroraObserver;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });

      renderer.setPixelRatio(1);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.domElement.style.display = 'block';
      mount.appendChild(renderer.domElement);

      material = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) }
        },
        vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
        fragmentShader: `
          uniform float iTime;
          uniform vec2 iResolution;
          #define NUM_OCTAVES 3
          float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
          float noise(vec2 p) {
            vec2 ip = floor(p); vec2 u = fract(p);
            u = u * u * (3.0 - 2.0 * u);
            float res = mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
              mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
            return res * res;
          }
          float fbm(vec2 x) {
            float v = 0.0; float a = 0.3; vec2 shift = vec2(100);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
            for (int i = 0; i < NUM_OCTAVES; ++i) { v += a * noise(x); x = rot * x * 2.0 + shift; a *= 0.4; }
            return v;
          }
          void main() {
            vec2 p = ((gl_FragCoord.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6., -4., 4., 6.);
            vec4 o = vec4(0.);
            float f = 2. + fbm(p + vec2(iTime * 5., 0.)) * .5;
            for (float i = 0.; i++ < 35.;) {
              vec2 v = p + cos(i * i + (iTime + p.x * .08) * .025 + i * vec2(13., 11.)) * 3.5;
              float tailNoise = fbm(v + vec2(iTime * .5, i)) * .3 * (1. - (i / 35.));
              vec4 auroraColors = vec4(
                .1 + .3 * sin(i * .2 + iTime * .4),
                .3 + .5 * cos(i * .3 + iTime * .5),
                .7 + .3 * sin(i * .4 + iTime * .3),
                1.
              );
              vec4 cc = auroraColors * exp(sin(i * i + iTime * .8)) / length(max(v, vec2(v.x * f * .015, v.y * 1.5)));
              float thin = smoothstep(0., 1., i / 35.) * .6;
              o += cc * (1. + tailNoise * .8) * thin;
            }
            o = tanh(pow(o / 100., vec4(1.6)));
            gl_FragColor = o * 1.5;
          }
        `
      });

      geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      let auroraVisible = true;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!auroraVisible) return;
        material.uniforms.iTime.value += 0.016;
        renderer.render(scene, camera);
      };

      const heroSection = mount.closest('.hero-section');
      if (heroSection) {
        auroraObserver = new IntersectionObserver((entries) => {
          auroraVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        auroraObserver.observe(heroSection);
      }

      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const w = mount.clientWidth;
          const h = mount.clientHeight;
          renderer.setSize(w, h);
          material.uniforms.iResolution.value.set(w, h);
        }, 200);
      };
      window.addEventListener('resize', handleResize);
      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        if (auroraObserver) auroraObserver.disconnect();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        renderer.dispose();
        material.dispose();
        geometry.dispose();
      };
    } catch (e) {
      console.warn('WebGL aurora failed:', e);
      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (auroraObserver) auroraObserver.disconnect();
        if (renderer) renderer.dispose();
        if (material) material.dispose();
        if (geometry) geometry.dispose();
      };
    }
  }, []);

  // Counter animation
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.hero-stat-value[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        if (target && (el.textContent === '0' || el.textContent === '')) {
          animateCounter(el, target, 2000);
        }
      });
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Hero parallax
  useEffect(() => {
    const onScroll = () => {
      const heroContent = heroContentRef.current;
      if (heroContent && window.scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.8));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => {
        setFormState('idle');
        e.target.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <Preloader />

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div ref={auroraRef} className="aurora-canvas"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content" ref={heroContentRef}>
          <div className="hero-float-wrapper animated">
            <h1 className="hero-title-new">
              Wir erschaffen
              <span className="hero-gradient-text">digitale Meisterwerke</span>
              für Ihr Unternehmen.
            </h1>
            <p className="hero-subtitle-new">
              Hochprofessionelle Websites, Online-Shops &amp; intelligente KI-Lösungen –
              maßgeschneidert und <strong>in nur 48 Stunden live.</strong>
            </p>
          </div>
          <div className="hero-buttons-new" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <LiquidMetalButton label="Projekt starten" onClick={() => { const el = document.getElementById('kontakt'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
            <LiquidMetalButton label="Leistungen" onClick={() => navigate('/leistungen')} />
          </div>
          <div className="hero-divider"></div>
          <div className="hero-stats-new">
            <div className="hero-stat">
              <span className="hero-stat-value" data-count="48">0</span><span className="hero-stat-unit">h</span>
              <span className="hero-stat-label">bis zur Liveschaltung</span>
            </div>
            <div className="hero-stat-separator"></div>
            <div className="hero-stat">
              <span className="hero-stat-value" data-count="150">0</span><span className="hero-stat-unit">+</span>
              <span className="hero-stat-label">zufriedene Kunden</span>
            </div>
            <div className="hero-stat-separator"></div>
            <div className="hero-stat">
              <span className="hero-stat-value" data-count="100">0</span><span className="hero-stat-unit">%</span>
              <span className="hero-stat-label">Zufriedenheitsrate</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg-effect"></div>
        <div className="container">
          <div className="cta-content" data-animate="fade-up">
            <h2>Bereit, Ihre digitale Präsenz<br/><span className="highlight">auf das nächste Level</span> zu bringen?</h2>
            <p>Lassen Sie uns in einem unverbindlichen Gespräch herausfinden, wie wir Ihr Unternehmen online nach vorne bringen können.</p>
            <div className="cta-buttons">
              <LiquidMetalButton label="Beratungsgespräch" onClick={() => { const el = document.getElementById('kontakt'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
              <LiquidMetalButton label="Jetzt anrufen" onClick={() => { window.location.href = 'tel:+4917612345678'; }} />
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="kontakt-section">
        <div className="container">
          <div className="kontakt-grid">
            <div className="kontakt-info" data-animate="fade-right">
              <span className="section-tag">Kontakt</span>
              <h2 className="section-title">Lassen Sie uns <span className="highlight">sprechen</span></h2>
              <p className="kontakt-text">
                Haben Sie ein Projekt im Kopf? Erzählen Sie uns davon.
                Wir freuen uns auf Ihre Nachricht und melden uns innerhalb von 24 Stunden bei Ihnen.
              </p>
              <div className="kontakt-details">
                <div className="kontakt-item">
                  <div className="kontakt-icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <span className="kontakt-label">E-Mail</span>
                    <a href="mailto:info@rs-digital-solutions.de">info@rs-digital-solutions.de</a>
                  </div>
                </div>
                <div className="kontakt-item">
                  <div className="kontakt-icon"><i className="fas fa-phone"></i></div>
                  <div>
                    <span className="kontakt-label">Telefon</span>
                    <a href="tel:+4917612345678">+49 176 1234 5678</a>
                  </div>
                </div>
                <div className="kontakt-item">
                  <div className="kontakt-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div>
                    <span className="kontakt-label">Standort</span>
                    <span>Deutschland</span>
                  </div>
                </div>
              </div>
              <div className="kontakt-social">
                <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
              </div>
            </div>
            <div className="kontakt-form-wrapper" data-animate="fade-left">
              <form className="kontakt-form" id="contactForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" id="name" name="name" required placeholder="Ihr vollständiger Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-Mail *</label>
                    <input type="email" id="email" name="email" required placeholder="ihre@email.de" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input type="tel" id="phone" name="phone" placeholder="+49 ..." />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Gewünschte Leistung</label>
                  <select id="service" name="service">
                    <option value="">Bitte wählen...</option>
                    <option value="webdesign">Professionelles Webdesign</option>
                    <option value="shop">E-Commerce / Online-Shop</option>
                    <option value="48h">48h Website-Relaunch</option>
                    <option value="ki">KI-Chatbot Integration</option>
                    <option value="seo">SEO &amp; Online-Marketing</option>
                    <option value="booking">Terminbuchungssoftware</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Ihre Nachricht *</label>
                  <textarea id="message" name="message" rows="5" required placeholder="Erzählen Sie uns von Ihrem Projekt..."></textarea>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <LiquidMetalButton
                    label={formState === 'idle' ? 'Senden' : formState === 'sending' ? 'Sendet...' : 'Gesendet!'}
                    onClick={() => {
                      if (formState === 'idle') {
                        document.getElementById('contactForm').requestSubmit();
                      }
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
