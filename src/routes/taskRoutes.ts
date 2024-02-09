import express from 'express';
import taskController from '../controllers/taskController';
import { authenticateUser, authorizeAdmin } from '../middleware/auth';

const router = express.Router();
router.use(authenticateUser);

// Define task routes
router.get('/',authorizeAdmin, taskController.getAllTasks);
router.post('/',authorizeAdmin, taskController.createTask);


router.delete('/:id', taskController.deleteTask);
router.patch('/:id', taskController.updateTask);

export default router;