import { useFavourites } from '../../../store/FavouriteContext';
import { Cat } from '../../../types/cats';
import Card from '../../molecules/Card/Card';
import styles from './CardGrid.module.css'

interface CardGridProps {
    cats: Cat[];
}

const CardGrid: React.FC<CardGridProps> = ({cats}) => {
    const {favourites, toggleFavourite} = useFavourites()

    return (
        <div className={styles.cardGrid}>
            {cats.map((cat) => (
                <Card
                    key={cat.id}
                    cat={cat}
                    isFavourite={favourites.has(cat.id)}
                    toggleFavourite={toggleFavourite}
                />
            ))}
        </div>
    );
};

export default CardGrid;
