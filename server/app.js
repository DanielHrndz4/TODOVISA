require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/database');
const userRoute = require('./routes/user.route')
const app = express();
const cors = require('cors');
const session = require('express-session');
const PORT = process.env.PORT || 3333;
const SECRET_KEY = process.env.SECRET_KEY;
// Conectar a la base de datos
connectDB();

app.use(cookieParser())
app.use(express.json());

// Configura CORS para permitir cualquier origen
app.use(cors({
  origin: "http://localhost:5173/" || "https://todovisa.vercel.app/",
  credentials: true, // Permite el envío de cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log('Server running in port: ' + PORT);
});
