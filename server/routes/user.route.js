const express = require('express');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.schema');
const router = express.Router();
const authenticateJWT = require('../authenticate/authenticateJWT')

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/signin', (req, res) => {
  const {email, password} = req.body;
  userSchema
    .findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ useremail: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.json({ message: 'Logged in successfully' });
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

  userSchema.findOne({ email: email})
  .then((existUser)=>{
    if(existUser){
      return res.status(400).json({message: `{El usuario con email: ${email} ya se encuentra registrado}`})
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


router.get('/protected-route', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});

router.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = router;