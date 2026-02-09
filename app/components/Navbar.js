'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/lib/LangContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { t, toggle, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.team, href: '#team' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <a href="#" className="nav-logo">LN</a>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {links.map((l, i) => (
            <li key={i}>
              <a href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li>
            <button className="lang-toggle" onClick={toggle}>
              {lang === 'he' ? 'EN' : 'עב'}
            </button>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
