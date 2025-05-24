const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const postRoutes = require('./routes/postRoutes.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json())
// app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/webboard')

app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});