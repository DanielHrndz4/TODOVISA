import { Card, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import handleClickPopUpSignUp from "../../components/popup/PopUpSignUp";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import lang from "../../../assets/data/lang.data";
import URI from "../../../assets/data/admin/uri.api";
import { IPInfoContext } from 'ip-info-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import handleClickPopUp from "../../components/popup/PopUp";

export default function Login() {
  const [signInText, setSignInText] = useState("Inicia sesión");
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [signInValue, setSignInValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const userInfo = useContext(IPInfoContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const cookieJWT = Cookies.get('jwt');
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();
  const signinText = lang[0].signin
  const fetchDataToken = async () => {
    if (cookieJWT) {
      setSignInValue(true);
    }
  };
  const styles = {
    height: '100dvh', // Adjusted height for browsers that support dvh
    height: '100%', // Fallback for browsers that do not support dvh
  };
  const validCredentialGoogle = async (decodeToken) => {
    const email = decodeToken.email;
    const name = decodeToken.name;
    const password = decodeToken.jti;
    const country = userInfo.country_name;
    const tel = userInfo.country_calling_code;
    const googleID = decodeToken.jti;

    try {
      const response = await fetch(`${URI}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, country: country, password: password, tel: tel, googleID: googleID })
      });
      const data = await response.json();

      if (!response.ok) {
        const html = `<`
        handleClickPopUpSignUp("error", `<h1 class='text-black pb-4 text-2xl font-semibold text-center'>Credenciales inválidas</h1><p class='py-2 text-justify'>Ya existe una cuenta registrada con este email</p>`, "Aceptar");
      } else {
        const token = data.token;
        const payload = data.payload;
        const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set('jwt', token, { expires: expires, secure: true, sameSite: 'Strict' });
        Cookies.set('user', JSON.stringify(payload), { expires: expires, secure: true, sameSite: 'Strict' });
        sessionStorage.setItem('SESSION', true);
        navigateTo('/')
      }
    } catch (e) {
      console.error('Error:', e.message);
    }
  };
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decodeToken = jwtDecode(credentialResponse?.credential);
      validCredentialGoogle(decodeToken);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchDataToken();
  }, []);

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
        `${URI}/signin`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        const { token, payload } = await response.json();
        const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set('jwt', token, { expires: expires, secure: true, sameSite: 'Strict' });
        Cookies.set('user', JSON.stringify(payload), { expires: expires, secure: true, sameSite: 'Strict' });
        sessionStorage.setItem('SESSION', true);
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
    setSignInText(isActiveBtn ? signinText.button.loading_text : signinText.button.default_text);
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
                  {signinText.title}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-white w-80 max-w-screen-lg sm:w-96">
                  {signinText.subtitle}
                </Typography>
                <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submitFormSignIn}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <Typography variant="h6" color="blue-gray" className="text-white">
                        {signinText.email}
                      </Typography>
                      <input className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent" id="grid-email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <Typography variant="h6" color="blue-gray" className="text-white">
                    {signinText.password}
                  </Typography>
                  <div className="relative">
                    <input
                      className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-10 leading-tight focus:outline-none focus:bg-transparent"
                      id="grid-password"
                      type={showPassword ? "text" : "password"}
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
                        {signinText.forgot_password}
                      </a>
                    </Typography>
                  </Link>
                  <Button type="submit" disabled={isActiveBtn} className="mt-6 bg-TVred shadowbtn" fullWidth>
                    {signInText}
                  </Button>
                  <div className="w-full flex flex-row items-center my-8">
                    <hr className="flex-grow h-0.5 bg-gray-300" />
                    <h1 className="mx-4 [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] text-white font-medium text-md">{signinText.or_signin}</h1>
                    <hr className="flex-grow h-0.5 bg-gray-300" />
                  </div>
                  {/* <Button className="mt-6 bg-black shadowbtn text-white flex items-center justify-center" fullWidth>
                    <FontAwesomeIcon icon={faGoogle} className="text-lg text-white mr-2" />
                    Google
                  </Button> */}
                  <div className="m-auto flex mb-6 justify-center items-center">
                    <GoogleLogin className="mt-6 bg-black shadowbtn text-white flex items-center justify-center"
                      fullWidth
                      onSuccess={handleLoginSuccess}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </div>
                  <Typography
                    color="white"
                    className="mt-4 text-center font-medium text-md"
                  >
                    {signinText.account}{" "}
                    <Link to="/signup">
                      <a href="#" className="font-medium text-white hover:text-TVred [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] hover:underline">
                        {signinText.signup}
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
    const withSession = lang[0].with_session
    return (
      <div className="h-screen flex flex-col justify-center items-center m-auto gap-4">
        <div className="bg-white py-16 px-20 rounded-lg shadow flex flex-col gap-6">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-semibold">{withSession.title}</h1>
            <p className="text-xl">{withSession.subtitle}</p>
          </div>
          <Link to='/'>
            <div className="flex flex-row">
              <Button className="bg-TVred shadowbtn py-6 px4 m-auto flex justify-center items-center">{withSession.button}</Button>
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Fade cascade damping={0.1} className="w-full" style={styles}>
      <main className="bg-TVBlue flex flex-col lg:flex-row h-full w-full">
        {signInValue ? withSignin() : withoutSignin()}
      </main>
    </Fade>
  );
}
