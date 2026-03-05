/**
 * Database Controller (Business Logic Layer)
 * Refresh the database everytime the frontend is loaded.
 * This is for development purposes only. 
 * Will develop a more robust database management system for production.
 */

import { Request, Response } from 'express';
import supabase from './database';

export const refreshDatabase = async (req: Request, res: Response) => {
  try {
    
  }
}
