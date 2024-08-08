import { Card, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import handleClickPopUpSignUp from "../../components/popup/PopUpSignUp";
import MuiAlert from "@material-ui/lab/Alert";
import country from "../../../assets/data/countrys.data";
import { IPInfoContext } from 'ip-info-react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import lang from "../../../assets/data/lang.data";
import URI from "../../../assets/data/admin/uri.api";
import { GoogleLogin } from '@react-oauth/google';
import Swal from "sweetalert2";
import { jwtDecode } from 'jwt-decode';
import { Helmet } from "react-helmet";

export default function Register() {
  const signupText = lang[0].signup
  const vpp = lang[0].validation_popup
  const [errorMessage, setErrorMessage] = useState(null);
  const [signUpValue, setSignUpValue] = useState(null);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [signInText, setSignInText] = useState("Regístrate");
  const [repeatPassword, setRepeatPassword] = useState({ repeatpassword: "" });
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const userInfo = useContext(IPInfoContext);
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

  const fetchDataToken = async () => {
    if (Cookies.get('jwt')) {
      setSignUpValue(true);
    }
  };

  useEffect(() => {
    fetchDataToken();
  }, []);


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
  const validCredentialGoogle = async (decodeToken) => {
    const email = decodeToken.email;
    const name = decodeToken.name;
    const password = decodeToken.jti;
    const country = userInfo.country_name;
    const tel = userInfo.country_calling_code;
    const googleID = decodeToken.jti;
    const avatar = decodeToken.picture;
    const buttonText = lang[0].form;
    Swal.fire({
      title: buttonText.wait_title,
      html: buttonText.wait,
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await fetch(`${URI}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, country: country, password: password, tel: tel, googleID: googleID, avatar: avatar })
      });
      const data = await response.json();

      if (!response.ok) {
        Swal.close();
        handleClickPopUpSignUp("error", `<h1 class='text-black pb-4 text-2xl font-semibold text-center'>Credenciales inválidas</h1><p class='py-2 text-justify'>Ya existe una cuenta registrada con este email</p>`, vpp.button_success);
      } else {
        const token = data.token;
        const payload = data.payload;
        const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set('jwt', token, { expires: expires, secure: true, sameSite: 'Strict' });
        Cookies.set('user', JSON.stringify(payload), { expires: expires, secure: true, sameSite: 'Strict' });
        Swal.close();
        handleClickPopUpSignUp("success", `<h1 class='text-black pb-4 text-2xl font-semibold'>${vpp.success}</h1><p class='text-center'>${vpp.text_success}</p>`, vpp.button_success);
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
    if (repeatPassword.repeatpassword !== "" || formData.password !== "") {
      if (formData.password !== repeatPassword.repeatpassword) {
        setErrorMessage("Las contraseñas deben ser iguales.");
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
      setErrorMessage("Las contraseñas deben ser iguales.");
      return;
    }

    try {
      setIsActiveBtn(true);

      const response = await fetch(
        `${URI}/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        const data = await response.json();
        setErrorMessage('');
        handleClickPopUpSignUp("success", `<h1 class='text-black pb-4 text-2xl font-semibold'>${vpp.success}</h1><p class='text-center'>${vpp.text_success2}</p>`, vpp.button_success);
        navigateTo("/signin");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrar.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error al registrar.");
      }
    } finally {
      setIsActiveBtn(false); // Desactivar el estado de botón activo después de la petición
    }
  };

  useEffect(() => {
    if (isActiveBtn) {
      setSignInText(signupText.button.loading_text);
    } else {
      setSignInText(signupText.button.default_text);
    }
  }, [isActiveBtn]);

  const withoutSignup = () => {
    return (
      <>
        <div className="flex flex-col py-12 w-full lg:w-[50%]">
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
                  {signupText.title}
                </Typography>
                <Typography
                  color="gray"
                  className="mt-1 font-normal text-white w-80 max-w-screen-lg sm:w-96"
                >
                  {signupText.subtitle}
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
                        {signupText.name}
                      </Typography>
                      <input
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                        id="grid-first-name"
                        type="text"
                        placeholder=""
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
                        {signupText.last_name}
                      </Typography>
                      <input
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                        id="grid-last-name"
                        type="text"
                        placeholder=""
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
                        {signupText.email}
                      </Typography>
                      <input
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                        id="grid-email"
                        type="email"
                        placeholder=""
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
                        {signupText.password}
                      </Typography>
                      <div className="relative">
                        <input
                          className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
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
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-white"
                      >
                        {signupText.repeat_password}
                      </Typography>
                      <div className="relative">
                        <input
                          className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                          id="grid-repeatpassword"
                          type={showRepeatPassword ? "text" : "password"} // Usar el estado showRepeatPassword para cambiar dinámicamente entre text y password
                          placeholder=""
                          name="repeatpassword"
                          value={repeatPassword.repeatpassword}
                          onChange={handleChangeVerifyPassword}
                          required
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                          onClick={toggleShowRepeatPassword}
                        >
                          <FontAwesomeIcon icon={showRepeatPassword ? faEye : faEyeSlash} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-4 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-white"
                      >
                        {signupText.country}
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
                          {signupText.select_country}
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
                        {signupText.phone_number}
                      </Typography>
                      <input
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                        id="grid-tel"
                        type="tel"
                        placeholder=""
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="my-4">
                      <Alert severity="error">
                        {errorMessage}
                      </Alert>
                    </div>
                  )}
                  <Button
                    className="mt-6 bg-TVred shadowbtn"
                    fullWidth
                    type="submit"
                    disabled={isActiveBtn}
                  >
                    {signInText}
                  </Button>
                  <div className="w-full flex flex-row items-center my-8">
                    <hr className="flex-grow h-0.5 bg-gray-300" />
                    <h1 className="mx-4 [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] text-white font-medium text-md">
                      {signupText.or_signup}
                    </h1>
                    <hr className="flex-grow h-0.5 bg-gray-300" />
                  </div>
                  {/* <Button
                    className="mt-6 bg-black shadowbtn text-white flex items-center justify-center"
                    fullWidth
                    disabled={isActiveBtn}
                  >
                    <FontAwesomeIcon
                      icon={faGoogle}
                      className="text-lg text-white mr-2"
                    />
                    Google
                  </Button> */}
                  <div className="m-auto flex mb-6 justify-center items-center">
                    <GoogleLogin className="mt-6 bg-black shadowbtn text-white flex items-center justify-center"
                      theme='filled_black'
                      size="large"
                      onSuccess={handleLoginSuccess}
                      onError={() => { }}
                    />
                  </div>
                  <Typography
                    color="white"
                    className="mt-4 text-center font-medium text-md"
                  >
                    {signupText.account}{" "}
                    <Link
                      to="/signin"
                      className="font-medium text-white hover:text-TVred [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] hover:underline"
                    >
                      {signupText.signin}
                    </Link>
                  </Typography>
                </form>
              </div>
            </Card>
          </Fade>
        </div>
        <div
          className="w-full hidden lg:block"
          style={{
            backgroundImage: 'url("/img/LRP/visa3.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </>
    )
  }

  const withSignup = () => {
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
    <Fade cascade damping={0.1} className="w-full h-full">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Todovisa - Regístrate</title>
        <meta name="description" content="Regístrate en Todovisa para acceder a nuestros servicios exclusivos. Completa tu perfil para explorar nuestras guías y herramientas que te ayudarán a obtener tu visa de manera eficiente." />
        <meta name="keywords" content="registro, Todovisa, sign up, registro de usuario, servicios de visa, obtener visa, perfil Todovisa" />
        <meta property="og:title" content="Todovisa - Regístrate" />
        <meta property="og:description" content="Regístrate en Todovisa para acceder a nuestros servicios exclusivos. Completa tu perfil para explorar nuestras guías y herramientas que te ayudarán a obtener tu visa de manera eficiente." />
        <meta property="og:image" content="https://todovisa.com/img/logo/todovisaLogo.jpg" />
        <meta property="og:url" content="https://todovisa.com/signup" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Todovisa - Regístrate" />
        <meta name="twitter:description" content="Regístrate en Todovisa para acceder a nuestros servicios exclusivos. Completa tu perfil para explorar nuestras guías y herramientas que te ayudarán a obtener tu visa de manera eficiente." />
        <meta name="twitter:image" content="https://todovisa.com/img/logo/todovisaLogo.jpg" />
        <meta name="twitter:site" content="@todovisa" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://todovisa.com/signup" />
      </Helmet>
      <main className="bg-TVBlue flex flex-col lg:flex-row h-full w-full">
        {signUpValue ? withSignup() : withoutSignup()}
      </main>
    </Fade>
  );
}

