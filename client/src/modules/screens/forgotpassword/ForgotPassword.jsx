import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
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
        <div className="flex flex-col py-44 w-[50%]">
          <Link to="/" className="flex justify-center items-center py-4">
            <Typography
              as="a"
              href="#"
              variant="h6"
              className="mr-4 cursor-pointer pb-10 lg:ml-2"
            >
              <img src="/img/logo/todovisa.png" alt="" className="w-[115px]" />
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

              <div className="w-full flex flex-col">
                <Link to="/signin">
                  <Typography color="black" className="mb-1 font-normal w-full mx-1 text-white text-xl [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.4)]">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Regresar al inicio de sesión
                  </Typography>
                </Link>
                <Typography variant="h3" color="white" className="my-2 text-center [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.4)]">
                  ¿Olvidaste tu contraseña?
                </Typography>
                <Typography color="white" className="mt-1 font-normal text-justify">
                  No te preocupes, nos pasa a todos. Ingrese su correo electrónico a
                  continuación para recuperar su contraseña
                </Typography>
                <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <Typography variant="h6" color="white" className="text-white">
                        Correo electrónico
                      </Typography>
                      <input className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-trasnparent" id="grid-email" type="email" placeholder="name@email.com" name="email" value={formData.email} onChange={handleChange} />
                      {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                    </div>
                  </div>
                  <Button className="mt-6 bg-TVred shadowbtn" fullWidth>
                    Enviar al correo
                  </Button>
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


