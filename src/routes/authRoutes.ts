import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Dummy user data (replace with actual user database)
const users = [
    { id: 1, username: 'user1', password: '$2b$10$HRfA2u4i4o8UZFLBKcSCuO.dFjDntw3mTST8PAxFx9hVu1otT7g5G' } // hashed password: password123
];

const secretKey='your-secretKey';

//login Route
router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    //find byusername
    const user=users.find(u=>u.username===username);
    if(!user){
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
})

//registration Route
router.post('/register', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    
    // Save user to database (in this case, just push to array)
    users.push({ id: users.length + 1, username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
})
// Logout route (just for demonstration, not necessary with JWT)
router.post('/logout', (req: Request, res: Response) => {
    // Here you might want to invalidate the token on the client-side
    res.json({ message: 'Logout successful' });
});

export default router;