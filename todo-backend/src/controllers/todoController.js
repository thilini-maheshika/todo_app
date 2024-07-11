const Todo = require('../models/Todo');
const mongoose = require('mongoose');

exports.createTodo = async (req, res) => {
    const { title, description, date, status } = req.body;

    try {
        const todo = new Todo({
            user: req.user.id,
            title,
            description,
            date,
            status
        });

        await todo.save();
        res.status(201).json({
            msg: 'Task Added successfully',
            todo
        });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id , deleted: false, status: 'active'});
        res.json(todos);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getTodaysTodos = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const todos = await Todo.find({
            user: req.user.id,
            deleted: false,
            status: 'active',
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (todos.length === 0) {
            return res.status(404).json({ msg: 'No active todos for today' });
        }

        res.json(todos);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getCompletedTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id, status: 'completed', deleted: false });
        if (todos.length === 0) {
            return res.status(404).json({ msg: 'No completed todos found' });
        }
        res.json(todos);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getTodosbyId = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ msg: 'Invalid todo ID' });
        }

        const todo = await Todo.findById(req.params.id);
        if (!todo || todo.deleted) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.searchtodo = async (req, res) => {
    try {
        const title = req.query.title;
        const todos = await Todo.find({ 
            user: req.user.id, 
            title: new RegExp(title, 'i'),
            deleted: false 
        });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updateTodo = async (req, res) => {
    const {title, description, date, status  } = req.body;

    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.date = date || todo.date;
        todo.status = status !== undefined ? status : todo.status;

        await todo.save();
        res.status(201).json({
            msg: 'Task Updated successfully',
            todo
        });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ msg: 'Invalid todo ID' });
        }

        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        todo.deleted = true;
        await todo.save();
        
        res.json({ msg: 'Todo marked as deleted' });
    } catch (error) {
        console.error(error);  
        res.status(500).json({ msg: 'Server error' });
    }
};
