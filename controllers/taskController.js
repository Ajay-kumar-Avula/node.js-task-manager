const Task = require('../models/Task');

const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
};

const createTask = async (req, res) => {
    const { name, isCompleted } = req.body; // Change to `name` and `isCompleted`

    // Create a new task
    const task = await Task.create({
        user: req.user.id,
        name,           // Use `name` here
        isCompleted,    // Use `isCompleted` here
    });

    res.status(201).json(task);
};

const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    // Update the task with the new values (name and isCompleted)
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.json(updatedTask);
};

const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    await task.remove();
    res.json({ message: 'Task removed' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };

