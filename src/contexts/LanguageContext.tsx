import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { translations, languageOptions, type LanguageCode, type LanguageOption, type Translation } from "@/i18n/translations";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (value: LanguageCode) => void;
  copy: Translation;
  options: readonly LanguageOption[];
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "portafolio-language";

// Función para detectar el idioma del navegador
const getBrowserLanguage = (): LanguageCode => {
  if (typeof navigator === 'undefined') return 'es';
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('en')) return 'en';
  
  return 'es'; // Idioma por defecto
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('es');
  const [isInitialized, setIsInitialized] = useState(false);

  // Efecto para inicializar el idioma
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Verificar si hay un idioma guardado en localStorage
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    } else {
      // 2. Si no hay idioma guardado, detectar el idioma del navegador
      const browserLanguage = getBrowserLanguage();
      setLanguageState(browserLanguage);
      // Guardar el idioma detectado
      window.localStorage.setItem(STORAGE_KEY, browserLanguage);
    }
    
    // 3. Configurar el idioma en el documento HTML
    document.documentElement.lang = language;
    setIsInitialized(true);
  }, [language]);

  // Efecto para actualizar el idioma en localStorage cuando cambia
  useEffect(() => {
    if (!isInitialized) return;
    
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language, isInitialized]);

  const setLanguage = useCallback((value: LanguageCode) => {
    setLanguageState(value);
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    copy: translations[language],
    options: languageOptions,
  }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }

  return context;
}
