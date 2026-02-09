'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        setError('סיסמה שגויה');
      }
    } catch {
      setError('שגיאת תקשורת');
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h1 style={styles.title}>🔐 פאנל ניהול</h1>
        <p style={styles.subtitle}>ModerniMan Portfolio</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="סיסמת אדמין"
          style={styles.input}
          autoFocus
          dir="ltr"
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? '⏳ מתחבר...' : '🚀 כניסה'}
        </button>

        <a href="/" style={styles.back}>← חזרה לאתר</a>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0f',
    fontFamily: 'Heebo, Inter, sans-serif',
    direction: 'rtl',
  },
  card: {
    background: '#16161f',
    border: '1px solid #2a2a3a',
    borderRadius: 20,
    padding: '48px 36px',
    width: 380,
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 800,
    color: '#e8e8ef',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#9898a8',
    marginBottom: 28,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid #2a2a3a',
    background: '#0a0a0f',
    color: '#e8e8ef',
    fontSize: '1rem',
    outline: 'none',
    marginBottom: 12,
    boxSizing: 'border-box',
    textAlign: 'center',
    fontFamily: 'inherit',
  },
  error: {
    color: '#ef4444',
    fontSize: '0.85rem',
    marginBottom: 8,
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginBottom: 16,
  },
  back: {
    color: '#9898a8',
    fontSize: '0.85rem',
    textDecoration: 'none',
  },
};
