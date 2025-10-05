

# AGENTS.md - Guía para Agentes de Codificación



## 📋 Fuente de la Verdad
La información oficial del proyecto se encuentra en:
- `README.md` - Documentación principal del proyecto
- `context/rules.md` - Reglas y estándares de desarrollo
- `AGENTS.md` - Este documento



## 🎯 Misión
### 1. MANTENIMIENTO Y EXTENSIÓN
- Mantener y extender el repositorio de ToolSearch siguiendo las mejores prácticas de desarrollo.
- Contribuir activamente en la evolución del sistema de diseño multimarca.

### 2. CALIDAD DEL CÓDIGO
- Implementar soluciones limpias, eficientes y bien documentadas.
- Seguir los estándares de código establecidos en las reglas.
- Seguir alineamientos de estilos UI/UX establecidos en las reglas.

### 3. DOCUMENTACIÓN
- Mantener actualizada la documentación del proyecto.

### 4. STACK TECNOLÓGICO

#### Frontend
- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.19
- **Estilos:** TailwindCSS 3.4.17 + PostCSS 8.5.6 + Autoprefixer 10.4.21
- **Iconos:** Lucide React 0.462.0
- **Manejo de Estado:** @tanstack/react-query 5.83.0
- **Formularios:** React Hook Form 7.61.1 + Zod 3.25.76
- **Enrutamiento:** React Router DOM 6.30.1
- **UI Components:** Radix UI (varios componentes) + shadcn/ui
- **Notificaciones:** Sonner 1.7.4
- **Gráficos:** Recharts 2.15.4
- **Utilidades:**
  - date-fns 3.6.0 para manejo de fechas
  - tailwind-merge 2.6.0
  - class-variance-authority 0.7.1
  - clsx 2.1.1
- **Idioma:** Español (con soporte para i18n si es necesario)

## Instantanea
- **Producto**: Portafolio de una sola pagina generado con Vite + React 18 + TypeScript, estilizado con Tailwind CSS y componentes de shadcn/ui.
- **Puntos de entrada**: `src/main.tsx` monta `<App />`; el enrutamiento se gestiona en `src/App.tsx` usando `react-router-dom` con `/` mapeado a `src/pages/Index.tsx`.
- **Disposicion de componentes**: La landing (`Index`) ensambla secciones destacadas desde `src/components` (Hero, About, Skills, Services, Projects, CV, Contact) y un sidebar persistente.

## Desarrollo local
- Instala dependencias: `npm install` (el repo tambien incluye `bun.lockb`, pero las herramientas y scripts asumen npm).
- Ejecuta el servidor de desarrollo: `npm run dev` (Vite en el puerto `8080` segun `vite.config.ts`).
- Revisa tipos: usa `tsc --noEmit` si se necesita (`npm exec tsc --noEmit`); la configuracion es permisiva (ver `tsconfig.json`).
- Linting: `npm run lint` (ESLint con plugins de TypeScript y React Hooks).
- Compila y previsualiza: `npm run build` seguido de `npm run preview`.

## Estructura destacada del proyecto
- `src/components/`: bloques de secciones y UI compartida.
  - `Sidebar.tsx`: maneja la navegacion por secciones, colapso con estado y descarga del CV.
  - `ui/`: componentes base de shadcn/ui (button, card, dialog, etc.). Evita editarlos salvo que sincronices con shadcn.
- `src/pages/Index.tsx`: orquesta las secciones de la landing.
- `src/pages/NotFound.tsx`: ruta de respaldo.
- `src/hooks/`: hooks personalizados (`useIsMobile`, utilidades de toast).
- `src/lib/utils.ts`: combinador de clases `cn`; se importa en todo el proyecto.
- `public/`: assets estaticos servidos por Vite (coloca PDF/imagenes aqui para evitar 404).

## Convenciones y Estándares

### Estructura de Código
- Usar el alias `@` para importaciones (configurado en `tsconfig.json` y `vite.config.ts`)
- Mantener componentes pequeños y enfocados en una responsabilidad única
- Usar nombres descriptivos siguiendo PascalCase para componentes y camelCase para funciones/variables
- Separar componentes en archivos individuales y agruparlos en carpetas por funcionalidad

