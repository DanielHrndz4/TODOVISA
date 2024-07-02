const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware para verificar el token JWT
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

module.exports = authenticate;
