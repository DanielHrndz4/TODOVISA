import { Card, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleClickPopUp from "../../components/popup/PopUp";
import MuiAlert from "@material-ui/lab/Alert";
import country from "../../../assets/data/countrys.data";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [signInText, setSignInText] = useState("Regístrate");
  const [repeatPassword, setRepeatPassword] = useState({ repeatpassword: "" });
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    country: "",
    tel: "",
  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'country') {
      // Find the selected country object based on value
      const selectedCountry = country.find(country => country.country === value);
      if (selectedCountry) {
        // Set form data with separate values for country and tel
        setFormData({
          ...formData,
          country: selectedCountry.country,
          tel: selectedCountry.pref + " ",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleChangeVerifyPassword = (e) => {
    const { name, value } = e.target;
    setRepeatPassword({
      ...repeatPassword,
      [name]: value,
    });
  };

  useEffect(() => {
    if (repeatPassword.repeatpassword !== "" || formData.password !== "") {
      if (formData.password !== repeatPassword.repeatpassword) {
        setErrorMessage("Las contraseñas deben ser idénticas.");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  }, [formData.password, repeatPassword.repeatpassword]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (formData.password !== repeatPassword.repeatpassword) {
      setErrorMessage("Las contraseñas deben ser iguales idénticas.");
      return; // Detener el envío del formulario si las contraseñas no coinciden
    }
    try {
      setIsActiveBtn(true); // Activar el estado de botón activo

      const response = await fetch(
        "https://todovisa.onrender.com/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        handleClickPopUp("Usuario registrado con éxito", "Aceptar");
        navigateTo("/signin");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message || response.statusText);
        setErrorMessage(errorData.message || "Error al registrar.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error al conectar con el servidor.");
    } finally {
      setIsActiveBtn(false); // Desactivar el estado de botón activo después de la petición
    }
  };

  useEffect(() => {
    if (isActiveBtn) {
      setSignInText("Cargando..."); // Cambiar texto de botón cuando isActiveBtn es true
    } else {
      setSignInText("Registrarse"); // Restaurar texto original del botón cuando isActiveBtn es false
    }
  }, [isActiveBtn]);

  return (
    <Fade cascade damping={0.1} className="w-full h-full">
      <main className="bg-TVBlue flex flex-row h-full w-full">
        <div className="flex flex-col py-12 w-[50%]">
          <Link to="/" className="flex justify-center items-center py-4">
            <Typography
              as="a"
              href="#"
              variant="h6"
              className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            >
              <img
                src="/img/logo/todovisa.png"
                alt=""
                className="w-[100px]"
              />
            </Typography>
          </Link>
          <div className="m-auto"></div>
          <Fade
            cascade
            damping={0.1}
            className="w-auto px-28 h-full"
          >
            <Card
              color="transparent"
              shadow={false}
              className="max-w-xl h-full mx-auto px-16 flex justify-center flex-grow gap-8"
            >
              <div className="w-full flex flex-col justify-center items-center">
                <Typography
                  variant="h2"
                  className="pb-4 pt-2 text-white text-center [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.4)] w-80 max-w-screen-lg sm:w-96"
                >
                  Regístrate
                </Typography>
                <Typography
                  color="gray"
                  className="mt-1 font-normal text-white w-80 max-w-screen-lg sm:w-96"
                >
                  ¡Encantado de conocerte! Ingresa tus datos para registrarte.
                </Typography>
                <form
                  className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
                  onSubmit={submitForm}
                >
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-white"
                      >
                        Nombres
                      </Typography>
                      <input
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                        id="grid-first-name"
                        type="text"
                        placeholder="Jane"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-white"
                      >
                        Apellidos
                      </Typography>
                      <input
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                        id="grid-last-name"
                        type="text"
                        placeholder="Doe"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-white"
                      >
                        Correo electrónico
                      </Typography>
                      <input
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                        id="grid-email"
                        type="email"
                        placeholder="name@email.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-white"
                      >
                        Contraseña
                      </Typography>
                      <div className="relative">
                        <input
                          className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                          id="grid-password"
                          type={showPassword ? "text" : "password"} // Usar el estado showPassword para cambiar dinámicamente entre text y password
                          placeholder="******"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? "Ocultar" : "Mostrar"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-white"
                      >
                        Repite la Contraseña
                      </Typography>
                      <div className="relative">
                        <input
                          className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                          id="grid-repeatpassword"
                          type={showRepeatPassword ? "text" : "password"} // Usar el estado showRepeatPassword para cambiar dinámicamente entre text y password
                          placeholder="******"
                          name="repeatpassword"
                          value={repeatPassword.repeatpassword}
                          onChange={handleChangeVerifyPassword}
                          required
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                          onClick={toggleShowRepeatPassword}
                        >
                          {showRepeatPassword ? "Ocultar" : "Mostrar"}
                        </div>
                      </div>
                    </div>
                  </div>
                  {errorMessage && (
                    <div>
                      <Alert severity="error">
                        {errorMessage}
                      </Alert>
                    </div>
                  )}
                  <div className="flex flex-wrap -mx-3 mt-4 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-white"
                      >
                        País
                      </Typography>
                      <select
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                        id="grid-country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Selecciona tu país
                        </option>
                        {country.map((country, index) => (
                          <option
                            key={index}
                            className="text-black"
                            style={{ padding: "12px" }}
                            value={country.country}
                          >
                            {country.country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-white"
                      >
                        Número de teléfono
                      </Typography>
                      <input
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                        id="grid-tel"
                        type="tel"
                        placeholder="+503 00000000"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    className="mt-6 bg-TVred shadowbtn"
                    fullWidth
                    type="submit"
                    rounded={isActiveBtn}
                  >
                    {signInText}
                  </Button>
                  <div className="w-full flex flex-row items-center my-8">
                    <hr className="flex-grow h-0.5 bg-gray-300" />
                    <h1 className="mx-4 [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] text-white font-medium text-md">
                      O regístrate con
                    </h1>
                    <hr className="flex-grow h-0.5 bg-gray-300" />
                  </div>
                  <Button
                    className="mt-6 bg-black shadowbtn text-white flex items-center justify-center"
                    fullWidth
                    rounded={isActiveBtn}
                  >
                    <FontAwesomeIcon
                      icon={faGoogle}
                      className="text-lg text-white mr-2"
                    />
                    Google
                  </Button>
                  <Typography
                    color="white"
                    className="mt-4 text-center font-medium text-md"
                  >
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      to="/signin"
                      className="font-medium text-white hover:text-TVred [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] hover:underline"
                    >
                      Inicia sesión
                    </Link>
                  </Typography>
                </form>
              </div>
            </Card>
          </Fade>
        </div>
        <div
          className="w-full"
          style={{
            backgroundImage: 'url("/img/LRP/visa3.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </main>
    </Fade>
  );
}

