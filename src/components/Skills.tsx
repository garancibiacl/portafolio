import { Code } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  { name: "HTML5", level: 90 },
  { name: "CSS3", level: 85 },
  { name: "JavaScript", level: 95 },
  { name: "React", level: 90 },
  { name: "Vue", level: 80 },
  { name: "Tailwind CSS", level: 90 },
  { name: "APIs & Microservices", level: 85 },
  { name: "Figma", level: 80 },
  { name: "Git", level: 90 },
  { name: "Automation with AI", level: 80 },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-7xl w-full">
        <div className="flex items-center gap-3 mb-12">
          <Code className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">Skills</h2>
        </div>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
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
          {[
            "Bootstrap 5",
            "SASS",
            "Netlify",
            "Firebase",
            "WordPress",
            "WooCommerce",
            "Odoo",
            "N8N",
            "Windsurf",
            "Lovable",
          ].map((tech) => (
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
