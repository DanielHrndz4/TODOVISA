import React, { useEffect } from "react";
import NavbarWithMegaMenu from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Fade } from "react-awesome-reveal";
import { useLocation, useNavigate } from 'react-router-dom';
import { WAsettings } from "../../../assets/data/ws.data";
import Cookies from "js-cookie"; 
import LoginUserNavbar from "../navbar/LoginUserNavbar";

export default function CountryScreen() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const country = pathSegments[pathSegments.length - 1];
  const navigateTo = useNavigate();

  const getCountryContent = () => {
    switch (country.toLowerCase()) {
      case 'estadosunidos':
        return <div className="w-1/2 m-auto text-center font-semibold">Contenido específico y personalizable que se proporcionara por todovisa para Estados Unidos</div>;
      case 'canada':
        return <div className="w-1/2 m-auto text-center font-semibold">Contenido específico y personalizable que se proporcionara por todovisa para Canadá</div>;
      case 'mexico':
        return <div className="w-1/2 m-auto text-center font-semibold">Contenido específico y personalizable que se proporcionara por todovisa para México</div>;
      case 'inglaterra':
        return <div className="w-1/2 m-auto text-center font-semibold">Contenido específico y personalizable que se proporcionara por todovisa para Inglaterra</div>;
      case 'china':
        return <div className="w-1/2 m-auto text-center font-semibold">Contenido específico y personalizable que se proporcionara por todovisa para China</div>;
      case 'australia':
        return <div className="w-1/2 m-auto text-center font-semibold">Contenido específico y personalizable que se proporcionara por todovisa para Australia</div>;
      case 'india':
        return <div className="w-1/2 m-auto text-center font-semibold">Contenido específico y personalizable que se proporcionara por todovisa para India</div>;
      default:
        return null; 
    }
  };

  useEffect(() => {
    if (!getCountryContent()) {
      navigateTo("/country/canada");
    }
  }, [country, navigateTo]);


  const getCountry = () => {
    switch (country.toLowerCase()) {
      case 'estadosunidos':
        return "Estados Unidos";
      case 'canada':
        return "Canadá";
      case 'mexico':
        return "México";
      case 'inglaterra':
        return "Inglaterra";
      case 'china':
        return "China";
      case 'australia':
        return "Australia";
      case 'india':
        return "India";
      default:
        return "";
    }
  };

  const tokenExist = () => {
    const jwtToken = Cookies.get('jwt');
    if(jwtToken){
      return <LoginUserNavbar />
    }else{
      return <NavbarWithMegaMenu />
    }
  }

  return (
    <main className="h-full w-full absolute">
      {tokenExist()}
      <div className="flex flex-col">
        <div
          className="relative mt-12 mb-4"
          style={{
            backgroundImage: "url('/img/background/bgmain.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "30rem",
            width: "100%",
            backgroundPosition: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="h-full w-full flex items-center justify-center flex-col gap-4 font-semibold [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)]">
            <h1 className="text-white text-5xl lg:text-8xl capitalize">{getCountry()}</h1>
          </div>
        </div>

        {/* Mostrar contenido específico del país */}
        {getCountryContent()}

        <Fade>
          <Footer></Footer>
        </Fade>

        <FloatingWhatsApp {...WAsettings} />
      </div>
    </main>
  );
}
