import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';


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
    document.body.style.overflow = '';
  }, [location]);

  // Scroll behavior
  useEffect(() => {
    const APPEAR_THRESHOLD = window.innerHeight;
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

  const toggleMobile = () => {
    setMobileOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : '';
      return !prev;
    });
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
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
    !isHome ? 'scrolled' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav id="navbar" className={navClasses} ref={navbarRef} style={navTransform ? { transform: navTransform } : {}}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <Logo />
            <span className="logo-text">Digital Solutions</span>
          </Link>
          <ul className="nav-menu">
            <li><NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>Home</NavLink></li>
            <li><NavLink to="/leistungen" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Leistungen</NavLink></li>
            <li><NavLink to="/referenzen" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Referenzen</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Über uns</NavLink></li>
            <li><a href="#kontakt" className="nav-link" onClick={scrollToKontakt}>Kontakt</a></li>
          </ul>
          <div style={{ marginLeft: '32px' }}><ThemeToggle /></div>
          <div className={`hamburger${mobileOpen ? ' active' : ''}`} onClick={toggleMobile}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu-overlay${mobileOpen ? ' active' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-links">
            <li><Link to="/" className="mobile-link" onClick={closeMobile}>Home</Link></li>
            <li><Link to="/leistungen" className="mobile-link" onClick={closeMobile}>Leistungen</Link></li>
            <li><Link to="/referenzen" className="mobile-link" onClick={closeMobile}>Referenzen</Link></li>
            <li><Link to="/about" className="mobile-link" onClick={closeMobile}>Über uns</Link></li>
            <li><a href="#kontakt" className="mobile-link" onClick={scrollToKontakt}>Kontakt</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
