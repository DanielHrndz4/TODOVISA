require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/database');
const userRoute = require('./routes/user.route');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3333;
const SECRET_KEY = process.env.SECRET_KEY;

// Conectar a la base de datos
connectDB();

app.use(express.json());
app.use(cookieParser());

// Configuración CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://todovisa.onrender.com' : 'http://localhost:3366',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
