/**
 * Equipment Controller (Business Logic Layer)
 * Handles HTTP request/response processing for equipment operations.
 * Validates input, calls database functions, and returns appropriate
 * HTTP status codes and JSON responses.
 * Functions: getAllEquipment, getEquipmentById, createEquipment,
 *            updateEquipment, deleteEquipment, getAllLocations, getAllTypes
 */

import { Request, Response } from 'express';
import supabase from '../database';
import { AuthenticatedRequest } from '../types/auth'

export const getAllEquipment = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string;
    const location = req.query.location as string;
    const type = req.query.type as string;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    let query = supabase
      .from('equipment')
      .select('*, locations(room_name, building_type)', { count: 'exact' })
      .eq('user_id', userId);
    if (search) {
      query = query.ilike('model', `%${search}%`);
    }
    if (location) {
      query = query.eq('location_id', location);
    }
    if (type) {
      query = query.eq('equipment_type', type);
    }
    const { data, error, count } = await query
      .range(from, to)
      .order('user_seq', { ascending: true })
    if (error) throw error;
    const flattened = data.map(item => {
        const { locations, ...rest } = item;
        return { ...rest, ...locations };
    });
    res.status(200).json({
      data: flattened,
      total: count,
      page, 
      totalPages: Math.ceil((count || 0) / limit)
    })
    }
  catch (error) {
    res.status(500).json({ error: 'Failed to retrieve equipment' });
  }
}

export const getEquipmentById = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id
    const { id } = req.params;
    const { data, error } = await supabase
      .from('equipment')
      .select('*, locations(room_name, building_type)')
      .eq('id', id)
      .eq('user_id', userId)
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
    const userId = (req as AuthenticatedRequest).user.id
    const { model, equipment_type, location_id } = req.body;
    if (!model || !equipment_type || !location_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const { data: counterData, error: counterError } = await supabase
      .from('user_seq_counters')
      .select('last_seq')
      .eq('user_id', userId)
      .single();
    if (counterError) throw counterError;
    const nextSeq = counterData.last_seq + 1;

    const { error: updateError } = await supabase
      .from('user_seq_counters')
      .update({ last_seq: nextSeq })
      .eq('user_id', userId);
    if (updateError) throw updateError;
    const { data, error } = await supabase
    .from('equipment')
    .insert([
        { model, equipment_type, location_id, user_id: userId, user_seq: nextSeq }
      ]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create equipment' });
  }
}

export const updateEquipment = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id
    const { id } = req.params;
    const { model, equipment_type, location_id } = req.body;
    const { data, error } = await supabase
      .from('equipment')
      .update({
        model,
        equipment_type,
        location_id
      })
      .eq('id', id)
      .eq('user_id', userId);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update equipment' });
  }
}

export const deleteEquipment = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id
    const { id } = req.params;
    const { data, error } = await supabase
      .from('equipment')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
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
    const userId = (req as AuthenticatedRequest).user.id
    const { data, error } = await supabase
        .from('equipment').select('equipment_type')
        .eq('user_id', userId);
    if (error) throw error;
    const types = [...new Set(data.map(item => item.equipment_type))];
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve types' });
  }
}

export const bulkDelete = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)){
      return res.status(400).json({ error: 'Failed to delete selected items'})
    }
    const { data, error } = await supabase
      .from('equipment')
      .delete()
      .in('id', ids)
      .eq('user_id', userId);
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete selected items' });
  }
}