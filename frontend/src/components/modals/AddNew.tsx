/**
 * Add New Equipment Modal
 * Form component for creating new equipment entries.
 * Handles form validation, POST API call to /api/equipment,
 * and loading/error states.
 */

import { useState, useEffect } from 'react';
import styles from './AddNew.module.css';
import { getAllLocations, createEquipment } from '../../services/equipmentService';
import type { Location } from '../../types/equipment'

interface AddNewProps {
    onClose: () => void;
    onSuccess: () => void;
    locations?: Location[];
}

const AddNew = ({ onClose, onSuccess, locations: propLocations }: AddNewProps) => {
    const [model, setModel] = useState('');
    const [equipmentType, setEquipmentType] = useState('');
    const [locationId, setLocationId] = useState(0);
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (propLocations) {
            setLocations(propLocations);  
        } else {
            getAllLocations() 
                .then(data => setLocations(data))
                .catch(() => setError('Failed to load locations'));
        }
    }, [propLocations]); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!model.trim() || !equipmentType.trim() || locationId === 0) {
            setError('All fields are required');
            return;
        }

        try {
            setLoading(true);
            setError('');
            await createEquipment(model, equipmentType, locationId);
            onSuccess();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add equipment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Add New Equipment</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Model Name:</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            placeholder="e.g., Dell P2419H"
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Equipment Type:</label>
                        <input
                            type="text"
                            value={equipmentType}
                            onChange={(e) => setEquipmentType(e.target.value)}
                            placeholder="e.g., monitor, laptop, printer"
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Location:</label>
                        <select
                            value={locationId}
                            onChange={(e) => setLocationId(Number(e.target.value))}
                            disabled={loading}
                        >
                            <option value={0}>Select a location</option>
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
                            {loading ? 'Adding...' : 'Add Equipment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNew;