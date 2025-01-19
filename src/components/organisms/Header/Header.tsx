import { useState } from 'react';
import BurgerIcon from '../../molecules/BurgerIcon/BurgerIcon';
import NavigationBar from '../../molecules/NavigationBar/NavigationBar';
import styles from './Header.module.css';
import BurgerNavigationList from '../../molecules/BurgerNavigationList/BurgerNavigationList';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <header className={styles.header}>
                <NavigationBar/>
                <BurgerIcon
                    isOpen={isOpen}
                    toggleMenu={() => setIsOpen(prevState => !prevState)}
                />
            </header>
            <BurgerNavigationList
                isOpen={isOpen}
                closeMenu={() => setIsOpen(false)}
            />
        </>
    );
};
export default Header;
