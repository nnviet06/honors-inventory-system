/**
 * useEquipTable Hook
 * Contains all state, data fetching, filtering, and bulk delete logic
 * for the EquipTable component. Composes useEquipmentActions for shared
 * edit/delete/modal handlers.
 */

import {useState, useEffect} from 'react'
import {getAllEquipment, bulkDelete} from '../services/equipmentService'
import {useEquipmentActions} from './useEquipmentActions'
import type {Equipment} from '../types/equipment'

interface UseEquipTableProps {
  refreshKey: number;
  search: string;
  selectedType: string;
  selectedLocation: string;
}
 
export const useEquipTable = ({ refreshKey, search, selectedType, selectedLocation }: UseEquipTableProps) => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
 
  useEffect(() => {
    fetchEquipment();
  }, [refreshKey]);
 
  useEffect(() => {
    setSelectedIds(new Set());
  }, [selectedType, selectedLocation, search]);
 
  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const data = await getAllEquipment();
      setEquipmentList(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching equipment:', err);
    } finally {
      setLoading(false);
    }
  };
 
  const { selectedItem, showEditModal, handleEdit, handleDelete, handleModalClose } =
    useEquipmentActions(fetchEquipment);
 
  const filteredEquipment = equipmentList.filter((item) => {
    const typeMatch = selectedType === 'All' || item.equipment_type === selectedType;
    const locationMatch = selectedLocation === 'All' || item.building_type === selectedLocation;
    const searchMatch = search === '' || item.model.toLowerCase().includes(search.toLowerCase());
    return typeMatch && locationMatch && searchMatch;
  });
 
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };
 
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredEquipment.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredEquipment.map((item) => item.id)));
    }
  };
 
  const handleBulkDelete = async () => {
    const count = selectedIds.size;
    const confirmed = window.confirm(`Are you sure you want to delete ${count} item(s)?`);
    if (!confirmed) return;
 
    try {
      await bulkDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
      fetchEquipment();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete equipment');
    }
  };
 
  return {
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
  };
};
 