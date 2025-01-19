import { createBrowserRouter } from "react-router-dom";
import MainPage from "./components/pages/MainPage/MainPage";
import FavouritesPage from "./components/pages/FavouritesPage";
import Layout from "./components/templates/Layout";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <MainPage />,
          id: 'MAIN_PAGE'
        },
        {
          path: "/favourites",
          element: <FavouritesPage />,
          id: 'FAVOURITES_PAGE'
        },
      ]
    },
  ],
);