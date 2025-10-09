export type LanguageCode = "es" | "en";

type NavItem = {
  id: string;
  label: string;
};

type ServiceCard = {
  icon: "code" | "mail" | "zap" | "palette";
  title: string;
  description: string;
  details: string;
};

type ProjectCard = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
};

type HeroHeadingSegment = {
  text: string;
  highlight?: boolean;
};

type HeroHeadingLine = {
  parts: HeroHeadingSegment[];
};

type CvItem = {
  icon: "code" | "mail" | "palette";
  title: string;
  subtitle: string;
  description: string;
};

type ContactLink = {
  type: "linkedin" | "github" | "email";
  label: string;
  href: string;
};

type Skill = {
  name: string;
  level: number;
};

type HighlightCard = {
  icon: "code" | "mail" | "palette";
  title: string;
  description: string;
};

export type Translation = {
  languageName: string;
  languageSelectorLabel: string;
  languageSelectorAria: string;
  downloadFileName: string;
  footer?: {
    copyright: string;
    madeWith: string;
  };
  sidebar: {
    brand: string;
    toggleSidebarAria: string;
    mobileMenuAria: {
      open: string;
      close: string;
    };
    navItems: NavItem[];
    downloadCta: string;
  };
  hero: {
    badge: string;
    headingLines: HeroHeadingLine[];
    description: string;
    downloadCta: string;
    contactCta: string;
    profileAlt: string;
  };
  about: {
    heading: string;
    profileAlt: string;
    name: string;
    role: string;
    quote: string;
    intro: string;
    highlights: HighlightCard[];
  };
  skills: {
    heading: string;
    list: Skill[];
    techTags: string[];
  };
  services: {
    heading: string;
    cards: ServiceCard[];
  };
  projects: {
    heading: string;
    filterAllLabel: string;
    ctaLabel: string;
    viewLabel: string;
    cards: ProjectCard[];
  };
  cv: {
    heading: string;
    items: CvItem[];
  };
    contact: {
      heading: string;
      introTitle: string;
      introDescription: string;
      links: ContactLink[];
      formTitle: string;
      form: {
        nameLabel: string;
        namePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        messageLabel: string;
        messagePlaceholder: string;
        submit: string;
        submitting: string;
      };
      toast: {
        missingFields: {
          title: string;
          description: string;
        };
        invalidEmail: {
          title: string;
          description: string;
        };
        success: {
          title: string;
          description: string;
        };
        error: {
          title: string;
          description: string;
        };
      };
    };
  notFound: {
    title: string;
    description: string;
    backToHome: string;
  };
};

export const languageOptions = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
] as const;

export type LanguageOption = (typeof languageOptions)[number];

