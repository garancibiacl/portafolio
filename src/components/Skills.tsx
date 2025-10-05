import { Code } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Skills() {
  const { copy } = useLanguage();
  const skills = copy.skills;

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-7xl w-full">
        <div className="flex items-center gap-3 mb-12">
          <Code className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">{skills.heading}</h2>
        </div>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {skills.list.map((skill, index) => (
                <div key={skill.name} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm text-primary font-semibold">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Tags */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {skills.techTags.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
