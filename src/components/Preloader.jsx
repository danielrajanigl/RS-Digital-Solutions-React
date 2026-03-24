import { useState, useEffect } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1500);
    const onLoad = () => setTimeout(() => setHidden(true), 800);
    window.addEventListener('load', onLoad);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div id="preloader" className={hidden ? 'hidden' : ''}>
      <div className="preloader-inner">
        <div className="preloader-logo">RS</div>
        <div className="preloader-bar"><div className="preloader-bar-fill"></div></div>
      </div>
    </div>
  );
}
