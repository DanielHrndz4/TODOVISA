require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/database');
const authenticateJWT = require('./authenticate/authenticateJWT');
const userRoute = require('./routes/user.route')
const app = express();
const PORT = process.env.PORT || 3333;

// Conectar a la base de datos
connectDB();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Habilita el intercambio de cookies entre orígenes
  }));
app.use(cookieParser())
app.use(express.json());

app.use('/api', userRoute);

app.listen(PORT, () => {
    console.log('Server running in port: ' + PORT);
});
