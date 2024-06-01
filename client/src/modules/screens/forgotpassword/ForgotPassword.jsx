import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import Carrousel from "../../components/carrousel/Carrousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ForgotPassword() {
  return (
    <Fade cascade damping={0.1}>
        <main className="rounded-[30px] bg-gray-200 flex flex-row flex-grow items-center justify-center min-h-screen">
      <div className="flex flex-col h-screen py-8">
        <div className="m-auto ">
          <h1>TODO VISA</h1>
        </div>
        <Fade cascade damping={0.1} className="w-auto px-28 h-full">
          <Card
            color="transparent"
            shadow={false}
            className="max-w-xl h-full mx-auto  px-16 flex justify-center"
          >
            <Link to="/signin">
            <Typography color="black" className="mb-1 font-normal text-justify w-full mx-1">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/> Regresar al inicio de sesión
            </Typography>
            </Link>
            <Typography variant="h3" color="blue-gray" className="my-2">
              ¿Olvidaste tu contraseña?
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-justify">
              No te preocupes, nos pasa a todos. Ingrese su correo electrónico a
              continuación para recuperar su contraseña
            </Typography>
            <form className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6 w-full">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  fullWidth
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 px-20"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button className="mt-6" fullWidth>
                Next
              </Button>
            </form>
          </Card>
        </Fade>
      </div>
      <div className="items-center justify-center w-full flex">
        <Carrousel></Carrousel>
      </div>
    </main>
    </Fade>
  );
}
