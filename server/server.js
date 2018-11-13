const express = require('express');
const path = require('path');

let app = express();

const port = process.env.PORT || 3000;

// Public folder
app.use(express.static(path.join(__dirname, '../public')));

// Listen on port
app.listen(port, () => console.log(`Server starts on port ${port}`));