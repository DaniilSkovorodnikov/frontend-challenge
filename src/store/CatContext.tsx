import { createContext, useContext, useState } from "react";
import { Cat } from "../types/cats";

interface CatContextProps{
    cats: Cat[];
    setCats: React.Dispatch<React.SetStateAction<Cat[]>>;
}

const CatContext = createContext<CatContextProps | undefined>(undefined);

export const CatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [cats, setCats] = useState<Cat[]>([]);

    return (
        <CatContext.Provider value={{cats, setCats}}>
            {children}
        </CatContext.Provider>
    );
};

export const useCatContext = (): CatContextProps => {
    const context = useContext(CatContext);
    if(!context) {
        throw new Error("Miss cat provider");
    }
    return context;
};