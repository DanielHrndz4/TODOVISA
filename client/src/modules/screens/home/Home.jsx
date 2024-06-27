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
import Cookies from 'js-cookie';
import LoginUserNavbar from "../navbar/LoginUserNavbar";

export default function Home() {
  const [jwtToken, setJwtToken] = useState(false);
  const [loading, setLoading] = useState(true); 

  function getJwtFromCookie() {
    return Cookies.get('jwt');
  }
  
  const fetchData = async () => {
    try {
      const token = getJwtFromCookie();
      const response = await fetch(
        "https://todovisa.onrender.com/api/verify-token",
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        setJwtToken(true);
      } else {
        setJwtToken(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setJwtToken(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>Loading...</div> // Placeholder for loading indicator
    );
  }

  return (
    <Fade duration={1000} triggerOnce>
      <main className="h-full w-full overflow-auto lg:absolute">
        {jwtToken ? <LoginUserNavbar /> : <NavbarWithMegaMenu />}
        <div className="flex flex-col w-full">
          <div className="backgroundgradient w-full">
            <div
              className="relative mt-12 mb-4"
              style={{
                backgroundImage: "url('/img/background/bgmain4.jpg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "40rem",
                width: "100%",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="h-full w-full flex items-center justify-center flex-col gap-4 font-semibold text-shadow">
                <h1 className="text-white text-2xl text-center lg:text-4xl">¡Abre las puertas al mundo!</h1>
                <h1 className="text-white text-5xl text-center lg:text-7xl">TODO VISA</h1>
              </div>
            </div>
          </div>

          {/* About section */}
          <About />
          <hr className="my-8 bg-white" />
          
          {/* VIPROCarrousel section */}
          <VIPROCarrousel />
          <hr className="my-8 bg-white" />
          
          {/* VIPRO form section */}
          <VIPRO jwt={jwtToken} />
          <hr className="my-8 bg-white" />
          
          {/* Contact Us form */}
          <ContactUs />
          
          {/* Footer section */}
          <Fade>
            <Footer />
          </Fade>

          <FloatingWhatsApp {...WAsettings} />
        </div>
      </main>
    </Fade>
  );
}
