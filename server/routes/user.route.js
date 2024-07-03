const express = require('express');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.schema');
const router = express.Router();
const Form = require('../models/form.schema');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware de autenticación
const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const validPayload = jwt.verify(token, SECRET_KEY);
    console.log(validPayload);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, message: "Invalid token" });
  }
};

// Rutas de usuario
router.post('/signin', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { email, password } = req.body;
  userSchema
    .findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ useremail: user.email }, SECRET_KEY);
        console.log(token);
        res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' });
        res.json({
          message: 'Inicio de sesión exitoso',
          token,
          user: {
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

router.post('/show-form-eeuu', (req, res) => {
  const email = req.body.email;
  Form.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(200).json({
          message: 'Formulario encontrado',
          user: {
            email: user.email,
            questions: user.questions
          }
        });
      } else {
        return res.status(404).json({ message: 'El usuario no tiene un formulario creado' });
      }
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Error del servidor' });
    });
});

router.post('/update-form-eeuu', async (req, res) => {
  const { email, questions } = req.body;
  try {
    const form = await Form.findOneAndUpdate({ email: email }, { questions: questions });
    if (form) {
      res.status(200).json({ message: 'Formulario guardado con éxito' });
    } else {
      res.status(400).json({ message: 'Datos no actualizados' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/signup', (req, res) => {
  const { name, lastname, email, password, country, tel } = req.body;
  userSchema.findOne({ email: email })
    .then((existUser) => {
      if (existUser) {
        return res.status(400).json({ message: `El usuario con email: ${email} ya se encuentra registrado` });
      }
      const newUser = new userSchema({ name, lastname, email, password, country, tel });
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

router.post('/forms', async (req, res) => {
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

router.get('/protected-route'
  , (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const validPayload = jwt.verify(token, SECRET_KEY);
      console.log(validPayload);
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ ok: false, message: "Invalid token" });
    }
  }
  , (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.json({message: 'This is a protected route'});
});

router.get('/verify-token', (req, res) => {
  try {
    res.status(200).json({ message: 'Ya tienes un inicio de sesión activo' });
  } catch (e) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/vipro', async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userSchema.findOneAndUpdate({ email: email }, { vipro: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado a VIP', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/vipro-finish', async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userSchema.findOneAndUpdate({ email: email }, { vipro: false });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado a VIP', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/vipro/validation', (req, res) => {
  const email = req.body.email;
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
      res.status(200).json({ message: 'Inicio de sesión exitoso', user: { vipro: user.vipro } });
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Error del servidor' });
    });
});

router.post('/vipro-eeuu', async (req, res) => {
  const { email, questions } = req.body;
  try {
    const existingForm = await Form.findOne({ email: email });
    if (existingForm) {
      return res.status(200).json({ message: 'El usuario tiene un formulario pendiente' });
    }
    const newForm = new Form({ email: email, questions });
    const savedForm = await newForm.save();
    console.log('Formulario guardado:', savedForm);
    return res.status(200).json({ message: 'Formulario registrado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el formulario:', error.message);
    return res.status(500).json({ message: 'Error al guardar el formulario' });
  }
});

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
