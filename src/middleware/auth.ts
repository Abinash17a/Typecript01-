import { Request, Response, NextFunction } from 'express';


//-------------------------Authenticate user 
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    // Check if authentication token is present in headers
    const authToken = req.headers['authorization'];
    if (!authToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

//--------------------------Authorize Admin


interface CustomRequest extends Request {
    user?: {
        role: string; // Define the properties you expect to exist on the user object
        // Add other properties if needed
    };
}

export const authorizeAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Check if user is an admin
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};
