import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { CatProvider } from "./store/CatContext"
import { FavouritesProvider } from "./store/FavouriteContext"
import { ScrollSaveProvider } from "./store/ScrollSaveContext"

function App() {

    return (
        <CatProvider>
            <FavouritesProvider>
                <ScrollSaveProvider>
                    <RouterProvider router={router}/>
                </ScrollSaveProvider>
            </FavouritesProvider>
        </CatProvider>
    )
}

export default App
