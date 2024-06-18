const express = require('express');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.schema');
const router = express.Router();
const authenticateJWT = require('../authenticate/authenticateJWT');
const Form = require('../models/form.schema');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  userSchema
    .findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ useremail: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.json({
          message: 'Inicio de sesion exitoso', token, user: {
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

router.post('/signup', (req, res) => {
  const { name, lastname, email, password, country, tel } = req.body;

  userSchema.findOne({ email: email })
    .then((existUser) => {
      if (existUser) {
        return res.status(400).json({ message: `El usuario con email: ${email} ya se encuentra registrado` })
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
    })
});

router.post('/forms', async (req, res) => {
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
  res.send('This is a protected route');
});

router.post('/vipro', authenticateJWT, async (req, res) => {
  const email = req.body.email;
  
  try {
    const user = await userSchema.findOneAndUpdate(
      { email: email },
      { vipro: true },
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado a VIP', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/vipro/validation', authenticateJWT, (req, res) => {
  const email = req.body.email;

  // Validar el correo electrónico antes de hacer la consulta a la base de datos
  if (!email || email.trim() === '') {
    return res.status(400).json({ message: 'El correo electrónico es requerido' });
  }

  userSchema.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (user.vipro !== true) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Enviar la respuesta correcta si el usuario es encontrado y tiene vipro válido
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: {
          vipro: user.vipro,
        }
      });
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Error del servidor' });
    });
});



router.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = router;