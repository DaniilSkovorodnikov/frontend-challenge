import { memo, useState } from 'react';
import LikeButton from '../../atoms/LikeButton/LikeButton';
import styles from './Card.module.css';
import { Cat } from '../../../types/cats';

interface CardProps {
    cat: Cat,
    isFavourite: boolean,
    toggleFavourite: (cat: Cat) => void,
    order?: number
}

// Для избежания лишних ререндеров используем memo и isFavourite получаем пропсом, иначе все карточки будут ререндериться при лайке/дизлайке одной
// Получаем order и делаем его отрицательным, т.к. хотим, чтобы последние лайкнутые фотки отображались первыми
const Card: React.FC<CardProps> = memo(({cat, isFavourite, toggleFavourite, order}) => {
    const [isLoadedImage, setIsLoadedImage] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
        <div className={styles.card} style={{ order: order ? -order : undefined }}>
            {!isError 
                ? <>
                    {!isLoadedImage && <div className={styles.placeholder}/>}
                    <img
                        className={`${styles.cardImage} ${isLoadedImage ? styles.loaded : ''}`}
                        src={cat.url}
                        alt="Кот"
                        onLoad={() => setIsLoadedImage(true)}
                        onError={() => setIsError(true)}
                        loading='lazy'
                    />
                    {isLoadedImage && <LikeButton className={styles.likeButton} onClick={() => toggleFavourite(cat)} isActive={isFavourite}/>}
                </>
                : <div className={styles.error}>
                    <p>Не удалось загрузить<br/>котика :(</p>
                </div>}
        </div>
    );
});

export default Card;
