import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is rendered after route change
    const timer = setTimeout(() => {
      const animatedElements = document.querySelectorAll('[data-animate]');
      const delayTimeouts = new Map();

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-delay') || 0);
          if (entry.isIntersecting) {
            const timeoutId = setTimeout(() => {
              el.classList.add('animated');
              delayTimeouts.delete(el);
            }, delay);
            delayTimeouts.set(el, timeoutId);
          } else {
            if (delayTimeouts.has(el)) {
              clearTimeout(delayTimeouts.get(el));
              delayTimeouts.delete(el);
            }
            el.classList.remove('animated');
          }
        });
      }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.15 });

      animatedElements.forEach(el => observer.observe(el));

      return () => {
        observer.disconnect();
        delayTimeouts.forEach(id => clearTimeout(id));
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);
}
