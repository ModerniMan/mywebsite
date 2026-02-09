'use client';

import { useLang } from '@/lib/LangContext';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const projectIcons = ['🛡️', '🤖', '📊', '📡', '🧠', '📄', '🚨'];
const projectGradients = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #eab308, #f97316)',
  'linear-gradient(135deg, #ef4444, #dc2626)',
  'linear-gradient(135deg, #06b6d4, #0891b2)',
  'linear-gradient(135deg, #22c55e, #16a34a)',
];

export default function Projects() {
  const { t } = useLang();

  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </motion.div>

        <div className="projects-grid">
          {t.projects.items.map((project, i) => (
            <motion.div
              key={i}
              className="project-card"
              style={{ '--card-accent': projectGradients[i] }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="project-icon" style={{ background: `${projectGradients[i].replace('linear-gradient(135deg, ', 'rgba(').split(',')[0]}15)` }}>
                {projectIcons[i]}
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, j) => (
                  <span key={j} className="project-tag">{tag}</span>
                ))}
              </div>
              {project.link && (
                <div className="project-links">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaExternalLinkAlt /> Live
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
