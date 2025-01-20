import { useFavourites } from '../../../store/FavouriteContext';
import { Cat } from '../../../types/cats';
import Card from '../../molecules/Card/Card';
import styles from './CardGrid.module.css'

interface CardGridProps {
    cats: Cat[];
    isFavouriteGrid?: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({cats, isFavouriteGrid}) => {
    const {favourites, toggleFavourite} = useFavourites()

    return (
        <div className={styles.cardGrid}>
            {cats.map((cat, i) => (
                <Card
                    key={cat.id}
                    cat={cat}
                    isFavourite={favourites.has(cat.id)}
                    toggleFavourite={toggleFavourite}
                    order={isFavouriteGrid ? i : undefined}
                />
            ))}
        </div>
    );
};

export default CardGrid;
