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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/locations')
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(() => setError('Failed to load locations'));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newLocationId === item.location_id) {
            setError('Please select a different location');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await fetch(`http://localhost:5000/api/equipment/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location_id: newLocationId }),
            });

            if (!response.ok) throw new Error('Failed to update location');
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update location');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Change Equipment Location</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <div className={styles.equipmentInfo}>
                    <p><strong>Equipment:</strong> {item.model}</p>
                    <p><strong>Type:</strong> {item.equipment_type}</p>
                    <p><strong>Current Location:</strong> {item.room_name} ({item.building_type})</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
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
                            {loading ? 'Updating...' : 'Update Location'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEquipment;