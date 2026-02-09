'use client';

import { useLang } from '@/lib/LangContext';
import { motion } from 'framer-motion';

export default function Skills() {
  const { t } = useLang();

  return (
    <section className="section" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>
        </motion.div>

        <div className="skills-grid">
          {t.skills.categories.map((cat, i) => (
            <motion.div
              key={i}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="skill-category-name">{cat.name}</h3>
              <div className="skill-items">
                {cat.items.map((item, j) => (
                  <span key={j} className="skill-item">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
