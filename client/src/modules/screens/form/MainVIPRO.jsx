import React, { useState } from "react";
import VIPROForm from "./Form";
import { useNavigate } from "react-router-dom";

export default function MainVIPRO() {
  const navigateTo = useNavigate();
  const [isBoolean, setIsBoolean] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://todovisa.onrender.com/api/protected-route",
        {
          method: "GET",
          credentials: "include", // Asegura que las cookies se incluyan en la solicitud
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setIsBoolean(true);
      } else {
        navigateTo("/");
      }
    } catch (err) {
      navigateTo("/");
    }
  };

  fetchData();
  return (
    <main className="w-full h-full bg-TVBlue">
      {isBoolean && (
        <div className="w-full lg:w-[60%] m-auto py-8">
          <VIPROForm></VIPROForm>
        </div>
      )}
    </main>
  );
}
