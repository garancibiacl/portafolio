import { FileText, Code, Mail, Palette, ArrowRight, Hammer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = {
  code: Code,
  mail: Mail,
  tool: Hammer,
  palette: Palette,
} as const;

type IconType = keyof typeof iconMap;

interface CVItem {
  title: string;
  subtitle: string;
  description: string;
  icon: IconType;
}

interface CVData {
  heading: string;
  subtitle: string;
  items: CVItem[];
}

const CardItem = ({ item, index, isVisible }: { item: CVItem; index: number; isVisible: boolean }) => {
  const Icon = iconMap[item.icon];
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20,
        transition: { 
          delay: 0.1 * index,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }
      }}
      className="relative flex gap-6"
    >
      {/* Timeline Icon */}
      <motion.div 
        className="hidden md:flex w-16 h-16 bg-primary rounded-full items-center justify-center flex-shrink-0 shadow-glow group"
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)'
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon className="h-8 w-8 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
      </motion.div>

      {/* Content Card */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex-1"
      >
        <motion.div
          initial={false}
          animate={{
            y: isHovered ? -5 : 0,
            boxShadow: isHovered 
              ? '0 20px 40px -10px rgba(0, 0, 0, 0.3)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="h-full"
        >
          <Card className="h-full bg-gradient-card border-border transition-all duration-300 overflow-hidden group/card">
            <CardContent className="p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <motion.h3 
                  className="text-xl font-bold mb-1 flex items-center gap-2"
                  initial={false}
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                  <motion.span
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    transition={{ delay: 0.1 }}
                    className="text-primary"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </motion.h3>
                <motion.p 
                  className="text-primary font-medium mb-3"
                  initial={false}
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  {item.subtitle}
                </motion.p>
                <motion.p 
                  className="text-foreground/80 leading-relaxed"
                  initial={false}
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {item.description}
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function CV() {
  const { copy } = useLanguage();
  // Aseguramos que los datos tengan el formato correcto
  const cv: CVData = {
    heading: copy.cv?.heading || "Mi Experiencia",
    subtitle: copy.cv?.subtitle || "Un recorrido por mi trayectoria profesional",
    items: (copy.cv?.items || []).map(item => ({
      title: item.title || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
      icon: (item.icon in iconMap ? item.icon : 'code') as IconType
    }))
  };
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef as React.MutableRefObject<HTMLElement | null>}
      id="cv" 
      className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20 overflow-hidden"
    >
      <div className="max-w-4xl w-full">
        <motion.div 
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : 20,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
            initial={{ scale: 0 }}
            animate={{ 
              scale: isVisible ? 1 : 0,
              transition: { 
                delay: 0.2,
                type: 'spring',
                stiffness: 260,
                damping: 20
              }
            }}
          >
            <FileText className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 10,
              transition: { delay: 0.3, duration: 0.6 }
            }}
          >
            {cv.heading}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 10,
              transition: { delay: 0.4, duration: 0.6 }
            }}
          >
            {cv.subtitle}
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <motion.div 
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 hidden md:block"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ 
              scaleY: isVisible ? 1 : 0, 
              opacity: isVisible ? 1 : 0,
              transformOrigin: 'top',
              transition: { 
                duration: 0.8, 
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          />

          <div className="space-y-12">
            <AnimatePresence mode="wait">
{cv.items.map((item: CVItem, index: number) => (
                <CardItem 
                  key={`${item.title}-${index}`} 
                  item={item} 
                  index={index} 
                  isVisible={isVisible}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
