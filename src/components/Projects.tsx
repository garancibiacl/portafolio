import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, Check, FolderGit2 } from "lucide-react";
import type { Project as ProjectType } from "@/types/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  isVisible: boolean;
  filter: string;
  onFilterChange: (tag: string) => void;
}

const ProjectCard = ({ project, index, isVisible, filter, onFilterChange }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="h-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`
      }}
    >
      <Card 
        className="h-full flex flex-col bg-card border-border overflow-hidden group hover:shadow-glow transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered ? 'scale-110' : 'scale-100'
            )}
            onError={(e) => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&q=60`;
            }}
          />
          <div 
            className={cn(
              "absolute inset-0 bg-background/80 flex items-center justify-center transition-opacity duration-300",
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transform transition-all duration-300 hover:scale-105"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Proyecto
              </a>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <CardDescription className="line-clamp-2">{project.description}</CardDescription>
          </CardHeader>
          <div className="mt-auto">
            <CardFooter className="flex flex-wrap gap-2 pt-0">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn(
                    "cursor-pointer transition-all hover:bg-accent/50 hover:scale-105",
                    filter === tag ? "bg-primary/10 text-primary border-primary/50" : "border-border/50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange(tag);
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default function Projects() {
  const { copy } = useLanguage();
  const projects = copy.projects.cards;
  const [filter, setFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const projectsPerLoad = 3;
  const projectsRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(projectsRef, { threshold: 0.1 });
  
  // Efecto para resetear la visibilidad cuando cambia el filtro
  useEffect(() => {
    if (projectsRef.current) {
      const element = projectsRef.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.setAttribute('data-visible', 'true');
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [filter]);
  const allTags = useMemo(
    () => ["all", ...Array.from(new Set(projects.flatMap((p) => p.tags)))],
    [projects]
  );

  const filteredProjects = useMemo(
    () => filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter)),
    [filter, projects]
  );

  const displayedProjects = useMemo(
    () => filteredProjects.slice(0, visibleProjects),
    [filteredProjects, visibleProjects]
  );

  const hasMoreProjects = visibleProjects < filteredProjects.length;

  const loadMore = useCallback(() => {
    setVisibleProjects(prev => prev + projectsPerLoad);
  }, [projectsPerLoad]);
  return (
    <section
      ref={projectsRef}
      id="projects"
      className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20 overflow-x-hidden"
      data-visible={isVisible}
    >
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-6 mx-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.8,
              transition: {
                duration: 0.6,
                delay: 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
          >
            <FolderGit2 className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 20,
              transition: { 
                duration: 0.6, 
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            Proyectos destacados
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 20,
              transition: { duration: 0.6, delay: 0.3 }
            }}
          >
            Algunos de mis trabajos más recientes y destacados
          </motion.p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(tag)}
              className="transition-all duration-200"
            >
              {tag}
              {filter === tag && <Check className="ml-2 h-4 w-4" />}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              isVisible={isVisible}
              filter={filter}
              onFilterChange={setFilter}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          {hasMoreProjects ? (
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 overflow-hidden relative"
              onClick={loadMore}
            >
              <span className="relative z-10 flex items-center">
                {copy.projects.ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          ) : filteredProjects.length === 0 ? (
            <p className="text-muted-foreground">
              No se encontraron proyectos con el filtro seleccionado.
            </p>
          ) : (
            <p className="text-muted-foreground">
              Has llegado al final de la lista de proyectos.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