export const translations: Record<LanguageCode, Translation> = {
  es: {
    languageName: "Español",
    languageSelectorLabel: "Idioma",
    languageSelectorAria: "Cambiar idioma",
    downloadFileName: "CV_Desarrollador_Frontend.pdf",
    footer: {
      copyright: "© 2025 Todos los derechos reservados",
      madeWith: "Hecho con ❤️ y dedicación"
    },
    sidebar: {
      brand: "DevFolio",
      toggleSidebarAria: "Alternar barra lateral",
      mobileMenuAria: {
        open: "Abrir menú",
        close: "Cerrar menú",
      },
      navItems: [
        { id: "hero", label: "Inicio" },
        { id: "about", label: "Sobre mí" },
        { id: "skills", label: "Habilidades" },
        { id: "services", label: "Servicios" },
        { id: "projects", label: "Proyectos" },
        { id: "cv", label: "CV" },
        { id: "contact", label: "Contacto" },
      ],
      downloadCta: "Descargar CV",
    },
    hero: {
      badge: "Disponible para proyectos",
      headingLines: [
        {
          parts: [
            { text: "Frontend Developer" },
            { text: " 🚀", highlight: true },
          ],
        },
        {
          parts: [
            { text: "| ", highlight: true },
            { text: "React," },
          ],
        },
        {
          parts: [{ text: "JavaScript," }],
        },
        {
          parts: [
            { text: "Tailwind CSS" },
            { text: " |", highlight: true },
          ],
        },
        {
          parts: [{ text: "Especialista en Email HTML" }],
        },
        {
          parts: [
            { text: "✉️ |", highlight: true },
            { text: " Vibe Coding" },
          ],
        },
        {
          parts: [{ text: "e IA para" }],
        },
        {
          parts: [
            { text: "Sitios Modernos" },
            { text: " 🤖", highlight: true },
          ],
        },
      ],
      description:
        "Soy un desarrollador frontend enfocado en crear experiencias web modernas y responsivas, además de campañas de email atractivas. Aprovecho herramientas de IA para optimizar mi flujo de trabajo y entregar resultados excepcionales.",
      downloadCta: "Descargar CV",
      contactCta: "Contáctame",
      profileAlt: "Perfil del desarrollador frontend",
    },
    about: {
      heading: "Sobre mí",
      profileAlt: "Retrato de Ethan Carter",
      name: "Ethan Carter",
      role: "Desarrollador Frontend y Especialista en Email HTML",
      quote: "Código rápido, lanzamientos ágiles. La perfección es enemiga del progreso.",
      intro:
        "Comprometido con la innovación ágil, la automatización con IA y el desarrollo de interfaces modernas que combinan velocidad + impacto real.",
      highlights: [
        {
          icon: "code",
          title: "Tecnología Moderna",
          description: "React, Vue, Tailwind",
        },
        {
          icon: "mail",
          title: "Experto en Email",
          description: "Emails HTML, EMKT",
        },
        {
          icon: "palette",
          title: "Diseño UI/UX",
          description: "Figma, Adobe XD",
        },
      ],
    },
    skills: {
      heading: "Habilidades",
      list: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 85 },
        { name: "JavaScript", level: 95 },
        { name: "React", level: 90 },
        { name: "Vue", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "APIs & Microservicios", level: 85 },
        { name: "Figma", level: 80 },
        { name: "Git", level: 90 },
        { name: "Automatización con IA", level: 80 },
      ],
      techTags: [
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
      ],
    },
    services: {
      heading: "Servicios",
      cards: [
        {
          icon: "code",
          title: "Desarrollo Frontend Moderno",
          description: "React, Tailwind, Vue",
          details: "Aplicaciones web responsivas con las últimas tecnologías y mejores prácticas.",
        },
        {
          icon: "mail",
          title: "Especialista en Email HTML ✉️",
          description: "Campañas optimizadas, responsive, AMPscript",
          details: "Diseño emails profesionales compatibles con todos los clientes de correo.",
        },
        {
          icon: "zap",
          title: "Automatización con IA 🤖",
          description: "N8N, Vibe Coding, MVPs rápidos",
          details: "Automatizo procesos y desarrollo prototipos funcionales con velocidad.",
        },
        {
          icon: "palette",
          title: "Diseño UI/UX",
          description: "Prototipos, wireframes, mockups navegables",
          details: "Interfaces modernas centradas en la experiencia de las personas.",
        },
      ],
    },
    projects: {
      heading: "Proyectos Destacados",
      filterAllLabel: "Todos",
      ctaLabel: "Ver más proyectos",
      viewLabel: "Ver proyecto",
      cards: [
        {
          id: 1,
          title: "Plataforma E-commerce",
          description: "Comercio electrónico moderno con React y Tailwind",
          image: "/images/ecommerce-platform.jpg",
          tags: ["React", "Bootstrap", "API"],
          link: "https://3draw-app.vercel.app",
        },
        {
          id: 2,
          title: "Panel de Campañas Email",
          description: "Automatización para marketing por correo",
          image: "/images/toolsearch.jpg",
          tags: ["React", "Tailwind", "AMPscript", "AI"],
          link: "https://toolsearcho.netlify.app",
        },
        {
          id: 3,
          title: "Portafolio Animado",
          description: "Portafolio minimalista con animaciones",
          image: "/images/portafolio-animado.jpg",
          tags: ["HTML", "JavaScript", "CSS"],
          link: "https://garancibiacl.github.io",
        },
        {
          id: 4,
          title: "Gestor de Tareas",
          description: "Productividad con funciones de IA",
          image: "/images/gestor-tareas.jpg",
          tags: ["HTML", "JavaScript", "CSS"],
          link: "https://cheery-sunshine-0afe23.netlify.app",
        },
        {
          id: 5,
          title: "Buscador Banners Sodimac",
          description: "Ayudarte a seleccionar banners visuales y generar código HTML con solo unos clics",
          image: "/images/buscador-banners.jpg",
          tags: ["HTML", "JavaScript", "CSS", "AI", "Bootstrap"],
          link: "#",
        },
        {
          id: 6,
          title: "Layout HTML Grid",
          description: "Herramienta para generar layout HTML con grid",
          image: "/images/layout-html-grid.jpg",
          tags: ["HTML", "CSS", "JavaScript"],
          link: "https://layout-generator-html.netlify.app",
        },
        {
          id: 7,
          title: "Ecommerce Pizzeria",
          description: "Sistema de ecommerce para pizzeria",
          image: "/images/auth-system.jpg",
          tags: ["Node.js", "Express", "JWT", "MongoDB"],
          link: "https://pizzeria-mamma.netlify.app",
        },
        {
          id: 8,
          title: "Urltoolkit",
          description: "Sistema de automatización de urls",
          image: "/images/urltoolkit.jpg",
          tags: ["HTML", "Express", "JavaScript", "Bootstrap"],
          link: "https://urltoolkit.netlify.app",
        },
        {
          id: 9,
          title: "IALBERTraining",
          description: "Es una herramienta visual personalizada para gestionar tus prompts",
          image: "/images/admin-dashboard.jpg",
          tags: ["React", "Redux", "Chart.js", "Tailwind"],
          link: "https://prompt-launcher.netlify.app",
        },
      ],
    },
    cv: {
      heading: "Resumen CV",
      items: [
        {
          icon: "code",
          title: "🚀 Desarrollador Frontend – Proyectos Vibe Coding",
          subtitle: "React, Tailwind, Email HTML",
          description:
            "Desarrollé aplicaciones web responsivas priorizando rendimiento y UX. Creé y optimicé plantillas de correo electrónico para campañas diversas.",
        },
        {
          icon: "mail",
          title: "📧 Especialista Email HTML – EMKT & Salesforce Marketing Cloud",
          subtitle: "Salesforce Marketing Cloud, AMPscript",
          description:
            "Gestioné campañas con Salesforce Marketing Cloud, enfocándome en la entregabilidad y el engagement de los correos HTML.",
        },
        {
          icon: "palette",
          title: "🎨 Diseñador Web – ConectaDeco & Freelance",
          subtitle: "Figma, Adobe XD, WordPress",
          description:
            "Diseñé y desarrollé sitios web combinando estética y funcionalidad para clientes diversos.",
        },
      ],
    },
    contact: {
      heading: "Contacto",
      introTitle: "Ponte en contacto",
      introDescription: "Siempre estoy feliz de conversar.",
      links: [
        { type: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/gustavoarancibiacl/" },
        { type: "github", label: "GitHub", href: "https://github.com/garancibiacl" },
        { type: "email", label: "Email", href: "mailto:garancibiacl@gmail.com" },
      ],
      formTitle: "Envíame un mensaje",
      form: {
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre",
        emailLabel: "Email",
        emailPlaceholder: "tu@email.com",
        messageLabel: "Mensaje",
        messagePlaceholder: "Tu mensaje",
        submit: "Enviar mensaje",
        submitting: "Enviando...",
      },
      toast: {
        missingFields: {
          title: "Error",
          description: "Por favor completa todos los campos",
        },
        invalidEmail: {
          title: "Error",
          description: "Ingresa un email válido",
        },
        success: {
          title: "¡Mensaje enviado!",
          description: "Gracias por contactarme. Te responderé pronto.",
        },
        error: {
          title: "Error",
          description: "No se pudo enviar el mensaje. Intenta nuevamente en unos minutos.",
        },
      },
    },
    notFound: {
      title: "404",
      description: "¡Ups! Página no encontrada",
      backToHome: "Volver al inicio",
    },
  },
  en: {
    languageName: "English",
    languageSelectorLabel: "Language",
    languageSelectorAria: "Change language",
    downloadFileName: "Frontend_Developer_CV.pdf",
    footer: {
      copyright: "© 2025 All rights reserved",
      madeWith: "Made with ❤️ and dedication"
    },
    sidebar: {
      brand: "DevFolio",
      toggleSidebarAria: "Toggle sidebar",
      mobileMenuAria: {
        open: "Open menu",
        close: "Close menu",
      },
      navItems: [
        { id: "hero", label: "Home" },
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "services", label: "Services" },
        { id: "projects", label: "Projects" },
        { id: "cv", label: "Resume" },
        { id: "contact", label: "Contact" },
      ],
      downloadCta: "Download CV",
    },
    hero: {
      badge: "Available for projects",
      headingLines: [
        {
          parts: [
            { text: "Frontend Developer" },
            { text: " 🚀", highlight: true },
          ],
        },
        {
          parts: [
            { text: "| ", highlight: true },
            { text: "React," },
          ],
        },
        {
          parts: [{ text: "JavaScript," }],
        },
        {
          parts: [
            { text: "Tailwind CSS" },
            { text: " |", highlight: true },
          ],
        },
        {
          parts: [{ text: "Email HTML Specialist" }],
        },
        {
          parts: [
            { text: "✉️ |", highlight: true },
            { text: " Vibe Coding" },
          ],
        },
        {
          parts: [{ text: "and AI for" }],
        },
        {
          parts: [
            { text: "Modern Websites" },
            { text: " 🤖", highlight: true },
          ],
        },
      ],
      description:
        "I'm a frontend developer focused on crafting modern, responsive web experiences and engaging email campaigns. I leverage AI tools to streamline workflows and ship outstanding results.",
      downloadCta: "Download CV",
      contactCta: "Contact me",
      profileAlt: "Frontend developer profile photo",
    },
    about: {
      heading: "About Me",
      profileAlt: "Portrait of Ethan Carter",
      name: "Ethan Carter",
      role: "Frontend Developer & Email HTML Specialist",
      quote: "Ship fast, iterate faster. Perfection is the enemy of progress.",
      intro:
        "I'm a frontend developer specializing in React, JavaScript, Tailwind CSS, and Email HTML. As a Vibe Coder I prioritize speed over perfection, using tools like Windsurf, Lovable, and N8N to launch functional MVPs in hours.",
      highlights: [
        {
          icon: "code",
          title: "Modern Tech",
          description: "React, Vue, Tailwind",
        },
        {
          icon: "mail",
          title: "Email Expert",
          description: "HTML Emails, EMKT",
        },
        {
          icon: "palette",
          title: "UI/UX Design",
          description: "Figma, Adobe XD",
        },
      ],
    },
    skills: {
      heading: "Skills",
      list: [
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
      ],
      techTags: [
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
      ],
    },
    services: {
      heading: "Services",
      cards: [
        {
          icon: "code",
          title: "Modern Frontend Development",
          description: "React, Tailwind, Vue",
          details: "Responsive web apps powered by modern stacks and best practices.",
        },
        {
          icon: "mail",
          title: "Email HTML Specialist ✉️",
          description: "Optimized, responsive, AMPscript",
          details: "I craft professional emails compatible with every major client.",
        },
        {
          icon: "zap",
          title: "Automation with AI 🤖",
          description: "N8N, Vibe Coding, rapid MVPs",
          details: "I automate flows and build functional prototypes at speed.",
        },
        {
          icon: "palette",
          title: "UI/UX Design",
          description: "Prototypes, wireframes, interactive mockups",
          details: "Interfaces centered on delightful user experiences.",
        },
      ],
    },
    projects: {
      heading: "Featured Projects",
      filterAllLabel: "All",
      ctaLabel: "See more projects",
      viewLabel: "View project",
      cards: [
        {
          id: 1,
          title: "E-commerce Platform",
          description: "Modern storefront built with React & Tailwind",
          image: "/project1.jpg",
          tags: ["React", "Tailwind", "API"],
          link: "https://3draw-app.vercel.app",
        },
        {
          id: 2,
          title: "Email Campaign Dashboard",
          description: "Automation suite for marketing teams",
          image: "/project2.jpg",
          tags: ["HTML Email", "SFMC", "AMPscript"],
          link: "https://toolsearcho.netlify.app",
        },
        {
          id: 3,
          title: "Portfolio Website",
          description: "Minimalist portfolio with animations",
          image: "/project3.jpg",
          tags: ["React", "Framer Motion", "CSS"],
          link: "https://garancibiacl.github.io",
        },
        {
          id: 4,
          title: "Task Management App",
          description: "Productivity app with AI features",
          image: "/project4.jpg",
          tags: ["React", "Firebase", "AI"],
          link: "https://cheery-sunshine-0afe23.netlify.app",
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
      ],
    },
    cv: {
      heading: "Resume Highlights",
      items: [
        {
          icon: "code",
          title: "🚀 Frontend Developer – Vibe Coding Projects",
          subtitle: "React, Tailwind, Email HTML",
          description:
            "Built responsive web apps with a focus on performance and UX. Crafted and optimized HTML email templates for multiple campaigns.",
        },
        {
          icon: "mail",
          title: "📧 Email HTML Specialist – EMKT & Salesforce Marketing Cloud",
          subtitle: "Salesforce Marketing Cloud, AMPscript",
          description:
            "Managed marketing campaigns with Salesforce Marketing Cloud, optimizing HTML emails for deliverability and engagement.",
        },
        {
          icon: "palette",
          title: "🎨 Web Designer – ConectaDeco & Freelance",
          subtitle: "Figma, Adobe XD, WordPress",
          description:
            "Designed and launched websites blending aesthetics and functionality for diverse clients.",
        },
      ],
    },
    contact: {
      heading: "Contact",
      introTitle: "Get in touch",
      introDescription: "Always happy to chat.",
      links: [
        { type: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/gustavoarancibiacl/" },
        { type: "github", label: "GitHub", href: "https://github.com/garancibiacl" },
        { type: "email", label: "Email", href: "mailto:garancibiacl@gmail.com" },
      ],
      formTitle: "Send me a message",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@email.com",
        messageLabel: "Message",
        messagePlaceholder: "Your message",
        submit: "Send message",
        submitting: "Sending...",
      },
      toast: {
        missingFields: {
          title: "Error",
          description: "Please fill in all fields",
        },
        invalidEmail: {
          title: "Error",
          description: "Enter a valid email address",
        },
        success: {
          title: "Message sent!",
          description: "Thanks for reaching out. I'll reply shortly.",
        },
        error: {
          title: "Error",
          description: "Message could not be sent. Please try again later.",
        },
      },
    },
    notFound: {
      title: "404",
      description: "Oops! Page not found",
      backToHome: "Return to Home",
    },
  },
};
