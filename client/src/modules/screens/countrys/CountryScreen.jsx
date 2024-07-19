import React, { useEffect } from "react";
import NavbarWithMegaMenu from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Fade } from "react-awesome-reveal";
import { useLocation, useNavigate } from 'react-router-dom';
import { WAsettings } from "../../../assets/data/ws.data";
import Cookies from "js-cookie"; 
import LoginUserNavbar from "../navbar/LoginUserNavbar";
import Mexico from "./mexico/Mexico";
import Canada from "./canada/Canada";
import Australia from "./australia/Australia";
import England from "./inglaterra/England";
import India from "./india/India";

export default function CountryScreen() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const country = pathSegments[pathSegments.length - 1];
  const navigateTo = useNavigate();

  const getCountryContent = () => {
    switch (country.toLowerCase()) {
      case 'estadosunidos':
        return <div className="w-1/2 m-auto text-center font-semibold"></div>;
      case 'canada':
        return <Canada></Canada>;
      case 'mexico':
        return <Mexico></Mexico>;
      case 'inglaterra':
        return <England></England>;
      case 'china':
        return <div className="w-1/2 m-auto text-center font-semibold"></div>;
      case 'australia':
        return <Australia></Australia>;
      case 'india':
        return <India></India>;
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
    <main className="h-full w-full absolute bg-[#fafafa]">
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
            <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl capitalize">{getCountry()}</h1>
          </div>
        </div>

        {getCountryContent()}

        <Fade>
          <Footer></Footer>
        </Fade>

        <FloatingWhatsApp {...WAsettings} />
      </div>
    </main>
  );
}
