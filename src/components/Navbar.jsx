import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { navigation, company } from '../content';


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navFixed, setNavFixed] = useState(false);
  const [navTransform, setNavTransform] = useState('');
  const location = useLocation();
  const isHome = location.pathname === '/';
  const lastScrollY = useRef(0);
  const fixedHeaderActive = useRef(false);
  const fixedHeaderHiding = useRef(false);
  const navbarRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
  }, [location]);

  // Scroll behavior
  useEffect(() => {
    const APPEAR_THRESHOLD = typeof window !== 'undefined' ? window.innerHeight : 800;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;
        const navbarHeight = navbarRef.current?.offsetHeight || 70;

        if (currentScrollY <= navbarHeight) {
          setNavFixed(false);
          setNavTransform('');
          fixedHeaderActive.current = false;
          fixedHeaderHiding.current = false;
        } else if (!mobileOpen) {
          if (delta > 0) {
            if (!fixedHeaderActive.current && !fixedHeaderHiding.current && currentScrollY > APPEAR_THRESHOLD) {
              setNavFixed(true);
              setNavTransform('translateY(0)');
              fixedHeaderActive.current = true;
              fixedHeaderHiding.current = false;
            }
            if (fixedHeaderHiding.current && fixedHeaderActive.current) {
              setNavTransform('translateY(0)');
              fixedHeaderHiding.current = false;
            }
          } else if (delta < 0) {
            if (fixedHeaderActive.current && !fixedHeaderHiding.current && currentScrollY <= APPEAR_THRESHOLD) {
              setNavTransform('translateY(-100%)');
              fixedHeaderHiding.current = true;
              setTimeout(() => {
                if (fixedHeaderHiding.current) {
                  setNavFixed(false);
                  setNavTransform('');
                  fixedHeaderActive.current = false;
                  fixedHeaderHiding.current = false;
                }
              }, 500);
            }
          }
        }

        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  const lockScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
  };

  const toggleMobile = () => {
    setMobileOpen(prev => {
      if (!prev) lockScroll();
      else unlockScroll();
      return !prev;
    });
  };

  const closeMobile = () => {
    setMobileOpen(false);
    unlockScroll();
  };

  const scrollToKontakt = (e) => {
    e.preventDefault();
    closeMobile();
    if (isHome) {
      const el = document.getElementById('kontakt');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#kontakt';
    }
  };

  const navClasses = [
    'navbar',
    navFixed ? 'nav-fixed' : '',
    !isHome ? 'scrolled' : '',
    mobileOpen ? 'mobile-open' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav id="navbar" className={navClasses} ref={navbarRef} style={navTransform ? { transform: navTransform } : {}}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <Logo />
            <span className="logo-text">{company.nameSuffix}</span>
          </Link>
          <ul className="nav-menu">
            {navigation.map((item) => (
              <li key={item.path}>
                {item.isAnchor ? (
                  <a href={item.path} className="nav-link" onClick={scrollToKontakt}>{item.label}</a>
                ) : (
                  <NavLink to={item.path} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end={item.path === '/'}>{item.label}</NavLink>
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <div className={`hamburger${mobileOpen ? ' active' : ''}`} onClick={toggleMobile}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu-overlay${mobileOpen ? ' active' : ''}`}>
        <div className="mobile-menu-content">
          <button className="mobile-menu-close" onClick={closeMobile} aria-label="Menü schließen">
            <span></span>
            <span></span>
          </button>
          <div className="mobile-menu-brand">
            <Logo width={36} height={35} className="logo-svg" />
            <span className="logo-text">{company.nameSuffix}</span>
          </div>
          <ul className="mobile-nav-links">
            {navigation.map((item) => (
              <li key={item.path}>
                {item.isAnchor ? (
                  <a href={item.path} className="mobile-link" onClick={scrollToKontakt}>{item.label}</a>
                ) : (
                  <Link to={item.path} className="mobile-link" onClick={closeMobile}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
