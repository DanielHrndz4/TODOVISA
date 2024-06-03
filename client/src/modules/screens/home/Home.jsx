import React from "react";
import NavbarWithMegaMenu from "../navbar/Navbar";
import About from "./About";
import VIPROCarrousel from "./VIPROCarrousel";
import Footer from "../footer/Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import ContactUs from "./contactUs/ContactUs";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  const WAsettings = {
    phoneNumber: "50371985205",
    accountName: "Todovisa",
    placeholder: "Escribe un mensaje",
    avatar: "/img/logo/todovisaLogo.jpg",
    chatMessage:
      "¡Hola! 👋 \nBienvenido a Todovisa.\n¿En qué podemos ayudarte hoy? 😊",
    statusMessage: "En linea",
  };
  return (
    <main className="h-full w-full absolute">
      <NavbarWithMegaMenu />
      <div className="flex flex-col">
        <div
          className="relative mt-12 mb-4" // Adjust based on the height of the navbar
          style={{
            backgroundImage: "url('/img/background/bgmain.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "30rem", // Ensure it covers at least 30rem height
            width: "100%",
            backgroundPosition: "right",
            display: "flex", // Ensure the child div can stretch to full height
            alignItems: "center", // Center content vertically if needed
            justifyContent: "center", // Center content horizontally if needed
          }}
        >
          <div className="h-full w-full flex items-center justify-center">
            <h1 className="text-white">TEXTO ALTERNATIVO TODOVISA</h1>
          </div>
        </div>

        {/* About section */}
        <About></About>
        <hr className="my-8" />
        {/* VIPROCarrousel section */}
        <VIPROCarrousel></VIPROCarrousel>
        <hr className="my-8" />
        {/* VIPRO form section */}
        <About></About>
        <hr className="my-8" />
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
