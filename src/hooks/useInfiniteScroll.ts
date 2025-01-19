import { useEffect, useRef } from "react";

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
