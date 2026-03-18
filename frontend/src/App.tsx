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
import { useState } from 'react'
import { setToken } from './services/equipmentService'


function App() {
    const [session, setSession] = useState(null);
    const handleLogout = () => {
        setSession(null);
        setToken('');
    }
    const handleLogin = (data: any) => {
        setSession(data);
        setToken(data.session.access_token);
    };
    if (!session) {
        return <AuthPage onLogin={handleLogin} />
    }
    return (
        <div className={styles.app}>
            <NavBar onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<ItemsView/>} />
                <Route path="/items" element={<ItemsView/>} />
                <Route path="/locations" element={<LocationsView/>} />
            </Routes>
        </div>
    );
}

export default App