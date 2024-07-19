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
import URI from "../../../assets/data/admin/uri.api";
import GuideSection from "./GuideSection";

export default function Home() {
  const bannerText = lang[0].banner
  const [jwtToken, setJwtToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const cookieJWT = Cookies.get('jwt')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${URI}/hello`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
        } else {
          console.error('Error en la solicitud:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchMessage();
  }, []);

  useEffect(() => {
    if (cookieJWT) {
      const validation = cookieJWT
      setJwtToken(validation)
    }
    setLoading(false);
  }, []);

  if (loading) {
    return
  }

  return (
    <Fade duration={1000} triggerOnce > {/* Añade la animación de fade */}
      <main className="h-full w-full overflow-auto lg:absolute bg-[#fafafa]">
        {jwtToken ? <LoginUserNavbar /> : <NavbarWithMegaMenu />}
        <div className="flex flex-col w-full">
          <div className="backgroundgradient w-full">
            <div
              className="relative mt-12 mb-4" // Adjust based on the height of the navbar
              style={{
                backgroundImage: "url('/img/background/bannereeuu.webp')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "40rem", // Ensure it covers at least 30rem height
                width: "100%",
                backgroundPosition: "top",
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
          <GuideSection></GuideSection>
          <hr className="my-8 bg-white" />
          {/* VIPRO form section */}
          <VIPRO validation={jwtToken}></VIPRO>
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
