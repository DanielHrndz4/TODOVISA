require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/database');
const authenticateJWT = require('./authenticate/authenticateJWT');
const userRoute = require('./routes/user.route')
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 3333;

// Conectar a la base de datos
connectDB();
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api', userRoute);

app.listen(PORT, () => {
    console.log('Server running in port: ' + PORT);
});
