const express = require('express');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.schema');
const router = express.Router();
const Form = require('../models/form.schema');
const cookieParser = require('cookie-parser');
const jwtSchema = require('../models/jwt.schema');
const crypto = require('crypto');
const FormResponseSchema = require('../models/form_response.schema');

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

function createToken(payload) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=/g, '');
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '');

  const signature = crypto.createHmac('sha256', SECRET_KEY)
    .update(`${base64Header}.${base64Payload}`)
    .digest('base64')
    .replace(/=/g, '');

  return `${base64Header}.${base64Payload}.${signature}`;
}

// Rutas de usuario
router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  userSchema
    .findOne({ email: email, password: password })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const payload = {
        email: user.email,
        name: user.name,
        country: user.country
      };
      const token = createToken(payload);

      return jwtSchema.findOne({ email }).then((existUser) => {
        if (existUser) {
          return res.status(400).json({ message: `El usuario con email: ${email} ya tiene un token activo` });
        } 

        const newToken = new jwtSchema({ email, name: user.name, country: user.country, jwt: token });
        return newToken.save().then(() => {
          res.cookie('jwt', token, { secure: true, sameSite: 'None' });
          return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            payload,
          });
        });
      });
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    });
});

router.post('/jwt', (req, res) => {
  const { jwt } = req.body;
  jwtSchema.findOne({ jwt: jwt })
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: response });
      } else {
        return res.status(400).json({ message: "Token invalido" });
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ message: 'Error del servidor' });
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

router.post('/logout', (req, res) => {
  const jwt = req.body.jwt;
  jwtSchema.deleteOne({jwt: jwt})
  .then((response) => {
    if(response){
      return res.status(200).json({ message: "Cerrando sesion"})
    }else{
      return res.status(400).json({ message: "Ocurrio un error" });
    }
  }).catch((error) => {
    res.status(500).json(error)
  })
})

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

router.post('/protected-route',
  (req, res) =>{
    const jwt = req.body.jwt
    jwtSchema.findOne({ jwt: jwt}).then((response) =>{
      if (response){
        return res.status(200).json(response)
      }else{
        return res.status(400).json(response);
      }
    })
    .catch((err) =>{
      res.status(500).console.error(err);
    })
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
  const { email, country, questions } = req.body;
  try {
    const existingForm = await Form.findOne({ email: email });
    if (existingForm) {
      return res.status(200).json({ message: 'El usuario tiene un formulario pendiente' });
    }
    const newForm = new Form({ email: email, country: country, questions });
    const savedForm = await newForm.save();
    return res.status(200).json({ message: 'Formulario registrado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el formulario:', error.message);
    return res.status(500).json({ message: 'Error al guardar el formulario' });
  }
});

router.post('/form_response', async (req,res)=>{
  const {country, questions} = req.body;
  try{
    const existingFormResponse = await FormResponseSchema.findOne({country});
    if(existingFormResponse){
      return res.status(200).json({ message: 'El formulario no se guardo, consulte con su administrador' });
    }
    const newFormResponse = new FormResponseSchema({country:country, questions: questions})
    const savedFormResponse = await newFormResponse.save();
    return res.status(200).json({message: 'Formulario guardado con exito!'})
  }catch(error){
    console.error('Error al guardar el formulario:', error.message);
    return res.status(500).json({ message: 'Error al guardar el formulario' });
  }
})

router.post('/form_response_eeuu', async (req, res) => {
  const { email } = req.body;
  try {
    const existingFormData = await Form.findOne({ email: email });
    if (existingFormData) {
      const responseForm = await FormResponseSchema.findById('668c1c2d5b587853efaf667f');
      if (responseForm) {
        res.status(200).json(responseForm);
      } else {
        res.status(404).json({ message: 'No se encontró el formulario de respuesta' });
      }
    } else {
      res.status(404).json({ message: 'No se encontró el formulario principal' });
    }
  } catch (error) {
    console.error('Error al buscar el formulario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
