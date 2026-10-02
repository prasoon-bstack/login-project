const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to check HTTP Basic Authentication
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Login Required"');
    return res.status(401).send('Authentication required');
  }

  const base64Credentials = authHeader.split(' ')[1];
  if (!base64Credentials) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Login Required"');
    return res.status(401).send('Authentication required');
  }

  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // Simple credentials check (username: admin, password: password)
  if (username === 'admin' && password === 'password') {
    req.user = username;
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Login Required"');
    return res.status(401).send('Invalid credentials');
  }
}

// Serve static files
app.use(express.static('public'));

// Protected route - requires authentication
app.get('/dashboard', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Default credentials - Username: admin, Password: password');
});
