'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { key: 'team', icon: '👥', label: 'שותפי דרך' },
  { key: 'projects', icon: '🚀', label: 'פרויקטים' },
  { key: 'experience', icon: '💼', label: 'ניסיון' },
  { key: 'hero', icon: '🏠', label: 'עמוד ראשי' },
];

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(null);
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState('team');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth')
      .then(r => r.json())
      .then(d => {
        if (!d.authenticated) router.push('/admin/login');
        else setAuthed(true);
      });
  }, [router]);

  useEffect(() => {
    if (authed) loadContent();
  }, [authed]);

  const loadContent = async () => {
    const res = await fetch('/api/admin/content');
    const data = await res.json();
    setContent(data);
  };

  const saveSection = async (lang, section, data) => {
    setSaving(true);
    setMsg('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, section, data }),
      });
      if (res.ok) {
        setMsg('✅ נשמר!');
        await loadContent();
      } else {
        setMsg('❌ שגיאה בשמירה');
      }
    } catch {
      setMsg('❌ שגיאת תקשורת');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (!authed || !content) {
    return <div style={s.loading}>⏳ טוען...</div>;
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <div style={s.headerInner}>
          <div>
            <h1 style={s.logo}>⚡ ModerniMan Admin</h1>
          </div>
          <div style={s.headerActions}>
            {msg && <span style={s.msg}>{msg}</span>}
            <a href="/" target="_blank" style={s.viewSite}>👁 צפה באתר</a>
            <button onClick={logout} style={s.logoutBtn}>🚪 יציאה</button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav style={s.tabs}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{ ...s.tab, ...(tab === t.key ? s.tabActive : {}) }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main style={s.main}>
        {tab === 'team' && (
          <TeamEditor content={content} onSave={saveSection} saving={saving} />
        )}
        {tab === 'projects' && (
          <ProjectsEditor content={content} onSave={saveSection} saving={saving} />
        )}
        {tab === 'experience' && (
          <ExperienceEditor content={content} onSave={saveSection} saving={saving} />
        )}
        {tab === 'hero' && (
          <HeroEditor content={content} onSave={saveSection} saving={saving} />
        )}
      </main>
    </div>
  );
}

