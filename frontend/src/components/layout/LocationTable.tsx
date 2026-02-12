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
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError('');
            const [equipRes, locRes] = await Promise.all([
                fetch('http://localhost:5000/api/equipment'),
                fetch('http://localhost:5000/api/locations')
            ]);
            if (!equipRes.ok || !locRes.ok) throw new Error('Failed to fetch data');
            setEquipment(await equipRes.json());
            setLocations(await locRes.json());
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

    const handleEdit = (item: Equipment) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    const handleDelete = async (id: number, model: string) => {
        if (!window.confirm(`Are you sure you want to delete ${model}?`)) return;
        try {
            const response = await fetch(`http://localhost:5000/api/equipment/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete equipment');
            fetchData();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete equipment');
        }
    };

    const handleModalClose = () => {
        setShowAddNewModal(false);
        setShowEditModal(false);
        setSelectedItem(null);
        fetchData();
    };

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

                    {/* Warehouses Section */}
                    {groupedLocations['Warehouse'].length > 0 && (
                        <div className={tabStyles.buildingSection}>
                            <h3 className={tabStyles.buildingSectionTitle}>Warehouse</h3>
                            {groupedLocations['Warehouse'].map(({ location, equipment: locEquip }) => (
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
                    )}

                    {/* Classrooms Section */}
                    {groupedLocations['Classroom'].length > 0 && (
                        <div className={tabStyles.buildingSection}>
                            <h3 className={tabStyles.buildingSectionTitle}>Classrooms</h3>
                            {groupedLocations['Classroom'].map(({ location, equipment: locEquip }) => (
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
                    )}

                    {/* Offices Section */}
                    {groupedLocations['Office'].length > 0 && (
                        <div className={tabStyles.buildingSection}>
                            <h3 className={tabStyles.buildingSectionTitle}>Offices</h3>
                            {groupedLocations['Office'].map(({ location, equipment: locEquip }) => (
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
                    )}
                </div>
            </div>

            {/* Modals */}
            {showAddNewModal && (
                <AddNew
                    locations={getCurrentFloorLocations()}
                    onClose={handleModalClose}
                    onSuccess={handleModalClose}
                />
            )}

            {showEditModal && selectedItem && (
                <EditEquipment item={selectedItem} onClose={handleModalClose} />
            )}
        </>
    );
};

export default LocationTable;