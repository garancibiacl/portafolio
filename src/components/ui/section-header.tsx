import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  description?: string;
  isVisible: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  icon,
  title,
  description,
  isVisible,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-6 mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
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
        {icon}
      </motion.div>
      <motion.h2 
        className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 ${titleClassName}`}
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
        {title}
      </motion.h2>
      {description && (
        <motion.p 
          className={`text-muted-foreground text-lg max-w-2xl mx-auto ${descriptionClassName}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : 20,
            transition: { 
              duration: 0.6, 
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
