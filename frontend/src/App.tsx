import { useState } from 'react'
import styles from './App.module.css'
import NavBar from './components/layout/NavBar'
import SearchBar from './components/layout/SearchBar'
import EquipTable from './components/layout/EquipTable'
//import AddNew from './components/modals/AddNew'
//import LocChange from './components/modals/LocChange'
//import Location from './components/layout/Location'


function App() {
    const [refreshKey, setRefreshKey] = useState(0);  

    const handleRefresh = () => {  
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className={styles.app}>
            <NavBar />  
            <SearchBar onRefresh={handleRefresh} />  
            <div className={styles.container}>
                <EquipTable  refreshKey={refreshKey} /> 
            </div>
        </div>
    );
}

export default App
