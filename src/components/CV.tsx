import { FileText, Code, Mail, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap = {
  code: Code,
  mail: Mail,
  palette: Palette,
} as const;

export default function CV() {
  const { copy } = useLanguage();
  const cv = copy.cv;

  return (
    <section id="cv" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-4xl w-full">
        <div className="flex items-center gap-3 mb-12">
          <FileText className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">{cv.heading}</h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />

          <div className="space-y-8">
            {cv.items.map((item, index) => {
              const Icon = iconMap[item.icon];
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
