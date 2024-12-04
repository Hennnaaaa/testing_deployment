const express = require('express');
const serverless = require('serverless-http');

// Create your Express app
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, AWS Lambda!');
});

app.get('/test', (req, res) => {
  res.send({ message: 'Testing Lambda deployment' });
});

// Export the app as a handler using serverless-http
module.exports.handler = serverless(app);
