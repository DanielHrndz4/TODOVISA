import React, { useState, useEffect } from "react";
import VIPROForm from "./Form";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import fetchData from "../../../assets/data/validation/token.validation";
import URI from "../../../assets/data/admin/uri.api";
import Loading from "../../components/loader/Loading";

export default function MainVIPRO() {
  const navigateTo = useNavigate();
  const [isBoolean, setIsBoolean] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const country = pathSegments[pathSegments.length - 1];
  const [loadingTimeout, setLoadingTimeout] = useState(null);

  const validationData = async () => {
    const user = Cookies.get('user');
    const jwt = Cookies.get('jwt');

    if (!user || !jwt) {
      navigateTo('/');
      return;
    }

    const validation = await fetchData(jwt);
    if (!validation) {
      navigateTo('/');
      return;
    }

    const userData = JSON.parse(user);
    const email = userData.email;

    if (!email) {
      navigateTo('/');
      return;
    }

    try {
      const response = await fetch(
        `${URI}/vipro/validation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const vipro = data.user;

        const viproArray = Object.keys(vipro);

        const viproAlt = viproArray.map(key => {
          switch (key) {
            case 'vipro_eeuu':
              return 'estadosunidos';
            case 'vipro_mx':
              return 'mexico';
            case 'vipro_ch':
              return 'china';
            case 'vipro_ind':
              return 'india';
            case 'vipro_cnd':
              return 'canada';
            case 'vipro_uk':
              return 'inglaterra';
            case 'vipro_aus':
              return 'australia';
            default:
              return key;
          }
        });

        if (viproAlt.includes(country)) {
          setIsBoolean(true);
        } else {
          navigateTo("/");
        }
      } else {
        navigateTo("/");
      }
    } catch (err) {
      console.error("Server error", err);
      navigateTo("/");
    } finally {
      // Asegúrate de que el loading se muestre al menos durante 2 segundos
      setLoadingTimeout(setTimeout(() => {
        setIsLoading(false);
      }, 3000));
    }
  };

  useEffect(() => {
    validationData();
    // Limpia el temporizador si el componente se desmonta
    return () => clearTimeout(loadingTimeout);
  }, []); // Llama a validationData solo cuando el componente se monta

  if (isLoading) {
    return <Loading />; // Muestra un mensaje de carga mientras se verifica la sesión
  }

  return (
    <>
      {isBoolean ? (
        <VIPROForm />
      ) : (
        navigateTo("/")
      )}
    </>
  );
}
