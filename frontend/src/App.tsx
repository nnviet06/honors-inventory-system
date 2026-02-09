//import { useState } from 'react'
import styles from './App.module.css'
import NavBar from './components/layout/NavBar'
import ItemsView from './pages/ItemsView'
import LocationsView from './pages/LocationsView'
import { Route, Routes } from 'react-router-dom'


function App() {
    return (
        <div className={styles.app}>
            <NavBar />  
            <Routes>
                <Route path="/items" element={<ItemsView/>} />
                <Route path="/locations" element={<LocationsView/>} />
            </Routes>
        </div>
    );
}

export default App
