/**
 * Root Application Component
 * Sets up main layout structure and defines route configuration.
 * Routes: "/" and "/items" → ItemsView, "/locations" → LocationsView
 */

import styles from './App.module.css'
import AuthPage from './pages/Auth/AuthPage'
import NavBar from './components/layout/NavBar'
import ItemsView from './pages/ItemsView'
import LocationsView from './pages/LocationsView'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'


function App() {
    const isLoggedIn = false; 
    if (!isLoggedIn) {
        return <AuthPage />;
    }
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