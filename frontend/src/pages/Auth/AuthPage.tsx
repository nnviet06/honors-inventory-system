import {useState} from 'react';
import styles from './AuthPage.module.css';



const AuthPage = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError('');
        console.log('Active Tab:', activeTab);
        console.log('Email:', email);
        console.log('Password:', password);
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