'use client';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import translations from '@/lib/translations';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('he');
  const [content, setContent] = useState(translations);
  const t = content[lang];
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const toggle = useCallback(() => setLang(l => l === 'he' ? 'en' : 'he'), []);

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(data => {
        if (data && data.he && data.en) setContent(data);
      })
      .catch(() => {}); // fallback to translations
  }, []);

  return (
    <LangContext.Provider value={{ lang, t, dir, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
