import React from "react";
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
          className="relative mt-12 mb-4" // Adjust based on the height of the navbar
          style={{
            backgroundImage: "url('/img/background/bgmain4.jpg')", 
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "35rem", // Ensure it covers at least 30rem height
            width: "100%",
            backgroundPosition: "center",
            display: "flex", // Ensure the child div can stretch to full height
            alignItems: "center", // Center content vertically if needed
            justifyContent: "center", // Center content horizontally if needed
          }}
        >
          <div className="h-full w-full flex items-center justify-center flex-col gap-4 font-semibold [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)]">
            <h1 className="text-white text-4xl">
              ¡Abre las puertas al mundo!</h1>
            <h1 className="text-white text-7xl">Todo Visa</h1>
          </div>
        </div>

        {/* About section */}
        <About></About>
        <hr className="my-8 bg-white" />
        {/* VIPROCarrousel section */}
        <VIPROCarrousel></VIPROCarrousel>
        <hr className="my-8 bg-white" />
        {/* VIPRO form section */}
        <VIPRO></VIPRO>
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
  );
}
