import { Card, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import handleClickPopUpSignUp from "../../components/popup/PopUpSignUp";

export default function Login() {
  const [signInText, setSignInText] = useState("Inicia sesión");
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

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
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <Typography variant="h6" color="blue-gray" className="text-white">
                        Contraseña
                      </Typography>
                      <input className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent" id="grid-password" type="password" name="password" value={formData.password} onChange={handleChange} required />
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
        <div className="w-full" style={{ backgroundImage: 'url("/img/LRP/visa3.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </main>
    </Fade>
  );
}
