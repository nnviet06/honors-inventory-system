import supabase from '../database'
import { Request, Response, NextFunction } from 'express'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] 
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    (req as any).user = user
    next()
}
