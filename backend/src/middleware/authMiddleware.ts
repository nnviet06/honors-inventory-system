// Verifies JWT token from Authorization header via Supabase

import supabase from '../database'
import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../types/auth'

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] 
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    req.user = { id: user.id }
    next()
}
