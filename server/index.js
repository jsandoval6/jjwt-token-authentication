require('dotenv').config();
require("./config/database")();
const express = require('express');
const app = express();
const cors = require('cors');

const { authenticateToken } = require('./middlewares/auth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const authRoute = require('./routes/auth')

app.use('/api/auth', authRoute);

app.use(authenticateToken);
app.get('/', (req, res) => {
    res.send('home page');
})

app.listen(3001, () => {
    console.log('app running on port 3001')
});