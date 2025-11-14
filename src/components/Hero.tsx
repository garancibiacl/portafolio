import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail, Rocket } from "lucide-react";
import profileImage from "@/assets/profile.png";
import cvPdf from "@/assets/document/Cv-Gustavo-Arancibia.pdf";
import { useToast } from "@/hooks/use-toast";

const CV_FILE_NAME = "CV_Desarrollador_Frontend.pdf";
const phrases = [
  "Experiencias digitales memorables",
  "Prototipos listos para producción",
  "Componentes accesibles y escalables",
];

export default function Hero() {
  const { toast } = useToast();
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
    link.href = cvPdf;
    link.download = CV_FILE_NAME;
    link.click();

    toast({
      title: "Descarga completada",
      description:
        "Tu CV se ha descargado correctamente. ¡Gracias por tu interés en mi trabajo!",
    });
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
              variant="default"
              className="bg-background text-foreground border-2 border-primary hover:bg-primary/90 hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-primary/30"
              onClick={scrollToContact}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contáctame
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end animate-fade-in">
          <div className="group relative">
            <div className="absolute inset-0 rounded-full bg-primary/40 blur-3xl opacity-30 transition-all duration-500 group-hover:opacity-60 group-hover:blur-[80px]" />

            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div
                className="absolute -inset-[6px] rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:animate-border-gradient bg-[length:200%_200%] bg-[linear-gradient(120deg,hsl(var(--primary))_0%,#34d399_35%,#38bdf8_70%,#facc15_100%)]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-full border border-primary/30 transition-colors duration-500 group-hover:border-transparent"
                aria-hidden="true"
              />

              <div className="relative w-full h-full rounded-full overflow-hidden shadow-card transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(14,165,233,0.45)] group-hover:shadow-primary/30">
                <img
                  src={profileImage}
                  alt="Retrato profesional"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                />
              </div>

              <span
                className="pointer-events-none absolute left-10 top-4 h-2 w-2 rounded-full bg-emerald-300 opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-particle-float-1"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute right-12 top-6 h-1.5 w-1.5 rounded-full bg-sky-300 opacity-0 blur-[0.5px] transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-particle-float-2"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute left-1/2 bottom-6 h-2 w-2 -translate-x-1/2 rounded-full bg-lime-300 opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-particle-float-3"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
