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
import Cookies from "js-cookie";
import lang from "../../../assets/data/lang.data";
import URI from "../../../assets/data/admin/uri.api";
import GuideSection from "./GuideSection";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import AppointmentSection from "./AppointmentSection";

export default function Home() {
  const bannerText = lang[0].banner;
  const [jwtToken, setJwtToken] = useState(false);
  const [loading, setLoading] = useState(true);
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
      const validation = cookieJWT;
      setJwtToken(validation);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slides = [
    {
      image: "/img/background/bgeeuu.webp",
      position: "bottom",
    },
    {
      image: "/img/background/bgmain4.jpg",
      position: "center",
    },
    {
      image: "/img/background/bgmx.webp",
      position: "center",
    },
  ];

  return (
    <Fade duration={1000} triggerOnce>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Todovisa - Guías y Asesoría para Tu Visa</title>
        <meta
          name="description"
          content="Descubre cómo Todovisa puede ayudarte a obtener tu visa. Consulta nuestras guías completas, formulario VIPRO y mucho más para tu viaje internacional."
        />
        <meta
          name="keywords"
          content="visas, Todovisa, guía de visas, formulario VIPRO, contacto, asesoría de visas"
        />
        <meta
          property="og:title"
          content="Todovisa - Guías y Asesoría para Tu Visa"
        />
        <meta
          property="og:description"
          content="Descubre cómo Todovisa puede ayudarte a obtener tu visa. Consulta nuestras guías completas, formulario VIPRO y mucho más para tu viaje internacional."
        />
        <meta
          property="og:image"
          content="https://todovisa.com/img/logo/todovisaLogo.jpg"
        />
        <meta property="og:url" content="https://todovisa.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Todovisa - Guías y Asesoría para Tu Visa"
        />
        <meta
          name="twitter:description"
          content="Descubre cómo Todovisa puede ayudarte a obtener tu visa. Consulta nuestras guías completas, formulario VIPRO y mucho más para tu viaje internacional."
        />
        <meta
          name="twitter:image"
          content="https://todovisa.com/img/logo/todovisaLogo.jpg"
        />
        <meta name="twitter:site" content="@todovisa" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://todovisa.com/" />
      </Helmet>
      <main className="h-full w-full overflow-auto lg:absolute bg-[#fafafa]">
        {jwtToken ? <LoginUserNavbar /> : <NavbarWithMegaMenu />}
        <div className="flex flex-col w-full">
          {/* Banner Carousel section */}
          <div className="flex flex-col w-full">
            <div className="relative banner-carousel">
              <Slider {...carouselSettings}>
                {slides.map((slide, index) => (
                  <div key={index} className="banner-slide">
                    <div
                      className="banner-image mt-0 xl:mt-[25px]"
                      style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        minHeight: "40rem",
                        width: "100%",
                        backgroundPosition: slide.position,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                ))}
              </Slider>
              {/* Static Text */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-semibold z-10">
                <Fade>
                  <div className="flex flex-col gap-4 [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)]">
                    <h1 className="text-white text-3xl text-center sm:text-4xl">
                      {bannerText.title}
                    </h1>
                    <h1 className="text-white text-5xl text-center sm:text-7xl">
                      {bannerText.todovisa}
                    </h1>
                  </div>
                </Fade>
              </div>
            </div>

            {/* About section */}
            <About></About>
            <hr className="my-8 bg-white" />
            {/* VIPROCarrousel section */}
            <VIPROCarrousel></VIPROCarrousel>
            <hr className="my-4 bg-white" />
            <GuideSection></GuideSection>
            <hr className="mt-8 bg-white" />
            {/* Appointment Section TODOVISA */}
            <AppointmentSection></AppointmentSection>
            <hr className="my-8 bg-white" />
            {/* VIPRO form section */}
            <VIPRO validation={jwtToken}></VIPRO>
            <hr className="mb-4 bg-white" />
            {/* Contact Us form */}
            <ContactUs></ContactUs>
            {/* Footer section */}
            <Fade>
              <Footer></Footer>
            </Fade>

            <FloatingWhatsApp {...WAsettings} />
          </div>
        </div>
      </main>
    </Fade>
  );
}
