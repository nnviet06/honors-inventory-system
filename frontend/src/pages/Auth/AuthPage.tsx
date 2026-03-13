import {useState} from 'react';
import styles from './AuthPage.module.css';
import { authService } from '../../services/authService';



const AuthPage = ({ onLogin }: { onLogin: (data: any) => void }) => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');

        try {
            if (activeTab === 'login') {
                const data = await authService.signIn(email, password);
                console.log('Login successful:', data);
                onLogin(data);
            } else {
                const data = await authService.signUp(email, password);
                console.log('Sign up successful:', data);
                onLogin(data);
            }
        } catch (err: any) {
            setError(err.message);
        }
        
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>📦 WELCOME TO THE HONORS INVENTORY SYSTEM</h1>
            </div>
            <p className={styles.subtitle}>Please log in or sign up to continue</p>
            <div className={styles.card}>
            <div className={styles.tabToggle}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'login' ? styles.active : ''}`}
                    onClick={() => setActiveTab('login')}
                >
                    Login
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'signup' ? styles.active : ''}`}
                    onClick={() => setActiveTab('signup')}
                >
                    Sign Up
                </button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.submitButton}>
                    {activeTab === 'login' ? 'Login' : 'Sign Up'}
                </button>
            </form>
        </div>
        </div>
    );
}

export default AuthPage;