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

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
