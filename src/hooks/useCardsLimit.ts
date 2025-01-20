import { useCallback, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";

// Мониторы у всех бывают разные, поэтому посчитаем сколько оптимально карточек можно загрузить для данной ширины и высоты экрана,
// иначе если подгрузить слишком мало карточек, дополнительные карточки больше не подгрузятся, т.к. observer для бесконечного скролла не сработает второй раз подряд
// Вернем функцию которая отдаст текущий лимит карточек, через state нельзя, т.к. не хотим делать доп. запрос при resize окна.
export function useCardsLimit(gridRef: React.RefObject<HTMLDivElement>) {
    const cardsLimitRef = useRef<number>(0);

    const calcCardsLimit = useCallback(() => {
        if(!gridRef.current) return;

        const cardSize = 225;
        const gridWidth = gridRef.current.offsetWidth;
        const possibleGridHeight = window.innerHeight - (64 + 48);
        
        const cols = Math.floor(gridWidth / cardSize);
        const rows = Math.floor(possibleGridHeight / cardSize) + 1;
        cardsLimitRef.current = Math.max(cols, 1) * Math.max(rows, 1); 

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