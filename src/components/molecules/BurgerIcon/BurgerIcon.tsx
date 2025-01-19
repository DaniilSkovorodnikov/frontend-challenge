import styles from './BurgerIcon.module.css'

interface BurgerIconProps {
    isOpen: boolean;
    toggleMenu: () => void
}

const BurgerIcon: React.FC<BurgerIconProps> = ({ isOpen, toggleMenu }) => {
    return (
        <button
            className={`${styles.burgerButton} ${isOpen ? styles.open : ''}`}
            onClick={toggleMenu}
        >
            <div className={styles.burgerIcon}/>
        </button>
    );
};

export default BurgerIcon;
