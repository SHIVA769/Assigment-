const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Assign a task
router.post('/', async (req, res) => {
  try {
    const { studentId, title, description } = req.body;
    const task = new Task({ studentId, title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks (can filter by studentId)
router.get('/', async (req, res) => {
  try {
    const { studentId } = req.query;
    const query = studentId ? { studentId } : {};
    const tasks = await Task.find(query).populate('studentId', 'name class rollNumber').sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark task as completed or update task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, isCompleted }, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
