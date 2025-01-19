import { NavLink } from 'react-router-dom';
import styles from './NavigationLink.module.css';

interface NavigationLinkProps {
    to: string;
    label: string;
    onClick?: () => void
}

const NavigationLink: React.FC<NavigationLinkProps> = ({to, label, onClick}) => {
    return (
        <li className={styles.navItem}>
            <NavLink
                className={({ isActive }) => isActive ? styles.activeNavLink :  styles.navLink}
                to={to}
                onClick={onClick}
            >
                {label}
            </NavLink>
        </li>
    );
};
export default NavigationLink;
