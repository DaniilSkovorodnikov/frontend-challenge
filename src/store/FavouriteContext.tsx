import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Cat } from "../types/cats"

interface FavouritesContextType{
    favourites: Map<string, Cat>;
    toggleFavourite: (cat: Cat) => void;
}

const FAVOURITES_KEY = 'CATS_FAVOURITE'
const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [favourites, setFavourites] = useState<Map<string, Cat>>(new Map());

    const toggleFavourite = useCallback((cat: Cat) => {
        setFavourites(prevState => {
            const updatedState = new Map(prevState)
            if(updatedState.has(cat.id)) {
                 updatedState.delete(cat.id)
            } else { 
                updatedState.set(cat.id, cat) 
            }
            return updatedState
        })
    }, [])

    useEffect(() => {
        const storedFavourites = localStorage.getItem(FAVOURITES_KEY);
        if(storedFavourites){
            try {
                const parsedFavourites = JSON.parse(storedFavourites).map((cat: Cat) => [cat.id, cat]);
                setFavourites(new Map(parsedFavourites));
            }
            catch {
                setFavourites(new Map());
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(FAVOURITES_KEY, JSON.stringify(Array.from(favourites.values())))
    }, [favourites]);

    return (
        <FavouritesContext.Provider value={{favourites, toggleFavourite}}>
            {children}
        </FavouritesContext.Provider>
    )
}

export const useFavourites = (): FavouritesContextType => {
    const context = useContext(FavouritesContext);
    if(!context){
        throw new Error('Miss favourites provider')
    }
    return context;
}