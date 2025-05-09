const taskModel = require('../models/taskModel');

// Create a new task
const createTask = (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.id; // Extracted from the authenticated user

  if (!title || !description || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  taskModel.createTask(userId, title, description, status, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create task', error: err });
    }
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  });
};

// Fetch all tasks for the logged-in user
const getTasks = (req, res) => {
  const userId = req.user.id;

  taskModel.getTasksByUserId(userId, (err, tasks) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch tasks', error: err });
    }
    res.status(200).json({ tasks });
  });
};

// Update a task
const updateTask = (req, res) => {
    const { id } = req.params; // Extract task ID from URL parameters
    const { title, description, status } = req.body; // Extract task details from request body
  
    // Validate input
    if (!title || !description || !status) {
      return res.status(400).json({ message: 'All fields (title, description, status) are required' });
    }
  
    // Validate status value
    const validStatuses = ['pending', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Allowed values are: ${validStatuses.join(', ')}` });
    }
  
    // Call the model to update the task
    taskModel.updateTask(id, title, description, status, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to update task', error: err });
      }
  
      // Check if the task was found and updated
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Task not found or no changes made' });
      }
  
      res.status(200).json({ message: 'Task updated successfully' });
    });
  };

// Delete a task
const deleteTask = (req, res) => {
  const { id } = req.params;

  taskModel.deleteTask(id, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete task', error: err });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};