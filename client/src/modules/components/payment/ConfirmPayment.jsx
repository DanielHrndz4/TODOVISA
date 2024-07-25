import React, { useEffect, useState } from "react";
import fetchData from "../../../assets/data/validation/token.validation";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loader/Loading";
import URI from "../../../assets/data/admin/uri.api";
import questions from '../../../assets/data/viproLang.data';
import handleClickPopUpSignUp from "../popup/PopUpSignUp";

export default function ConfirmPayment() {
  const [tokenValidation, setTokenValidation] = useState(null);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const user = Cookies.get('user');
  const userData = JSON.parse(user);
  const email = userData?.email;
  const navigateTo = useNavigate();

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
        setError("An error occurred while validating the token.");
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
            questions: questions, // Suponiendo que no se envían preguntas, ajusta según sea necesario
            id: decodeBase64(id)
          }),
        });

        const data = await response.json();
        setResponseData(data);
        if (response.ok) {
          navigateTo(`/vipro/${decodeBase64(country)}`)
        } else {
          handleClickPopUpSignUp("error", `<h1 class='text-black pb-4 text-2xl font-semibold'>Acceso Denegado</h1><p class='text-center'>No se pudo acceder al formulario. Si el problema persiste, por favor contacta a un administrador de TODOVISA.</p>`, 'Aceptar');
          navigateTo('/')
        }

      } catch (err) {
        console.error("Error during form submission:", err);
        setError("An error occurred while submitting the form.");
      }
    };

    if (tokenValidation) {
      submitForm();
    }
  }, [tokenValidation, email, id, country]); // Dependencias para ejecutar cuando cambie el tokenValidation, email, id, o country

  if (error) {
    const errorMessage = () => {
      handleClickPopUpSignUp("error", `<h1 class='text-black pb-4 text-2xl font-semibold'>Acceso Denegado</h1><p class='text-center'>No se pudo acceder al formulario. Si el problema persiste, por favor contacta a un administrador de TODOVISA.</p>`, 'Aceptar');
      navigateTo('/')
    }
    return errorMessage();
  }

  if (tokenValidation === null) {
    return <Loading />;
  }

  return (
    <div>
      <Loading></Loading>
    </div>
  );
}
