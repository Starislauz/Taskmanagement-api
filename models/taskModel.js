const db = require('../utils/db');

// Create a new task
const createTask = (userId, title, description, status, callback) => {
  const sql = 'INSERT INTO tasks (user_id, title, description, status, created_at) VALUES (?, ?, ?, ?, NOW())';
  db.query(sql, [userId, title, description, status], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Fetch all tasks for a user
const getTasksByUserId = (userId, callback) => {
  const sql = 'SELECT * FROM tasks WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Update a task
const updateTask = (taskId, title, description, status, callback) => {
  const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
  db.query(sql, [title, description, status, taskId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Delete a task
const deleteTask = (taskId, callback) => {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [taskId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = {
  createTask,
  getTasksByUserId,
  updateTask,
  deleteTask,
};