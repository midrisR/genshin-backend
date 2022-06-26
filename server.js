const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const character = require('./router/character');
const material = require('./router/material');
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/characters', character);
app.use('/material', material);

app.use(errorHandler);
app.listen(port, () => console.log(`Server is running on port ${port}`));
