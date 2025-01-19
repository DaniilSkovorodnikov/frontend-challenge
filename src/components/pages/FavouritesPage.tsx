import { useMemo } from "react";
import { useFavourites } from "../../store/FavouriteContext";
import CardGrid from "../organisms/CardGrid/CardGrid";

const FavouritesPage: React.FC = () => {
const {favourites} = useFavourites()

const favouritesCats = useMemo(() => Array.from(favourites.values()), [favourites])

  if(favouritesCats.length === 0){
    return (
      <div>
        <p>Котики ждут ваших лайков!</p>
      </div>
    );
  }
  return (
    <div>
      <CardGrid
        cats={favouritesCats}
      />
    </div>
  );
};
export default FavouritesPage;
