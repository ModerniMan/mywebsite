'use client';

import { useLang } from '@/lib/LangContext';
import { motion } from 'framer-motion';
import { FaEnvelope, FaWhatsapp, FaPhone } from 'react-icons/fa';

export default function Contact() {
  const { t } = useLang();

  const cards = [
    {
      icon: <FaEnvelope />,
      label: t.contact.email,
      value: 'lipaz@moderniman.co.il',
      href: 'mailto:lipaz@moderniman.co.il',
    },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      value: '053-219-1924',
      href: 'https://wa.me/972532191924',
    },
    {
      icon: <FaPhone />,
      label: t.contact.phone,
      value: '053-219-1924',
      href: 'tel:+972532191924',
    },
  ];

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </motion.div>

        <div className="contact-content">
          {cards.map((card, i) => (
            <motion.a
              key={i}
              className="contact-card"
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="contact-icon">{card.icon}</div>
              <p className="contact-label">{card.label}</p>
              <p className="contact-value">{card.value}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
