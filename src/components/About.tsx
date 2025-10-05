import { Code, Mail, Palette, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-7xl w-full">
        <div className="flex items-center gap-3 mb-12">
          <User className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">Sobre mí</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 bg-card border-border shadow-card">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/30">
                <img
                  src="/profile-about.jpg"
                  alt="Ethan Carter"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=ethan&backgroundColor=10b981";
                  }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Gustavo Arancibia</h3>
                <p className="text-primary font-medium mb-2">Desarrollador Frontend y Especialista en Email HTML</p>
                <p className="text-sm text-muted-foreground italic">
                  "Código rápido, lanzamientos ágiles. La perfección es enemiga del progreso."
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border shadow-card">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-foreground">
                  Soy un desarrollador frontend especializado en React, JavaScript, Tailwind CSS y Email HTML.
                  Como Vibe Coder, priorizo la velocidad sobre la perfección, usando herramientas como Windsurf,
                  Lovable y N8N para lanzar MVPs funcionales en cuestión de horas.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center space-y-2">
                  <Code className="h-10 w-10 text-primary mx-auto" />
                  <h4 className="font-semibold">Tecnología Moderna</h4>
                  <p className="text-sm text-muted-foreground">React, Vue, Tailwind</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center space-y-2">
                  <Mail className="h-10 w-10 text-primary mx-auto" />
                  <h4 className="font-semibold">Experto en Email</h4>
                  <p className="text-sm text-muted-foreground">Emails HTML, EMKT</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6 text-center space-y-2">
                  <Palette className="h-10 w-10 text-primary mx-auto" />
                  <h4 className="font-semibold">Diseño UI/UX</h4>
                  <p className="text-sm text-muted-foreground">Figma, Adobe XD</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
