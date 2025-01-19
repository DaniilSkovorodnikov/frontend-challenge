import { createContext, useCallback, useContext, useState } from "react";

interface ScrollSaveContextProps{
    scrollMap: Map<string, number>;
    saveScroll: (key: string, scroll: number) => void;
}

const ScrollSaveContext = createContext<ScrollSaveContextProps | undefined>(undefined);

export const ScrollSaveProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [scrollMap, setScrollMap] = useState<Map<string, number>>(new Map());

    const saveScroll = useCallback((key: string, scroll: number) => {
        setScrollMap(prevState => new Map(prevState).set(key, scroll));
    }, [])

    return (
        <ScrollSaveContext.Provider value={{scrollMap, saveScroll}} >
            {children}
        </ScrollSaveContext.Provider>
    );
};

export const useScrollSaveContext = (): ScrollSaveContextProps => {
    const context = useContext(ScrollSaveContext);
    if(!context) {
        throw new Error("Miss scroll provider");
    }
    return context;
};