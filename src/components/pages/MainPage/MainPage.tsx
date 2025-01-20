import { useCallback, useEffect, useRef, useState } from "react";
import CardGrid from "../../organisms/CardGrid/CardGrid";
import styles from "./MainPage.module.css";
import { getCats } from "../../../services/api";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useCatContext } from "../../../store/CatContext";
import { useSaveScrollPosition } from "../../../hooks/useScrollPosition";
import { useCardsLimit } from "../../../hooks/useCardsLimit";

const MainPage: React.FC = () => {
    const { cats, setCats } = useCatContext()
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);

    const { getCurrentCardsLimit } = useCardsLimit(gridRef);

    const onScrollEnd = useCallback(() => {
        if(!isLoading) {
            setPage(prevState => prevState + 1)
        }
    }, [isLoading]);
    const { anchorRef } = useInfiniteScroll(onScrollEnd);

    useSaveScrollPosition('MAIN_PAGE');

    useEffect(() => {
        const loadCats = async (limit: number) => {
            setIsLoading(true);
            try {
                const newCats = await getCats(page, limit);
                setCats((prevCats) => {
                    // Как оказалось api иногда отдаёт дубликаты
                    const cats = new Map(prevCats.map(cat => [cat.id, cat]))
                    const uniqueCats = newCats.filter(newCat => !cats.has(newCat.id));
                    return [...prevCats, ...uniqueCats]
                });
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }

        const cardsLimit = getCurrentCardsLimit();
        if(page !== 0 && cardsLimit !== 0) {
            loadCats(cardsLimit);
        }
    }, [page, getCurrentCardsLimit]);  

    return (
        <div className={styles.mainPage}>
            <div className={styles.gridContainer} ref={gridRef}>
                <CardGrid cats={cats}/>
                <div ref={anchorRef} className={styles.anchorEnd}></div>
            </div>
            {isLoading && <p className={styles.loading}>
                {page === 1 ? 'Загрузка... ' : 'Загружаем еще котиков...'} 
            </p>}
        </div>
    );
};
export default MainPage;