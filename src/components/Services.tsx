import { Briefcase, Code, Mail, Palette, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeader } from "@/components/ui/section-header";

const serviceIcons = {
  code: Code,
  mail: Mail,
  zap: Zap,
  palette: Palette,
} as const;

const ServiceCard = ({ service, index, isVisible }: { service: any; index: number; isVisible: boolean }) => {
  const Icon = serviceIcons[service.icon] ?? Code;
  
  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`
      }}
    >
      <Card
        className="bg-gradient-card border-border hover:shadow-glow hover:border-primary/50 transition-all duration-300 group h-full"
      >
        <CardHeader>
          <div 
            className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
            style={{
              transform: isVisible ? 'scale(1)' : 'scale(0.8)',
              opacity: isVisible ? 1 : 0,
              transition: `transform 0.5s ease-out ${0.2 + (index * 0.1)}s, opacity 0.5s ease-out ${0.2 + (index * 0.1)}s, background-color 0.3s, transform 0.3s`
            }}
          >
            <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
          </div>
          <CardTitle 
            className="text-xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
              transition: `opacity 0.4s ease-out ${0.3 + (index * 0.1)}s, transform 0.4s ease-out ${0.3 + (index * 0.1)}s`
            }}
          >
            {service.title}
          </CardTitle>
          <CardDescription 
            className="text-muted-foreground"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
              transition: `opacity 0.4s ease-out ${0.4 + (index * 0.1)}s, transform 0.4s ease-out ${0.4 + (index * 0.1)}s`
            }}
          >
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p 
            className="text-sm text-foreground/80"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.4s ease-out ${0.5 + (index * 0.1)}s, transform 0.4s ease-out ${0.5 + (index * 0.1)}s`
            }}
          >
            {service.details}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Services() {
  const { copy } = useLanguage();
  const services = copy.services;
  const servicesRef = useRef<HTMLElement>(null);
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

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={servicesRef}
      className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20 overflow-x-hidden"
    >
      <div className="max-w-7xl w-full">
        <SectionHeader
          icon={<Briefcase className="h-8 w-8 text-primary" />}
          title={services.heading}
          description={services.subtitle || "Servicios profesionales de alta calidad"}
          isVisible={isVisible}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.cards.map((service, index) => (
            <ServiceCard 
              key={service.title}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
