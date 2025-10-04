import { Button } from "@/components/ui/button";
import { Download, Mail, Rocket } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 lg:px-12 bg-gradient-hero"
    >
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
            <Rocket className="h-4 w-4 text-primary animate-glow" />
            <span className="text-sm text-muted-foreground">Disponible para proyectos</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Frontend Developer{" "}
            <span className="text-primary">🚀</span>
            <br />
            <span className="text-primary">|</span> React,
            <br />
            JavaScript,
            <br />
            Tailwind CSS{" "}
            <span className="text-primary">|</span>
            <br />
            Email HTML
            <br />
            Specialist{" "}
            <span className="text-primary">✉️ |</span> Vibe
            <br />
            Coding & AI for
            <br />
            Modern Websites{" "}
            <span className="text-primary">🤖</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl">
            I'm a passionate frontend developer specializing in creating modern, responsive web
            applications and crafting engaging email campaigns. I leverage AI tools to enhance my
            workflow and deliver exceptional results.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/cv.pdf';
                link.download = 'CV_Frontend_Developer.pdf';
                link.click();
              }}
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

        {/* Profile Image */}
        <div className="flex justify-center lg:justify-end animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-20 animate-glow" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-card">
              <img
                src={profileImage}
                alt="Frontend Developer Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
