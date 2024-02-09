import { Request, Response } from 'express';
import Task from '../models/Task';

const taskController = {
    getAllTasks: async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createTask: async (req: Request, res: Response) => {
        try {
            const task = await Task.create(req.body);
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: `Internal Server Error ${error}` });
        }
    },

    deleteTask: async (req: Request, res: Response) => {
        try {
            const deleteid = req.params.id;
            const task = await Task.deleteOne({ _id: deleteid });
            res.json(`Deleted Successfully ${deleteid}`);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error could not delete task' });
        }
    },

    updateTask: async (req: Request, res: Response) => {
        try {
            const editid = req.params.id;
            const updateData = req.body;
            const task = await Task.updateOne({ _id: editid }, updateData);
            res.json(`${editid} Updated Successfully`);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error could not update task' });
        }
    }
};

export default taskController;
