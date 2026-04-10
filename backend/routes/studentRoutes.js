const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Task = require('../models/Task');

// Add new student
router.post('/', async (req, res) => {
  try {
    const { name, class: className, rollNumber } = req.body;
    const student = new Student({ name, class: className, rollNumber });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const { name, class: className, rollNumber } = req.body;
    const student = await Student.findByIdAndUpdate(req.params.id, { name, class: className, rollNumber }, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    // Also delete tasks associated with student
    await Task.deleteMany({ studentId: req.params.id });
    
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
