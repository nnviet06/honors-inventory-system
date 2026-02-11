import styles from './ItemsView.module.css';
import SearchBar from '../components/layout/SearchBar';  
import EquipTable from '../components/layout/EquipTable';  
import { useState } from 'react';

const ItemsView = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [search, setSearch] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedLocation, setSelectedLocation] = useState<string>('All');
    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    }
    const handleSearch = (searchInput: string) => {
        setSearch(searchInput);
    }

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
    }
    const handleLocationChange = (location: string) => {
        setSelectedLocation(location);
    }


    return (
        <div className={styles.container}>
            <SearchBar onRefresh={handleRefresh}
            onSearch={handleSearch}
            onTypeChange={handleTypeChange}
            selectedType={selectedType}
            onLocationChange={handleLocationChange}
            selectedLocation={selectedLocation}
            refreshKey={refreshKey} />
            <EquipTable refreshKey={refreshKey}
            search={search}
            selectedType={selectedType}
            selectedLocation={selectedLocation} />
        </div>
    )

}

export default ItemsView;