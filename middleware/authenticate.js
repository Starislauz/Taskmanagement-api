const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header

  // Check if the Authorization header is present and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
    req.user = decoded; // Attach the decoded user info (e.g., id, email) to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate; // Export the middleware