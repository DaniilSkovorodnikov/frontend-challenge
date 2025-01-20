import { useEffect, useRef } from "react";

// Можно было бы дополнить хук параметром, есть ли еще данные для подгрузки, т.к. реально бесконечно листать не получится
// но бэк отдает дубликаты, что если данные остались, но бэк отдал все дубликаты, непонятно как отслеживать остались ли еще данные
export const useInfiniteScroll = (onScrollEnd: () => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!anchorRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onScrollEnd();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(anchorRef.current);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [onScrollEnd]);

  return { anchorRef };
};
