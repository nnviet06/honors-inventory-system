/**
 * Location Table Component (Container + Logic)
 * Displays equipment organized by floor and building type (Warehouse/Classroom/Office).
 * Features: Floor tabs, collapsible location groups, inline Edit/Delete actions.
 * Fetches both equipment and location data, manages modal states for Add/Edit.
 */ 

import { useState, useEffect } from 'react';
import styles from './EquipTable.module.css';
import tabStyles from './LocationTable.module.css';
import AddNew from '../modals/AddNew';
import EditEquipment from '../modals/EditEquipment';
import LocationGroup from './LocationGroup';
import { getAllEquipment, getAllLocations } from '../../services/equipmentService';
import type { Equipment, Location } from '../../types/equipment'
import {useEquipmentActions} from '../../hooks/useEquipmentActions'

export interface LocationGroupData {
    location: Location;
    equipment: Equipment[];
}

const LocationTable = () => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [activeFloor, setActiveFloor] = useState(1);
    const [expandedLocations, setExpandedLocations] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddNewModal, setShowAddNewModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError('');
            const [equipRes, locRes] = await Promise.all([getAllEquipment(), getAllLocations()]);
            setEquipment(equipRes);
            setLocations(locRes);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const getFloorFromRoomName = (roomName: string): number => {
        const match = roomName.match(/HON(\d)/);
        return match ? parseInt(match[1]) : 0;
    };

    const getCurrentFloorLocations = (): Location[] => {
        return locations.filter(loc => getFloorFromRoomName(loc.room_name) === activeFloor);
    };

    const getGroupedLocations = (): { [key: string]: LocationGroupData[] } => {
        const currentLocations = getCurrentFloorLocations();
        const grouped: { [key: string]: LocationGroupData[] } = {
            'Warehouse': [], 'Classroom': [], 'Office': []
        };
        currentLocations.forEach(location => {
            const locEquipment = equipment.filter(eq => eq.location_id === location.id);
            if (grouped[location.building_type]) {
                grouped[location.building_type].push({ location, equipment: locEquipment });
            }
        });
        return grouped;
    };

    const toggleLocation = (locationId: number) => {
        setExpandedLocations(prev => {
            const newSet = new Set(prev);
            newSet.has(locationId) ? newSet.delete(locationId) : newSet.add(locationId);
            return newSet;
        });
    };

    const handleAddNewClose = () => {
        setShowAddNewModal(false);
        fetchData();
    };

    const { selectedItem, showEditModal, handleEdit, handleDelete, handleModalClose } 
     = useEquipmentActions(fetchData);

    if (loading) {
        return (
            <div className={styles.tableContainer}>
                <div className={styles.table}>
                    <p className={styles.loadingText}>Loading locations...</p>
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

    const groupedLocations = getGroupedLocations();

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.table}>
                    {/* Floor Tabs */}
                    <div className={tabStyles.tabsContainer}>
                        {[1, 2, 3, 4, 5].map(floor => (
                            <button
                                key={floor}
                                className={`${tabStyles.tab} ${activeFloor === floor ? tabStyles.activeTab : ''}`}
                                onClick={() => setActiveFloor(floor)}
                            >
                                Floor {floor}
                            </button>
                        ))}
                    </div>

                    {/* Add New Button */}
                    <div className={tabStyles.floorActions}>
                        <button className={tabStyles.addFloorButton} onClick={() => setShowAddNewModal(true)}>
                            + Add New Equipment to Floor {activeFloor}
                        </button>
                    </div>

                    {(['Warehouse', 'Classroom', 'Office'] as const).map((type) => (
                    groupedLocations[type].length > 0 && (
                        <div key={type} className={tabStyles.buildingSection}>
                        <h3 className={tabStyles.buildingSectionTitle}>
                            {type === 'Classroom' ? 'Classrooms' : type === 'Office' ? 'Offices' : type}
                        </h3>
                            {groupedLocations[type].map(({ location, equipment: locEquip }) => (
                                <LocationGroup
                                key={location.id}
                                location={location}
                                equipment={locEquip}
                                isExpanded={expandedLocations.has(location.id)}
                                onToggle={() => toggleLocation(location.id)}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                />
                            ))}
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* Modals */}
            {showAddNewModal && (
                <AddNew
                    locations={getCurrentFloorLocations()}
                    onClose={handleAddNewClose}
                    onSuccess={handleAddNewClose}
                />
            )}

            {showEditModal && selectedItem && (
                <EditEquipment item={selectedItem} onClose={handleModalClose} />
            )}
        </>
    );
};

export default LocationTable;