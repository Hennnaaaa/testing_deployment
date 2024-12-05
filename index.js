const express = require('express');
const serverless = require('serverless-http');

// Create Express app
const app = express();

// Add necessary middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello, AWS Lambda!' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Testing Lambda deployment' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Export handler for Lambda
const handler = serverless(app);
exports.handler = async (event, context) => {
  // Return response from serverless-http
  return await handler(event, context);
};

// Local development server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}