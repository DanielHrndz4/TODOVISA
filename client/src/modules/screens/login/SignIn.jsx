import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
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
              <img src="/img/logo/todovisa.png" alt="" className="w-[90px]" />
            </Typography>
          </Link>
          <div className="m-auto">
          </div>
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
                <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <Typography variant="h6" color="blue-gray" className="text-white">
                        Correo electrónico
                      </Typography>
                      <input className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-trasnparent" id="grid-email" type="email" placeholder="name@email.com" name="email" value={formData.email} onChange={handleChange} />
                      {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <Typography variant="h6" color="blue-gray" className="text-white">
                        Contraseña
                      </Typography>
                      <input className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-trasnparent" id="grid-password" type="password" placeholder="******" name="password" value={formData.password} onChange={handleChange} />
                      {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
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
                  <Button className="mt-6 bg-TVred shadowbtn" fullWidth>
                    Inicia sesión
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
                        Registrate
                      </a>
                    </Link>
                  </Typography>
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
