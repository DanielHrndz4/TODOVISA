require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/database');
const userRoute = require('./routes/user.route')
const app = express();
const PORT = process.env.PORT || 3333;

// Conectar a la base de datos
connectDB();

app.use(cookieParser())
app.use(express.json());

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log('Server running in port: ' + PORT);
});
