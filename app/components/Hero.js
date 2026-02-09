'use client';

import { useLang } from '@/lib/LangContext';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';

export default function Hero() {
  const { t, dir } = useLang();

  return (
    <section className="hero" id="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}
        >
          <div className="hero-text">
            <motion.p
              className="hero-greeting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {t.hero.name}
            </motion.h1>

            <motion.p
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {t.hero.title}
            </motion.p>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a href="#projects" className="btn-primary">{t.hero.cta}</a>
              <a href="#contact" className="btn-secondary">{t.nav.contact}</a>
            </motion.div>

            <motion.div
              className="hero-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <a href="https://github.com/ModerniMan" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/lipaznussen" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://wa.me/972532191924" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="mailto:lipaz@moderniman.co.il" className="social-link" aria-label="Email">
                <FaEnvelope />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Image
              src="https://avatars.githubusercontent.com/u/18376581?v=4"
              alt="Lipaz Nussen"
              width={280}
              height={280}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