/* ========== TEAM EDITOR ========== */
function TeamEditor({ content, onSave, saving }) {
  const [members, setMembers] = useState(content.he.team.members);

  useEffect(() => {
    setMembers(content.he.team.members);
  }, [content]);

  const update = (i, field, val) => {
    const copy = [...members];
    copy[i] = { ...copy[i], [field]: val };
    setMembers(copy);
  };

  const addMember = () => {
    setMembers([...members, {
      name: 'שותף חדש',
      role: 'תפקיד',
      desc: 'תיאור',
      avatar: null,
      isFuture: true,
    }]);
  };

  const removeMember = (i) => {
    if (confirm('למחוק שותף זה?')) {
      setMembers(members.filter((_, idx) => idx !== i));
    }
  };

  const handleSave = () => {
    const heTeam = { ...content.he.team, members };
    // Also sync EN — generate simple EN version
    const enMembers = members.map(m => ({
      ...m,
      name: m.isFuture ? "We're looking for you!" : m.name,
    }));
    const enTeam = { ...content.en.team, members: enMembers };
    onSave('he', 'team', heTeam);
    setTimeout(() => onSave('en', 'team', enTeam), 100);
  };

  return (
    <div>
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>👥 שותפי דרך</h2>
        <button onClick={addMember} style={s.addBtn}>+ הוסף שותף</button>
      </div>

      <div style={s.cards}>
        {members.map((m, i) => (
          <div key={i} style={{ ...s.card, ...(m.isFuture ? s.cardFuture : {}) }}>
            <div style={s.cardHeader}>
              <span style={s.cardBadge}>{m.isFuture ? '🔍 מחפשים' : '✅ פעיל'}</span>
              {i > 0 && <button onClick={() => removeMember(i)} style={s.deleteBtn}>🗑</button>}
            </div>

            <label style={s.label}>שם</label>
            <input style={s.input} value={m.name} onChange={e => update(i, 'name', e.target.value)} />

            <label style={s.label}>תפקיד</label>
            <input style={s.input} value={m.role} onChange={e => update(i, 'role', e.target.value)} />

            <label style={s.label}>תיאור</label>
            <textarea style={s.textarea} value={m.desc} onChange={e => update(i, 'desc', e.target.value)} />

            <label style={s.label}>תמונה (URL)</label>
            <input style={s.input} value={m.avatar || ''} onChange={e => update(i, 'avatar', e.target.value || null)} dir="ltr" />

            <label style={s.labelInline}>
              <input
                type="checkbox"
                checked={m.isFuture}
                onChange={e => update(i, 'isFuture', e.target.checked)}
              />
              {' '}משרה עתידית (placeholder)
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving} style={s.saveBtn}>
        {saving ? '⏳ שומר...' : '💾 שמור שינויים'}
      </button>
    </div>
  );
}

/* ========== PROJECTS EDITOR ========== */
function ProjectsEditor({ content, onSave, saving }) {
  const [items, setItems] = useState(content.he.projects.items);

  useEffect(() => {
    setItems(content.he.projects.items);
  }, [content]);

  const update = (i, field, val) => {
    const copy = [...items];
    copy[i] = { ...copy[i], [field]: val };
    setItems(copy);
  };

  const updateTags = (i, val) => {
    const copy = [...items];
    copy[i] = { ...copy[i], tags: val.split(',').map(t => t.trim()).filter(Boolean) };
    setItems(copy);
  };

  const addProject = () => {
    setItems([...items, {
      title: 'פרויקט חדש',
      description: 'תיאור הפרויקט',
      tags: ['Tech'],
      color: '#6366f1',
      link: '',
    }]);
  };

  const removeProject = (i) => {
    if (confirm('למחוק פרויקט זה?')) {
      setItems(items.filter((_, idx) => idx !== i));
    }
  };

  const handleSave = () => {
    const heProjects = { ...content.he.projects, items };
    onSave('he', 'projects', heProjects);
  };

  return (
    <div>
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>🚀 פרויקטים</h2>
        <button onClick={addProject} style={s.addBtn}>+ הוסף פרויקט</button>
      </div>

      <div style={s.cards}>
        {items.map((p, i) => (
          <div key={i} style={s.card}>
            <div style={s.cardHeader}>
              <div style={{ ...s.colorDot, background: p.color }} />
              <button onClick={() => removeProject(i)} style={s.deleteBtn}>🗑</button>
            </div>

            <label style={s.label}>שם פרויקט</label>
            <input style={s.input} value={p.title} onChange={e => update(i, 'title', e.target.value)} />

            <label style={s.label}>תיאור</label>
            <textarea style={s.textarea} value={p.description} onChange={e => update(i, 'description', e.target.value)} />

            <label style={s.label}>תגיות (מופרדות בפסיק)</label>
            <input style={s.input} value={p.tags.join(', ')} onChange={e => updateTags(i, e.target.value)} dir="ltr" />

            <label style={s.label}>קישור (URL)</label>
            <input style={s.input} value={p.link || ''} onChange={e => update(i, 'link', e.target.value)} dir="ltr" />

            <label style={s.label}>צבע</label>
            <div style={s.colorRow}>
              <input type="color" value={p.color} onChange={e => update(i, 'color', e.target.value)} />
              <span style={{ color: '#9898a8', fontSize: '0.8rem' }}>{p.color}</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving} style={s.saveBtn}>
        {saving ? '⏳ שומר...' : '💾 שמור שינויים'}
      </button>
    </div>
  );
}

/* ========== EXPERIENCE EDITOR ========== */
function ExperienceEditor({ content, onSave, saving }) {
  const [items, setItems] = useState(content.he.experience.items);

  useEffect(() => {
    setItems(content.he.experience.items);
  }, [content]);

  const update = (i, field, val) => {
    const copy = [...items];
    copy[i] = { ...copy[i], [field]: val };
    setItems(copy);
  };

  const addExp = () => {
    setItems([{
      year: '2026–הווה',
      role: 'תפקיד חדש',
      company: 'חברה',
      desc: 'תיאור',
    }, ...items]);
  };

  const removeExp = (i) => {
    if (confirm('למחוק רשומה זו?')) {
      setItems(items.filter((_, idx) => idx !== i));
    }
  };

  const handleSave = () => {
    const heExp = { ...content.he.experience, items };
    onSave('he', 'experience', heExp);
  };

  return (
    <div>
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>💼 ניסיון מקצועי</h2>
        <button onClick={addExp} style={s.addBtn}>+ הוסף תפקיד</button>
      </div>

      <div style={s.list}>
        {items.map((exp, i) => (
          <div key={i} style={s.listItem}>
            <div style={s.cardHeader}>
              <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.9rem' }}>{exp.year}</span>
              <button onClick={() => removeExp(i)} style={s.deleteBtn}>🗑</button>
            </div>

            <div style={s.row}>
              <div style={s.col}>
                <label style={s.label}>שנים</label>
                <input style={s.input} value={exp.year} onChange={e => update(i, 'year', e.target.value)} />
              </div>
              <div style={s.col}>
                <label style={s.label}>חברה</label>
                <input style={s.input} value={exp.company} onChange={e => update(i, 'company', e.target.value)} />
              </div>
            </div>

            <label style={s.label}>תפקיד</label>
            <input style={s.input} value={exp.role} onChange={e => update(i, 'role', e.target.value)} />

            <label style={s.label}>תיאור</label>
            <textarea style={s.textarea} value={exp.desc} onChange={e => update(i, 'desc', e.target.value)} />
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving} style={s.saveBtn}>
        {saving ? '⏳ שומר...' : '💾 שמור שינויים'}
      </button>
    </div>
  );
}

/* ========== HERO EDITOR ========== */
function HeroEditor({ content, onSave, saving }) {
  const [hero, setHero] = useState(content.he.hero);

  useEffect(() => {
    setHero(content.he.hero);
  }, [content]);

  const update = (field, val) => {
    setHero({ ...hero, [field]: val });
  };

  const handleSave = () => {
    onSave('he', 'hero', hero);
  };

  return (
    <div>
      <h2 style={s.sectionTitle}>🏠 עמוד ראשי</h2>

      <div style={{ ...s.card, maxWidth: 500 }}>
        <label style={s.label}>ברכה</label>
        <input style={s.input} value={hero.greeting} onChange={e => update('greeting', e.target.value)} />

        <label style={s.label}>שם</label>
        <input style={s.input} value={hero.name} onChange={e => update('name', e.target.value)} />

        <label style={s.label}>כותרת</label>
        <input style={s.input} value={hero.title} onChange={e => update('title', e.target.value)} />

        <label style={s.label}>תיאור</label>
        <textarea style={s.textarea} value={hero.subtitle} onChange={e => update('subtitle', e.target.value)} />

        <label style={s.label}>טקסט כפתור CTA</label>
        <input style={s.input} value={hero.cta} onChange={e => update('cta', e.target.value)} />

        <label style={s.label}>טקסט כפתור קו"ח</label>
        <input style={s.input} value={hero.resume} onChange={e => update('resume', e.target.value)} />
      </div>

      <button onClick={handleSave} disabled={saving} style={s.saveBtn}>
        {saving ? '⏳ שומר...' : '💾 שמור שינויים'}
      </button>
    </div>
  );
}

/* ========== STYLES ========== */
const s = {
  loading: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0f',
    color: '#e8e8ef',
    fontSize: '1.2rem',
    fontFamily: 'Heebo, sans-serif',
  },
  page: {
    minHeight: '100vh',
    background: '#0a0a0f',
    color: '#e8e8ef',
    fontFamily: 'Heebo, Inter, sans-serif',
    direction: 'rtl',
  },
  header: {
    background: '#12121a',
    borderBottom: '1px solid #2a2a3a',
    padding: '14px 24px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '1.3rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  msg: {
    fontSize: '0.85rem',
    padding: '4px 12px',
    borderRadius: 8,
    background: 'rgba(99,102,241,0.15)',
  },
  viewSite: {
    color: '#9898a8',
    textDecoration: 'none',
    fontSize: '0.85rem',
    padding: '6px 14px',
    borderRadius: 8,
    border: '1px solid #2a2a3a',
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid #2a2a3a',
    color: '#9898a8',
    padding: '6px 14px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontFamily: 'inherit',
  },
  tabs: {
    display: 'flex',
    gap: 4,
    padding: '12px 24px',
    maxWidth: 1100,
    margin: '0 auto',
    borderBottom: '1px solid #1a1a2a',
  },
  tab: {
    padding: '10px 20px',
    borderRadius: 10,
    border: 'none',
    background: 'transparent',
    color: '#9898a8',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  tabActive: {
    background: 'rgba(99,102,241,0.15)',
    color: '#818cf8',
  },
  main: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '24px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    margin: '0 0 20px 0',
  },
  addBtn: {
    padding: '8px 18px',
    borderRadius: 10,
    border: '1px dashed #6366f1',
    background: 'rgba(99,102,241,0.08)',
    color: '#818cf8',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 16,
    marginBottom: 20,
  },
  card: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: 16,
    padding: 20,
  },
  cardFuture: {
    borderStyle: 'dashed',
    borderColor: '#6366f1',
    background: 'rgba(99,102,241,0.03)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardBadge: {
    fontSize: '0.75rem',
    padding: '3px 10px',
    borderRadius: 6,
    background: 'rgba(99,102,241,0.12)',
    color: '#818cf8',
    fontWeight: 600,
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    padding: '4px 8px',
    borderRadius: 6,
    transition: 'background 0.2s',
  },
  label: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#9898a8',
    marginBottom: 4,
    marginTop: 10,
    fontWeight: 600,
  },
  labelInline: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: '0.8rem',
    color: '#9898a8',
    marginTop: 12,
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #2a2a3a',
    background: '#0a0a0f',
    color: '#e8e8ef',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #2a2a3a',
    background: '#0a0a0f',
    color: '#e8e8ef',
    fontSize: '0.85rem',
    outline: 'none',
    minHeight: 60,
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    lineHeight: 1.6,
  },
  colorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: '50%',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginBottom: 20,
  },
  listItem: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: 16,
    padding: 20,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  col: {},
  saveBtn: {
    padding: '12px 32px',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginTop: 8,
  },
};
