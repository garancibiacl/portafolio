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
  // Verificar si estamos en el servidor
  if (typeof window === 'undefined') return 'es';
  
  // Obtener el idioma del navegador
  const browserLang = navigator.language || (navigator as any).userLanguage || 'es';
  
  // Verificar si el idioma es español o inglés
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('en')) return 'en';
  
  // Idioma por defecto
  return 'es';
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('es');
  const [isInitialized, setIsInitialized] = useState(false);

  // Efecto para inicializar el idioma (solo se ejecuta una vez al montar)
  useEffect(() => {
    // 1. Verificar si hay un idioma guardado en localStorage
    const savedLanguage = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      // Usar el idioma guardado
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    } else {
      // 2. Si no hay idioma guardado, detectar el idioma del navegador
      const browserLanguage = getBrowserLanguage();
      setLanguageState(browserLanguage);
      document.documentElement.lang = browserLanguage;
      // Guardar el idioma detectado
      localStorage.setItem(STORAGE_KEY, browserLanguage);
    }
    
    setIsInitialized(true);
    
    // Limpieza opcional si es necesario
    return () => {
      // Código de limpieza si es necesario
    };
  }, []); // Array de dependencias vacío para que solo se ejecute una vez

  // Efecto para actualizar el idioma en localStorage cuando cambia
  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language, isInitialized]);

  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
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
