import { memo, useState } from 'react';
import LikeButton from '../../atoms/LikeButton/LikeButton';
import styles from './Card.module.css';
import { Cat } from '../../../types/cats';

interface CardProps {
    cat: Cat,
    isFavourite: boolean,
    toggleFavourite: (cat: Cat) => void
}

const Card: React.FC<CardProps> = memo(({cat, isFavourite, toggleFavourite}) => {
    const [isLoadedImage, setIsLoadedImage] = useState(false);

    return (
        <div className={styles.card}>
            {!isLoadedImage && <div className={styles.placeholder}/>}
            <img
                className={`${styles.cardImage} ${isLoadedImage ? styles.loaded : ''}`}
                src={cat.url}
                alt="Кот"
                onLoad={() => setIsLoadedImage(true)}
            />
            <LikeButton className={styles.likeButton} onClick={() => toggleFavourite(cat)} isActive={isFavourite}/>
        </div>
    );
});

export default Card;
