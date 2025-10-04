import { Briefcase, Code, Mail, Palette, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Code,
    title: "Desarrollo Frontend Moderno",
    description: "React, Tailwind, Vue",
    details: "Aplicaciones web responsivas con las últimas tecnologías y mejores prácticas.",
  },
  {
    icon: Mail,
    title: "Email HTML Specialist ✉️",
    description: "Campañas optimizadas, responsive, AMPscript",
    details: "Creación de emails profesionales compatibles con todos los clientes de correo.",
  },
  {
    icon: Zap,
    title: "Automatización con IA 🤖",
    description: "N8N, Vibe Coding, MVPs rápidos",
    details: "Automatización de procesos y desarrollo ágil de prototipos funcionales.",
  },
  {
    icon: Palette,
    title: "Diseño UI/UX",
    description: "Prototipos, wireframes, mockups navegables",
    details: "Diseño de interfaces modernas centradas en la experiencia del usuario.",
  },
];

export default function Services() {
  return (
    <section id="services" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-7xl w-full">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">Servicios</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="bg-gradient-card border-border hover:shadow-glow hover:border-primary/50 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">{service.details}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
