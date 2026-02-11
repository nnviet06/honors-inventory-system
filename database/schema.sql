-- Database Schema Definition
-- Creates tables for the Honors Inventory System:
--   - locations: Room information (id, room_name, building_type)
--   - equipment: Equipment records with foreign key to locations
-- Includes indexes for optimized queries.

DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS locations;

--Stores location information (rooms) where equipment can be placed
CREATE TABLE locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_name TEXT NOT NULL UNIQUE,
    building_type TEXT NOT NULL CHECK(building_type IN ('Warehouse', 'Classroom', 'Office')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Stores equipment information and tracks which location each item is in
CREATE TABLE equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model TEXT NOT NULL,
    equipment_type TEXT NOT NULL,
    location_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Index on location_id for faster queries when filtering by location
CREATE INDEX idx_equipment_location ON equipment(location_id);