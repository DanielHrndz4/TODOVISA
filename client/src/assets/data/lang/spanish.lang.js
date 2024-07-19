import FRONT_URI from "../admin/uri.front";

const spanish = [
    {
        "navbar":
        {
            "about": "Sobre nosotros",
            "service": "Servicios",
            "VIPRO": "VIPRO",
            "Contact": "Contáctanos",
            "lang": {
                "name": "Idioma",
                "lang_name": {
                    "spanish": {
                        "name": "Español",
                        "img": "/img/lang/spanish.png"
                    },
                    "english": {
                        "name": "Inglés",
                        "img": "/img/lang/english.png"
                    },
                    "Portuguese": {
                        "name": "Portugués",
                        "img": "/img/lang/portuguese.png"
                    }
                }
            },
            "signin": "Iniciar sesión",
            "signup": "Registrarse"
        },
        "banner":
        {
            "title": "¡Abre las puertas al mundo!",
            "todovisa": "TODOVISA"
        },
        "about":
        {
            "title": "¡Descubre Nuevos Horizontes con TODOVISA!",
            "description": "¡Bienvenido a TODOVISA! Somos una empresa dedicada a abrir puertas a incontables oportunidades de crecimiento, aventura e innovación. En nuestra comunidad, fomentamos la creatividad y la realización de sueños.",
            "description02": "Nos esforzamos por derribar barreras y redefinir el concepto de éxito. Con pasión y compromiso, guiamos a nuestros clientes en un emocionante viaje hacia un futuro más brillante, donde cada paso te acerque a alcanzar tu máximo potencial. Descubre cómo podemos ayudarte a hacer realidad tus sueños.",
            "not_available": "No disponible",
            "see_more": "Ver más",
            "countries":
            {
                "usa": {
                    "name": "Estados Unidos",
                    "description": "País de América del Norte conocido por su diversidad cultural, economía poderosa y liderazgo global en política y tecnología.",
                    "img": "/img/carrousel/estadosunidos.jpg",
                    "uri": "/country/estadosunidos"
                },
                "canada": {
                    "name": "Canadá",
                    "description": "País en América del Norte famoso por sus paisajes naturales vastos, multiculturalismo y alta calidad de vida.",
                    "img": "/img/carrousel/canada.jpg",
                    "uri": "/country/canada"
                },
                "mexico": {
                    "name": "México",
                    "description": "País en América del Norte rico en cultura, historia, playas paradisíacas y vida urbana vibrante.",
                    "img": "/img/carrousel/mexico.jpg",
                    "uri": "/country/mexico"
                },
                "uk": {
                    "name": "Inglaterra",
                    "description": "Parte del Reino Unido famosa por su historia rica, contribuciones a la literatura y ciencia, y su monarquía.",
                    "img": "/img/carrousel/inglaterra.jpg",
                    "uri": "/country/inglaterra"
                },
                "china": {
                    "name": "China",
                    "description": "País en Asia conocido por su antigua civilización, avances tecnológicos y económicos, y maravillas como la Gran Muralla y la Ciudad Prohibida.",
                    "img": "/img/carrousel/china.jpg",
                    "uri": "/country/china"
                },
                "australia": {
                    "name": "Australia",
                    "description": "País en Oceanía famoso por su fauna única, paisajes naturales impresionantes como la Gran Barrera de Coral, y un estilo de vida relajado.",
                    "img": "/img/carrousel/australia.jpg",
                    "uri": "/country/australia"
                },
                "india": {
                    "name": "India",
                    "description": "País en Asia del Sur conocido por su diversidad cultural, riqueza histórica y espiritualidad, hogar de monumentos como el Taj Mahal.",
                    "img": "/img/carrousel/india.jpg",
                    "uri": "/country/india"
                }
            }
        },
        "VIPRO": {
            "title": "Formulario VIPRO",
            "subtitle": {
                "title": "¿Listo para dar el siguiente paso hacia tu visa?",
                "strong": "¡Estamos aquí para apoyarte en cada paso!"
            },
            "text": "Este formulario te brindará una evaluación de tu perfil para obtener tu visa. No te preocupes si no tienes toda la información ahora, estamos aquí para guiarte en todo momento. Simplemente haz clic en el botón y responde las preguntas para conocer tu preparación.",
            "strong": "Al completar el formulario, recibirás un 25% de descuento en el siguiente paso de la asesoría para la visa con",
            "button": "Completar Formulario"
        },
        "contact": {
            "title": "Contáctanos",
            "form": {
                "title": "Escribenos",
                "subtitle": "Estamos aquí para ayudarte.",
                "subtitle2": "¡Cuéntanos cómo podemos asistirte!",
                "name": "Nombre completo",
                "email": "Correo electrónico",
                "body": "Escribe tu mensaje",
                "button": "Enviar correo"
            },
            "info": {
                "location": "67 Avenida Sur Local #1, San Salvador",
                "schedule": "Lunes a Viernes: 8:30am - 6:00pm, Sabados: 9:00am - 5:00pm, Domingos: Cerrados"
            }
        },
        "footer": {
            "about": "Sobre nosotros",
            "service": "Servicios",
            "VIPRO": "VIPRO",
            "Contact": "Contáctanos",
            "copi": "© 2024 TodoVisa S.A de C.V"
        },
        "popupWithoutLogin": {
            "title": "Oops...",
            "description": "Debes iniciar sesión para ejecutar esta acción.",
            "button": "Aceptar!"
        },
        "popupWithLogin": {
            "title": "Elige una Opción:",
            "description": "Selecciona una de las opciones disponibles para continuar con el formulario. Te ofrecemos una amplia variedad de servicios adaptados a tus necesidades. Tómate tu tiempo para revisar cada opción y elige la que mejor se adapte a tus requisitos. <strong>¡Realiza tu selección y avanza al siguiente paso!</strong>",
            "button": "Continuar"
        },
        "whatsapp": {
            "status": "En linea",
            "message": "¡Hola! 👋 \nBienvenido a Todovisa. \n¿En qué podemos ayudarte hoy?",
            "placeholder": "Escribe un mensaje"
        },
        "form": {
            "return": " Regresar al inicio",
            "title": "Formulario de Solicitud de Visa",
            "description": "A continuación, encontrará el formulario de solicitud de visa que deberá completar para procesar su solicitud. Le pedimos que llene todos los campos con la información más precisa y actualizada posible. Esto nos permitirá evaluar su solicitud de manera eficiente y rápida.",
            "acept": "Acepto los ",
            "terms": "Términos y condiciones",
            "send_form": "Enviar formulario",
            "reload_form": "Reiniciar formulario",
            "terms_and_conditions": "<strong>1. Aceptación de los Términos</strong><br><br>Al acceder y utilizar este formulario de solicitud de visa, usted acepta cumplir con estos términos y condiciones. Si no está de acuerdo con alguno de estos términos, no utilice este formulario.<br><br><strong>2. Uso del Formulario</strong><br><br>Este formulario está destinado únicamente para uso personal y no comercial. Usted se compromete a proporcionar información precisa y completa al completar el formulario.<br><br><strong>3. Privacidad de la Información</strong><br><br>Toda la información proporcionada en este formulario se utilizará exclusivamente para procesar su solicitud de visa. No compartiremos su información con terceros sin su consentimiento, excepto cuando sea requerido por la ley.<br><br><strong>4. Limitación de Responsabilidad</strong><br><br>No garantizamos que el uso del formulario sea ininterrumpido o libre de errores. No seremos responsables de ningún daño que resulte del uso de este formulario, incluidos, entre otros, daños directos, indirectos, incidentales, punitivos y consecuentes.<br><br><strong>5. Modificaciones de los Términos</strong><br><br>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones se publicarán en esta página y su uso continuado del formulario constituirá la aceptación de los términos modificados.<br><br><strong>6. Ley Aplicable</strong><br><br>Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país donde se procesa la solicitud de visa, sin dar efecto a ninguna disposición sobre conflictos de leyes.<br><br><strong>7. Contacto</strong><br><br>Si tiene alguna pregunta sobre estos términos y condiciones, por favor contacte con nosotros a través de nuestros canales de atención al cliente.",
            "button": "Aceptar!",
            "button2": "Cancelar!",
            "warning": "Debes aceptar los términos y condiciones antes de guardar el formulario.",
            "alert_save": "Seguro que quieres guardar",
            "obligatory_field": "Este campo es obligatorio. Por favor, ingresa un valor.",
            "select_option": "Selecciona una opción",
            "save": "Guardando formulario",
            "wait": "Por favor espera..."
        },
        "with_session": {
            "title": "Ya tienes una sesion iniciada",
            "subtitle": "Cierra sesión para registrarte o iniciar sesión con otro usuario.",
            "button": "Regresar al inicio"
        },
        "signin": {
            "title": "Iniciar Sesión",
            "subtitle": "¡Encantado de conocerte! Ingresa tus datos para iniciar sesión.",
            "email": "Correo electrónico",
            "password": "Contraseña",
            "forgot_password": "¿Olvidaste tu contraseña?",
            "button": {
                "loading_text": "Cargando...",
                "default_text": "Inicia sesión"
            },
            "or_signin": "O inicia sesión con",
            "account": "¿Aún no tienes una cuenta?",
            "signup": "Regístrate"
        },
        "signup": {
            "title": "Regístrate",
            "subtitle": "¡Encantado de conocerte! Ingresa tus datos para registrarte.",
            "name": "Nombres",
            "last_name": "Apellidos",
            "email": "Correo electrónico",
            "password": "Contraseña",
            "repeat_password": "Repite la Contraseña",
            "button": {
                "loading_text": "Cargando...",
                "default_text": "Registrarse"
            },
            "country": "País",
            "select_country": "Selecciona tu país",
            "phone_number": "Número de teléfono",
            "or_signup": "O regístrate con",
            "account": "¿Ya tienes una cuenta?",
            "signin": "Inicia sesión"
        },
        "forgot_password": {
            "return": "Regresar al inicio de sesión",
            "title": "¿Olvidaste tu contraseña?",
            "description": "No te preocupes, nos pasa a todos. Ingrese su correo electrónico a continuación para recuperar su contraseña",
            "email": "Correo electrónico",
            "button": "Enviar al correo"
        },
        "mexico": {
            "first_section": {
                "introduccion": "Viajar a México es una experiencia enriquecedora y atractiva por diversas razones que incluyen su riqueza cultural, sus impresionantes sitios turísticos y su hospitalidad. Aquí se detallan algunos de los principales motivos por los que las personas eligen México como destino de viaje:",
                "secciones": [
                    {
                        "titulo": "Riqueza Cultural",
                        "descripcion": "México es conocido por su rica herencia cultural, la cual se refleja en sus festivales, tradiciones, gastronomía y arte.",
                        "tarjetas": [
                            {
                                "imagen": "mexico/artes_mexico.jpg",
                                "titulo": "Artes y Artesanías",
                                "descripcion": "Celebraciones como el Día de los Muertos, que ha sido reconocido por la UNESCO como Patrimonio Cultural Inmaterial de la Humanidad, ofrecen a los visitantes una visión profunda de las tradiciones mexicanas."
                            },
                            {
                                "imagen": "mexico/festividad_mexico.jpg",
                                "titulo": "Festividades",
                                "descripcion": "La comida mexicana, también declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO, es famosa en todo el mundo. Platillos como los tacos, el mole y el pozole son solo algunos ejemplos de la diversidad culinaria del país."
                            },
                            {
                                "imagen": "mexico/gastronomia_mexico.jpg",
                                "titulo": "Gastronomía",
                                "descripcion": "México cuenta con una rica tradición artesanal, incluyendo textiles, cerámica, y joyería. Las obras de artistas como Frida Kahlo y Diego Rivera también son un gran atractivo cultural."
                            }
                        ]
                    },
                    {
                        "titulo": "Lugares de Interés Histórico",
                        "descripcion": "México es hogar de numerosos sitios arqueológicos que atraen a turistas de todo el mundo.",
                        "tarjetas": [
                            {
                                "imagen": "mexico/itza_mexico.jpg",
                                "titulo": "Chichén Itzá",
                                "descripcion": "Una de las Nuevas Siete Maravillas del Mundo, esta antigua ciudad maya en Yucatán es famosa por su pirámide de Kukulkán."
                            },
                            {
                                "imagen": "mexico/teotihuacan_mexico.jpg",
                                "titulo": "Teotihuacán",
                                "descripcion": "Ubicada cerca de la Ciudad de México, esta antigua ciudad prehispánica es conocida por sus enormes pirámides del Sol y de la Luna."
                            },
                            {
                                "imagen": "mexico/tulum_mexico.jpg",
                                "titulo": "Tulum",
                                "descripcion": "Este sitio maya en la Riviera Maya combina ruinas históricas con impresionantes vistas del mar Caribe."
                            }
                        ]
                    },
                    {
                        "titulo": "Lugares Turísticos Populares",
                        "descripcion": "México ofrece una amplia variedad de destinos turísticos que satisfacen diferentes intereses, desde playas hasta ciudades coloniales.",
                        "tarjetas": [
                            {
                                "imagen": "mexico/cancun.jpg",
                                "titulo": "Cancún y Riviera Maya",
                                "descripcion": "Conocidas por sus playas de arena blanca y aguas turquesas, son destinos populares para el turismo de sol y playa."
                            },
                            {
                                "imagen": "mexico/cdmx.webp",
                                "titulo": "Ciudad de México",
                                "descripcion": "La capital del país es una metrópoli vibrante con una rica oferta cultural, incluyendo museos, teatros y una escena gastronómica de primer nivel."
                            },
                            {
                                "imagen": "mexico/vallarta.webp",
                                "titulo": "Puerto Vallarta",
                                "descripcion": "Ubicada en la costa del Pacífico, es famosa por su malecón, vida nocturna y actividades acuáticas."
                            }
                        ]
                    },
                    {
                        "titulo": "Diversidad Natural",
                        "descripcion": "México ofrece una gran diversidad de paisajes naturales, desde desiertos hasta selvas tropicales.",
                        "tarjetas": [
                            {
                                "imagen": "mexico/barrancas.jpg",
                                "titulo": "Barrancas del Cobre",
                                "descripcion": "Situadas en el estado de Chihuahua, estas impresionantes formaciones geológicas son ideales para el ecoturismo y las actividades al aire libre."
                            },
                            {
                                "imagen": "mexico/xearet.webp",
                                "titulo": "Xcaret y Xel-Há",
                                "descripcion": "Parques ecológicos en la Riviera Maya que combinan atracciones naturales con actividades culturales y recreativas."
                            },
                            {
                                "imagen": "mexico/sierra_gorda.jpeg",
                                "titulo": "Sierra Gorda de Querétaro",
                                "descripcion": "Una región con una biodiversidad excepcional, ideal para el ecoturismo y la observación de flora y fauna."
                            }
                        ]
                    },
                    {
                        "titulo": "Hospitalidad y Accesibilidad",
                        "descripcion": [
                            "México es conocido por la calidez y hospitalidad de su gente, lo que hace que los turistas se sientan bienvenidos y cómodos. Además, su proximidad a países como Estados Unidos y Canadá y una buena infraestructura turística hacen que viajar a México sea accesible y conveniente.",
                            "En resumen, la combinación de una rica herencia cultural, impresionantes sitios históricos, destinos turísticos variados, diversidad natural y hospitalidad hacen de México un destino turístico de primer nivel, atractivo para viajeros de todo el mundo."
                        ]
                    },
                    {
                        "titulo": "Requisitos de Visa 2024",
                        "descripcion": "A partir de 2024, los ciudadanos de los siguientes países de América Latina necesitan una visa para ingresar a México:",
                        "lista": [
                            "Antigua y Barbuda",
                            "Brasil",
                            "Cuba",
                            "Ecuador",
                            "El Salvador",
                            "Guatemala",
                            "Guyana",
                            "Haití",
                            "Honduras",
                            "Nicaragua",
                            "República Dominicana",
                            "San Cristóbal y Nieves",
                            "Santa Lucía",
                            "Surinam",
                            "Venezuela"
                        ]
                    }
                ]
            },
            "title": "Proceso de Solicitud de Visa",
            "sections": [
                {
                    "title": "1. Introducción al Proceso",
                    "paragraphs": [
                        "Para iniciar el proceso de solicitud de visa, es fundamental conocer los requisitos específicos del tipo de visa que se desea obtener, ya sea de turismo u otra categoría. Es importante revisar detenidamente la información correspondiente a la categoría de visa seleccionada.",
                        "Si cumple con los requisitos, y requiere una cita, puede recopilar y digitalizar todos los documentos necesarios y enviarlos a este correo electrónico. Tras recibir y verificar su documentación, nos pondremos en contacto para agendar una cita y continuar con el proceso. A continuación, encontrará un listado de todas las categorías de visa y sus requisitos específicos."
                    ]
                },
                {
                    "title": "2. Requisitos Generales para la Visa de Turismo y Tránsito",
                    "subsections": [
                        {
                            "title": "Documentación Requerida",
                            "items": [
                                {
                                    "text": "Pasaporte: Presentar en original y copia."
                                },
                                {
                                    "text": "Fotografía Reciente: Tamaño pasaporte, a color, rostro visible sin anteojos. Medidas: mínimo 32.0 mm x 26 mm, máximo 39.0 mm x 31.0 mm. Fondo blanco y tomada de frente."
                                },
                                {
                                    "text": "Formulario Migratorio: Puedes realizar tu formulario con nosotros, Formulario TODOVISA",
                                    "link": `${FRONT_URI}/#vipro`
                                },
                                {
                                    "text": "Documento de Estancia Legal (No requerido para salvadoreños): Si no es nacional del país donde solicita la visa, presente original y copia del documento que acredite su estancia legal en El Salvador."
                                },
                                {
                                    "text": "Documentación Adicional (cumplir al menos uno de los siguientes supuestos; A,B,C,D,E, F, G):",
                                    "subitems": [
                                        {
                                            "title": "A. Por Arraigo:",
                                            "options": [
                                                {
                                                    "text": "Opción 1: Escritura pública de bienes inmuebles (2 años mínimo) y constancia de empleo estable (2 años mínimo)."
                                                },
                                                {
                                                    "text": "Opción 2: Escritura pública de bienes inmuebles (2 años mínimo) y documento que acredite propiedad o participación en negocios, expedido por la autoridad competente y su registro ante el Ministerio de Hacienda con antigüedad mínima de dos años, además de la última declaración de impuestos o cuenta bancaria de la empresa con el promedio anual (2 años mínimo)."
                                                },
                                                {
                                                    "text": "Nota importante: Con opción 1 y 2 por Arraigo es necesario presentar carta extractada emitida por el Centro Nacional de Registro (CNR) con fecha actual donde establece que la propiedad está a su nombre y el tiempo que está registrada, siempre y cuando la propiedad no se encuentre hipotecada."
                                                }
                                            ]
                                        },
                                        {
                                            "title": "B. Por Solvencia Económica - Por Empleo, Cuenta Bancaria o Depósitos a Plazo:",
                                            "options": [
                                                {
                                                    "title": "Por Empleo",
                                                    "text": "Equivalente a 100 días del salario mínimo de la Ciudad de México, con un valor aproximado basado en el salario mínimo al 1 de enero de 2024: $1,461 USD."
                                                },
                                                {
                                                    "title": "Por Cuenta Bancaria",
                                                    "text": "Equivalente a 300 días del salario mínimo de la Ciudad de México, con un valor aproximado basado en el salario mínimo al 1 de enero de 2024: $4,380 USD (promedio trimestral)."
                                                },
                                                {
                                                    "title": "Opción 1: Por Empleo",
                                                    "details": [
                                                        "Presentar constancia de empleo estable (mínimo 1 año) con las siguientes características:",
                                                        "Nombre completo, cargo, antigüedad y salario neto.",
                                                        "Datos de contacto de la empresa (domicilio, teléfono, correo electrónico).",
                                                        "Copia simple del D.U.I. de la persona que firma la carta.",
                                                        "Copia del NIT de la empresa.",
                                                        "La carta deberá estar expedida en papel membretado de la empresa.",
                                                        "Las cartas de empleo son aceptadas con vencimiento de un mes a partir de la fecha que fue emitida.",
                                                        "El salario mensual debe ser mayor a $1,461.00 dólares mensuales (libre de las deducciones de ley como son; Renta, AFP y ISSS).",
                                                        "Debe agregar la cuenta bancaria donde le depositan los pagos de su salario (Las descripciones de la carta o constancia del banco se encuentran en la Opción 2: Cuenta Bancaria)"
                                                    ],
                                                    "note": "Montos a Evaluar 2024 Por Empleo: Debe tener un sueldo trimestral igual o mayor al equivalente a 100 días del salario mínimo de la Ciudad de México, con un valor aproximado basado en el salario mínimo al 1 de enero de 2024: $1,461 USD."
                                                },
                                                {
                                                    "title": "Opción 2: Cuenta Bancaria",
                                                    "details": [
                                                        "Si es por cuenta bancaria personal deberá presentar una constancia expedida por su banco, con las siguientes características:",
                                                        "Nombre completo del titular de la cuenta.",
                                                        "Número de la(s) cuenta(s) bancaria(s).",
                                                        "Fecha de apertura de la(s) cuenta(s).",
                                                        "Nombre, cargo y firma del ejecutivo bancario que firma la carta.",
                                                        "Sello oficial del banco.",
                                                        "La constancia deberá expedirse en papel membretado del banco."
                                                    ],
                                                    "note": "Montos a Evaluar 2024 Por Cuenta Bancaria: La cuenta bancaria debe mantener un saldo promedio trimestral igual o mayor al equivalente a 300 días del salario mínimo de la Ciudad de México, con un valor aproximado basado en el salario mínimo al 1 de enero de 2024: $4,380 USD (promedio trimestral)."
                                                },
                                                {
                                                    "title": "Opción 3: Depósitos a Plazo o Títulos Valores y Acciones.",
                                                    "details": [
                                                        "Comprobante de inversiones son certificados por depósitos a plazo o títulos valores y acciones, si es un Certificado a plazo fijo debe presentar una carta original emitida por el Banco con las siguientes características:",
                                                        "Fecha de apertura y vencimiento.",
                                                        "Nombre del titular.",
                                                        "Monto, plazo.",
                                                        "Número de cuenta.",
                                                        "Impresión de la cuenta de los últimos 6 meses.",
                                                        "Copia del certificado del Depósitos a Plazo con una vigencia de 3 meses a partir de $4,380.00 en adelante junto o cuentas bancarias (saldo promedio mensual equivalente a 300 días del salario mínimo, últimos 3 meses)."
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "title": "C. Estudiantes con Empleo:",
                                            "details": [
                                                "Constancia de estudios y empleo, pensión o beca.",
                                                "Ingresos equivalentes a 60 días del salario mínimo de la Ciudad de México, últimos 3 meses."
                                            ]
                                        },
                                        {
                                            "title": "D. Por Invitación de una Organización o de una Institución Pública o Privada:",
                                            "details": [
                                                "IMPORTANTE: Las cartas de invitación solo son válidas si provienen de organizaciones o instituciones públicas o privadas. No se aceptan invitaciones de particulares.",
                                                "Carta Responsiva debe contener:",
                                                "Nombre completo del solicitante y su nacionalidad.",
                                                "Denominación o razón social de la organización.",
                                                "Registro oficial o patente.",
                                                "Objeto de la organización o institución privada o pública.",
                                                "Domicilio completo y datos de contacto de la organización o institución.",
                                                "Información detallada sobre la actividad que realizará el solicitante o el proyecto en el que participará.",
                                                "Denominación o razón social de la organización.",
                                                "Duración estimada o fecha aproximada de terminación de la actividad que realizará el solicitante.",
                                                "Compromiso de hacerse cargo de la manutención total de la persona invitada durante su estancia en México y de su retorno a su país de origen o de residencia.",
                                                "Copia de identificación oficial con firma y fotografía de quien suscribe la carta."
                                            ]
                                        },
                                        {
                                            "title": "E. Personas Adultas Mayores de 65 años:",
                                            "details": ["Si el solicitante de visa de turista que sea mayor de 65 años, y que acredite fehacientemente, a juicio de la autoridad migratoria, tener como propósito visitar territorio nacional con fines turísticos, no será necesario acreditar la solvencia económica."]
                                        },
                                        {
                                            "title": "F. Viajero Frecuente:",
                                            "details": ["Mostrar copia de las páginas del pasaporte con tres visas vigentes o sellos de control migratorio de países no limítrofes, visitados en los últimos 12 meses."]
                                        },
                                        {
                                            "title": "Nota Adicional:",
                                            "text": "Menores de Edad: Se requiere la presencia de los padres con documentos de identificación y que acrediten vínculo familiar con documento oficial."
                                        },
                                        {
                                            "title": "G. Estudiantes – Residencia Temporal:",
                                            "details": [
                                                "Si su visa de estudiante es aprobada, el costo del trámite será de $53.00 dólares, los cuales deberán ser pagados en efectivo con el monto exacto el día de su cita.",
                                                "Original de Carta de Aceptación de la Institución Educativa perteneciente al Sistema Educativo Nacional de México en la que pretende estudiar, en la que se especifique:",
                                                "1. Nombre completo del solicitante",
                                                "2. Nivel, grado y área de estudio que el solicitante pretenda realizar",
                                                "3. Nombre del curso en el que ha sido aceptado",
                                                "4. Fecha de inicio y terminación del curso",
                                                "5. Costo de matrícula para el curso, y",
                                                "6. Datos de identificación de la institución educativa (credencial de quien firma la carta de aceptación, e.g. INE, Pasaporte o RFC)"
                                            ],
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "canada": {
            "first_section": {
                "introduccion": "Canadá es conocido por su alta calidad de vida, su sistema de salud universal y su paisaje natural impresionante. Ofrece oportunidades únicas para estudiantes, profesionales y turistas.",
                "secciones": [
                    {
                        "titulo": "Oportunidades de Estudio",
                        "descripcion": "Canadá es un destino muy popular para estudiantes internacionales debido a sus instituciones educativas de alta calidad y a su entorno multicultural.",
                        "tarjetas": [
                            {
                                "imagen": "canada/universidad_canada.jpg",
                                "titulo": "Universidades de Prestigio",
                                "descripcion": "Canadá alberga algunas de las universidades más prestigiosas del mundo, ofreciendo una variedad de programas académicos."
                            },
                            {
                                "imagen": "canada/becas_canada.jpg",
                                "titulo": "Becas y Ayudas",
                                "descripcion": "Existen numerosas becas y ayudas para estudiantes internacionales, facilitando el acceso a la educación superior."
                            },
                            {
                                "imagen": "canada/estudiantil_canada.jpeg",
                                "titulo": "Vida Estudiantil",
                                "descripcion": "La vida estudiantil en Canadá es vibrante y diversa, con numerosas actividades extracurriculares y oportunidades de socialización."
                            }
                        ]
                    },
                    {
                        "titulo": "Calidad de Vida y Seguridad",
                        "descripcion": "Canadá es conocido por su alta calidad de vida, con un sistema de salud robusto y un entorno seguro para sus residentes.",
                        "tarjetas": [
                            {
                                "imagen": "canada/salud_canada.jpg",
                                "titulo": "Sistema de Salud",
                                "descripcion": "El sistema de salud canadiense es uno de los mejores del mundo, proporcionando acceso a atención médica universal."
                            },
                            {
                                "imagen": "canada/seguridad_canada.jpg",
                                "titulo": "Seguridad",
                                "descripcion": "Canadá es uno de los países más seguros del mundo, con bajos índices de criminalidad y un entorno pacífico."
                            },
                            {
                                "imagen": "canada/costo_canada.jpg",
                                "titulo": "Costo de Vida",
                                "descripcion": "Aunque el costo de vida puede variar, Canadá ofrece un buen equilibrio entre calidad de vida y gasto económico."
                            }
                        ]
                    },
                    {
                        "titulo": "Belleza Natural y Turismo",
                        "descripcion": "Canadá es famoso por su belleza natural, desde las Montañas Rocosas hasta los Grandes Lagos y los parques nacionales.",
                        "tarjetas": [
                            {
                                "imagen": "canada/rocosas_canada.jpg",
                                "titulo": "Montañas Rocosas",
                                "descripcion": "Un destino popular para el senderismo, el esquí y otras actividades al aire libre."
                            },
                            {
                                "imagen": "canada/cataratas_canada.jpg",
                                "titulo": "Cataratas del Niágara",
                                "descripcion": "Una de las maravillas naturales más famosas del mundo, conocida por su impresionante caída de agua."
                            },
                            {
                                "imagen": "canada/parque_canada.jpg",
                                "titulo": "Parques Nacionales",
                                "descripcion": "Canadá cuenta con numerosos parques nacionales que ofrecen vistas impresionantes y actividades recreativas."
                            }
                        ]
                    },
                    {
                        "titulo": "Oportunidades de Trabajo e Inmigración",
                        "descripcion": "Canadá ofrece múltiples oportunidades de empleo e inmigración para profesionales calificados y empresarios.",
                        "tarjetas": [
                            {
                                "imagen": "canada/laboral_canada.jpeg",
                                "titulo": "Oportunidades Laborales",
                                "descripcion": "El mercado laboral canadiense es dinámico y en crecimiento, con una demanda significativa en diversos sectores."
                            },
                            {
                                "imagen": "canada/inmigracion_canada.png",
                                "titulo": "Programas de Inmigración",
                                "descripcion": "Canadá tiene varios programas de inmigración que facilitan la residencia permanente para trabajadores calificados y emprendedores."
                            },
                            {
                                "imagen": "canada/emprendedores_canada.png",
                                "titulo": "Visa para Emprendedores",
                                "descripcion": "El programa de visa para emprendedores apoya a aquellos que desean iniciar un negocio en Canadá."
                            }
                        ]
                    },
                    {
                        "titulo": "Diversidad y Multiculturalismo",
                        "descripcion": [
                            "Canadá es conocido por su política de multiculturalismo y su compromiso con la diversidad.",
                            "El país celebra una amplia variedad de culturas y etnias, lo que enriquece su sociedad y fomenta la inclusión."
                        ]
                    },
                    {
                        "titulo": "Requisitos de Visa 2024",
                        "descripcion": "Antes de viajar a Canadá, asegúrate de cumplir con todos los requisitos de visa y documentación necesaria para tu viaje.",
                        "lista": [
                            "Pasaporte válido por al menos 6 meses.",
                            "Prueba de fondos suficientes para tu estadía.",
                            "Carta de invitación si aplica.",
                            "Formulario de solicitud de visa completo.",
                            "Fotografías recientes."
                        ]
                    },
                    {
                        "titulo": "Necesidad de Obtener una Visa",
                        "descripcion": [
                            "Para ingresar a Canadá, los ciudadanos de la mayoría de los países latinoamericanos deben obtener una visa. Este proceso implica:",
                            "• Solicitud y Documentación: Los solicitantes deben presentar una solicitud formal, demostrar su intención de regresar a su país de origen y proporcionar documentación de respaldo.",
                            "• Entrevista Consular: En algunos casos, se requiere una entrevista en el consulado canadiense.",
                            "• Pruebas de Fondos: Los solicitantes deben demostrar que tienen fondos suficientes para cubrir su estancia en Canadá."
                        ],
                        "subsecciones": [
                            {
                                "titulo": "Tipos de Visa Canadiense",
                                "items": [
                                    { "text": "1. Visa de Visitante (Temporary Resident Visa - TRV)" },
                                    { "text": "2. Visa de Estudio" },
                                    { "text": "3. Visa de Trabajo" },
                                    { "text": "4. Super Visa para Padres y Abuelos" },
                                    { "text": "5. Permiso de Residencia Permanente" }
                                ]
                            },
                            {
                                "titulo": "Requisitos Generales",
                                "items": [
                                    {
                                        "text": "1. Formulario de Solicitud Completo: Dependiendo del tipo de visa, se debe completar el formulario correspondiente.", "subitems": [
                                            { "title": "Para una visa de visitante:", "text": "Formulario IMM 5257." },
                                            { "title": "Para una visa de estudio:", "text": "Formulario IMM 1294." },
                                            { "title": "Para una visa de trabajo:", "text": "Formulario IMM 1295." }
                                        ]
                                    },
                                    { "text": "2. Pasaporte Válido: Debe tener una validez que cubra el periodo de estancia en Canadá." },
                                    { "text": "3. Fotografías: Dos fotos recientes según las especificaciones proporcionadas por el gobierno canadiense." },
                                    { "text": "4. Prueba de Fondos: Demostrar que se tienen suficientes recursos financieros para cubrir la estancia en Canadá." },
                                    { "text": "5. Carta de Invitación: Si aplica, especialmente para visas de visitante." },
                                    { "text": "6. Prueba de Vínculos al País de Origen: Documentación que demuestre la intención de regresar al país de origen, como empleo, propiedades, o lazos familiares." },
                                    { "text": "7. Historial de Viajes: Detalles de viajes anteriores, si los hay." },
                                    { "text": "8. Pago de Tasas de Solicitud: Varía según el tipo de visa, generalmente entre $100 a $150 CAD para visas de visitante." }
                                ]
                            },
                            {
                                "titulo": "Procedimiento de Solicitud",
                                "items": [
                                    { "text": "1. Reunir la Documentación Necesaria: Asegurarse de tener todos los documentos necesarios en orden." },
                                    { "text": "2. Completar el Formulario de Solicitud: Dependiendo del tipo de visa, completar el formulario correspondiente." },
                                    { "text": "3. Pago de Tasas: Realizar el pago de la tasa de solicitud y obtener el recibo." },
                                    { "text": "4. Envío de la Solicitud: Enviar la solicitud en línea a través del sitio web del gobierno canadiense o en papel a un Centro de Solicitud de Visas (VAC)." },
                                    { "text": "5. Biometría: En algunos casos, se requerirá proporcionar datos biométricos (huellas dactilares y foto)." },
                                    { "text": "6. Entrevista (si aplica): Algunas solicitudes pueden requerir una entrevista en el consulado canadiense." },
                                    { "text": "7. Esperar la Decisión: El tiempo de procesamiento varía según el tipo de visa y la oficina de visados, pero generalmente toma entre dos semanas a varios meses." },
                                    { "text": "8. Recibir la Visa: Si la solicitud es aprobada, se emitirá una visa en el pasaporte del solicitante." }
                                ]
                            },
                            {
                                "titulo": "Consejos Adicionales",
                                "items": [
                                    { "text": "• Documentación Adicional: Dependiendo del tipo de visa y la situación personal, pueden requerirse documentos adicionales, como certificados médicos, cartas de aceptación de instituciones educativas, o ofertas de empleo." },
                                    { "text": "• Consultas: Es recomendable consultar con un abogado de inmigración o un consultor de inmigración autorizado para asegurar que la solicitud se maneje correctamente." },
                                    { "text": "• Verificar Requisitos Específicos: Los requisitos pueden variar ligeramente dependiendo del país de origen y las circunstancias personales." }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        "australia": {
            "first_section": {
                "introduccion": "La mayoría de los viajeros necesitan una visa para ingresar a Australia. A continuación se detallan los requisitos de visa para diferentes regiones del mundo.",
                "secciones": [
                    {
                        "titulo": "América del Norte",
                        "descripcion": "Los viajeros de América del Norte requieren una visa para ingresar a Australia.",
                        "lista": [
                            "Canadá: Se requiere visa (Autorización Electrónica de Viaje - ETA)",
                            "Estados Unidos: Se requiere visa (Autorización Electrónica de Viaje - ETA)",
                            "México: Se requiere visa"
                        ],
                        isSingleColumn: true
                    },
                    {
                        "titulo": "América Central y el Caribe",
                        "descripcion": "Todos los países de América Central y el Caribe requieren una visa para ingresar a Australia.",
                        "lista": [
                            "Antigua y Barbuda",
                            "Bahamas",
                            "Barbados",
                            "Belice",
                            "Costa Rica",
                            "Cuba",
                            "Dominica",
                            "República Dominicana",
                            "El Salvador",
                            "Granada",
                            "Guatemala",
                            "Haití",
                            "Honduras",
                            "Jamaica",
                            "Nicaragua",
                            "Panamá",
                            "San Cristóbal y Nieves",
                            "Santa Lucía",
                            "San Vicente y las Granadinas",
                            "Trinidad y Tobago"
                        ]
                    },
                    {
                        "titulo": "América del Sur",
                        "descripcion": "Todos los países de América del Sur requieren una visa para ingresar a Australia.",
                        "lista": [
                            "Argentina",
                            "Bolivia",
                            "Brasil",
                            "Chile",
                            "Colombia",
                            "Ecuador",
                            "Guyana",
                            "Paraguay",
                            "Perú",
                            "Surinam",
                            "Uruguay",
                            "Venezuela"
                        ]
                    },
                    {
                        "titulo": "Europa",
                        "descripcion": "Los ciudadanos de muchos países europeos pueden solicitar la visa eVisitor para ingresar a Australia.",
                        "lista": [
                            "Andorra",
                            "Austria",
                            "Bélgica",
                            "Bulgaria",
                            "Croacia",
                            "Chipre",
                            "República Checa",
                            "Dinamarca",
                            "Estonia",
                            "Finlandia",
                            "Francia",
                            "Alemania",
                            "Grecia",
                            "Hungría",
                            "Islandia",
                            "Irlanda",
                            "Italia",
                            "Letonia",
                            "Liechtenstein",
                            "Lituania",
                            "Luxemburgo",
                            "Malta",
                            "Mónaco",
                            "Países Bajos",
                            "Noruega",
                            "Polonia",
                            "Portugal",
                            "Rumanía",
                            "San Marino",
                            "Eslovaquia",
                            "Eslovenia",
                            "España",
                            "Suecia",
                            "Suiza",
                            "Reino Unido (Ciudadano Británico)",
                            "Ciudad del Vaticano"
                        ]
                    },
                    {
                        "titulo": "Oceanía",
                        "descripcion": "La mayoría de los países en Oceanía requieren una visa, excepto los ciudadanos de Nueva Zelanda.",
                        "lista": [
                            "Fiyi",
                            "Kiribati",
                            "Islas Marshall",
                            "Micronesia",
                            "Nauru",
                            "Palaos",
                            "Papúa Nueva Guinea",
                            "Samoa",
                            "Islas Salomón",
                            "Tonga",
                            "Tuvalu",
                            "Vanuatu"
                        ]
                    },
                    {
                        "titulo": "Medio Oriente",
                        "descripcion": "Todos los países del Medio Oriente requieren una visa para ingresar a Australia.",
                        "lista": [
                            "Bahréin",
                            "Irán",
                            "Irak",
                            "Israel",
                            "Jordania",
                            "Kuwait",
                            "Líbano",
                            "Omán",
                            "Catar",
                            "Arabia Saudita",
                            "Siria",
                            "Emiratos Árabes Unidos",
                            "Yemen"
                        ]
                    },
                ],
                "resumen": "Para obtener más información detallada y solicitar una visa, los viajeros deben consultar el sitio web del Departamento de Asuntos Internos del Gobierno de Australia. Este sitio proporciona detalles completos sobre los tipos de visas disponibles, los criterios de elegibilidad y el proceso de solicitud"
            }
        },
        "englad": {
            "first_section": {
                "introduccion": "A continuación se presenta un listado de los países cuyos ciudadanos requieren visa para ingresar al Reino Unido:",
                "secciones": [
                    {
                        "titulo": "África",
                        "descripcion": "Todos los países en África requieren una visa para ingresar al Reino Unido.",
                        "lista": [
                            "Argelia",
                            "Angola",
                            "Benín",
                            "Botsuana",
                            "Burkina Faso",
                            "Burundi",
                            "Cabo Verde",
                            "Camerún",
                            "República Centroafricana",
                            "Chad",
                            "Comoras",
                            "Congo (República)",
                            "Congo (República Democrática)",
                            "Costa de Marfil",
                            "Djibouti",
                            "Egipto",
                            "Guinea Ecuatorial",
                            "Eritrea",
                            "Etiopía",
                            "Gabón",
                            "Gambia",
                            "Ghana",
                            "Guinea",
                            "Guinea-Bisáu",
                            "Kenia",
                            "Lesoto",
                            "Liberia",
                            "Libia",
                            "Madagascar",
                            "Malaui",
                            "Malí",
                            "Mauritania",
                            "Mozambique",
                            "Namibia",
                            "Níger",
                            "Nigeria",
                            "Ruanda",
                            "Santo Tomé y Príncipe",
                            "Senegal",
                            "Sierra Leona",
                            "Somalia",
                            "Sudán",
                            "Sudán del Sur",
                            "Swazilandia",
                            "Tanzania",
                            "Togo",
                            "Túnez",
                            "Uganda",
                            "Zambia",
                            "Zimbabue"
                        ]
                    },
                    {
                        "titulo": "Asia",
                        "descripcion": "Todos los países en Asia requieren una visa para ingresar al Reino Unido.",
                        "lista": [
                            "Afganistán",
                            "Armenia",
                            "Azerbaiyán",
                            "Bahréin",
                            "Bangladesh",
                            "Bután",
                            "Brunei",
                            "Camboya",
                            "China",
                            "Georgia",
                            "India",
                            "Indonesia",
                            "Irán",
                            "Irak",
                            "Jordania",
                            "Kazajistán",
                            "Corea del Norte",
                            "Kuwait",
                            "Kirguistán",
                            "Laos",
                            "Líbano",
                            "Malasia",
                            "Maldivas",
                            "Mongolia",
                            "Myanmar (Birmania)",
                            "Nepal",
                            "Omán",
                            "Pakistán",
                            "Palestina",
                            "Filipinas",
                            "Catar",
                            "Rusia",
                            "Arabia Saudita",
                            "Singapur",
                            "Sri Lanka",
                            "Siria",
                            "Tayikistán",
                            "Tailandia",
                            "Timor Oriental",
                            "Turquía",
                            "Turkmenistán",
                            "Emiratos Árabes Unidos",
                            "Uzbekistán",
                            "Vietnam",
                            "Yemen"
                        ]
                    },
                    {
                        "titulo": "Europa",
                        "descripcion": "Algunos países en Europa requieren una visa para ingresar al Reino Unido.",
                        "lista": [
                            "Albania",
                            "Bielorrusia",
                            "Bosnia y Herzegovina",
                            "Kosovo",
                            "Macedonia del Norte",
                            "Moldavia",
                            "Montenegro",
                            "Serbia",
                            "Ucrania"
                        ]
                    },
                    {
                        "titulo": "América",
                        "descripcion": "Todos los países en América requieren una visa para ingresar al Reino Unido.",
                        "lista": [
                            "Antigua y Barbuda",
                            "Argentina",
                            "Bahamas",
                            "Barbados",
                            "Belice",
                            "Bolivia",
                            "Brasil",
                            "Chile",
                            "Colombia",
                            "Costa Rica",
                            "Cuba",
                            "Dominica",
                            "Ecuador",
                            "El Salvador",
                            "Granada",
                            "Guatemala",
                            "Guyana",
                            "Haití",
                            "Honduras",
                            "Jamaica",
                            "México",
                            "Nicaragua",
                            "Panamá",
                            "Paraguay",
                            "Perú",
                            "República Dominicana",
                            "San Cristóbal y Nieves",
                            "Santa Lucía",
                            "San Vicente y las Granadinas",
                            "Surinam",
                            "Trinidad y Tobago",
                            "Uruguay",
                            "Venezuela"
                        ]
                    },
                    {
                        "titulo": "Oceanía",
                        "descripcion": "La mayoría de los países en Oceanía requieren una visa, excepto los ciudadanos de Australia y Nueva Zelanda.",
                        "lista": [
                            "Fiyi",
                            "Kiribati",
                            "Islas Marshall",
                            "Micronesia",
                            "Nauru",
                            "Palau",
                            "Papúa Nueva Guinea",
                            "Samoa",
                            "Islas Salomón",
                            "Tonga",
                            "Tuvalu",
                            "Vanuatu"
                        ]
                    }
                ],
                "resumen": "Para obtener más información detallada y solicitar una visa, los viajeros deben consultar el sitio web del Gobierno del Reino Unido. Este sitio proporciona detalles completos sobre los tipos de visas disponibles, los criterios de elegibilidad y el proceso de solicitud."
            },
            "second_section": {
                "titulo": "Requisitos Generales",
                "descripcion": [
                    "1. Pasaporte Válido: Tu pasaporte debe ser válido durante todo el período de tu estancia en el Reino Unido.",
                    "2. Formulario de Solicitud Completo: Debes completar el formulario de solicitud en línea disponible en el sitio web del gobierno del Reino Unido.",
                    "3. Fotografía Reciente: Una fotografía reciente en formato de pasaporte.",
                    "4. Prueba de Fondos: Debes demostrar que tienes suficientes fondos para mantenerte durante tu estancia en el Reino Unido sin necesidad de trabajar o acceder a fondos públicos. Esto puede incluir extractos bancarios, recibos de sueldo o pruebas de ingresos de otras fuentes.",
                    "5. Prueba de Propósito de Visita: Documentación que respalde el propósito de tu visita, como una carta de invitación, itinerario de viaje, reservas de hotel, etc.",
                    "6. Prueba de Vínculos con el País de Residencia: Para demostrar que tienes razones para regresar a tu país de origen después de tu visita. Esto puede incluir pruebas de empleo, estudios, o lazos familiares.",
                    "7. Prueba de Residencia y Estado Migratorio en el País de Origen: Si no eres ciudadano del país desde el que estás aplicando, necesitas demostrar tu estatus migratorio en dicho país."
                ]
            },
            "third_section": {
                "titulo": "Procedimiento de Solicitud",
                "descripcion": [
                    "Completar el Formulario de Solicitud en Línea: Accede al sistema de solicitud de visas del Reino Unido y completa el formulario correspondiente.",
                    "Pagar la Tarifa de Solicitud: La tarifa de la visa de visitante varía dependiendo de la duración de la estancia. Actualmente, la tarifa estándar para una visa de turista de seis meses es de £100 (aproximadamente $130 USD).",
                    "Reservar una Cita en el Centro de Solicitud de Visas: Una vez completado el formulario y pagada la tarifa, debes reservar una cita en el centro de solicitud de visas más cercano para proporcionar tus datos biométricos (huellas dactilares y fotografía).",
                    "Presentar Documentos de Apoyo: En tu cita, debes llevar todos los documentos de apoyo requeridos, incluyendo tu pasaporte, la confirmación de tu cita, y cualquier otra documentación solicitada.",
                    "Entrevista (si aplica): En algunos casos, puede ser necesaria una entrevista para evaluar tu solicitud.",
                    "Esperar la Decisión: Una vez que has presentado tu solicitud y todos los documentos de apoyo, deberás esperar la decisión. Los tiempos de procesamiento pueden variar, pero generalmente toma unas pocas semanas."
                ]
            },
            "fourth_section": {
                "titulo": "Información Adicional",
                "descripcion": [
                    "Evidencia Adicional: Dependiendo de tu situación personal y la naturaleza de tu visita, es posible que necesites proporcionar evidencia adicional.",
                    "Visa para Visitar a Familiares o Amigos: Si estás visitando a familiares o amigos, una carta de invitación puede ser útil.",
                    "Viajes de Negocios: Para viajes de negocios, deberás proporcionar una carta de tu empleador y una invitación de la empresa en el Reino Unido."
                ]
            },
            "footer": {
                "fuentes": [
                    "GOV.UK - Apply for a UK visa",
                    "GOV.UK - Standard Visitor visa"
                ]
            }
        },
        "india": {
            "first_section": {
                "introduccion": "Para ingresar a la India, la mayoría de los visitantes necesitan obtener una visa, ya sea antes de su llegada o a través de un sistema de visa electrónica (e-Visa). Los ciudadanos de todos los países, excepto Bután y Nepal, necesitan una visa para ingresar a la India. Aquí tienes un resumen de los requisitos según el tipo de visa y el país de origen:",
                "secciones": [
                    {
                        "titulo": "Visa a la llegada o e-Visa",
                        "descripcion": "India ofrece visas electrónicas (e-Visas) para ciudadanos de muchos países. Los visitantes pueden solicitar una e-Visa en línea antes de su viaje y recibir la aprobación por correo electrónico, lo cual les permite ingresar al país a través de ciertos aeropuertos y puertos marítimos."
                    },
                    {
                        "titulo": "Visa previa a la llegada",
                        "descripcion": "Algunos visitantes deben obtener una visa antes de su llegada, solicitándola en una misión diplomática india en su país de origen."
                    },
                    {
                        "titulo": "Exenciones de visa",
                        "descripcion": "Bután y Nepal: Los ciudadanos de estos dos países no necesitan visa para ingresar a la India. Además, pueden vivir y trabajar en India sin límite de tiempo.\nMaldivas: Los ciudadanos de las Maldivas no necesitan visa para visitas de hasta 90 días."
                    }
                ]
            },
            "second_section": {
                "titulo": "Procedimiento para la Solicitud de Visa a India",
                "descripcion": [
                    "Determinar el Tipo de Visa: Dependiendo del propósito de la visita (turismo, negocios, estudios, etc.), es importante seleccionar el tipo adecuado de visa. Las más comunes son la visa de turista, la visa de negocios y la visa de estudiante.",
                    "Solicitud de Visa Electrónica (e-Visa):",
                    "E-Visa: Para estancias cortas (turismo, negocios o tratamiento médico), la e-Visa es una opción conveniente. Se puede solicitar en línea sin necesidad de visitar una embajada o consulado.",
                    "Visitar el sitio oficial de e-Visa: Indian e-Visa.",
                    "Completar el formulario en línea con información personal, de pasaporte y del viaje.",
                    "Subir una fotografía reciente y una copia escaneada del pasaporte (página con datos personales).",
                    "Pagar la tarifa de la visa en línea mediante tarjeta de crédito/débito.",
                    "Visa Regular a través de la Embajada:",
                    "Si la e-Visa no es adecuada para el propósito del viaje o la duración de la estancia, se debe solicitar una visa regular en la embajada o consulado indio.",
                    "Proceso:",
                    "Visitar el sitio web de la embajada india más cercana para obtener el formulario de solicitud y lista de requisitos: Embajada de India en México (acredita a El Salvador).",
                    "Completar el formulario de solicitud.",
                    "Reunir los documentos necesarios (ver lista de requisitos a continuación).",
                    "Presentar la solicitud y pagar la tarifa correspondiente en la embajada o consulado."
                ]
            },
            "third_section": {
                "titulo": "Requisitos para la Solicitud de Visa",
                "descripcion": [
                    "Formulario de Solicitud: Completar el formulario de solicitud en línea o físico según el tipo de visa (e-Visa o visa regular).",
                    "Pasaporte: Pasaporte válido con al menos seis meses de validez restante desde la fecha de llegada a India y al menos dos páginas en blanco.",
                    "Fotografía Reciente: Fotografía reciente con fondo blanco.",
                    "Prueba de Viaje: Copia del boleto de avión de ida y vuelta o itinerario de viaje.",
                    "Comprobante de Recursos Financieros: Extractos bancarios recientes o cartas de patrocinio.",
                    "Documentos Adicionales: Dependiendo del tipo de visa, pueden ser necesarios documentos adicionales como cartas de invitación (para visa de negocios), comprobante de inscripción (para visa de estudiante), etc.",
                    "Pago de la Tarifa: Pagar la tarifa de la visa, que varía según el tipo de visa y la duración de la estancia."
                ]
            },
            "fourth_section": {
                "titulo": "Consejos Adicionales",
                "descripcion": [
                    "Tiempo de Procesamiento: La e-Visa generalmente se procesa en unos pocos días, mientras que las visas regulares pueden tardar más, por lo que se recomienda aplicar con suficiente anticipación.",
                    "Verificar Información: Consultar la página oficial de la embajada o el consulado para obtener la información más actualizada y detallada sobre el proceso y los requisitos."
                ]
            },
            "footer": {
                "fuentes": [
                    "Para más detalles y para iniciar el proceso de solicitud, puedes visitar el sitio oficial de e-Visa de India y el sitio web de la embajada de India acreditada a El Salvador.",
                    {
                        "texto": "Embajada de la India",
                        "url": "https://www.indiainmexico.gov.in/"
                    }
                ]
            }
        },
        "guide_section": {
            "header": "Consigue nuestra guía completa para obtener tu visa americana",
            "description": "Bienvenidos a un viaje de descubrimiento personal y oportunidad transformadora. Esta guía no es solo un manual, sino un compañero estratégico diseñado para todos aquellos que sueñan con cruzar las fronteras hacia nuevas posibilidades en los Estados Unidos. Aquí aprenderás cómo tu historia, habilidades y trayectoria pueden convertirse en tus mayores activos en este viaje. Con un enfoque personalizado y ejemplos prácticos, esta guía te ofrece el conocimiento y las herramientas necesarias para maximizar tus posibilidades de éxito al presentar tu caso ante los consulados americanos. Prepárate para empoderarte con información que te permitirá tomar decisiones informadas y estratégicas, y comienza tu camino hacia un futuro más brillante.",
            "popupWithoutLogin": {
                "title": "Acceso Denegado",
                "description": "Para descargar o ver el PDF, necesitas estar autenticado.",
                "button": "Aceptar"
            },
            "downloadPdfButton": "Descargar PDF",
            "viewPdfButton": "Ver PDF",
            "pdfPath": "./A9bC3dE4FgH5IjK6LmN7oP8QrS9TuV0WxY1Za2Bc3Dd4Ef5Gh6Ij7Kl8Mn9Op0Qr1St2Uv3Wx4Yz5A6B7C8D9E0F1G2H3I4J5K6L.pdf"
        },
        "guide": {
            "button": "Adquirir guia completa"
        }
    }
];

export default spanish