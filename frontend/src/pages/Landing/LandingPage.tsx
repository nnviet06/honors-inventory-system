/**
 * LandingPage Component
 * Container for the landing/auth screen.
 * Renders header, AuthPage form, and Guest Mode button.
 */

import AuthPage from '../Auth/AuthPage'
import styles from './LandingPage.module.css'
// import GuestMode from '../components/modals/GuestMode'


const LandingPage = ({ onLogin }: { onLogin: (data: any) => void }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>📦 WELCOME TO THE HONORS INVENTORY SYSTEM</h1>
            </div>
            <p className={styles.subtitle}>Please log in or sign up to continue</p>
            <AuthPage onLogin={onLogin} />
        <div className={styles.divider}>
                <span>or</span>
            </div>
            <button className={styles.guestButton}>
                Try Guest Mode
            </button>
        </div>
    );
}

export default LandingPage;