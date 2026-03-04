/**
 * Edit Equipment Modal
 * Form component for updating equipment details (model, type, location).
 * Fetches available types and locations for dropdown options.
 * Handles validation, PUT API call, and loading/error states.
 */

import { useState, useEffect } from 'react';
import styles from './EditEquipment.module.css';

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

interface EditEquipmentProps {
    item: Equipment;
    onClose: () => void;
}

const EditEquipment = ({ item, onClose }: EditEquipmentProps) => {
    const [newLocationId, setNewLocationId] = useState(item.location_id);
    const [locations, setLocations] = useState<Location[]>([]);
    const [newModel, setNewModel] = useState(item.model);
    const [newType, setNewType] = useState(item.equipment_type);
    const [types, setTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/locations`)
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(() => setError('Failed to load locations'));

        fetch(`${import.meta.env.VITE_API_URL}/api/types`)
            .then(res => res.json())
            .then(data => setTypes(data))
            .catch(() => setError('Failed to load equipment types'));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newLocationId === item.location_id && newModel === item.model && newType === item.equipment_type) {
            setError('Please change at least one field');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/equipment/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location_id: newLocationId, model: newModel, equipment_type: newType }),
            });

            if (!response.ok) throw new Error('Failed to update equipment details');
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update equipment details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Edit Equipment Details</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <div className={styles.equipmentInfo}>
                    <p><strong>Model:</strong> {item.model}</p>
                    <p><strong>Type:</strong> {item.equipment_type}</p>
                    <p><strong>Current Location:</strong> {item.room_name} ({item.building_type})</p>
                </div>
                {/* Form to edit the equipment details */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        {/* Edit Model */}
                        <label>Edit Model Name:</label>    
                        <input
                            type="text"
                            value={newModel}
                            onChange={(e) => setNewModel(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        {/* Edit Type */}
                        <label>Edit Type:</label>
                        <select
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                            disabled={loading}
                        >
                            {types.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        {/* Edit Location */}
                        <label>New Location:</label>
                        <select
                            value={newLocationId}
                            onChange={(e) => setNewLocationId(Number(e.target.value))}
                            disabled={loading}
                        >
                            {locations.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.room_name} ({loc.building_type})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.saveButton}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEquipment;