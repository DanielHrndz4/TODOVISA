import { Button, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import URI from "../../../assets/data/admin/uri.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import handleClickPopUpSignUp from "../../components/popup/PopUpSignUp";
import lang from "../../../assets/data/lang.data";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState({ password: '' });
  const [repeatPassword, setRepeatPassword] = useState({ repeatpassword: '' });

  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const email = pathSegments[pathSegments.length - 1];
  const votp = lang[0].verification_otp;

  useEffect(() => {
    if (!email) {
      navigate("/forgotpassword");
    }
  }, [email, navigate]);

  useEffect(() => {
    let timerInterval;
    if (isDisabled && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            setIsDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isDisabled, timer]);

  const handleResendEmail = async () => {
    if (resendCount >= 3) {
      alert(votp.resend_limit_alert);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
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
        throw new Error('Failed to send reset link');
      }

      const data = await response.json();
      console.log('Response Data:', data);
      setSuccess(votp.resend_email_success);
      setResendCount((prevCount) => prevCount + 1);
      setIsDisabled(true);
      setTimer(60); // 60 segundos
    } catch (err) {
      setError(err.message || votp.otp_validation_error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateOtp = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${URI}/validate_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, codeOTP: otp })
      });

      const data = await response.json();
      if (response.status === 200) {
        setIsVerified(true);
      } else {
        setError(data.message || votp.invalid_otp);
      }
    } catch (err) {
      setError(err.message || votp.otp_validation_error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeVerifyPassword = (e) => {
    const { name, value } = e.target;
    setRepeatPassword((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handlePasswordReset = async () => {
    if (formData.password !== repeatPassword.repeatpassword) {
      setError(votp.password_mismatch_error);
      return;
    }
    if (formData.password.length < 8) {
      setError(votp.password_length_error);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${URI}/update_password_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword: formData.password })
      });

      const data = await response.json();
      if (response.status === 200) {
        setSuccess(votp.password_reset_success);
        handleClickPopUpSignUp("success", `<h1 class='text-black pb-4 text-2xl font-semibold'>${votp.password_reset_success}</h1><p class='text-center'>${votp.password_reset_instruction}</p>`, 'Aceptar');
        // Redirigir a la página de inicio de sesión después del éxito
        navigate('/signin');
      } else {
        setError(data.message || votp.password_reset_error);
      }
    } catch (err) {
      setError(err.message || votp.otp_validation_error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <main
      className="flex flex-col justify-center items-center"
      style={{
        height: "100dvh",
        backgroundImage: "url('/img/background/bgeeuu.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`w-full sm:w-[80%] md:w-[60%] lg:w-[40%] m-auto glassmorphism flex flex-col justify-center items-center pb-24 pt-4 lg:px-8 ${isVerified ? 'hidden' : ''}`}>
        <img
          src="/img/logo/todovisa.png"
          alt="Todovisa"
          className="w-[150px] py-1"
        />
        <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-white font-bold py-2 [text-shadow:_4px_2px_0_rgb(0_0_0_/_40%)]">
          {votp.otp_title}
        </h1>
        <p className="text-center lg:text-md xl:text-lg text-white [text-shadow:_4px_2px_0_rgb(0_0_0_/_40%)]">
          {votp.otp_instruction} <strong>{email}</strong>
        </p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "50px",
                height: "50px",
                fontSize: "24px",
                textAlign: "center",
                border: "2px solid #ccc",
                borderRadius: "4px",
                margin: "30px 10px 30px",
              }}
            />
          )}
        />
        <div className="w-full px-10 flex justify-around">
          <Button
            onClick={handleValidateOtp}
            className="py-4 px-6 rounded-sm shadowbtn bg-TVred"
            disabled={loading}
          >
            {loading ? votp.validating : votp.validate_button}
          </Button>
          <Button
            onClick={handleResendEmail}
            disabled={isDisabled || loading}
            className="py-4 px-6 rounded-sm shadowbtn bg-TVBlue"
          >
            {isDisabled
              ? `${votp.resend_timer} ${formatTime(timer)}`
              : loading ? votp.sending : votp.resend_button}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-6 bg-TVgray px-4 py-2 rounded-md font-semibold shadowbtn">{error}</p>}
        {success && <p className="text-green-500 mt-6 bg-TVgray px-4 py-2 rounded-md font-semibold shadowbtn">{success}</p>}
      </div>
      {isVerified && (
        <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[40%] m-auto glassmorphism flex flex-col justify-center items-center pb-24 pt-4 px-8">
          <img
            src="/img/logo/todovisa.png"
            alt="Todovisa"
            className="w-[150px] py-1"
          />
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-white"
              >
                {votp.password}
              </Typography>
              <div className="relative">
                <input
                  className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
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
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-white"
              >
                {votp.repeat_password}
              </Typography>
              <div className="relative">
                <input
                  className="appearance-none block w-full bg-transparent shadow text-white border focus:border-black border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-transparent"
                  id="grid-repeatpassword"
                  type={showRepeatPassword ? "text" : "password"}
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
          <Button
            onClick={handlePasswordReset}
            className="py-4 px-6 rounded-sm shadowbtn bg-TVBlue"
            disabled={loading}
          >
            {loading ? votp.changing : votp.password_reset_instruction}
          </Button>
          {error && <p className="text-red-500 mt-6 bg-TVgray px-4 py-2 rounded-md font-semibold shadowbtn">{error}</p>}
          {success && <p className="text-green-500 mt-6 bg-TVgray px-4 py-2 rounded-md font-semibold shadowbtn">{success}</p>}
        </div>
      )}
    </main>
  );
}
