/**
 * Navigation Bar Component
 * Displays application header and navigation links.
 * Provides routing between "By Items" and "By Location" views.
 * Provides a Logout button
 */

import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';


const NavBar = ({ onLogout }: { onLogout: () => void }) => {
    // Simple NavBar
    // The Main Page is already on By Items view

    return (
        <nav>
            <h1 className={styles.title}>📦 WELCOME TO THE HONORS INVENTORY SYSTEM</h1>
            <div className={styles.navButtons}>
            <Link to="/items" className={styles.navButton}> By Items </Link>
            <Link to="/locations" className={styles.navButton}> By Location </Link>
            <button onClick={onLogout} className={styles.logoutButton}> Logout </button>
            

            </div>
        </nav>
    );
};

export default NavBar;