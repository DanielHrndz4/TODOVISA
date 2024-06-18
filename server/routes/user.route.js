const express = require('express');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.schema');
const router = express.Router();
const authenticateJWT = require('../authenticate/authenticateJWT');
const Form = require('../models/form.schema');
const bcrypt = require('bcrypt');
const cors = require('cors');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware para analizar el cuerpo de las solicitudes JSON
router.use(express.json());

// Endpoint para iniciar sesión
router.post('/signin', async (req, res) => {
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

// Endpoint para registrar usuario
router.post('/signup', async (req, res) => {
  const { name, lastname, email, password, country, tel } = req.body;

  try {
    const existUser = await userSchema.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: `El usuario con email: ${email} ya se encuentra registrado` });
    }

    if (name.length < 5) {
      return res.status(400).json({ message: "El nombre del usuario es muy corto" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "La contraseña debe ser mínimo de 8 caracteres" });
    }

    if (country.length < 5) {
      return res.status(400).json({ message: "El nombre del país no es válido" });
    }

    if (tel.length < 10) {
      return res.status(400).json({ message: "Número de teléfono no válido" });
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

    await newUser.save();
    res.status(200).json({ message: "Usuario registrado exitosamente" });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Endpoint para guardar formulario
router.post('/forms', authenticateJWT, async (req, res) => {
  const { email, formData } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    formData.email = email;

    const newForm = new Form(formData);
    await newForm.save();
    res.status(201).json(newForm);

  } catch (error) {
    console.error('Error al crear el formulario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta protegida
router.get('/protected-route', authenticateJWT, (req, res) => {
  res.status(200).json("Acceso permitido");
});

// Ruta raíz
router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
