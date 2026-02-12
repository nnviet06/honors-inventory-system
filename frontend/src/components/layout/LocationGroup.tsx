/**
 * Location Group Component (Presentational)
 * Renders a collapsible section for a single location.
 * Displays equipment list with Edit/Delete buttons when expanded.
 * Controlled component - receives all data and handlers via props.
 */

import styles from './EquipTable.module.css';
import tabStyles from './LocationTable.module.css';

interface Equipment {
    id: number;
    model: string;
    equipment_type: string;
    location_id: number;
    room_name: string;
    building_type: string;
}

interface Location {
    id: number;
    room_name: string;
    building_type: string;
}

interface LocationGroupProps {
    location: Location;
    equipment: Equipment[];
    isExpanded: boolean;
    onToggle: () => void;
    onEdit: (item: Equipment) => void;
    onDelete: (id: number, model: string) => void;
}

const LocationGroup = ({
    location,
    equipment,
    isExpanded,
    onToggle,
    onEdit,
    onDelete
}: LocationGroupProps) => {
    return (
        <div className={tabStyles.locationGroup}>
            <div className={tabStyles.locationHeader} onClick={onToggle}>
                <span className={tabStyles.collapseIcon}>
                    {isExpanded ? '▼' : '▶'}
                </span>
                <span className={tabStyles.locationName}>
                    {location.room_name} ({equipment.length} items)
                </span>
            </div>
            
            {isExpanded && (
                <div className={tabStyles.equipmentList}>
                    {equipment.length === 0 ? (
                        <p className={tabStyles.emptyText}>No equipment in this location</p>
                    ) : (
                        <table className={tabStyles.equipmentTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Model</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {equipment.map(item => (
                                    <tr key={item.id}>
                                        <td className={tabStyles.idCell}>{item.id}</td> 
                                        <td>{item.model}</td>
                                        <td>{item.equipment_type}</td>
                                        <td>
                                            <div className={styles.actionButtons}>
                                                <button
                                                    className={styles.editButton}
                                                    onClick={() => onEdit(item)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => onDelete(item.id, item.model)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocationGroup;