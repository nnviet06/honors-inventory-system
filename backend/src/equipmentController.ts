/**
 * Equipment Controller (Business Logic Layer)
 * Handles HTTP request/response processing for equipment operations.
 * Validates input, calls database functions, and returns appropriate
 * HTTP status codes and JSON responses.
 * Functions: getAllEquipment, getEquipmentById, createEquipment,
 *            updateEquipment, deleteEquipment, getAllLocations, getAllTypes
 */

import { Request, Response } from 'express';
import supabase from './database';

export const getAllEquipment = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*, locations(room_name, building_type)');
    if (error) throw error;
    const flattened = data.map(item => {
        const { locations, ...rest } = item;
        return { ...rest, ...locations };
    });
    res.status(200).json(flattened);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve equipment' });
  }
}

export const getEquipmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('equipment')
      .select('*, locations(room_name, building_type)')
      .eq('id', id);
    if (error) throw error;
    const flattened = data.map(item => {
        const { locations, ...rest } = item;
        return { ...rest, ...locations };
    });
    res.status(200).json(flattened);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve equipment by ID' });
  }
}

export const createEquipment = async (req: Request, res: Response) => {
  try {
    const { model, equipment_type, location_id } = req.body;
    if (!model || !equipment_type || !location_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const { data, error } = await supabase
      .from('equipment')
      .insert([
        { model, equipment_type, location_id }
      ]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create equipment' });
  }
}

export const updateEquipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { model, equipment_type, location_id } = req.body;
    const { data, error } = await supabase
      .from('equipment')
      .update({
        model,
        equipment_type,
        location_id
      })
      .eq('id', id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update equipment' });
  }
}

export const deleteEquipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('equipment')
      .delete()
      .eq('id', id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
}

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve locations' });
  }
}

export const getAllTypes = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
        .from('equipment').select('equipment_type');
    if (error) throw error;
    const types = [...new Set(data.map(item => item.equipment_type))];
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve types' });
  }
}