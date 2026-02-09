import styles from './ItemsView.module.css';
import SearchBar from '../components/layout/SearchBar';  
import EquipTable from '../components/layout/EquipTable';  
import { useState } from 'react';

const ItemsView = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    }
    return (
        <div className={styles.container}>
            <SearchBar onRefresh={handleRefresh} />
            <EquipTable refreshKey={refreshKey} />
        </div>
    )

}

export default ItemsView;