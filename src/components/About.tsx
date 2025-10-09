import { User2, Code, Mail, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: AnimatedCardProps) => {
  return (
    <div
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        animation: `fadeInUp 0.6s ease-out ${delay}s forwards`,
      }}
    >
      {children}
    </div>
  );
};

interface HighlightCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  isVisible: boolean;
}

const HighlightCard = ({
  title,
  description,
  icon,
  delay,
  isVisible,
}: HighlightCardProps) => {
  return (
    <Card
      className="bg-card border-border hover:border-primary/50 transition-all duration-300 h-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s, border-color 0.3s`,
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function About() {
  const { copy } = useLanguage();
  const aboutRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);
  return (
    <section
      id="about"
      ref={aboutRef}
      className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20 overflow-x-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={<User2 className="h-8 w-8 text-primary" />}
          title="Sobre mí"
          description={
            copy.about.intro || "Conoce más sobre mi experiencia y habilidades"
          }
          isVisible={isVisible}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tarjeta de perfil - Columna izquierda */}
          <div className="lg:col-span-4">
            <Card 
              className="bg-card border-border shadow-card h-full"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s"
              }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/30">
                  <img
                    src="/profile-about.jpg"
                    alt="Gustavo Arancibia"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=gustavo&backgroundColor=10b981";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Gustavo Arancibia</h3>
                  <p className="text-primary font-medium mb-2">
                    Desarrollador Frontend y Especialista en Email HTML
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    "Código rápido, lanzamientos ágiles. La perfección es enemiga del progreso."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha - Descripción y habilidades */}
          <div className="lg:col-span-8 space-y-6">
            {/* Sección de descripción */}
            <Card 
              className="bg-card border-border shadow-card"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s"
              }}
            >
              <CardContent className="p-6">
                <p className="text-foreground">
                  {copy.about.intro ||
                    "Soy un desarrollador frontend especializado en React, JavaScript, Tailwind CSS y Email HTML. Como Vibe Coder, priorizo la velocidad sobre la perfección, usando herramientas modernas para lanzar MVPs funcionales en cuestión de horas."}
                </p>
              </CardContent>
            </Card>

            {/* Sección de habilidades */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {copy.about.highlights?.map((highlight: any, index: number) => (
                <HighlightCard
                  key={index}
                  title={highlight.title || `Habilidad ${index + 1}`}
                  description={
                    highlight.description || "Descripción del destacado"
                  }
                  icon={
                    highlight.icon === "code" ? (
                      <Code className="h-5 w-5" />
                    ) : highlight.icon === "mail" ? (
                      <Mail className="h-5 w-5" />
                    ) : highlight.icon === "palette" ? (
                      <Palette className="h-5 w-5" />
                    ) : (
                      <Code className="h-5 w-5" />
                    )
                  }
                  delay={0.2 + index * 0.1}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
