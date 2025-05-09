// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // import routes

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Use the auth routes for any path starting with /api
app.use('/api', authRoutes);

// Default route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Auth API 👋');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);
