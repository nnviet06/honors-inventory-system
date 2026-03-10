/**
 * Root Application Component
 * Sets up main layout structure and defines route configuration.
 */

import styles from './App.module.css'
import AuthPage from './pages/Auth/AuthPage'
import NavBar from './components/layout/NavBar'
import ItemsView from './pages/ItemsView'
import LocationsView from './pages/LocationsView'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setToken } from './services/equipmentService'


function App() {
    const [session, setSession] = useState(null);
    useEffect(() => {
        // Database refresh on frontend load
        const refreshDatabase = async () => {
            try {
                await fetch(`${import.meta.env.VITE_API_URL}/api/reset`, { method: 'POST' });
            } catch (error) {
                console.error('Error refreshing database:', error);
            }
        };

        refreshDatabase();
    }, []);
    const handleLogin = (data: any) => {
        setSession(data);
        setToken(data.session.access_token);
    };
    if (!session) {
        return <AuthPage onLogin={handleLogin} />
    }

    return (
        <div className={styles.app}>
            <NavBar />  
            <Routes>
                <Route path="/" element={<ItemsView/>} />
                <Route path="/items" element={<ItemsView/>} />
                <Route path="/locations" element={<LocationsView/>} />
            </Routes>
        </div>
    );
}

export default App