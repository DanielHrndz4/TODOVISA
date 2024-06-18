require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/database');
const userRoute = require('./routes/user.route')
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3333;

// Conectar a la base de datos
connectDB();

// Configura CORS para permitir cualquier origen
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser())
app.use(express.json());

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log('Server running in port: ' + PORT);
});
