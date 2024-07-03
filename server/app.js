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

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt; // Obtener el token JWT de la cookie 'jwt'

  if (!token) {
    return res.sendStatus(401); // Si no hay token, devolver no autorizado
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Si hay un error al verificar el token, devolver prohibido
    }

    req.user = decoded; // Añadir los datos decodificados al objeto `req` para su uso posterior
    next();
  });
};

// Configura CORS para permitir cualquier origen
app.use(cors({
  origin: true,
  credentials: true, // Permite el envío de cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(authenticate)

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log('Server running in port: ' + PORT);
});
