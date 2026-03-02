/**
 * Equipment Controller (Business Logic Layer)
 * Handles HTTP request/response processing for equipment operations.
 * Validates input, calls database functions, and returns appropriate
 * HTTP status codes and JSON responses.
 * Functions: getAllEquipment, getEquipmentById, createEquipment,
 *            updateEquipment, deleteEquipment, getAllLocations, getAllTypes
 */

import { Request, Response } from 'express';
import * as db from './database';

export const getAllEquipment = (req: Request, res: Response) => {
    try {
        const equipment = db.getAllEquipment();
        res.json(equipment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch equipment' });
    }
};

// Get equipment by ID
export const getEquipmentById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const equipment = db.getEquipmentById(id);
        
        if (!equipment) {
            return res.status(404).json({ error: 'Equipment not found' });
        }
        
        res.json(equipment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch' });
    }
};

// Get locations
export const getAllLocations = (req: Request, res: Response) => {
    try {
        const locations = db.getAllLocations();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
};

// Get equipment types
export const getAllTypes = (req: Request, res: Response) => {
    try {
        const types = db.getAllTypes();
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch equipment types' });
    }
};

// Post new equipment
export const createEquipment = (req: Request, res: Response) => {
    try {
        const { model, equipment_type, location_id } = req.body;
        
        if (!model || !equipment_type || !location_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const result = db.createEquipment(model, equipment_type, location_id);
        res.status(201).json({ id: result.lastInsertRowid, message: 'Equipment created' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create equipment' });
        }
};

// Update equipment details (location, model, or type)
export const updateEquipment = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const { location_id, model, equipment_type } = req.body;
        
        if (!model && !equipment_type && !location_id) {
            return res.status(400).json({ error: 'At least one field required' });
}
        
        const result = db.updateEquipment(id, location_id, model, equipment_type);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Equipment not found' });
        }
        
        res.json({ message: 'Equipment updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update equipment details' });
    }
};

// Delete equipment
export const deleteEquipment = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const result = db.deleteEquipment(id);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Equipment not found' });
        }
        
        res.json({ message: 'Equipment deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete equipment' });
    }
};