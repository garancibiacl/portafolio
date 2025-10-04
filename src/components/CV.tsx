import { FileText, Code, Mail, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const cvData = [
  {
    icon: Code,
    title: "🚀 Frontend Developer – Vibe Coding Projects",
    subtitle: "React, Tailwind, HTML Email",
    description:
      "Desarrollé aplicaciones web responsivas usando React y Tailwind CSS, enfocándome en el rendimiento y la experiencia del usuario. Creé y optimicé plantillas de correo electrónico HTML para diversas campañas.",
  },
  {
    icon: Mail,
    title: "📧 Especialista Email HTML – EMKT & Salesforce Marketing Cloud",
    subtitle: "Salesforce Marketing Cloud, AMPscript",
    description:
      "Gestioné y ejecuté campañas de marketing por correo electrónico utilizando Salesforce Marketing Cloud. Me especialicé en la creación y optimización de correos electrónicos HTML para la entregabilidad y el compromiso.",
  },
  {
    icon: Palette,
    title: "🎨 Diseñador Web – ConectaDeco & Freelance Projects",
    subtitle: "Figma, Adobe XD, WordPress",
    description:
      "Diseñé y desarrollé sitios web para ConectaDeco y clientes freelance, asegurando una mezcla de estética y funcionalidad.",
  },
];

export default function CV() {
  return (
    <section id="cv" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-4xl w-full">
        <div className="flex items-center gap-3 mb-12">
          <FileText className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">Resumen CV</h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />

          <div className="space-y-8">
            {cvData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative flex gap-6 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  {/* Timeline Icon */}
                  <div className="hidden md:flex w-16 h-16 bg-primary rounded-full items-center justify-center flex-shrink-0 shadow-glow">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>

                  {/* Content Card */}
                  <Card className="flex-1 bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-primary font-medium mb-3">{item.subtitle}</p>
                      <p className="text-foreground/80 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
