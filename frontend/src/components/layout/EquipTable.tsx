import { useState, useEffect } from 'react';
import styles from './EquipTable.module.css';
import EditEquipment from '../modals/EditEquipment';

interface Equipment {
  id: number;
  model: string;
  equipment_type: string;
  location_id: number;
  room_name: string;
  building_type: string;
}

interface EquipTableProps {
  refreshKey: number;
  selectedType: string;
  selectedLocation: string;
}

const EquipTable = ({ refreshKey, selectedType, selectedLocation }: EquipTableProps) => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);
  const [showEditEquipmentModal, setShowEditEquipmentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEquipment();
  }, [refreshKey]);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/equipment');
      
      if (!response.ok) {
        throw new Error('Failed to fetch equipment');
      }
      
      const data = await response.json();
      setEquipmentList(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching equipment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Equipment) => {
    setSelectedItem(item);
    setShowEditEquipmentModal(true);
  };

  const handleDelete = async (id: number, model: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${model}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/equipment/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete equipment');
      }

      fetchEquipment();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete equipment');
      console.error('Error deleting equipment:', err);
    }
  };

  const handleModalClose = () => {
    setShowEditEquipmentModal(false);
    setSelectedItem(null);
    fetchEquipment();
  };

  if (loading) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <p className={styles.loadingText}>Loading equipment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <p className={styles.errorText}>Error: {error}</p>
        </div>
      </div>
    );
  }

  const filteredEquipment = equipmentList.filter(item => {
      const typeMatch = selectedType === 'All' || item.equipment_type === selectedType;
      const locationMatch = selectedLocation === 'All' || item.building_type=== selectedLocation;
      return typeMatch && locationMatch;
  });

  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyText}>
                    No equipment found. Add new equipment to get started.
                  </td>
                </tr>
              ) : (
                filteredEquipment.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.idCell}>{item.id}</td>
                    <td>{item.model}</td>
                    <td>{item.equipment_type}</td>
                    <td>
                      {item.room_name} ({item.building_type})
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(item.id, item.model)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showEditEquipmentModal && selectedItem && (
        <EditEquipment
          item={selectedItem}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default EquipTable;