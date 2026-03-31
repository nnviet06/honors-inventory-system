/**
 * LandingPage Component
 * Container for the landing/auth screen.
 * Renders header, AuthPage form, and Guest Mode button.
 */

import AuthPage from '../Auth/AuthPage'
import styles from './LandingPage.module.css'
import { authService } from '../../services/authService';
import { useState } from 'react';

const LandingPage = ({ onLogin }: { onLogin: (data: any) => void }) => {
    const [error, setError] = useState('');

    const handleGuestMode = async () => {
        setError('');
        try {
            const data = await authService.guestMode();
            onLogin(data);
        } catch (err: any) {
            setError(err.message);
        }
    };
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
            <button className={styles.guestButton} onClick={handleGuestMode}>
                Try Guest Mode
            </button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default LandingPage;