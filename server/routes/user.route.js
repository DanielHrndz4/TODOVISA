const express = require('express');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.schema');
const router = express.Router();
const Form = require('../models/form.schema');
const cookieParser = require('cookie-parser');
const jwtSchema = require('../models/jwt.schema');
const crypto = require('crypto');
const FormResponseSchema = require('../models/form_response.schema');
const ResultData = require('../models/qualification.schema');
const cron = require('node-cron')

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

// cron.schedule("*/15 * * * *", () =>{
//   console.log("Health: OK")
// })

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Crear un hash de la contraseña proporcionada
  const hash = crypto.createHash('sha256');
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  userSchema
    .findOne({ email: email, password: hashedPassword })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const avatar = 'https://ionicframework.com/docs/img/demos/avatar.svg'
      const payload = {
        email: user.email,
        name: user.name,
        country: user.country,
        avatar: avatar
      };
      const token = createToken(payload);

      // Verificar si el usuario ya tiene un token activo
      return jwtSchema.findOne({ email }).then((existUser) => {

        // Guardar el nuevo token JWT en la base de datos
        const newToken = new jwtSchema({ email, name: user.name, country: user.country, jwt: token });
        return newToken.save().then(() => {
          // Establecer la cookie con el token JWT
          res.cookie('jwt', token, { secure: true, sameSite: 'None' });

          // Responder con el mensaje de inicio de sesión exitoso, token y payload
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
      res.status(500).json({ message: 'Error en el servidor' });
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
  const { email, questions, country } = req.body;
  try {
    const form = await Form.findOneAndUpdate({ email: email }, { questions: questions });
    if (form) {
      const user = await userSchema.findOne({ email: email });
      if (user) {
        let viproCountryCode;
        switch (country.toLowerCase()) {
          case 'estadosunidos':
            viproCountryCode = 'vipro_eeuu';
            break;
          case 'mexico':
            viproCountryCode = 'vipro_mx';
            break;
          case 'china':
            viproCountryCode = 'vipro_ch';
            break;
          case 'india':
            viproCountryCode = 'vipro_ind';
            break;
          case 'canada':
            viproCountryCode = 'vipro_cnd';
            break;
          case 'inglaterra':
            viproCountryCode = 'vipro_uk';
            break;
          case 'australia':
            viproCountryCode = 'vipro_aus';
            break;
          default:
            viproCountryCode = null;
            break;
        }

        if (viproCountryCode) {
          if (user[viproCountryCode]) {
            user.set(viproCountryCode, undefined)
            await user.save();
          }
        } else {
          return res.status(400).json({ message: 'País no válido' });
        }
      }
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

  // Crear un hash de la contraseña utilizando SHA-256
  const hash = crypto.createHash('sha256');
  hash.update(password);
  const hashedPassword = hash.digest('hex');

  userSchema.findOne({ email: email })
    .then((existUser) => {
      if (existUser) {
        return res.status(400).json({ message: `El usuario con email: ${email} ya se encuentra registrado` });
      }

      // Crear un nuevo usuario con la contraseña hasheada
      const newUser = new userSchema({ name, lastname, email, password: hashedPassword, country, tel });
      newUser.save()
        .then((user) => {
          res.status(200).json({ message: "Usuario registrado exitosamente" });
        })
        .catch((error) => {
          console.error(error.message);
          res.status(500).json({ message: 'Error en el servidor' });
        });
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Error en el servidor' });
    });
});

router.post('/auth/google', async (req, res) => {
  const { name, email, country, password, tel, googleID, avatar } = req.body;
  try {
    // Verificar si el usuario existe en la base de datos
    const existUser = await userSchema.findOne({ email });

    if (existUser) {
      // Caso 1: El usuario existe y tiene un googleID válido
      if (existUser.googleID && existUser.googleID != "") {
        // Crear y guardar un nuevo token JWT
        const payload = { email, name, country, avatar };
        const token = createToken(payload);
        const newToken = new jwtSchema({ email, name, country, jwt: token });
        await newToken.save();
        return res.status(200).json({ message: 'Inicio de sesión exitoso', token, payload });
      } else {
        // Caso 2: El usuario existe pero no tiene un googleID o el googleID es diferente
        return res.status(400).json({ message: 'Ya existe una cuenta registrada con este email' });
      }
    } else {
      // Caso 3: El usuario no existe, se crea una nueva cuenta
      const newUser = new userSchema({ name, email, country, password, tel, googleID, avatar });

      // Crear y guardar un nuevo token JWT
      const payload = { email, name, country, avatar };
      const token = createToken(payload);
      const newToken = new jwtSchema({ email, name, country, jwt: token });
      await newToken.save();

      // Guardar el nuevo usuario
      await newUser.save();

      // Configurar la cookie y responder con el token y payload
      res.cookie('jwt', token, { secure: true, sameSite: 'None' });
      return res.status(200).json({ message: 'Usuario registrado y logueado exitosamente', token, payload });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});


router.post('/logout', (req, res) => {
  const jwt = req.body.jwt;
  jwtSchema.deleteOne({ jwt: jwt })
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Cerrando sesion" })
      } else {
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
  (req, res) => {
    const jwt = req.body.jwt
    jwtSchema.findOne({ jwt: jwt }).then((response) => {
      if (response) {
        return res.status(200).json(response)
      } else {
        return res.status(400).json(response);
      }
    })
      .catch((err) => {
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
  const vipro = req.body.vipro;

  try {
    // Actualiza la propiedad específica en la base de datos
    const updatedUser = await userSchema.findOneAndUpdate(
      { email: email },
      { $set: { [`${vipro}`]: true } }, // Usa template literals para actualizar la propiedad dinámicamente
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: `Usuario actualizado en ${vipro} a VIP`, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/access_pdf', async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar el usuario por email
    const user = await userSchema.findOne({ email: email });

    if (user) {
      // Verificar si el usuario ya tiene guide en true
      if (user.guide === true) {
        res.status(200).json({ message: 'El usuario ya tiene una guía' });
      } else {
        // Actualizar el campo guide a true
        user.guide = true;
        await user.save();
        res.status(200).json({ message: 'Respuesta guardada con éxito' });
      }
    } else {
      res.status(400).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.post('/validate_pdf', async (req, res) => {
  const {email} = req.body;
  try {
    const validateGuide = await userSchema.findOne({ email: email });
    if(validateGuide){
      if(validateGuide.guide === true){
        res.status(200).json({ message: "El usuario tiene acceso a la descarga"})
      }else{
        res.status(400).json({ message: "El usuario no tiene acceso a la descarga"})
      }
    }else{
      res.status(401).json({ message: "El usuario debe estar registrado para realizar esta accion"})
    }
  } catch (error) {
    res.status(500).json({message: 'Error del servidor'});
  }
})

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
      const viproFields = [
        'vipro_eeuu', 'vipro_mx', 'vipro_ch', 'vipro_ind',
        'vipro_cnd', 'vipro_uk', 'vipro_aus'
      ];

      const validVipro = viproFields.reduce((acc, field) => {
        if (user[field] === true) {
          acc[field] = true;
        }
        return acc;
      }, {});

      if (Object.keys(validVipro).length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      res.status(200).json({ message: 'Inicio de sesión exitoso', user: validVipro });
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: 'Error del servidor' });
    });
});

router.post('/vipro-eeuu', async (req, res) => {
  const { email, country, questions } = req.body;

  try {
    // Buscar el formulario existente por el correo electrónico del usuario
    const existingForm = await Form.findOne({ email: email });

    // Buscar al usuario por su correo electrónico y extraer todas las propiedades vipro_*
    const user = await userSchema.findOne({ email: email });

    if (user) {
      // Extraer todas las propiedades vipro_*
      const viproProperties = Object.keys(user.toObject()).filter(key => key.startsWith('vipro_'));
      // Mapear el nombre del país al código de vipro correspondiente
      let viproCountryCode;
      switch (country) {
        case 'estadosunidos':
          viproCountryCode = 'vipro_eeuu';
          break;
        case 'mexico':
          viproCountryCode = 'vipro_mx';
          break;
        case 'china':
          viproCountryCode = 'vipro_ch';
          break;
        case 'india':
          viproCountryCode = 'vipro_ind';
          break;
        case 'canada':
          viproCountryCode = 'vipro_cnd';
          break;
        case 'inglaterra':
          viproCountryCode = 'vipro_uk';
          break;
        case 'australia':
          viproCountryCode = 'vipro_aus';
          break;
        default:
          viproCountryCode = null;
          break;
      }

      if (!viproCountryCode || !viproProperties.includes(viproCountryCode)) {
        // Si el país seleccionado no está permitido o no está en las propiedades vipro_*, redirigir a pagar
        return res.status(200).json({ message: 'No tienes acceso a este país, por favor realiza el pago', redirectToPayment: true });
      }

      // Verificar si hay algún formulario existente
      if (existingForm) {
        return res.status(200).json({ message: 'El usuario tiene un formulario pendiente por realizar', vipro: viproProperties });
      } else {
        // Crear y guardar un nuevo formulario
        const newForm = new Form({ email: email, country: country, questions });
        const savedForm = await newForm.save();
        return res.status(200).json({ message: 'Formulario registrado exitosamente', vipro: viproProperties });
      }
    }

    res.status(400).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    console.error('Error al guardar el formulario:', error.message);
    return res.status(500).json({ message: 'Error al guardar el formulario' });
  }
});

router.post('/form_response', async (req, res) => {
  const { country, questions } = req.body;
  try {
    const existingFormResponse = await FormResponseSchema.findOne({ country });
    if (existingFormResponse) {
      return res.status(200).json({ message: 'El formulario no se guardo, consulte con su administrador' });
    }
    const newFormResponse = new FormResponseSchema({ country: country, questions: questions })
    const savedFormResponse = await newFormResponse.save();
    return res.status(200).json({ message: 'Formulario guardado con exito!' })
  } catch (error) {
    console.error('Error al guardar el formulario:', error.message);
    return res.status(500).json({ message: 'Error al guardar el formulario' });
  }
})

router.post('/form_response_eeuu', async (req, res) => {
  const { email } = req.body;
  try {
    const existingFormData = await Form.findOne({ email: email });
    if (existingFormData) {
      const responseForm = await FormResponseSchema.findById('668c547a5c587321604fc73f');
      if (responseForm) {
        const responseFormUser = await Form.findOne({ email: email });
        if (responseFormUser) {
          const user = await userSchema.findOne({ email: email })
          res.status(200).json({ responseForm, responseFormUser, user });
        }
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


router.post('/save_qualification', async (req, res) => {
  const { resultData, email } = req.body;
  try {
    const existingQualification = await ResultData.findOne({ email: email })
    if (existingQualification) {
      res.status(200).json({
        success: true,
        message: 'El correo ya existe',
      })
    } else {
      const newQualification = new ResultData({
        name: resultData.name,
        email: resultData.email,
        tel: resultData.tel,
        user_country: resultData.user_country,
        form_country: resultData.form_country,
        response: [
          {
            dh: {
              correct: resultData.response[0].dh.correct,
              incorrect: resultData.response[0].dh.incorrect,
            },
            aff: {
              correct: resultData.response[0].aff.correct,
              incorrect:resultData.response[0].aff.incorrect,
            },
            hv: {
              correct: resultData.response[0].hv.correct,
              incorrect: resultData.response[0].hv.incorrect,
            },
            hd: {  // Aquí debería ser 'hd' en lugar de 'dp'
              correct: resultData.response[0].hd.correct,
              incorrect: resultData.response[0].hd.incorrect,
            },
          }
        ],
        qualification: resultData.qualification
      });
      const formCountry = resultData.form_country.toLowerCase().replace(/\s+/g, '');
      console.log(formCountry);
      await newQualification.save();
      await Form.findOneAndDelete({ email: email, country: formCountry });
      res.status(201).json({
        success: true,
        message: 'Resultados guardados con exito',
        data: newQualification
      });
    }
  } catch (error) {
    console.error('Error al guardar: ', error);

    res.status(500).json({
      success: false,
      message: 'Ocurrio un error al guardar los resultados',
      error: error.message
    });
  }
});

router.post('/complete_forms', async (req, res) => {
  const { email } = req.body;
  try {
      const forms = await ResultData.find({ email: email });
      res.json({forms});
  } catch (err) {
      res.status(500).json({ error: 'Error al recuperar los formularios' });
  }
});

router.post('/complete_forms_id', async (req, res) => {
  const { id } = req.body;
  try {
      const forms = await ResultData.findById(id);
      res.json({forms});
  } catch (err) {
      res.status(500).json({ error: 'Error al recuperar los formularios' });
  }
});

router.get('/hello', (req, res) => {
  res.status(200);
})

module.exports = router;
