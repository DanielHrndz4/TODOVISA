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

app.use(express.json());
app.use(cookieParser())

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === 'production') {
      callback(null, ['https://todovisa.onrender.com']);
    } else {
      callback(null, ['http://localhost:3366']);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log('Server running in port: ' + PORT);
});
