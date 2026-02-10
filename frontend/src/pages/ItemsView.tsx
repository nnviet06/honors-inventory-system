import styles from './ItemsView.module.css';
import SearchBar from '../components/layout/SearchBar';  
import EquipTable from '../components/layout/EquipTable';  
import { useState } from 'react';

const ItemsView = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedType, setSelectedType] = useState<string>('All');
    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    }
    const handleFilterChange = (type: string) => {
        setSelectedType(type);
    }

    return (
        <div className={styles.container}>
            <SearchBar onRefresh={handleRefresh}
            onFilterChange={handleFilterChange} selectedType={selectedType} />
            <EquipTable refreshKey={refreshKey} selectedType={selectedType} />
        </div>
    )

}

export default ItemsView;