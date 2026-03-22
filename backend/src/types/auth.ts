// type definitions and interfaces for equipment

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user: {
        id: string;
    }
}