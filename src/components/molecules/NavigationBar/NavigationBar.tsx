import NavigationLink from '../../atoms/NavigationLink/NavigationLink';
import styles from './NavigationBar.module.css'

const NavigationBar: React.FC = () => {
    return (
        <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
                <NavigationLink to="/" label='Все котики'/>
                <NavigationLink to="/favourites" label='Любимые котики'/>
            </ul>
        </nav>
    );
};
export default NavigationBar;
