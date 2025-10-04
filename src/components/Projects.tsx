import { useState } from "react";
import { FolderGit2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Modern e-commerce with React & Tailwind",
    image: "/project1.jpg",
    tags: ["React", "Tailwind", "API"],
    link: "#",
  },
  {
    id: 2,
    title: "Email Campaign Dashboard",
    description: "Email marketing automation tool",
    image: "/project2.jpg",
    tags: ["HTML Email", "SFMC", "AMPscript"],
    link: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Minimalist portfolio with animations",
    image: "/project3.jpg",
    tags: ["React", "Framer Motion", "CSS"],
    link: "#",
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Productivity app with AI features",
    image: "/project4.jpg",
    tags: ["React", "Firebase", "AI"],
    link: "#",
  },
  {
    id: 5,
    title: "Landing Page Generator",
    description: "AI-powered landing page builder",
    image: "/project5.jpg",
    tags: ["Vue", "N8N", "AI"],
    link: "#",
  },
  {
    id: 6,
    title: "Corporate Website",
    description: "Responsive corporate site",
    image: "/project6.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const allTags = ["all", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-7xl w-full">
        <div className="flex items-center gap-3 mb-8">
          <FolderGit2 className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">Proyectos Destacados</h2>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tag)}
              className={filter === tag ? "bg-primary text-primary-foreground" : ""}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="bg-card border-border overflow-hidden group hover:shadow-glow transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&q=60`;
                  }}
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Proyecto
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground">
                    {tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Ver más proyectos
          </Button>
        </div>
      </div>
    </section>
  );
}
