require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authMiddleware = require('./middlewares/authMiddleware');
const bookRoutes = require('./Routes/bookRoutes');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT


connectDB();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(authMiddleware);

app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome to the Book Store API',
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: 404,
        error: 'Resource not found',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
