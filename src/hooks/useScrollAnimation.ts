import { useEffect, useState, RefObject } from 'react';

export const useScrollAnimation = (ref: RefObject<HTMLElement>, options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Opcional: Desconectar después de la primera vez que se ve
          // if (ref.current) observer.unobserve(ref.current);
        } else {
          // Opcional: Resetear la visibilidad si quieres que se repita la animación
          // setIsVisible(false);
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px 0px -50px 0px',
        ...options
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isVisible;
};

export const useStaggeredScrollAnimation = (ref: RefObject<HTMLElement>, count: number, options?: IntersectionObserverInit) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const isVisible = useScrollAnimation(ref, options);

  useEffect(() => {
    if (isVisible) {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Animar elementos en secuencia
      for (let i = 0; i < count; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev.slice(0, i), true, ...prev.slice(i + 1)]);
        }, i * 100); // 100ms de retraso entre elementos
        
        timeouts.push(timeout);
      }

      return () => timeouts.forEach(clearTimeout);
    } else {
      setVisibleItems(Array(count).fill(false));
    }
  }, [isVisible, count]);

  return visibleItems;
};
