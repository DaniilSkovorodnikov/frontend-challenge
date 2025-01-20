import { useCallback, useRef } from "react";

// Полезно отложить выполнение различных функций при работе с пользовательским вводом, особенно при скролле
export function useDebounce(
    callback: (...args: any[]) => void,
     delay: number
) {
    const timeoutRef = useRef<number | undefined>();

    const debouncedFunction = useCallback((...args: any[]) => {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay)
    }, [callback, delay])

    return debouncedFunction;
}