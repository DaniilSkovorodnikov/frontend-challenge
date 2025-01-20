import { Cat, CatResponse } from "../types/cats"

// Сделал просто ради примера, допустим были бы две ветки dev|main, было бы полезно при сборке прокидывать разные .env для двух веток; 
const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL

export async function getCats(page: number = 1, limit: number = 15): Promise<Cat[]> {
    const response = await fetch(`${apiUrl}/images/search?limit=${limit}&page=${page}`,
        {
            headers: {
                'x-api-key': apiKey
            }
        }
    )
    const cats: CatResponse[] = await response.json()
    return cats.map((cat) => ({id: cat.id, url: cat.url}));
}