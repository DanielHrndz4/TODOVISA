import React, { useEffect, useState } from "react";
import LoginUserNavbar from "../navbar/LoginUserNavbar";
import NavbarWithMegaMenu from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { WAsettings } from "../../../assets/data/ws.data";
import { Fade } from "react-awesome-reveal";
import Cookies from "js-cookie";
import lang from "../../../assets/data/lang.data";

export default function Steps() {
  const [jwtValidation, setJwtValidation] = useState("");
  const cookieJWT = Cookies.get("jwt");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${URI}/hello`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
        } else {
          console.error("Error en la solicitud:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchMessage();
  }, []);

  useEffect(() => {
    if (cookieJWT) {
      const validation = sessionStorage.getItem("SESSION");
      setJwtValidation(validation);
    }
  }, []);
  const stepsText = lang[0].payment;
  return (
    <main className="bg-[#fafafa]">
      {jwtValidation ? <LoginUserNavbar /> : <NavbarWithMegaMenu />}
      <div className="flex w-[95%] sm:w-[80%] md:w-[75%] lg:w-[75%] xl:w-[75%] m-auto flex-col pb-16 pt-[150px]">
        <h1 className="text-3xl font-bold mb-8 py-2 text-center text-TVBlue">
          {stepsText.title}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadowbtn hover:scale-[1.02] hover:cursor-pointer ease-in-out duration-150">
            <div className="w-full h-[300px] flex items-center justify-center mb-4">
              <img
                src="/img/payment/paso1.jpg"
                alt="Imagen del paso 1"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">
                {stepsText.steps[0].title}
              </h2>
              <p>{stepsText.steps[0].description}</p>
            </div>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadowbtn hover:scale-[1.02] hover:cursor-pointer ease-in-out duration-150">
            <div className="w-full h-[300px] flex items-center justify-center mb-4">
              <img
                src="/img/payment/paso2.jpg"
                alt="Imagen del paso 2"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">
                {stepsText.steps[1].title}
              </h2>
              <p>{stepsText.steps[1].description}</p>
            </div>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadowbtn hover:scale-[1.02] hover:cursor-pointer ease-in-out duration-150">
            <div className="w-full h-[300px] flex items-center justify-center mb-4">
              <img
                src="/img/payment/paso3.jpg"
                alt="Imagen del paso 3"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">
                {stepsText.steps[2].title}
              </h2>
              <p>{stepsText.steps[2].description}</p>
            </div>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadowbtn hover:scale-[1.02] hover:cursor-pointer ease-in-out duration-150">
            <div className="w-full h-[300px] flex items-center justify-center mb-4">
              <img
                src="/img/payment/paso4.jpg"
                alt="Imagen del paso 4"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">
                {stepsText.steps[3].title}
              </h2>
              <p>{stepsText.steps[3].description}</p>
            </div>
          </div>
        </div>
        <div className="w-[75%] m-auto">
          <p className="pt-10 text-center font-semibold text-xl">
            {stepsText.finalMessage}
          </p>
        </div>
      </div>
      <Fade>
        <Footer />
      </Fade>
      <FloatingWhatsApp {...WAsettings} />
    </main>
  );
}
