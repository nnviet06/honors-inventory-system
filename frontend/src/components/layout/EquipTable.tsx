/**
 * Equipment Table Component (Container + Logic)
 * Displays all equipment in a sortable table with Edit/Delete actions.
 * Fetches equipment data and applies client-side filtering (type, location, search).
 * Manages EditEquipment modal and handles delete API calls.
 */

import styles from './EquipTable.module.css';
import EditEquipment from '../modals/EditEquipment';
import {useEquipTable} from '../../hooks/useEquipTable'

interface EquipTableProps {
  refreshKey: number;
  search: string;
  selectedType: string;
  selectedLocation: string;
}

const EquipTable = ({ refreshKey, search, selectedType, selectedLocation }: EquipTableProps) => {
  const {
    filteredEquipment,
    loading,
    error,
    selectedIds,
    selectedItem,
    showEditModal,
    toggleSelect,
    toggleSelectAll,
    handleBulkDelete,
    handleEdit,
    handleDelete,
    handleModalClose,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useEquipTable({ refreshKey, search, selectedType, selectedLocation });

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


  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <button
              className={styles.bulkDeleteButton}
              disabled={selectedIds.size === 0}
              onClick={handleBulkDelete}
            >
              Delete Selected ({selectedIds.size})
          </button>
          <table>
            <thead>
              <tr>
                <th className={styles.checkboxCell}>
                  <input 
                    type="checkbox"
                    checked={selectedIds.size === filteredEquipment.length && filteredEquipment.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className={styles.idHeader}>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyText}>
                    No equipment found. Add new equipment to get started.
                  </td>
                </tr>
              ) : (
                filteredEquipment.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>
                    <td className={styles.idCell}>{item.user_seq}</td>
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
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className={styles.paginationButton}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showEditModal && selectedItem && (
        <EditEquipment
          item={selectedItem}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default EquipTable;