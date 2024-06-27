import React, { useState, useEffect } from "react";
import VIPROForm from "./Form";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export default function MainVIPRO() {
  const navigateTo = useNavigate();
  const [isBoolean, setIsBoolean] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  const fetchData = async () => {
    const user = Cookies.get('user');
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
        setIsLoading(false); // Finaliza la carga
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Llama a fetchData solo cuando el componente se monta

  if (isLoading) {
    return  // Muestra un mensaje de carga mientras se verifica la sesión
  }

  return (
    <main className="w-full h-full bg-TVBlue">
      {isBoolean ? (
        <div className="w-full lg:w-[60%] m-auto py-8">
          <VIPROForm />
        </div>
      ) : (
        navigateTo("/")
      )}
    </main>
  );
}
