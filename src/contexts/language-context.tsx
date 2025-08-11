"use client";

import React, { createContext, useState, useContext, type ReactNode } from 'react';
import content from '@/lib/content';

type Language = 'en' | 'es';
type Content = typeof content.en;

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => {
    setLang((prevLang) => (prevLang === 'en' ? 'es' : 'en'));
  };

  const t = content[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
