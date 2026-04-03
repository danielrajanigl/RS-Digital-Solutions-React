import { useState, useEffect } from 'react';
import { ui } from '../content';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
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
    const color = isDark ? ui.theme.darkColor : ui.theme.lightColor;
    document.querySelectorAll('.logo-svg text').forEach(t => {
      t.setAttribute('fill', color);
    });
    document.querySelectorAll('.logo-text').forEach(el => {
      el.style.color = color;
    });
  }, [isDark]);

  return (
    <button
      className="theme-toggle-btn"
      onClick={() => setIsDark(prev => !prev)}
      aria-label={isDark ? ui.themeToggle.ariaLight : ui.themeToggle.ariaDark}
      title={isDark ? ui.themeToggle.light : ui.themeToggle.dark}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
