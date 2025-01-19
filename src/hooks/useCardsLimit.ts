import { useCallback, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";

export function useCardsLimit(gridRef: React.RefObject<HTMLDivElement>) {
    const cardsLimitRef = useRef<number>(0);

    const calcCardsLimit = useCallback(() => {
        if(!gridRef.current) return;

        const cardSize = 225;
        const gridWidth = gridRef.current.offsetWidth;
        const possibleGridHeight = window.innerHeight - (64 + 48);
        
        const cols = Math.floor(gridWidth / cardSize);
        const rows = Math.floor(possibleGridHeight / cardSize) + 1;
        
        cardsLimitRef.current = cols * rows;

    }, [])
    const debouncedCalculate = useDebounce(calcCardsLimit, 300);

    const getCurrentCardsLimit = useCallback(() => {
        return cardsLimitRef.current;
    }, []);

    useEffect(() => {
        calcCardsLimit();
        window.addEventListener("resize", debouncedCalculate);
        return () => window.removeEventListener("resize", debouncedCalculate);
    }, [debouncedCalculate, calcCardsLimit])

    return { getCurrentCardsLimit }
}