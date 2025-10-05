import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail, Rocket } from "lucide-react";
import profileImage from "@/assets/profile.png";

const CV_FILE_NAME = "CV_Desarrollador_Frontend.pdf";
const phrases = [
  "Experiencias digitales memorables",
  "Prototipos listos para producción",
  "Componentes accesibles y escalables",
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setDisplayText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
        return;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1200);
        return;
      }

      if (isDeleting && charIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
        return;
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = CV_FILE_NAME;
    link.click();
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 lg:px-12 bg-gradient-hero"
    >
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
            <Rocket className="h-4 w-4 text-primary animate-glow" />
            <span className="text-sm text-muted-foreground">
              Disponible para nuevos proyectos
            </span>
          </div>

          <div className="space-y-2">
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-primary via-emerald-300 to-lime-200 bg-clip-text text-transparent">
              UI Specialist
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Dev Front-End
            </span>
          </div>

          <p className="text-lg text-muted-foreground max-w-xl">
            Desarrollo interfaces enfocadas en performance y consistencia
            visual, con procesos colaborativos que reducen tiempos de entrega.
          </p>

          <p className="font-mono text-base md:text-lg text-muted-foreground h-6">
            {displayText}
            <span className="ml-1 animate-pulse">|</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-5 w-5" />
              Descargar CV
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={scrollToContact}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contáctame
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-20 animate-glow" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-card">
              <img
                src={profileImage}
                alt="Retrato profesional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
