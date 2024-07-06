import React, { useState, useEffect } from "react";
import VIPROForm from "./Form";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import fetchData from "../../../assets/data/validation/token.validation";

export default function MainVIPRO() {
  const navigateTo = useNavigate();
  const [isBoolean, setIsBoolean] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  const validationData = async () => {
    const user = Cookies.get('user');
    const validation = await fetchData(Cookies.get('jwt'))
    if (!validation) {
      navigateTo('/');
    }
    if (user === undefined) {
      navigateTo('/');
    }
    const userData = JSON.parse(user);
    if (!user) {
      navigateTo('/');
    } else {
      const email = userData.email;
      try {
        const response = await fetch(
          "https://todovisa.onrender.com/api/vipro/validation",
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
          const { vipro } = data.user;
          setIsBoolean(vipro);
        } else {
          navigateTo("/");
        }
      } catch (err) {
        console.error("Server error", err);
        navigateTo("/");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    validationData();
  }, []); // Llama a validationData solo cuando el componente se monta

  if (isLoading) {
    return  // Muestra un mensaje de carga mientras se verifica la sesión
  }

  return (
    <>
      {
        isBoolean ? (
          <VIPROForm />
        ) : (
          navigateTo("/")
        )
      }
    </>
  );
}
