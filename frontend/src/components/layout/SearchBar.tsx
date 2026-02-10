import {useEffect, useState} from 'react';
import styles from './SearchBar.module.css';
import AddNew from '../modals/AddNew';
import Filter from '../modals/Filter';

const SearchBar = ({ onRefresh, onFilterChange, selectedType }: { 
    onRefresh: () => void;
    onFilterChange: (type: string) => void;
    selectedType: string;
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

useEffect(() => {
        fetch('http://localhost:5000/api/types')
            .then(res => res.json())
            .then(data => setEquipmentTypes(['All', ...data])) 
            .catch(err => console.error('Failed to load types:', err));
    }, []);
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
                    selectedType={selectedType}
                    onFilterChange={(type) => {
                        onFilterChange(type);
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