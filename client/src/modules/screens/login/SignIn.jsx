import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import Carrousel from "../../components/carrousel/Carrousel";

export default function Login() {
  return (
    <Fade cascade damping={0.1}>
      <main className="rounded-[30px] bg-gray-200 flex flex-row flex-grow items-center justify-center min-h-screen">
        <div className="flex flex-col h-screen py-8">
          <div className="m-auto">
            <Link to="/"><h1>TODO VISA</h1></Link>
          </div>
          <Fade cascade damping={0.1} className="w-auto px-28 h-full">
            <Card
              color="transparent"
              shadow={false}
              className="max-w-xl h-full mx-auto  px-16 flex justify-center"
            >
              <Typography variant="h2" color="blue-gray">
                Login
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
              </Typography>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Link to="/forgotpassword">
                    <Typography
                      color="gray"
                      className="-mt-4 text-right font-normal"
                    >
                      <a href="#" className="font-medium text-gray-900">
                        Forgot your password?
                      </a>
                    </Typography>
                  </Link>
                </div>
                <Button className="mt-6" fullWidth>
                  Login
                </Button>
                <Button className="mt-6" fullWidth>
                  Google
                </Button>
                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                >
                  Already have an account?{" "}
                  <Link to="/signup">
                    <a href="#" className="font-medium text-gray-900">
                      Sign In
                    </a>
                  </Link>
                </Typography>
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
