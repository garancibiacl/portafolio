import { Code2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { SkillsData } from "@/types/skills";

interface SkillProgressProps {
  name: string;
  level: number;
  isVisible: boolean;
}

const SkillProgress = ({ name, level, isVisible }: SkillProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(level);
      }, 150); // Pequeño retraso para el efecto de animación en cascada
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [isVisible, level]);

  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex justify-between items-center">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-sm text-primary font-semibold">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2 transition-all duration-1000 ease-out" />
    </div>
  );
};

export default function Skills() {
  const { copy } = useLanguage();
  const skills = copy.skills;
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={skillsRef}
      className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20 overflow-x-hidden"
    >
      <div className="max-w-4xl w-full mx-auto">
        <SectionHeader
          icon={<Code2 className="h-8 w-8 text-primary" />}
          title={skills.heading}
          description="Tecnologías y herramientas que utilizo en mis proyectos"
          isVisible={isVisible}
        />

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {skills.list.map((skill, index) => (
                <div 
                  key={skill.name}
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`
                  }}
                >
                  <SkillProgress 
                    name={skill.name} 
                    level={skill.level} 
                    isVisible={isVisible} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Tags */}
        <div 
          className="mt-12 flex flex-wrap gap-3 justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s'
          }}
        >
          {skills.techTags.map((tech: string, index: number) => (
            <span
              key={tech}
              className="px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity 0.3s ease-out ${0.4 + (index * 0.05)}s, transform 0.3s ease-out ${0.4 + (index * 0.05)}s, background-color 0.2s, box-shadow 0.2s`
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
