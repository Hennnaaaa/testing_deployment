const express = require('express');
const app = express();

// Adding a simple route
app.get('/', (req, res) => {
    console.log('Home route accessed');
    res.send('Hello, World!');
});

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});