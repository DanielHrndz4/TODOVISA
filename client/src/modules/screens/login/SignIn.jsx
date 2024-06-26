import { Card, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import handleClickPopUpSignUp from "../../components/popup/PopUpSignUp";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [signInText, setSignInText] = useState("Inicia sesión");
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [signInValue, setSignInValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

  const fetchDataToken = async () => {
    try {
      const response = await fetch(
        "http://localhost:3366/api/verify-token",
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        console.log(true)
        setSignInValue(true);
      } else {
        setSignInValue(false);
      }
    } catch (err) {
      setSignInValue(false);
    }
  };

  fetchDataToken()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const submitFormSignIn = async (e) => {
    e.preventDefault();

    try {
      setIsActiveBtn(true);
      const response = await fetch(
        "http://localhost:3366/api/signin",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        const { token, user } = await response.json();
        const expires = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hora from now
        Cookies.set('jwt', token, { expires: expires, secure: true, sameSite: 'Strict' });
        sessionStorage.setItem('user', JSON.stringify(user));
        navigateTo("/");
      } else if (response.status === 401) {
        handleClickPopUpSignUp("error", `<h1 class='text-black pb-4 text-2xl font-semibold'>Credenciales inválidas</h1><p class='py-2 text-justify'>Por favor, verifica tus credenciales e intenta nuevamente.</p>`, "Aceptar");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message || response.statusText);
        setErrorMessage(errorData.message || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error al conectar con el servidor.");
    } finally {
      setIsActiveBtn(false);
    }
  };

  useEffect(() => {
    setSignInText(isActiveBtn ? "Cargando..." : "Inicia sesión");
  }, [isActiveBtn]);

  const withoutSignin = () => {
    return (
      <>
        <div className="flex flex-col py-16 w-full lg:w-[50%]">
          <Link to="/" className="flex justify-center items-center py-4 lg:py-4">
            <Typography
              as="a"
              href="#"
              variant="h6"
              className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            >
              <img src="/img/logo/todovisa.png" alt="Todovisa Logo" className="w-[100px]" />
            </Typography>
          </Link>
          <Fade cascade damping={0.1} className="w-auto px-28 h-full">
            <Card
              color="transparent"
              shadow={false}
              className="max-w-xl h-full mx-auto px-16 flex justify-center flex-grow gap-8"
            >
              <div className="w-full flex flex-col justify-center items-center">
                <Typography variant="h2" className="pb-4 pt-2 text-white text-center [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.4)] w-80 max-w-screen-lg sm:w-96">
                  Iniciar Sesión
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-white w-80 max-w-screen-lg sm:w-96">
                  ¡Encantado de conocerte! Ingresa tus datos para iniciar sesión.
                </Typography>
                <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submitFormSignIn}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <Typography variant="h6" color="blue-gray" className="text-white">
                        Correo electrónico
                      </Typography>
                      <input className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent" id="grid-email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <Typography variant="h6" color="blue-gray" className="text-white">
                        Contraseña
                      </Typography>
                  <div className="relative">
                    <input
                      className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-10 leading-tight focus:outline-none focus:bg-transparent"
                      id="grid-password"
                      type={showPassword ? "text" : "password"} // Usar el estado showPassword para cambiar dinámicamente entre text y password
                      placeholder=""
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                      onClick={toggleShowPassword}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </div>
                  </div>
                  <Link to="/forgotpassword">
                    <Typography
                      color="gray"
                      className="-mt-5 text-right font-normal"
                    >
                      <a href="#" className="font-medium text-white hover:text-TVred [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] hover:underline">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </Typography>
                  </Link>
                  <Button type="submit" disabled={isActiveBtn} className="mt-6 bg-TVred shadowbtn" fullWidth>
                    {signInText}
                  </Button>
                  <div className="w-full flex flex-row items-center my-8">
                    <hr className="flex-grow h-0.5 bg-gray-300" />
                    <h1 className="mx-4 [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] text-white font-medium text-md">O inicia sesión con</h1>
                    <hr className="flex-grow h-0.5 bg-gray-300" />
                  </div>
                  <Button className="mt-6 bg-black shadowbtn text-white flex items-center justify-center" fullWidth>
                    <FontAwesomeIcon icon={faGoogle} className="text-lg text-white mr-2" />
                    Google
                  </Button>
                  <Typography
                    color="white"
                    className="mt-4 text-center font-medium text-md"
                  >
                    ¿Aún no tienes una cuenta?{" "}
                    <Link to="/signup">
                      <a href="#" className="font-medium text-white hover:text-TVred [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] hover:underline">
                        Regístrate
                      </a>
                    </Link>
                  </Typography>
                  {errorMessage && <p className="mt-4 text-red-500 text-center">{errorMessage}</p>}
                </form>
              </div>
            </Card>
          </Fade>
        </div>
        <div className="w-full hidden lg:block" style={{ backgroundImage: 'url("/img/LRP/visa3.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </>
    )
  }

  const withSignin = () => {
    return (
      <div className="h-screen flex flex-col justify-center items-center m-auto gap-4">
        <div className="bg-white py-16 px-20 rounded-lg shadow flex flex-col gap-6">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-semibold">Ya tienes una sesion iniciada</h1>
            <p className="text-xl">Cierra sesión para registrarte o iniciar sesión con otro usuario.</p>
          </div>
          <Link to='/'>
            <div className="flex flex-row">
              <Button className="bg-TVred shadowbtn py-6 px4 m-auto flex justify-center items-center">Regresar al Inicio</Button>
            </div>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <Fade cascade damping={0.1} className="w-full h-full">
      <main className="bg-TVBlue flex flex-col lg:flex-row h-full w-full">
        {signInValue ? withSignin() : withoutSignin()}
      </main>
    </Fade>
  );
}
