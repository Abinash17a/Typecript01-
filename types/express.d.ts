import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                
                role: string;
                // Add any other properties you need here
            };
        }
    }
}
