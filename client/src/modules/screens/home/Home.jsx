import React, { useEffect, useState } from "react";
import NavbarWithMegaMenu from "../navbar/Navbar";
import About from "./About";
import VIPROCarrousel from "./VIPROCarrousel";
import Footer from "../footer/Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import ContactUs from "./contactUs/ContactUs";
import { Fade } from "react-awesome-reveal";
import { WAsettings } from "../../../assets/data/ws.data";
import VIPRO from "./VIPRO";
import LoginUserNavbar from "../navbar/LoginUserNavbar";
import Cookies from 'js-cookie';
import lang from "../../../assets/data/lang.data";

export default function Home() {
  const bannerText = lang[0].banner
  const [jwtToken, setJwtToken] = useState(false);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga
  const fetchData = async () => {
    try {
      if(Cookies.get('jwt')){
        const response = await fetch(
          // "https://todovisa.onrender.com/api/protected-route",
          "http://localhost:3366/api/protected-route", 
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Cookies.get('jwt')}`
            }
          }
        );
    
        if (response.ok) {
          console.log(response)
          setJwtToken(true);
        } else {
          console.log(response)
          setJwtToken(false); // Handle cases where the response is not OK
        }
      }
    } catch (err) {
      setJwtToken(false); // Set token to false to indicate potential issues
    } finally {
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures fetch only runs on initial render

  if (loading) {
    return // Mostrar un indicador de carga mientras se espera la respuesta del fetch
  }

  return (
    <Fade duration={1000} triggerOnce > {/* Añade la animación de fade */}
      <main className="h-full w-full overflow-auto lg:absolute">
        {jwtToken ? <LoginUserNavbar /> : <NavbarWithMegaMenu />}
        <div className="flex flex-col w-full">
          <div className="backgroundgradient w-full">
          <div
            className="relative mt-12 mb-4" // Adjust based on the height of the navbar
            style={{
              backgroundImage: "url('/img/background/bgmain4.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              minHeight: "40rem", // Ensure it covers at least 30rem height
              width: "100%",
              backgroundPosition: "center",
              display: "flex", // Ensure the child div can stretch to full height
              alignItems: "center", // Center content vertically if needed
              justifyContent: "center", // Center content horizontally if needed
            }}
          >
            <div className="h-full w-full flex items-center justify-center flex-col gap-4 font-semibold [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)] ">
              <h1 className="text-white text-2xl text-center sm:text-4xl">{bannerText.title}</h1>
              <h1 className="text-white text-5xl text-center sm:text-7xl">{bannerText.todovisa}</h1>
            </div>
          </div>
          </div>

          {/* About section */}
          <About></About>
          <hr className="my-8 bg-white" />
          {/* VIPROCarrousel section */}
          <VIPROCarrousel></VIPROCarrousel>
          <hr className="my-8 bg-white" />
          {/* VIPRO form section */}
          <VIPRO jwt={jwtToken}></VIPRO>
          <hr className="my-8 bg-white" />
          {/* Contact Us form */}
          <ContactUs></ContactUs>
          {/* Footer section */}
          <Fade>
            <Footer></Footer>
          </Fade>

          <FloatingWhatsApp {...WAsettings} />
        </div>
      </main>
    </Fade>
  );
}
