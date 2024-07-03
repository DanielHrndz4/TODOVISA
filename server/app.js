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
  console.log(token);
  if (!token) {
    return res.sendStatus(401).json({message: "error al obtener el token"}); // Si no hay token, devolver no autorizado
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(403).json({message: "token no valido"}); // Si hay un error al verificar el token, devolver prohibido
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

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;
  userSchema
    .findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ useremail: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({
          message: 'Inicio de sesión exitoso', token, user: {
            email: user.email,
            name: user.name,
            country: user.country
          }
        });
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    });
});

app.post('/api/signup', (req, res) => {
  const { name, lastname, email, password, country, tel } = req.body;

  userSchema.findOne({ email: email })
    .then((existUser) => {
      if (existUser) {
        return res.status(400).json({ message: `El usuario con email: ${email} ya se encuentra registrado` });
      }

      const newUser = new userSchema({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        country: country,
        tel: tel
      });

      newUser.save()
        .then((user) => {
          res.status(200).json({ message: "Usuario registrado exitosamente" });
        })
        .catch((error) => {
          console.error(error.message);
          res.status(500).json({ message: 'Server error' });
        });
    });
});

app.use(authenticate)

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log('Server running in port: ' + PORT);
});
