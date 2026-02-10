import {useEffect, useState} from 'react';
import styles from './SearchBar.module.css';
import AddNew from '../modals/AddNew';
import Filter from '../modals/Filter';

const SearchBar = ({ onRefresh, onTypeChange, selectedType, selectedLocation, onLocationChange, refreshKey }: { 
    onRefresh: () => void;
    onTypeChange: (type: string) => void;
    onLocationChange: (location: string) => void;
    selectedType: string;
    selectedLocation: string;
    refreshKey: number;
}) => {   
    // Three main components: Search button, Filter button, and Add New button
    const [query, setQuery] = useState<string>('');
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [showAddNewModal, setShowAddNewModal] = useState<boolean>(false);

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    const handleAddNew = () => {
        setShowAddNewModal(true);
    };

    const handleCloseModal = () => {
        setShowAddNewModal(false);  
    };
const [equipmentTypes, setEquipmentTypes] = useState<string[]>(['All']);
const [locations, setLocations] = useState<string[]>(['All']);
// Fetch equipment types for filter dropdown
useEffect(() => {
        fetch('http://localhost:5000/api/types')
            .then(res => res.json())
            .then(data => setEquipmentTypes(['All', ...data])) 
            .catch(err => console.error('Failed to load types:', err));
    }, [refreshKey]);
// Fetch locations for filter dropdown
useEffect(() => {
    fetch('http://localhost:5000/api/locations')
        .then(res => res.json())
        .then(data => setLocations(['All', ...data.map((loc: {room_name: string}) => loc.room_name)]))
        .catch(err => console.error('Failed to load locations:', err));
}, [refreshKey]);
    return (
        <>
        <div className={styles.searchBar}>  
            <input
                className={styles.searchInput}
                type="text" 
                placeholder="A future feature I will work on later " //Just putting a placeholder for now
                value={query} 
                onChange={(e) => setQuery(e.target.value)} />    {/* Setting up userState for Search button component*/}
            <button className={styles.searchButton}> Search </button>  

            <div className={styles.filterContainer}>
            <button className={styles.filterButton} onClick={toggleFilter}>  {/* Setting up userState for Filter button component*/}
                Filter 
            </button>
            {isFilterOpen && (
                <Filter 
                    equipmentTypes={equipmentTypes}
                    locations={locations}
                    selectedType={selectedType}
                    selectedLocation={selectedLocation}
                    onTypeChange={(type) => {
                        onTypeChange(type);
                        setIsFilterOpen(false);
                    }}
                    onLocationChange={(location) => {
                        onLocationChange(location);
                        setIsFilterOpen(false);
                    }}
                />
            )}
            </div>

            <button className={styles.addNewButton} onClick={handleAddNew} >   {/* Setting up Add New button component, no useState, later use in modals*/}
                + Add New 
            </button>
        </div>
        {showAddNewModal && (
            <AddNew onClose={handleCloseModal} onSuccess={onRefresh} /> 
        )}
        </>
        
    );
    
}

export default SearchBar;