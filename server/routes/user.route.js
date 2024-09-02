const express = require("express");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.schema");
const router = express.Router();
const Form = require("../models/form.schema");
const cookieParser = require("cookie-parser");
const jwtSchema = require("../models/jwt.schema");
const crypto = require("crypto");
const FormResponseSchema = require("../models/form_response.schema");
const ResultData = require("../models/qualification.schema");
const cron = require("node-cron");
const sgMail = require("@sendgrid/mail");
const { generateCode, createToken } = require("../functions/Functions");
const scheduleSchema = require("../models/schedule.schema");

require("dotenv").config();

const SENDGRID = process.env.SENDGRID_TOKEN;
sgMail.setApiKey(SENDGRID);

router.post("/reset_password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "El correo electrónico no está registrado" });
    }

    // Verificar si el usuario se registró con Google
    if (user.googleID) {
      return res
        .status(400)
        .json({
          message:
            "No se puede cambiar la contraseña porque la cuenta se creó con Google",
        });
    }
    const generateRandomNumberString = (length) => {
      const bytes = crypto.randomBytes(length);
      let result = "";

      // Convertir cada byte a un dígito numérico (0-9)
      for (let i = 0; i < bytes.length; i++) {
        result += bytes[i] % 10; // Obtener el módulo 10 para obtener un dígito numérico
      }

      return result.padStart(length, "0"); // Asegurar que la longitud sea la deseada, rellenar con ceros si es necesario
    };
    // Generar un código aleatorio
    const codePassword = generateRandomNumberString(4);
    const userName = user.name;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
    const day = String(today.getDate()).padStart(2, "0");

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Reset Password</title>

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 30px 30px 60px;
            background: #f4f7ff;
            background-image: url(https://todovisa.vercel.app/img/background/bgeeuu.webp);
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #113E5F;
          "
        >
        <header style="text-align: center;">
            <table style="margin: 0 auto;">
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="Todovisa Logo"
                      src="https://todovisa.com/img/logo/todovisa.png"
                      height="120px"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </header>

          <main>
            <div
              style="
                margin: 0;
                margin-top: 20px;
                padding: 60px 30px 80px;
                background: #ffffff;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 100%; margin: 0 auto;">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                Reset Password
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  Hey ${userName},
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >
                <p>Thank you for choosing Todovisa. Please use the following link to complete your password reset procedure. Do not share this link with anyone, including Todovisa employees.</p>
                <p>If you did not request this change, please ignore this email. If you have any questions or need further assistance, please contact us.</p>
                <p>Thank you!</p>
                <p>The Todovisa Team</p>
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 40px;
                    margin-bottom: 20px;
                    font-size: 40px;
                    font-weight: 600;
                    letter-spacing: 25px;
                    color: #113E5F;
                  "
                >
                  ${codePassword}
                </p>
                <p><strong style="font-weight: 600; color: #1f1f1f;">Password Reset Link:</strong> <a href="https://todovisa.com" style="font-size: 1.2em; font-weight: bold; color: #007BFF;">Reset Password</a></p>
              </div>
            </div>

            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Ask at
              <a
                href="mailto:tuvisa@todovisa.com"
                style="color: #113E5F; text-decoration: none;"
                >tuvisa@todovisa.com</a
              >
              or visit our
              <a
                href="https://www.google.com/maps/dir//67+Avenida+Sur+Local+%231,+San+Salvador/@13.6970016,-89.2252546,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8f6331d77b1013e3:0xbfa86a56cf477af7!2m2!1d-89.2246802!2d13.6971043?entry=ttu"
                target="_blank"
                style="color: #113E5F; text-decoration: none;"
                >Help Center</a
              >
            </p>
          </main>

          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #113E5F;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #434343;
              "
            >
              Todovisa S.A de C.V
            </p>
            <p style="margin: 0; margin-top: 8px; color: #434343;">
               67 Avenida Sur Local #1, San Salvador
            </p>
            <div style="margin: 0; margin-top: 16px;">
               <a href="https://www.facebook.com/todovisasv?mibextid=ZbWKwL&_rdr" target="_blank" style="display: inline-block;">
                <img
                  width="36px"
                  alt="Facebook"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                />
              </a>
            </div>
            <p style="margin: 0; margin-top: 16px; color: #434343;">
              Copyright © ${year} Todovisa. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
    `;

    // Actualizar el usuario con el código
    user.code_password = codePassword;
    await user.save();
    const msg = {
      to: email, // Replace with your recipient
      from: "tuvisa@todovisa.com", // Replace with your verified sender
      subject: "Reset Password",
      text: "Click the link for more information",
      html: htmlContent,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
});

router.post("/validate_otp", async (req, res) => {
  const { email, codeOTP } = req.body;
  try {
    const user = await userSchema.findOne({ email });
    if (user) {
      const otp = user.code_password;
      if (otp) {
        if (otp == codeOTP) {
          res.status(200).json({ message: "Codigo verificado exitosamente" });
        } else {
          res.status(401).json({ message: "El codigo no es valido" });
        }
      } else {
        res.status(400).json({ message: "Codigo no generado" });
      }
    } else {
      res.status(400).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/update_password_otp", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crear un hash de la nueva contraseña
    const hash = crypto.createHash("sha256");
    hash.update(newPassword);
    const hashedPassword = hash.digest("hex");

    // Actualizar la contraseña del usuario
    user.password = hashedPassword;
    await user.save();

    // Eliminar el código de contraseña (esto asume que el código de contraseña se guarda en un campo)
    // Si el código de contraseña se guarda en una colección separada, necesitarás eliminarlo desde allí.
    user.code_password = undefined; // O usa `delete user.code_password;` si el campo existe
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // Crear un hash de la contraseña proporcionada
  const hash = crypto.createHash("sha256");
  hash.update(password);
  const hashedPassword = hash.digest("hex");
  userSchema
    .findOne({ email: email, password: hashedPassword })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const avatar = "https://ionicframework.com/docs/img/demos/avatar.svg";
      const payload = {
        email: user.email,
        name: user.name,
        country: user.country,
        avatar: avatar,
      };
      const token = createToken(payload);

      // Verificar si el usuario ya tiene un token activo
      return jwtSchema.findOne({ email }).then((existUser) => {
        // Guardar el nuevo token JWT en la base de datos
        const newToken = new jwtSchema({
          email,
          name: user.name,
          country: user.country,
          jwt: token,
        });
        return newToken.save().then(() => {
          // Establecer la cookie con el token JWT
          res.cookie("jwt", token, { secure: true, sameSite: "None" });

          // Responder con el mensaje de inicio de sesión exitoso, token y payload
          return res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            payload,
          });
        });
      });
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: "Error en el servidor" });
    });
});

router.post("/jwt", (req, res) => {
  const { jwt } = req.body;
  jwtSchema
    .findOne({ jwt: jwt })
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: response });
      } else {
        return res.status(400).json({ message: "Token invalido" });
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ message: "Error del servidor" });
    });
});

router.post("/show-form-eeuu", (req, res) => {
  const { email, country } = req.body;
  Form.findOne({ email: email, country: country })
    .then((user) => {
      if (user) {
        return res.status(200).json({
          message: "Formulario encontrado",
          user: {
            email: user.email,
            questions: user.questions,
          },
        });
      } else {
        return res
          .status(404)
          .json({ message: "El usuario no tiene un formulario creado" });
      }
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: "Error del servidor" });
    });
});

router.post("/update-form-eeuu", async (req, res) => {
  const { email, questions, country, isFinish } = req.body;
  try {
    // Actualizar el formulario con el país y las preguntas
    const form = await Form.findOneAndUpdate(
      { email: email, country: country },
      { $set: { questions: questions } },
      { new: true } // Devuelve el documento actualizado
    );

    if (form) {
      const user = await userSchema.findOne({ email: email });

      if (user) {
        let viproCountryCode;

        // Mapear el país al código de vipro correspondiente
        switch (country) {
          case "estadosunidos":
            viproCountryCode = "vipro_eeuu";
            break;
          case "mexico":
            viproCountryCode = "vipro_mx";
            break;
          case "china":
            viproCountryCode = "vipro_ch";
            break;
          case "india":
            viproCountryCode = "vipro_ind";
            break;
          case "canada":
            viproCountryCode = "vipro_cnd";
            break;
          case "inglaterra":
            viproCountryCode = "vipro_uk";
            break;
          case "australia":
            viproCountryCode = "vipro_aus";
            break;
          default:
            viproCountryCode = null;
            break;
        }

        // Actualizar las propiedades vipro del usuario si el formulario está terminado
        if (viproCountryCode) {
          if (isFinish) {
            if (user[viproCountryCode]) {
              user[viproCountryCode] = undefined;
              await user.save();
            }
          }
        } else {
          return res.status(400).json({ message: "País no válido" });
        }

        res.status(200).json({ message: "Formulario guardado con éxito" });
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Formulario no encontrado o datos no actualizados" });
    }
  } catch (error) {
    console.error("Error al actualizar el formulario:", error.message);
    res.status(500).json({ message: "Error del servidor" });
  }
});

router.post("/signup", async (req, res) => {
  const { name, lastname, email, password, country, tel, code_ref } = req.body;

  try {
    if (code_ref !== "") {
      // Solo se ejecuta si code_ref no está vacío
      const referrer = await userSchema.findOne({ code_ref: code_ref });
      if (referrer) {
        // Incrementar el campo person_ref del usuario que tiene el código de referencia
        await userSchema.updateOne(
          { code_ref: code_ref },
          { $inc: { person_ref: 1 } }
        );
      } else {
        return res
          .status(400)
          .json({ message: "El código no pertenece a ningún usuario" });
      }
    }

    let codeRef;
    let codeExists = true;

    while (codeExists) {
      codeRef = generateCode();
      const existingUser = await userSchema.findOne({ code_ref: codeRef });
      if (!existingUser) {
        codeExists = false;
      }
    }

    // Crear un hash de la contraseña utilizando SHA-256
    const hash = crypto.createHash("sha256");
    hash.update(password);
    const hashedPassword = hash.digest("hex");

    const existingUser = await userSchema.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: `El usuario con email: ${email} ya se encuentra registrado`,
        });
    }

    // Crear un nuevo usuario con la contraseña hasheada y el código de referencia generado
    const newUser = new userSchema({
      name,
      lastname,
      email,
      password: hashedPassword,
      country,
      tel,
      code_ref: codeRef,
      person_ref: 0,
    });

    await newUser.save();
    res.status(200).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// SE REEMPLAZO ESTE CODIGO
router.post("/auth/google", async (req, res) => {
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
        return res
          .status(200)
          .json({ message: "Inicio de sesión exitoso", token, payload });
      } else {
        // Caso 2: El usuario existe pero no tiene un googleID o el googleID es diferente
        return res
          .status(400)
          .json({ message: "Ya existe una cuenta registrada con este email" });
      }
    } else {
      // Caso 3: El usuario no existe, se crea una nueva cuenta

      let codeRef;
      let codeExists = true;

      while (codeExists) {
        codeRef = generateCode();
        const existingUser = await userSchema.findOne({ code_ref: codeRef });
        if (!existingUser) {
          codeExists = false;
        }
      }

      // Crear un nuevo usuario con el código de referencia generado y person_ref inicializado en 0
      const newUser = new userSchema({
        name,
        email,
        country,
        password,
        tel,
        googleID,
        avatar,
        code_ref: codeRef,
        person_ref: 0,
      });

      // Crear y guardar un nuevo token JWT
      const payload = { email, name, country, avatar };
      const token = createToken(payload);
      const newToken = new jwtSchema({ email, name, country, jwt: token });
      await newToken.save();

      // Guardar el nuevo usuario
      await newUser.save();

      // Configurar la cookie y responder con el token y payload
      res.cookie("jwt", token, { secure: true, sameSite: "None" });
      return res
        .status(200)
        .json({
          message: "Usuario registrado y logueado exitosamente",
          token,
          payload,
        });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/logout", (req, res) => {
  const jwt = req.body.jwt;
  jwtSchema
    .deleteOne({ jwt: jwt })
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Cerrando sesion" });
      } else {
        return res.status(400).json({ message: "Ocurrio un error" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/forms", async (req, res) => {
  const { email, formData } = req.body;
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    formData.email = email;
    const newForm = new Form(formData);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    console.error("Error al crear el formulario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/protected-route", (req, res) => {
  const jwt = req.body.jwt;
  jwtSchema
    .findOne({ jwt: jwt })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(400).json(response);
      }
    })
    .catch((err) => {
      res.status(500).console.error(err);
    });
});

router.get("/verify-token", (req, res) => {
  try {
    res.status(200).json({ message: "Ya tienes un inicio de sesión activo" });
  } catch (e) {
    res.status(500).json({ message: "Error del servidor" });
  }
});

router.post("/vipro", async (req, res) => {
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
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res
      .status(200)
      .json({
        message: `Usuario actualizado en ${vipro} a VIP`,
        user: updatedUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

router.post("/access_pdf", async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar el usuario por email
    const user = await userSchema.findOne({ email: email });

    if (user) {
      // Verificar si el usuario ya tiene guide en true
      if (user.guide === true) {
        res.status(200).json({ message: "El usuario ya tiene una guía" });
      } else {
        // Actualizar el campo guide a true
        user.guide = true;
        await user.save();
        res.status(200).json({ message: "Respuesta guardada con éxito" });
      }
    } else {
      res.status(400).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/validate_pdf", async (req, res) => {
  const { email } = req.body;
  try {
    const validateGuide = await userSchema.findOne({ email: email });
    if (validateGuide) {
      if (validateGuide.guide === true) {
        res
          .status(200)
          .json({ message: "El usuario tiene acceso a la descarga" });
      } else {
        res
          .status(400)
          .json({ message: "El usuario no tiene acceso a la descarga" });
      }
    } else {
      res
        .status(401)
        .json({
          message: "El usuario debe estar registrado para realizar esta accion",
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
});

router.post("/vipro/validation", (req, res) => {
  const email = req.body.email;
  if (!email || email.trim() === "") {
    return res
      .status(400)
      .json({ message: "El correo electrónico es requerido" });
  }

  userSchema
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const viproFields = [
        "vipro_eeuu",
        "vipro_mx",
        "vipro_ch",
        "vipro_ind",
        "vipro_cnd",
        "vipro_uk",
        "vipro_aus",
      ];

      const validVipro = viproFields.reduce((acc, field) => {
        if (user[field] === true) {
          acc[field] = true;
        }
        return acc;
      }, {});

      if (Object.keys(validVipro).length === 0) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", user: validVipro });
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ message: "Error del servidor" });
    });
});

router.post("/vipro-eeuu", async (req, res) => {
  const { email, country, questions } = req.body;

  try {
    // Buscar el formulario existente por el correo electrónico del usuario
    const existingForm = await Form.findOne({ email: email });

    // Buscar al usuario por su correo electrónico y extraer todas las propiedades vipro_*
    const user = await userSchema.findOne({ email: email });

    if (user) {
      // Extraer todas las propiedades vipro_*
      const viproProperties = Object.keys(user.toObject()).filter((key) =>
        key.startsWith("vipro_")
      );
      // Mapear el nombre del país al código de vipro correspondiente
      let viproCountryCode;
      switch (country) {
        case "estadosunidos":
          viproCountryCode = "vipro_eeuu";
          break;
        case "mexico":
          viproCountryCode = "vipro_mx";
          break;
        case "china":
          viproCountryCode = "vipro_ch";
          break;
        case "india":
          viproCountryCode = "vipro_ind";
          break;
        case "canada":
          viproCountryCode = "vipro_cnd";
          break;
        case "inglaterra":
          viproCountryCode = "vipro_uk";
          break;
        case "australia":
          viproCountryCode = "vipro_aus";
          break;
        default:
          viproCountryCode = null;
          break;
      }

      const id = user._id;

      if (!viproCountryCode || !viproProperties.includes(viproCountryCode)) {
        // Si el país seleccionado no está permitido o no está en las propiedades vipro_*, redirigir a pagar
        return res
          .status(200)
          .json({
            message: "No tienes acceso a este país, por favor realiza el pago",
            redirectToPayment: true,
            id: id,
          });
      }

      // Verificar si hay algún formulario existente
      if (existingForm) {
        return res
          .status(200)
          .json({
            message: "El usuario tiene un formulario pendiente por realizar",
            vipro: viproProperties,
            id: id,
          });
      } else {
        // Crear y guardar un nuevo formulario
        const newForm = new Form({ email: email, country: country, questions });
        const savedForm = await newForm.save();
        return res
          .status(200)
          .json({
            message: "Formulario registrado exitosamente",
            vipro: viproProperties,
            id: id,
          });
      }
    }

    res.status(400).json({ message: "Usuario no encontrado" });
  } catch (error) {
    console.error("Error al guardar el formulario:", error.message);
    return res.status(500).json({ message: "Error al guardar el formulario" });
  }
});

router.post("/payment_n1co", async (req, res) => {
  const { email, country, questions, id } = req.body;
  try {
    // Verificar si el usuario existe
    const user = await userSchema.findById(id);
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    // Verificar si ya existe un formulario con el mismo país y email
    const existingForm = await Form.findOne({ email: email, country: country });
    if (existingForm) {
      return res
        .status(400)
        .json({
          message: "Ya existe un formulario con este país y correo electrónico",
        });
    }

    // Obtener propiedades vipro del usuario
    const viproProperties = Object.keys(user.toObject()).filter((key) =>
      key.startsWith("vipro_")
    );

    // Mapear el nombre del país al código de vipro correspondiente
    let viproCountryCode;

    switch (country) {
      case "estadosunidos":
        viproCountryCode = "vipro_eeuu";
        break;
      case "mexico":
        viproCountryCode = "vipro_mx";
        break;
      case "china":
        viproCountryCode = "vipro_ch";
        break;
      case "india":
        viproCountryCode = "vipro_ind";
        break;
      case "canada":
        viproCountryCode = "vipro_cnd";
        break;
      case "inglaterra":
        viproCountryCode = "vipro_uk";
        break;
      case "australia":
        viproCountryCode = "vipro_aus";
        break;
      default:
        viproCountryCode = null;
        break;
    }

    // Crear y guardar el nuevo formulario
    const newForm = new Form({ email: email, country: country, questions });
    await newForm.save();

    await userSchema.findOneAndUpdate(
      { email: email },
      { $set: { [`${viproCountryCode}`]: true } }, // Usa template literals para actualizar la propiedad dinámicamente
      { new: true }
    );

    return res
      .status(200)
      .json({
        message: "Formulario registrado exitosamente",
        vipro: viproProperties,
      });
  } catch (error) {
    console.error("Error al guardar el formulario:", error.message);
    return res.status(500).json({ message: "Error al guardar el formulario" });
  }
});

router.post("/form_response", async (req, res) => {
  const { country, questions } = req.body;
  try {
    const existingFormResponse = await FormResponseSchema.findOne({ country });
    if (existingFormResponse) {
      return res
        .status(200)
        .json({
          message: "El formulario no se guardo, consulte con su administrador",
        });
    }
    const newFormResponse = new FormResponseSchema({
      country: country,
      questions: questions,
    });
    const savedFormResponse = await newFormResponse.save();
    return res.status(200).json({ message: "Formulario guardado con exito!" });
  } catch (error) {
    console.error("Error al guardar el formulario:", error.message);
    return res.status(500).json({ message: "Error al guardar el formulario" });
  }
});

router.post("/form_response_eeuu", async (req, res) => {
  const { email } = req.body;
  try {
    const existingFormData = await Form.findOne({ email: email });
    if (existingFormData) {
      const responseForm = await FormResponseSchema.findById(
        "66b68c4a1a7ba88921479514"
      );
      if (responseForm) {
        const responseFormUser = await Form.findOne({ email: email });
        if (responseFormUser) {
          const user = await userSchema.findOne({ email: email });
          res.status(200).json({ responseForm, responseFormUser, user });
        }
      } else {
        res
          .status(404)
          .json({ message: "No se encontró el formulario de respuesta" });
      }
    } else {
      res
        .status(404)
        .json({ message: "No se encontró el formulario principal" });
    }
  } catch (error) {
    console.error("Error al buscar el formulario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/save_qualification", async (req, res) => {
  const { resultData, email } = req.body;
  if (!resultData || !email || !resultData.form_country || !resultData.name) {
    return res.status(400).json({
      success: false,
      message: "Datos incompletos para guardar la calificación.",
    });
  }
  try {
    const formCountry = resultData.form_country
      .toLowerCase()
      .replace(/\s+/g, "");

    const updatedQualification = await ResultData.findOneAndUpdate(
      { email: email, form_country: resultData.form_country }, // Condición de búsqueda
      {
        // Datos a actualizar
        name: resultData.name,
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
              incorrect: resultData.response[0].aff.incorrect,
            },
            hv: {
              correct: resultData.response[0].hv.correct,
              incorrect: resultData.response[0].hv.incorrect,
            },
            hd: {
              correct: resultData.response[0].hd.correct,
              incorrect: resultData.response[0].hd.incorrect,
            },
          },
        ],
        qualification: resultData.qualification,
      },
      {
        new: true, // Retorna el documento actualizado
        upsert: true, // Crea un nuevo documento si no existe uno que coincida
      }
    );

    // Elimina la entrada en Form
    //await Form.findOneAndDelete({ email: email, country: formCountry });

    res.status(200).json({
      success: true,
      message: "Resultados guardados con éxito",
      data: updatedQualification,
    });
  } catch (error) {
    console.error("Error al guardar: ", error);

    res.status(500).json({
      success: false,
      message: "Ocurrió un error al guardar los resultados",
      error: error.message,
    });
  }
});

// Codigo modificado
router.post("/complete_forms", async (req, res) => {
  const { email } = req.body;
  try {
    const forms = await ResultData.find({ email: email });
    const user = await userSchema.findOne({ email: email });
    const personReferrer = user.person_ref;
    const codeReferrer = user.code_ref;
    res.json({ forms, personReferrer, codeReferrer });
  } catch (err) {
    res.status(500).json({ error: "Error al recuperar los formularios" });
  }
});

router.post("/complete_forms_id", async (req, res) => {
  const { id } = req.body;
  try {
    const forms = await ResultData.findById(id);
    res.json({ forms });
  } catch (err) {
    res.status(500).json({ error: "Error al recuperar los formularios" });
  }
});

router.get("/hello", (req, res) => {
  res.status(200);
});

// NEW CODE INSERT
router.post("/show_schedule", async (req, res) => {
  const { date } = req.body;
  const validSchedules = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "12:00 - 1:00",
    "1:00 - 2:00",
    "2:00 - 3:00",
    "4:00 - 5:00",
  ];
  try {
    if (!date) {
      return res.status(404).json({ message: "Informacion no encontrada" });
    }
    if (date.length !== 10) {
      return res.status(404).json({ message: "El tamaño no es permitido" });
    }
    const availableSchedules = [];
    for (let schedule of validSchedules) {
      const count = await scheduleSchema.countDocuments({ date, schedule });
      if (count < 3) {
        availableSchedules.push(schedule);
      }
    }
    if (availableSchedules.length === 0) {
      return res.status(200).json({ message: "No hay horarios disponibles" });
    }
    return res.status(200).json({ availableSchedules });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
});

router.post("/save_schedule", async (req, res) => {
  const { name, email, tel, message, date, schedule } = req.body;

  if (!name || !email || !tel || !date || !schedule) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    // Verifica si el usuario ya tiene más de dos citas
    const userAppointments = await scheduleSchema.find({ email });
    if (userAppointments.length >= 2) {
      return res.status(400).json({
        message: "No puedes tener más de dos citas activas.",
        appointmentsNotValid: true,
      });
    }

    // Verifica si hay disponibilidad en la agenda
    const appointments = await scheduleSchema.find({ date, schedule });
    if (appointments.length >= 4) {
      return res.status(400).json({
        message: "La agenda está llena, prueba seleccionando otro horario.",
      });
    }

    // Guarda la nueva cita
    const newAppointment = new scheduleSchema({
      name,
      email,
      tel,
      message,
      date,
      schedule,
    });
    const savedAppointment = await newAppointment.save();

    // Envía el correo en segundo plano
    setImmediate(async () => {
      const today = new Date();
      const year = today.getFullYear();
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Appointment Confirmation</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </head>
        <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
          <div style="max-width: 680px; margin: 0 auto; padding: 30px 30px 60px; background: #f4f7ff; background-image: url(https://todovisa.vercel.app/img/background/bgeeuu.webp); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center; font-size: 14px; color: #113E5F;">
            <header style="text-align: center;">
              <table style="margin: 0 auto;">
                <tbody>
                  <tr>
                    <td>
                      <img alt="Todovisa Logo" src="https://todovisa.com/img/logo/todovisa.png" height="120px" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </header>
            <main>
              <div style="margin: 0; margin-top: 20px; padding: 60px 30px 80px; background: #ffffff; border-radius: 30px; text-align: center;">
                <div style="width: 100%; max-width: 100%; margin: 0 auto;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #1f1f1f;">Appointment Confirmation</h1>
                  <p style="margin: 0; margin-top: 17px; font-size: 16px; font-weight: 500;">Hello ${name},</p>
                  <p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
                    <p>We are pleased to inform you that your appointment has been successfully scheduled with Todovisa.</p>
                    <p>If you need to make any changes or cancel your appointment, please notify us as soon as possible by replying to this email or contacting us directly at Todovisa.</p>
                    <p>Thank you for choosing Todovisa. We look forward to assisting you.</p>
                    <p>The Todovisa Team</p>
                  </p>
                </div>
              </div>
              <p style="max-width: 400px; margin: 0 auto; margin-top: 90px; text-align: center; font-weight: 500; color: #8c8c8c;">
                Need help? Ask at
                <a href="mailto:tuvisa@todovisa.com" style="color: #113E5F; text-decoration: none;">tuvisa@todovisa.com</a>
                or visit our
                <a href="https://www.google.com/maps/dir//67+Avenida+Sur+Local+%231,+San+Salvador/@13.6970016,-89.2252546,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8f6331d77b1013e3:0xbfa86a56cf477af7!2m2!1d-89.2246802!2d13.6971043?entry=ttu" target="_blank" style="color: #113E5F; text-decoration: none;">Help Center</a>
              </p>
            </main>
            <footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #113E5F;">
              <p style="margin: 0; margin-top: 40px; font-size: 16px; font-weight: 600; color: #434343;">Todovisa S.A de C.V</p>
              <p style="margin: 0; margin-top: 8px; color: #434343;">67 Avenida Sur Local #1, San Salvador</p>
              <div style="margin: 0; margin-top: 16px;">
                <a href="https://www.facebook.com/todovisasv?mibextid=ZbWKwL&_rdr" target="_blank" style="display: inline-block;">
                  <img width="36px" alt="Facebook" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook" />
                </a>
              </div>
              <p style="margin: 0; margin-top: 16px; color: #434343;">Copyright © ${year} Todovisa. All rights reserved.</p>
            </footer>
          </div>
        </body>
      </html>
      `;

      const msg = {
        to: email,
        cc: "darwinhrndz12@gmail.com",
        from: "tuvisa@todovisa.com",
        subject: "Appointment Confirmation",
        text: "Your appointment has been confirmed. Contact us for more details.",
        html: htmlContent,
      };

      try {
        await sgMail.send(msg);
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }
    });

    return res.status(201).json({
      message: "Cita guardada exitosamente.",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
});


router.post("/show_schedule_user", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: "No hay resultados disponibles", showData: false });
  }
  try {
    const findUserSchedule = await scheduleSchema.find({ email });
    if (!findUserSchedule || findUserSchedule.length === 0) {
      return res
        .status(200)
        .json({ message: "No hay datos por mostrar", showData: false });
    }
    return res.status(200).json({ findUserSchedule, showData: true });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
});

router.post("/delete_schedule", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "No hay resultados disponibles", showData: false });
  }
  try {
    const deleteSchedule = await scheduleSchema.findByIdAndDelete(id);

    if (!deleteSchedule) {
      return res
        .status(404)
        .json({
          deleteItem: false,
          message: "No se encontró el horario para eliminar",
        });
    }
    return res.status(200).json({ deleteItem: true });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
