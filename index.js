const express = require('express');

// Instantiate express app
const app = express();

// Define server port
const port = 3200;

// Create default route
app.get('/', (req, res) => {
    res.send('Express + Typescript Server')
})

// Start listening to request
app.listen(port);