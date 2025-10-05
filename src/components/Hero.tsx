import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail, Rocket } from "lucide-react";
import profileImage from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { copy } = useLanguage();
  const hero = copy.hero;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = copy.downloadFileName;
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
        {/* Content */}
        <div className="space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
            <Rocket className="h-4 w-4 text-primary animate-glow" />
            <span className="text-sm text-muted-foreground">{hero.badge}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {hero.headingLines.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {line.parts.map((part, partIndex) => (
                  <span
                    key={partIndex}
                    className={cn(part.highlight && "text-primary")}
                  >
                    {part.text}
                  </span>
                ))}
                {lineIndex < hero.headingLines.length - 1 && <br />}
              </Fragment>
            ))}
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl">{hero.description}</p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-5 w-5" />
              {hero.downloadCta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={scrollToContact}
            >
              <Mail className="mr-2 h-5 w-5" />
              {hero.contactCta}
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
                alt={hero.profileAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
