import { Code, Mail, Palette, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const highlightIconMap = {
  code: Code,
  mail: Mail,
  palette: Palette,
} as const;

export default function About() {
  const { copy } = useLanguage();
  const about = copy.about;

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-7xl w-full">
        <div className="flex items-center gap-3 mb-12">
          <User className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">{about.heading}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-card border-border shadow-card">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/30">
                <img
                  src="/profile-about.jpg"
                  alt={about.profileAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=ethan&backgroundColor=10b981";
                  }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{about.name}</h3>
                <p className="text-primary font-medium mb-2">{about.role}</p>
                <p className="text-sm text-muted-foreground italic">"{about.quote}"</p>
              </div>
            </CardContent>
          </Card>

          {/* About Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border shadow-card">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-foreground">{about.intro}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              {about.highlights.map((highlight) => {
                const Icon = highlightIconMap[highlight.icon] ?? Code;
                return (
                  <Card
                    key={highlight.title}
                    className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300"
                  >
                    <CardContent className="p-6 text-center space-y-2">
                      <Icon className="h-10 w-10 text-primary mx-auto" />
                      <h4 className="font-semibold">{highlight.title}</h4>
                      <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
