'use client';

import { useLang } from '@/lib/LangContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Team() {
  const { t } = useLang();

  return (
    <section className="section" id="team">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t.team.title}</h2>
          <p className="section-subtitle">{t.team.subtitle}</p>
        </motion.div>

        <div className="team-grid">
          {t.team.members.map((member, i) => (
            <motion.div
              key={i}
              className={`team-card ${member.isFuture ? 'team-card--future' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="team-avatar">
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="team-avatar-placeholder">
                    <span>?</span>
                    <div className="team-avatar-pulse" />
                  </div>
                )}
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-desc">{member.desc}</p>
              {member.isFuture && (
                <a href="#contact" className="btn-primary team-cta">
                  📩 {t.nav.contact}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
