'use client';

import { useLang } from '@/lib/LangContext';
import { motion } from 'framer-motion';

export default function Experience() {
  const { t } = useLang();

  return (
    <section className="section" id="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </motion.div>

        <div className="timeline">
          {t.experience.items.map((exp, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="timeline-dot" />
              <p className="timeline-year">{exp.year}</p>
              <h3 className="timeline-role">{exp.role}</h3>
              <p className="timeline-desc">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
