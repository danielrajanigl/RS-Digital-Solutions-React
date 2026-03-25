import { useState, useEffect } from 'react';
import { LiquidMetalButton } from './ui/liquid-metal-button.tsx';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('rs-theme') !== 'light';
    } catch { return true; }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light-theme');
      try { localStorage.setItem('rs-theme', 'dark'); } catch {}
    } else {
      document.documentElement.classList.add('light-theme');
      try { localStorage.setItem('rs-theme', 'light'); } catch {}
    }
    document.querySelectorAll('.logo-svg text').forEach(t => {
      t.setAttribute('fill', isDark ? '#ffffff' : '#1a1a2e');
    });
    document.querySelectorAll('.logo-text').forEach(el => {
      el.style.color = isDark ? '#ffffff' : '#1a1a2e';
    });
  }, [isDark]);

  const toggle = () => setIsDark(prev => !prev);

  return (
    <div className="theme-toggle-wrapper">
      <LiquidMetalButton
        viewMode="icon"
        icon={isDark ? 'sun' : 'moon'}
        label={isDark ? 'Light Mode' : 'Dark Mode'}
        onClick={toggle}
      />
    </div>
  );
}
