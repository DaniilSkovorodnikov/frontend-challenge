import { useCallback, useEffect, useRef } from "react";
import { useScrollSaveContext } from "../store/ScrollSaveContext";

export function useSaveScrollPosition(
    key: string,
) {
    const {scrollMap, saveScroll} = useScrollSaveContext();
    const timeoutRef = useRef<number | undefined>();

    const saveScrollPosition = useCallback(() => {
        const scrollY = window.scrollY;
        saveScroll(key, scrollY);
      }, [key]);
    
      useEffect(() => {
        const debouncedSave = () => {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(saveScrollPosition, 200);
        }

        window.addEventListener("scroll", debouncedSave);
        return () => {
            clearTimeout(timeoutRef.current);
            window.removeEventListener("scroll", debouncedSave)
        };
      }, [saveScrollPosition])

      useEffect(() => {
          const scrollY = scrollMap.get(key);
          if(scrollY){
            window.scrollTo(0, scrollY);
          }
      }, [scrollMap, key]);
}