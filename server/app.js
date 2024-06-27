require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/database');
const userRoute = require('./routes/user.route')
const app = express();
const cors = require('cors');
const session = require('express-session');
const PORT = process.env.PORT || 3333;

// Conectar a la base de datos
connectDB();

// Configura CORS para permitir cualquier origen
app.use(cors({
  origin: 'https://todovisa.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: 'your_secret_key', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Use true if your site is HTTPS
    sameSite: 'none' // Ensure cross-site requests work
  }
}));

app.use(cookieParser())
app.use(express.json());

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log('Server running in port: ' + PORT);
});
