import styles from './Filter.module.css';
import { useState } from 'react';

interface FilterProps {
    equipmentTypes: string[];
    selectedType: string;
    onTypeChange: (type: string) => void;
    locations: string[];
    selectedLocation: string;
    onLocationChange: (location: string) => void;
}
const Filter = ({ equipmentTypes, selectedType, onTypeChange, locations, selectedLocation, onLocationChange }: FilterProps) => {
    const [showTypes, setShowTypes] = useState(false);
    const [showLocations, setShowLocations] = useState(false);
    return (
        <div className={styles.filterDropdown}> 
        {/* Filter by type */}
        <button 
                className={styles.filterHeader} 
                onClick={() => setShowTypes(!showTypes)} >
                By Type {showTypes ? '▲' : '▼'}
        </button>
        {showTypes && (
            <div className={styles.filterSection}>
            {equipmentTypes.map((type) => ( 
                <button
                    key={type}
                    className={`${styles.filterOption} ${selectedType === type ? styles.active : ''}`}
                    onClick={() => onTypeChange(type)}
                >
                    {type}
                </button>
            ))}    
        </div>
        )}

        <div className={styles.divider}> </div>
        {/* Filter by location */}
        <button 
            className={styles.filterHeader}
            onClick={() => setShowLocations(!showLocations)} >
            By Location {showLocations ? '▲' : '▼'}
        </button>
        {showLocations && (
        <div className = {styles.filterSection}>
            {locations.map((location) => (
                <button
                    key={location}
                    className={`${styles.filterOption} ${selectedLocation === location ? styles.active : ''}`}
                    onClick={() => onLocationChange(location)}
                >
                    {location}
                </button>
            ))}    
        </div>
        )}
        </div>
        
    );
};

export default Filter;