const express = require('express');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.schema');
const router = express.Router();
const authenticateJWT = require('../authenticate/authenticateJWT');
const Form = require('../models/form.schema');
const bcrypt = require('bcrypt');
const cors = require('cors')

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

// Endpoint para iniciar sesión
router.post('/signin', cors({ origin: 'http://localhost:5173/signin', credentials: true }), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'La contraseña es incorrecta' });
    }

    // Genera y firma el token JWT
    const token = jwt.sign({ useremail: user.email }, SECRET_KEY, { expiresIn: '1h' });

    // Configura la cookie JWT en la respuesta
    res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'Strict' }).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        email: user.email,
        name: user.name,
        country: user.country
      }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error del servidor' });
  }
});


router.post('/signup', cors({ origin: 'http://localhost:5173/signup', credentials: true }), (req, res) => {
  const { name, lastname, email, password, country, tel } = req.body;

  userSchema.findOne({ email: email })
    .then((existUser) => {
      if (existUser) {
        return res.status(400).json({ message: `El usuario con email: ${email} ya se encuentra registrado` })
      }

      if (name.length < 5) {
        return res.status(400).json({ message: "El nombre del usuario es muy corto" })
      }

      if (password.length < 8) {
        return res.status(400).json({ message: "La contraseña debe ser minimo de 8 caracteres" })
      }

      if (country.length < 5) {
        return res.status(400).json({ message: "El nombre del pais no es valido" })
      }

      if (tel.length < 10) {
        return res.status(400).json({ message: "Numero de telefono no valido" })
      }

      const hashedPassword = bcrypt.hashSync(password, process.env.SALT);

      const newUser = new userSchema({
        name: name,
        lastname: lastname,
        email: email,
        password: hashedPassword,
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
    })
});

router.post('/forms', authenticateJWT, async (req, res) => {
  const { email, formData } = req.body;

  try {
    // Verificar si el usuario existe por su correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Añadir el email al formData
    formData.email = email;

    // Crear y guardar el nuevo formulario
    const newForm = new Form(formData);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    console.error('Error al crear el formulario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

router.get('/protected-route', authenticateJWT, (req, res) => {
  res.status(200).json("Acceso permitido");
});

router.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = router;