### Estilos
- Priorizar el uso de utilidades de Tailwind sobre estilos personalizados
- Usar los tokens de diseño definidos en `tailwind.config.ts`
- Implementar diseño responsive siguiendo el enfoque Mobile-First
- Usar breakpoints estándar (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Las animaciones personalizadas se definen en `tailwind.config.ts`

### Accesibilidad
- Todas las secciones deben tener IDs únicos para la navegación
- Implementar atributos ARIA en elementos interactivos
- Asegurar contraste adecuado en textos y elementos interactivos
- Soporte completo de navegación por teclado

### Manejo de Estado y Datos
- Usar `@tanstack/react-query` para manejo de datos remotos
- Implementar estados de carga y error en todas las peticiones
- Usar Context API solo para estado global verdaderamente necesario
- Implementar validación de datos con Zod

### Rendimiento
- Usar `React.memo`, `useCallback` y `useMemo` apropiadamente
- Implementar lazy loading para rutas y componentes pesados
- Optimizar imágenes (usar formatos modernos como WebP/AVIF)
- Implementar estrategias de caché efectivas
- Minificar y comprimir recursos estáticos

### Documentación
- Documentar componentes con JSDoc/TSDoc
- Incluir ejemplos de uso en la documentación de componentes complejos
- Mantener actualizados los comentarios cuando se modifique la lógica

## Lista DX
- Al agregar assets, guardalos en `public/` y referencia con rutas absolutas `/asset.ext`; los componentes incluyen `onError` para imagenes faltantes pero es mejor adjuntar archivos reales.
- Mantiene los textos en espanol salvo que cambien los requisitos; algunas secciones mezclan ingles, procura alinear el idioma.
- No existen tests automaticos. Considera agregar React Testing Library o un entorno con Vitest si introduces logica no trivial.
- Iconografia consistente: todos los iconos provienen de `lucide-react`.
- Conserva el comportamiento del sidebar en mobile (cajon colapsable) y desktop (boton opcional para colapsar).

## Archivos utiles para revisar rapido
- `src/App.tsx` - proveedores y configuracion del router.
- `src/components/Hero.tsx` - mensaje principal y botones CTA.
- `src/components/Projects.tsx` - tarjetas de proyectos y logica de filtrado por tags.
- `src/components/Contact.tsx` - validacion del formulario y uso de toasts.
- `src/index.css` - tokens del sistema de diseno.
- `tailwind.config.ts` - extensiones de Tailwind y animaciones.
- `eslint.config.js` - reglas base de lint (React hooks obligatorios, `unused-vars` desactivado).

## Integraciones
- El despliegue se gestiona actualmente con Lovable (consulta `README.md`). Si agregas logica dependiente del entorno, condiciona con variables de Vite (`import.meta.env`).
- El sidebar y los botones CTA inician descargas creando anclas dinamicas; asegúrate de que `/public/cv.pdf` exista si mantienes esa experiencia.
- Los enlaces externos (LinkedIn, GitHub, email) en `Contact.tsx` son placeholders; actualizalos con destinos reales antes del lanzamiento.
- Envío de emails usa Resend a través de una función serverless de Netlify (`/.netlify/functions/send-email`). Define la variable de entorno `RESEND_API_KEY` antes de desplegar y utiliza `netlify dev` para pruebas locales.

## Solucion de problemas
- Problemas de estilo: confirma que los tokens HSL en `src/index.css` coinciden con las expectativas de Tailwind; debes reiniciar Vite si modificas el propio archivo de configuracion.
- Animaciones sin reproducirse: verifica que los globs `content` de Tailwind incluyan el archivo editado (ya cubren `src/**/*.{ts,tsx}`).
- Assets faltantes (por ejemplo, `/project1.jpg`): suministra imagenes reales o ajusta los componentes para importar desde `src/assets` con imports estaticos.
