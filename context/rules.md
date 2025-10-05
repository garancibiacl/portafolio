# Reglas de Desarrollo

## 1. Estándares de Código

### Documentación
- Cada función debe incluir un bloque de comentarios que explique:
  - Propósito de la función
  - Parámetros que recibe
  - Valor de retorno
  - Ejemplo de uso

### Estructura de Componentes
- Usar nombres descriptivos para componentes, variables y funciones
- Mantener los componentes pequeños y enfocados en una sola responsabilidad
- Seguir la convención de nombres de React (PascalCase para componentes)
- Separar componentes en archivos individuales
- Usar carpetas para agrupar componentes relacionados

## 2. JavaScript Moderno y React

### Buenas Prácticas de JavaScript
- Usar características de ES6+ (arrow functions, destructuring, spread/rest, etc.)
- Preferir `const` y `let` sobre `var`
- Usar métodos funcionales de arrays (map, filter, reduce, etc.)
- Implementar async/await para operaciones asíncronas
- Validar parámetros con valores por defecto
- Usar template literals para cadenas complejas

### Estructura de Módulos
```javascript
// Buen ejemplo de estructura de módulo
export const functionName = (params) => {
  // Código claro y conciso
  return result;
};
```

### React Específico
- Usar componentes funcionales con Hooks
- Mantener el estado lo más local posible
- Usar `useCallback` y `useMemo` para optimización
- Implementar PropTypes o JSX para validación de props
- Separar lógica de negocio con custom hooks
- Usar Context API para estado global cuando sea necesario

### Patrones de Diseño
- Componentes Compuestos para lógica compartida
- Render Props o Custom Hooks para reutilización de lógica
- Componentes Presentacionales vs Contenedores

## 3. Estilos y Diseño

### UI/UX y Control de Calidad Visual

#### Diseño Responsivo
- Implementar Mobile-First como estrategia de desarrollo
- Usar unidades relativas (rem, em, %) en lugar de píxeles fijos
- Implementar breakpoints estándar:
  ```css
  /* Mobile: hasta 640px (por defecto) */
  @media (min-width: 640px) { /* sm */ }
  @media (min-width: 768px) { /* md */ }
  @media (min-width: 1024px) { /* lg */ }
  @media (min-width: 1280px) { /* xl */ }
  ```
- Probar en múltiples dispositivos y navegadores
- Usar `srcset` para imágenes responsivas

#### Rendimiento Web
- Optimizar imágenes (usar formatos modernos como WebP/AVIF)
- Implementar lazy loading para imágenes y componentes fuera del viewport
- Minificar y comprimir recursos estáticos (CSS, JS, imágenes)
- Usar CDN para recursos estáticos
- Implementar estrategias de caché efectivas
- Limitar el uso de fuentes web personalizadas