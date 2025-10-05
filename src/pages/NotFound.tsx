import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { copy } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">{copy.notFound.title}</h1>
        <p className="text-lg text-muted-foreground">{copy.notFound.description}</p>
        <a
          href="/"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-colors hover:bg-primary/90"
        >
          {copy.notFound.backToHome}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
