import styles from './Filter.module.css';

interface FilterProps {
    equipmentTypes: string[];
    selectedType: string;
    onFilterChange: (type: string) => void;
}
const Filter = ({ equipmentTypes, selectedType, onFilterChange }: FilterProps) => {
    return (
        <div className={styles.filterDropdown}> 
            {equipmentTypes.map((type) => (
                <button
                    key={type}
                    className={`${styles.filterOption} ${selectedType === type ? styles.active : ''}`}
                    onClick={() => onFilterChange(type)}
                >
                    {type}
                </button>
            ))}
        </div>
    );
};

export default Filter;