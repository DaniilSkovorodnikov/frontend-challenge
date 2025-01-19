import NavigationLink from "../../atoms/NavigationLink/NavigationLink";
import styles from './BurgerNavigationList.module.css'

interface BurgerNavigationListProps {
    isOpen: boolean,
    closeMenu: () => void,
}

const BurgerNavigationList: React.FC<BurgerNavigationListProps> = ({ isOpen, closeMenu }) => {
    return (
        <nav className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
            <ul className={styles.menuList}>
                    <NavigationLink to="/" label="Все котики" onClick={closeMenu}/>
                    <NavigationLink to="/favourites" label="Любимые котики" onClick={closeMenu}/>
            </ul>
        </nav>
    );
};

export default BurgerNavigationList;
