'use client';

import { LangProvider, useLang } from '@/lib/LangContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Team from './components/Team';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <LangProvider>
      <PortfolioApp />
    </LangProvider>
  );
}

function PortfolioApp() {
  const { dir } = useLang();

  return (
    <div dir={dir}>
      <Navbar />
      <Hero />
      <Projects />
      <Team />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
