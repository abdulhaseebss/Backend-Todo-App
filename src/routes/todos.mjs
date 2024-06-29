import express from 'express';
import Todo from '../models/todos.mjs';
import verifyToken from '../middleweres/verifyToken.mjs';

const router = express.Router();

router.use(verifyToken); // Apply middleware to all routes in this router

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.send({ message: "Todos fetched successfully!", data: todos });
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch todos!", error: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newTodo = await Todo.create({ ...req.body, userId: req.userId });
        res.send({ message: "Todo added successfully!", data: newTodo });
    } catch (error) {
        res.status(500).send({ message: "Failed to add todo!", error: error.message });
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { ...req.body },
            { new: true }
        );
        
        if (!updatedTodo) {
            return res.status(404).send({ message: "Todo not found or you do not have permission to update." });
        }

        res.send({ message: "Todo updated successfully!", data: updatedTodo });
    } catch (error) {
        res.status(500).send({ message: "Failed to update todo!", error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
        
        if (!deletedTodo) {
            return res.status(404).send({ message: "Todo not found or you do not have permission to delete." });
        }

        res.send({ message: "Todo deleted successfully!", data: deletedTodo });
    } catch (error) {
        res.status(500).send({ message: "Failed to delete todo!", error: error.message });
    }
});

export default router;
