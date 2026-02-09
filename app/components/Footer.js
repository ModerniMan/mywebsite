'use client';

import { useLang } from '@/lib/LangContext';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {year} {t.footer.by} | {t.footer.built}{' '}
          <span className="footer-heart">♥</span>{' '}
          {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
