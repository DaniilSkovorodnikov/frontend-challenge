import { useCallback, useRef } from "react";

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