const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');

const postRoutes = require('./routes/postRoutes.js');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

mongoose.connect('mongodb://127.0.0.1:27017/webboard')
.then(() =>console.log('MogoDB Connented'))
.catch(err => console.log(err))

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); 
app.use('/posts', postRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});