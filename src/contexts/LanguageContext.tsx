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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") {
      return "es";
    }

    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored === "en" || stored === "es") {
      return stored;
    }

    return "es";
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((value: LanguageCode) => {
    setLanguageState(value);
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      copy: translations[language],
      options: languageOptions,
    };
  }, [language, setLanguage]);

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
