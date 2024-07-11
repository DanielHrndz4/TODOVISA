import React, { useState, useEffect } from "react";
import VIPROForm from "./Form";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import fetchData from "../../../assets/data/validation/token.validation";
import URI from "../../../assets/data/admin/uri.api";

export default function MainVIPRO() {
  const navigateTo = useNavigate();
  const [isBoolean, setIsBoolean] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const country = pathSegments[pathSegments.length - 1];
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

        console.log(vipro);

        // Convertir las propiedades del objeto en un arreglo de claves
        const viproArray = Object.keys(vipro);

        // Mapear las claves de vipro a nombres de países alternativos
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validationData();
  }, []); // Llama a validationData solo cuando el componente se monta

  if (isLoading) {
    return <div></div>; // Muestra un mensaje de carga mientras se verifica la sesión
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
