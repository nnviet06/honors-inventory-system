-- Database Schema Definition
-- Creates tables for the Honors Inventory System:
--   - locations: Room information (id, room_name, building_type)
--   - equipment: Equipment records with foreign key to locations
-- Includes indexes for optimized queries.
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS locations;

-- ========================================
-- TABLE: locations
-- ========================================
-- Stores location information (rooms) where equipment can be placed
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    room_name VARCHAR(100) NOT NULL UNIQUE,
    building_type VARCHAR(50) NOT NULL CHECK(building_type IN ('Warehouse', 'Classroom', 'Office')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TABLE: equipment
-- ========================================
-- Stores equipment information and tracks which location each item is in
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    equipment_type VARCHAR(100) NOT NULL,
    location_id INTEGER NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

-- ========================================
-- INDEXES
-- ========================================
-- Index on location_id for faster queries when filtering by location
CREATE INDEX idx_equipment_location ON equipment(location_id);

-- Index on equipment_type for faster filtering by type
CREATE INDEX idx_equipment_type ON equipment(equipment_type);

-- Index on user_id for faster queries when filtering by user
CREATE INDEX idx_equipment_user ON equipment(user_id);