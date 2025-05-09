const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate'); // Middleware to verify JWT

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/tasks', authenticate, taskController.createTask);

// @route   GET /api/tasks
// @desc    Fetch all tasks for the logged-in user
router.get('/tasks', authenticate, taskController.getTasks);

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/tasks/:id', authenticate, taskController.updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/tasks/:id', authenticate, taskController.deleteTask);

module.exports = router;1