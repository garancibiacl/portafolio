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

// Función para detectar el idioma del navegador de manera más robusta
const getBrowserLanguage = (): LanguageCode => {
  // Verificar si estamos en el servidor
  if (typeof window === 'undefined' || !navigator) {
    console.log('Navegador no disponible, usando español por defecto');
    return 'es';
  }
  
  try {
    // Mostrar información de depuración
    console.log('navigator.languages:', navigator.languages);
    console.log('navigator.language:', navigator.language);
    console.log('navigator.userLanguage:', (navigator as any).userLanguage);
    
    // Obtener el idioma del navegador de varias formas posibles
    const browserLang = (
      (navigator.languages && navigator.languages[0]) || // Navegadores modernos
      navigator.language ||                            // Navegadores estándar
      (navigator as any).userLanguage ||               // IE <= 10
      'es'                                             // Valor por defecto
    ).toLowerCase();
    
    console.log('Idioma detectado del navegador (sin procesar):', browserLang);
    
    // Verificar si el idioma es español o inglés
    if (browserLang.startsWith('es') || browserLang.includes('es-')) return 'es';
    if (browserLang.startsWith('en') || browserLang.includes('en-')) return 'en';
    
    // Si el idioma no es soportado, devolver español como predeterminado
    return 'es';
  } catch (error) {
    console.error('Error al detectar el idioma del navegador:', error);
    return 'es';
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Estado para manejar si la aplicación está hidratada (para SSR)
  const [isMounted, setIsMounted] = useState(false);
  
  // Estado para el idioma, con un valor por defecto
  const [language, setLanguageState] = useState<LanguageCode>('es');

  // Efecto para marcar cuando el componente se monta (solo en el cliente)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Efecto para inicializar el idioma cuando el componente se monta
  useEffect(() => {
    if (!isMounted) return;
    
    console.log('Inicializando idioma...');
    
    try {
      // 1. Verificar si hay un idioma guardado en localStorage
      const savedLanguage = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      console.log('Idioma guardado en localStorage:', savedLanguage);
      
      if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        // Usar el idioma guardado
        console.log('Usando idioma guardado:', savedLanguage);
        setLanguageState(savedLanguage);
        document.documentElement.lang = savedLanguage;
      } else {
        // 2. Si no hay idioma guardado, detectar el idioma del navegador
        console.log('No se encontró idioma guardado, detectando idioma del navegador...');
        const browserLanguage = getBrowserLanguage();
        console.log('Idioma detectado del navegador (en efecto):', browserLanguage);
        setLanguageState(browserLanguage);
        document.documentElement.lang = browserLanguage;
        // Guardar el idioma detectado
        localStorage.setItem(STORAGE_KEY, browserLanguage);
        console.log('Idioma guardado en localStorage:', browserLanguage);
      }
    } catch (error) {
      console.error('Error al inicializar el idioma:', error);
      // En caso de error, usar español como valor predeterminado
      setLanguageState('es');
      document.documentElement.lang = 'es';
    }
  }, [isMounted]);

  // Función para cambiar el idioma
  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    try {
      console.log('Cambiando idioma a:', newLanguage);
      setLanguageState(newLanguage);
      localStorage.setItem(STORAGE_KEY, newLanguage);
      document.documentElement.lang = newLanguage;
    } catch (error) {
      console.error('Error al cambiar el idioma:', error);
    }
  }, []);

  // Memoizar el valor del contexto para evitar renderizados innecesarios
  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    copy: translations[language],
    options: languageOptions,
  }), [language, setLanguage]);

  // Si no estamos en el navegador, renderizar con el idioma por defecto
  if (!isMounted) {
    return (
      <LanguageContext.Provider value={{
        language: 'es',
        setLanguage: () => {},
        copy: translations.es,
        options: languageOptions,
      }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }

  return context;
}
