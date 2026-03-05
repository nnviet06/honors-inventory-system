/**
 * Database Controller (Business Logic Layer)
 * Refresh the database everytime the frontend is loaded.
 * This is for development purposes only. 
 * Will develop a more robust database management system for production.
 */

import { Request, Response } from 'express';
import supabase from './database';

export const resetDatabase = async (req: Request, res: Response) => {
  try {
    //call supabase function to reset database
    const { data, error } = await supabase.rpc('reset_db');
    
    if (error) throw error;
      res.status(200).json({ message: 'Database reset successful' })
      } catch (error) {
        console.error('Reset error:', error);
        res.status(500).json({ error: 'Failed to reset database' });
    }
}
