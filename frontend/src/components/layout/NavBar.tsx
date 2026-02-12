/**
 * Navigation Bar Component
 * Displays application header and navigation links.
 * Provides routing between "By Items" and "By Location" views.
 */

import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    // Simple NavBar
    // The Main Page is already on By Items view
    // Will work on "By Location" button later if I have time. 

    return (
        <nav>
            <h1 className={styles.title}>📦 WELCOME TO THE HONORS INVENTORY SYSTEM</h1>
            <div className={styles.navButtons}>
            <Link to="/items" className={styles.navButton}> By Items </Link>
            <Link to="/locations" className={styles.navButton}> By Location </Link>
            </div>
        </nav>
    );
};

export default NavBar;