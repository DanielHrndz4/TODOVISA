import React, { useEffect, useState } from "react";
import fetchData from "../../../assets/data/validation/token.validation";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loader/Loading";
import URI from "../../../assets/data/admin/uri.api";
import questions from '../../../assets/data/viproLang.data';
import handleClickPopUpSignUp from "../popup/PopUpSignUp";
import lang from "../../../assets/data/lang.data";

export default function ConfirmPayment() {
  const [tokenValidation, setTokenValidation] = useState(null);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const user = Cookies.get('user') || '{}'; // Proporciona un valor por defecto vacío en caso de que la cookie no exista
  let userData = {};

  try {
    userData = JSON.parse(user);
  } catch (e) {
    navigateTo('/')
  }
  const email = userData?.email || '';
  const navigateTo = useNavigate();
  const messlang = lang[0].confirmpayment;

  function decodeBase64(encodedValue) {
    return atob(encodedValue); // atob() decodifica una cadena en Base64
  }

  useEffect(() => {
    const validateToken = async () => {
      try {
        const jwtToken = Cookies.get("jwt");
        if (!jwtToken) {
          setTokenValidation(false);
          return;
        }
        const response = await fetchData(jwtToken);
        if (response) {
          setTokenValidation(true);
        } else {
          setTokenValidation(false);
        }
      } catch (err) {
        console.error("Error during token validation:", err);
        setError(messlang.messages.errorTokenValidation);
        setTokenValidation(false);
      }
    };

    validateToken();
  }, []); // Dependencias vacías para ejecutar solo al montar el componente

  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const country = pathSegments[2];
  const id = pathSegments[3];

  useEffect(() => {
    const submitForm = async () => {
      try {
        const response = await fetch(`${URI}/payment_n1co`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            country: decodeBase64(country),
            questions: questions, // Asegúrate de que 'questions' es el formato esperado
            id: decodeBase64(id)
          }),
        });

        const data = await response.json();
        setResponseData(data);
        if (response.ok) {
          navigateTo(`/vipro/${decodeBase64(country)}`);
        } else {
          handleClickPopUpSignUp("error", `<h1 class='text-black pb-4 text-2xl font-semibold'>${messlang.messages.popupAccessDenied.title}</h1><p class='text-center'>${messlang.messages.popupAccessDenied.description}</p>`, messlang.messages.popupAccessDenied.button);
          navigateTo('/');
        }
      } catch (err) {
        console.error("Error during form submission:", err);
        setError(messlang.messages.errorFormSubmission);
      }
    };

    if (tokenValidation) {
      submitForm();
    }
  }, [tokenValidation, email, country, id, navigateTo, messlang.messages]);

  if (error) {
    return (
      <div>
        {handleClickPopUpSignUp("error", `<h1 class='text-black pb-4 text-2xl font-semibold'>${messlang.messages.popupAccessDenied.title}</h1><p class='text-center'>${messlang.messages.popupAccessDenied.description}</p>`, messlang.messages.popupAccessDenied.button)}
        {navigateTo('/')}
      </div>
    );
  }

  return (
    <>
      {tokenValidation ?
        <div>
          <Loading />
        </div> :
        navigateTo('/')
      }
    </>
  );
}
