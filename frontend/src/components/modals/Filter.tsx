import styles from './Filter.module.css';

interface FilterProps {
    equipmentTypes: string[];
    selectedType: string;
    onTypeChange: (type: string) => void;
    locations: string[];
    selectedLocation: string;
    onLocationChange: (location: string) => void;
}
const Filter = ({ equipmentTypes, selectedType, onTypeChange, locations, selectedLocation, onLocationChange }: FilterProps) => {
    return (
        <div className={styles.filterDropdown}> 
        {/* Filter by equipment type */}
            {equipmentTypes.map((type) => ( 
                <button
                    key={type}
                    className={`${styles.filterOption} ${selectedType === type ? styles.active : ''}`}
                    onClick={() => onTypeChange(type)}
                >
                    {type}
                </button>
            ))}    
        <div className={styles.filterDropdown}>
        {/* Filter by location */}
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
        </div>
        
    );
};

export default Filter;