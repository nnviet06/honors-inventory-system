import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

const dbName = 'inventory.db'; //Keeping og database
const db = new Database(dbName);

console.log(`Using database: ${dbName}`);  //Only using one database. No more testing db.

// Initialize database
const initDB = () => {
    const schemaPath = join(__dirname, '../../database/schema.sql');
    const samplePath = join(__dirname, '../../database/sample.sql');
    
    try {
        const schema = readFileSync(schemaPath, 'utf-8');
        db.exec(schema);
        
        const count = db.prepare('SELECT COUNT(*) as count FROM locations').get() as { count: number };
        
        if (count.count === 0) {
            const sampleData = readFileSync(samplePath, 'utf-8');
            db.exec(sampleData);
            console.log(`Initialized sample (${dbName})`);
        }
    } catch (error) {
        console.error('Database error:', error);
    }
};

initDB();

export const getAllEquipment = () => {
    const query = `
        SELECT 
            e.id,
            e.model,
            e.equipment_type,
            e.location_id,
            l.room_name,
            l.building_type
        FROM equipment e
        JOIN locations l ON e.location_id = l.id
        ORDER BY e.id
    `;
    return db.prepare(query).all();
};

export const getEquipmentById = (id: number) => {
    const query = `
        SELECT 
            e.id,
            e.model,
            e.equipment_type,
            e.location_id,
            l.room_name,
            l.building_type
        FROM equipment e
        JOIN locations l ON e.location_id = l.id
        WHERE e.id = ?
    `;
    return db.prepare(query).get(id);
};

export const getAllLocations = () => {
    return db.prepare('SELECT id, room_name, building_type FROM locations ORDER BY id').all();
};

export const getAllTypes = () => {
    return db.prepare('SELECT DISTINCT equipment_type FROM equipment ORDER BY equipment_type').all();
};

export const createEquipment = (model: string, equipment_type: string, location_id: number) => {
    const query = `
        INSERT INTO equipment (model, equipment_type, location_id)
        VALUES (?, ?, ?)
    `;
    return db.prepare(query).run(model, equipment_type, location_id);
};

export const updateEquipmentLocation = (id: number, location_id: number) => {
    const query = `
        UPDATE equipment 
        SET location_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    return db.prepare(query).run(location_id, id);
};

export const deleteEquipment = (id: number) => {
    return db.prepare('DELETE FROM equipment WHERE id = ?').run(id);
};
