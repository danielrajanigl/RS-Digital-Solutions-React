import { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { ui } from '../content';

/* ─── Screenshot card with loading state ─── */
function ScreenshotImg({ src, alt }) {
  const [status, setStatus] = useState('loading'); // loading | loaded | error
  return (
    <>
      {/* loading / error fallback */}
      {status !== 'loaded' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: 15, color: 'rgba(255,255,255,.45)', fontSize: 13,
          fontFamily: 'monospace', flexDirection: 'column', gap: 8,
        }}>
          {status === 'loading' && (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1.2s linear infinite' }}>
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              <span>{ui.scanner.loading}</span>
            </>
          )}
          {status === 'error' && (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
              </svg>
              <span>{alt}</span>
            </>
          )}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
          borderRadius: 15, filter: 'brightness(1.1) contrast(1.1)',
          transition: 'filter .3s, opacity .4s',
          opacity: status === 'loaded' ? 1 : 0,
        }}
      />
    </>
  );
}

/* ─── ASCII helper ─── */
const ASCII_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (w, h) => {
  let text = '';
  for (let i = 0; i < w * h; i++)
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  let out = '';
  for (let i = 0; i < h; i++) out += text.substring(i * w, (i + 1) * w) + '\n';
  return out;
};

/* ─── Styles injected once ─── */
const STYLE_ID = 'scanner-card-stream-styles';
const injectStyles = () => {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes glitch{0%,16%,50%,100%{opacity:1}15%,99%{opacity:.9}49%{opacity:.8}}
    @keyframes scanPulse{0%{opacity:.75;transform:scaleY(1)}100%{opacity:1;transform:scaleY(1.03)}}

    .scanner-stream-root{position:relative;width:100%;height:320px;display:flex;align-items:center;justify-content:center;overflow:hidden;-webkit-mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,1) 8%,rgba(0,0,0,1) 92%,transparent 100%);mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,1) 8%,rgba(0,0,0,1) 92%,transparent 100%)}
    .scanner-stream-root canvas{position:absolute;top:50%;left:0;transform:translateY(-50%);width:100%;pointer-events:none}
    .scanner-stream-root .particle-canvas{height:250px;z-index:0}
    .scanner-stream-root .scanner-canvas{height:300px;z-index:10}
    .scanner-line{position:absolute;top:50%;left:50%;height:280px;width:2px;
      transform:translate(-50%,-50%);
      background:linear-gradient(to bottom,transparent,#8b5cf6,transparent);
      border-radius:9999px;z-index:20;pointer-events:none;
      animation:scanPulse 1.5s infinite alternate ease-in-out;
      transition:opacity .3s;
      box-shadow:0 0 10px #a78bfa,0 0 20px #a78bfa,0 0 30px #8b5cf6,0 0 50px #6366f1}
    .scanner-line.hidden{opacity:0}
    .scanner-line.visible{opacity:1}

    .card-line{display:flex;align-items:center;position:absolute;width:max-content;cursor:grab;user-select:none;will-change:transform}
    .card-line:active{cursor:grabbing}

    .card-wrapper{position:relative;width:400px;height:250px;flex-shrink:0}
    .card-wrapper .card{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:15px;overflow:hidden}
    .card-wrapper .card-normal{z-index:2;background:transparent;
      box-shadow:0 15px 40px rgba(0,0,0,.4);
      clip-path:inset(0 0 0 var(--clip-right,0%))}
    .card-wrapper .card-ascii{z-index:1;background:transparent;
      clip-path:inset(0 calc(100% - var(--clip-left,0%)) 0 0)}

    .card-wrapper .card-normal{position:relative}
    .card-wrapper .card-normal:hover img{filter:brightness(1.25) contrast(1.25)!important}

    .card-wrapper .card-overlay{position:absolute;bottom:0;left:0;right:0;
      padding:16px 20px;z-index:3;
      background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.4) 60%,transparent 100%);
      border-radius:0 0 15px 15px;display:flex;align-items:flex-end;justify-content:space-between;
      opacity:0;transition:opacity .3s}
    .card-wrapper:hover .card-overlay{opacity:1}
    .card-overlay .card-overlay-title{color:#fff;font-size:14px;font-weight:600;letter-spacing:.01em}
    .card-overlay .card-overlay-desc{color:rgba(255,255,255,.6);font-size:12px;margin-top:2px}
    .card-overlay .card-overlay-link{color:rgba(203,213,225,.9);font-size:12px;
      display:inline-flex;align-items:center;gap:4px;
      text-decoration:none;transition:color .2s}
    .card-overlay .card-overlay-link:hover{color:#fff}

    .card-wrapper .ascii-content{position:absolute;top:0;left:0;width:100%;height:100%;
      color:rgba(220,210,255,.6);font-family:monospace;font-size:11px;line-height:13px;
      overflow:hidden;white-space:pre;margin:0;padding:0;text-align:left;
      mask-image:linear-gradient(to right,rgba(0,0,0,1) 0%,rgba(0,0,0,.8) 30%,rgba(0,0,0,.6) 50%,rgba(0,0,0,.4) 80%,rgba(0,0,0,.2) 100%);
      -webkit-mask-image:linear-gradient(to right,rgba(0,0,0,1) 0%,rgba(0,0,0,.8) 30%,rgba(0,0,0,.6) 50%,rgba(0,0,0,.4) 80%,rgba(0,0,0,.2) 100%);
      animation:glitch .1s infinite linear alternate-reverse}

    @media(max-width:768px){
      .scanner-stream-root{height:220px}
      .card-wrapper{width:280px;height:175px}
      .scanner-line{height:200px}
    }
  `;
  document.head.appendChild(style);
};

/* ─── Component ─── */
export default function ScannerCardStream({
  projects = [],
  repeat = 6,
  cardGap = 60,
  initialSpeed = 150,
  direction = -1,
  friction = 0.95,
}) {
  const cardImages = useMemo(() => projects.map((p) => p.image), [projects]);
  const [isScanning, setIsScanning] = useState(false);

  const cards = useMemo(() => {
    const total = cardImages.length * repeat;
    return Array.from({ length: total }, (_, i) => ({
      id: i,
      projectIndex: i % projects.length,
      image: cardImages[i % cardImages.length],
      ascii: generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13)),
    }));
  }, [cardImages, repeat, projects.length]);

  const cardLineRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const scannerCanvasRef = useRef(null);
  const originalAscii = useRef(new Map());
  const scannerStateRef = useRef({ isScanning: false });

  const streamState = useRef({
    position: 0,
    velocity: initialSpeed,
    direction,
    isDragging: false,
    lastMouseX: 0,
    dragVelocity: 0,
    lastTime: performance.now(),
    cardLineWidth: (400 + cardGap) * cards.length,
    friction,
    minVelocity: 30,
  });

  useEffect(injectStyles, []);

  useEffect(() => {
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;
    if (!cardLine || !particleCanvas || !scannerCanvas) return;

    cards.forEach((c) => originalAscii.current.set(c.id, c.ascii));

    /* Three.js particle background */
    const scene = new THREE.Scene();
    const w = cardLine.parentElement?.offsetWidth || window.innerWidth;
    const camera = new THREE.OrthographicCamera(-w / 2, w / 2, 125, -125, 1, 1000);
    camera.position.z = 100;
    const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true, antialias: true });
    renderer.setSize(w, 250);
    renderer.setClearColor(0x000000, 0);

    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    const texCanvas = document.createElement('canvas');
    texCanvas.width = 100;
    texCanvas.height = 100;
    const texCtx = texCanvas.getContext('2d');
    const g = texCtx.createRadialGradient(50, 50, 0, 50, 50, 50);
    g.addColorStop(0.025, '#fff');
    g.addColorStop(0.1, 'hsl(217,61%,33%)');
    g.addColorStop(0.25, 'hsl(217,64%,6%)');
    g.addColorStop(1, 'transparent');
    texCtx.fillStyle = g;
    texCtx.arc(50, 50, 50, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * w * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      velocities[i] = Math.random() * 60 + 30;
      alphas[i] = (Math.random() * 8 + 2) / 10;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `attribute float alpha;varying float vAlpha;void main(){vAlpha=alpha;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=15.0;gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `uniform sampler2D pointTexture;varying float vAlpha;void main(){gl_FragColor=vec4(1.,1.,1.,vAlpha)*texture2D(pointTexture,gl_PointCoord);}`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(geo, mat));

    /* Scanner line canvas particles */
    const ctx = scannerCanvas.getContext('2d');
    scannerCanvas.width = w;
    scannerCanvas.height = 300;
    let scannerParticles = [];
    const baseMax = 800;
    const scanMax = 2500;
    let currentMax = baseMax;
    const createSP = () => ({
      x: w / 2 + (Math.random() - 0.5) * 3,
      y: Math.random() * 300,
      vx: Math.random() * 0.8 + 0.2,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.6,
      life: 1,
      decay: Math.random() * 0.02 + 0.005,
    });
    for (let i = 0; i < baseMax; i++) scannerParticles.push(createSP());

    /* Scramble effect */
    const runScramble = (el, cardId) => {
      if (el.dataset.scrambling === 'true') return;
      el.dataset.scrambling = 'true';
      const orig = originalAscii.current.get(cardId) || '';
      let count = 0;
      const iv = setInterval(() => {
        el.textContent = generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13));
        if (++count >= 10) {
          clearInterval(iv);
          el.textContent = orig;
          delete el.dataset.scrambling;
        }
      }, 30);
    };

    /* Card scan effect */
    const updateCards = () => {
      const scanX = w / 2;
      const sw = 8;
      const sl = scanX - sw / 2;
      const sr = scanX + sw / 2;
      let any = false;

      cardLine.querySelectorAll('.card-wrapper').forEach((wrapper, idx) => {
        const rect = wrapper.getBoundingClientRect();
        const rootRect = cardLine.parentElement.getBoundingClientRect();
        const localLeft = rect.left - rootRect.left;
        const localRight = rect.right - rootRect.left;
        const normalCard = wrapper.querySelector('.card-normal');
        const asciiCard = wrapper.querySelector('.card-ascii');
        const asciiContent = asciiCard?.querySelector('pre');

        if (localLeft < sr && localRight > sl) {
          any = true;
          if (wrapper.dataset.scanned !== 'true' && asciiContent) {
            runScramble(asciiContent, idx);
          }
          wrapper.dataset.scanned = 'true';
          const il = Math.max(sl - localLeft, 0);
          const ir = Math.min(sr - localLeft, rect.width);
          normalCard.style.setProperty('--clip-right', `${(il / rect.width) * 100}%`);
          asciiCard.style.setProperty('--clip-left', `${(ir / rect.width) * 100}%`);
        } else {
          delete wrapper.dataset.scanned;
          if (localRight < sl) {
            normalCard.style.setProperty('--clip-right', '100%');
            asciiCard.style.setProperty('--clip-left', '100%');
          } else {
            normalCard.style.setProperty('--clip-right', '0%');
            asciiCard.style.setProperty('--clip-left', '0%');
          }
        }
      });
      scannerStateRef.current.isScanning = any;
      setIsScanning(any);
    };

    /* Drag handling */
    const onDown = (e) => {
      streamState.current.isDragging = true;
      streamState.current.lastMouseX = e.touches ? e.touches[0].clientX : e.clientX;
      streamState.current.dragVelocity = 0;
    };
    const onMove = (e) => {
      if (!streamState.current.isDragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const dx = x - streamState.current.lastMouseX;
      streamState.current.position += dx;
      streamState.current.dragVelocity = dx / 0.016;
      streamState.current.lastMouseX = x;
    };
    const onUp = () => {
      if (!streamState.current.isDragging) return;
      streamState.current.isDragging = false;
      streamState.current.velocity = Math.abs(streamState.current.dragVelocity) || initialSpeed;
      streamState.current.direction = streamState.current.dragVelocity > 0 ? 1 : -1;
    };
    const onWheel = (e) => {
      e.preventDefault();
      streamState.current.position -= e.deltaX || e.deltaY;
      streamState.current.velocity = 200;
    };

    cardLine.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    cardLine.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    cardLine.addEventListener('wheel', onWheel, { passive: false });

    /* Animation loop */
    let rafId;
    const animate = (t) => {
      const dt = (t - streamState.current.lastTime) / 1000;
      streamState.current.lastTime = t;

      if (!streamState.current.isDragging) {
        if (streamState.current.velocity > streamState.current.minVelocity) {
          streamState.current.velocity *= streamState.current.friction;
        }
        streamState.current.position +=
          streamState.current.velocity * streamState.current.direction * dt;
      }

      const { position, cardLineWidth } = streamState.current;
      const cw = cardLine.parentElement?.offsetWidth || w;
      if (position < -cardLineWidth) streamState.current.position = cw;
      else if (position > cw) streamState.current.position = -cardLineWidth;
      cardLine.style.transform = `translateX(${streamState.current.position}px)`;

      updateCards();

      /* Particles */
      const time = t * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > w / 2 + 100) positions[i * 3] = -w / 2 - 100;
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05));
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);

      /* Scanner particles */
      ctx.clearRect(0, 0, w, 300);
      const target = scannerStateRef.current.isScanning ? scanMax : baseMax;
      currentMax += (target - currentMax) * 0.05;
      while (scannerParticles.length < currentMax) scannerParticles.push(createSP());
      while (scannerParticles.length > currentMax) scannerParticles.pop();
      scannerParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.x > w) Object.assign(p, createSP());
        ctx.globalAlpha = p.alpha * p.life;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    /* Resize */
    const onResize = () => {
      const nw = cardLine.parentElement?.offsetWidth || window.innerWidth;
      renderer.setSize(nw, 250);
      camera.left = -nw / 2;
      camera.right = nw / 2;
      camera.updateProjectionMatrix();
      scannerCanvas.width = nw;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      texture.dispose();
    };
  }, [cards, cardGap, friction, initialSpeed, direction]);

  return (
    <div className="scanner-stream-root">
      <canvas ref={particleCanvasRef} className="particle-canvas" />
      <canvas ref={scannerCanvasRef} className="scanner-canvas" />

      <div className={`scanner-line ${isScanning ? 'visible' : 'hidden'}`} />

      <div style={{ position: 'absolute', width: '100%', height: '250px', display: 'flex', alignItems: 'center' }}>
        <div ref={cardLineRef} className="card-line" style={{ gap: `${cardGap}px` }}>
          {cards.map((card) => {
            const project = projects[card.projectIndex];
            return (
              <a
                key={card.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-wrapper"
                style={{ textDecoration: 'none' }}
              >
                <div className="card card-normal">
                  <ScreenshotImg src={card.image} alt={project.title} />
                  <div className="card-overlay">
                    <div>
                      <div className="card-overlay-title">{project.title}</div>
                      <div className="card-overlay-desc">{project.desc}</div>
                    </div>
                    <span className="card-overlay-link">
                      {ui.scanner.viewProject}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="card card-ascii">
                  <pre className="ascii-content">{card.ascii}</pre>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
