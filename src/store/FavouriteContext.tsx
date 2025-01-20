import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Cat } from "../types/cats"

interface FavouritesContextType{
    favourites: Map<string, Cat>;
    toggleFavourite: (cat: Cat) => void;
}

const FAVOURITES_KEY = 'CATS_FAVOURITE'
const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

// Будем использовать Map вместо объекта, потому что Map имеет удобные методы работы с коллекцией и сохраняет порядок добавления элементов в отличие от объектов
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
            // На случай если умный пользователь решил подменить массив в локальном хранилище на что нибудь плохое
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
        // localStorage не резиновый, а всего 5мб, поэтому будем хранить как можно меньше данных
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