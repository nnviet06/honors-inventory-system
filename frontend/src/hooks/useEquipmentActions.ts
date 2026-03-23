/**
 * Shared Equipment Actions Hook
 * Provides reusable edit, delete, and modal handlers
 * for EquipTable and LocationTable components
 */

import {useState} from 'react'
import {deleteEquipment} from '../services/equipmentService'
import type {Equipment} from '../types/equipment'

export const useEquipmentActions = (refetch: () => void) => {
  
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null)
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (item: Equipment) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };
  const handleDelete = async (id: number, model: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${model}?`
    );
    if (!confirmed) return;

    try {
      await deleteEquipment(id);
      refetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete equipment');
    }
  };
    const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedItem(null);
    refetch();
  };

  return { selectedItem, showEditModal, handleEdit, handleDelete, handleModalClose };
};