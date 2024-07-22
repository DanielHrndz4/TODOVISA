import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import lang from '../../../assets/data/lang.data';
import URI from '../../../assets/data/admin/uri.api';

export default function Login() {
  const forgotPassword = lang[0].forgot_password;
  const [formData, setFormData] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigateTo = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    const email = formData.email;
  
    // Validar el email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
  
    try {
      console.log(`Sending request to: ${URI}/reset-password`);
  
      const response = await fetch(`${URI}/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
  
        // Manejar errores específicos
        if (response.status === 400) {
          setError('Parece que has creado tu cuenta con Google. Por favor, inicia sesión usando el botón de Google.');
        } else if (response.status === 404) {
          setError('El usuario no está registrado. Por favor, verifica tu dirección de correo electrónico.');
        } else {
          throw new Error('Failed to send reset link');
        }
  
        return;
      }
  
      const data = await response.json();
      console.log('Response Data:', data);
      setSuccess('Password reset link has been sent to your email.');
      setFormData({ email: '' });
      navigateTo(`/validation_code/${email}`);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Fade cascade damping={0.1} className="w-full h-full">
      <main className="bg-TVBlue flex flex-col lg:flex-row h-full w-full">
        <div className="flex flex-col h-screen pb-8 lg:pb-0 w-full lg:w-[50%]">
          <div className="m-auto">
          </div>
          <Fade cascade damping={0.1} className="w-auto xl:px-28 h-full">
            <Card
              color="transparent"
              shadow={false}
              className="max-w-xl h-full mx-auto lg:px-16 flex justify-center flex-grow gap-8"
            >
              <div className="flex m-auto flex-col w-80 max-w-screen-lg sm:w-96">
                <Link to="/" className="flex justify-center items-center py-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="cursor-pointer pb-8"
                  >
                    <img src="/img/logo/todovisa.png" alt="" className="w-[115px]" />
                  </Typography>
                </Link>
                <Link to="/signin">
                  <Typography color="black" className="mb-1 font-normal w-full mx-1 text-white text-lg xl:text-xl [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.4)]">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> {forgotPassword.return}
                  </Typography>
                </Link>
                <Typography variant="h3" color="white" className="my-2 text-center [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.4)]">
                  {forgotPassword.title}
                </Typography>
                <Typography color="white" className="mt-1 font-normal text-justify">
                  {forgotPassword.description}
                </Typography>
                <form onSubmit={handleSubmit} className="mt-6 mb-2 ">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <Typography variant="h6" color="white" className="text-white">
                        {forgotPassword.email}
                      </Typography>
                      <input
                        className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-trasnparent"
                        id="grid-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="mt-6 bg-TVred shadowbtn"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : forgotPassword.button}
                  </Button>
                  {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                  {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
                </form>
              </div>
            </Card>
          </Fade>
        </div>
        <div className="w-full hidden lg:block" style={{ backgroundImage: 'url("/img/LRP/visa3.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </main>
    </Fade>
  );
}
