import React, { useEffect, useState } from "react";
import LoginUserNavbar from "../navbar/LoginUserNavbar";
import NavbarWithMegaMenu from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { WAsettings } from "../../../assets/data/ws.data";
import { Fade } from "react-awesome-reveal";
import Cookies from "js-cookie";

export default function Steps() {
    const [jwtValidation, setJwtValidation] = useState('');
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
          const validation = sessionStorage.getItem('SESSION');
          setJwtValidation(validation)
        }
      }, []);

    return (
        <main className="bg-[#fafafa]">
            {jwtValidation ? <LoginUserNavbar /> : <NavbarWithMegaMenu />}
            <div className="flex w-[95%] sm:w-[80%] md:w-[75%] lg:w-[75%] xl:w-[75%] m-auto flex-col pb-16 pt-[150px]">
                <h1 className="text-3xl font-bold mb-8 py-2 text-center text-TVBlue">¿Cómo realizar tu pago seguro con TodoVisa en 4 sencillos pasos?</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadowbtn hover:scale-[1.02] hover:cursor-pointer ease-in-out duration-150">
                        <div className="w-full h-[300px] flex items-center justify-center mb-4">
                            <img src="/img/payment/paso1.jpg" alt="Imagen del paso 1" className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-semibold mb-2">Paso 1: Seleccionar el país</h2>
                            <p>Primero, elige el país para el cual deseas realizar el servicio VIPRO. Puedes seleccionar entre una variedad de opciones que mejor se adapten a tus necesidades.</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadowbtn hover:scale-[1.02] hover:cursor-pointer ease-in-out duration-150">
                        <div className="w-full h-[300px] flex items-center justify-center mb-4">
                            <img src="/img/payment/paso2.jpg" alt="Imagen del paso 2" className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-semibold mb-2">Paso 2: Proceder al pago</h2>
                            <p>
                                Una vez seleccionado tu país, procede al pago utilizando tu tarjeta de débito o crédito. Aceptamos Visa, Mastercard, American Express y otras tarjetas principales, asegurando que tu información esté protegida con nuestras medidas de seguridad avanzadas.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadowbtn hover:scale-[1.02] hover:cursor-pointer ease-in-out duration-150">
                        <div className="w-full h-[300px] flex items-center justify-center mb-4">
                            <img src="/img/payment/paso3.jpg" alt="Imagen del paso 3" className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-semibold mb-2">Paso 3: Confirmación y captura</h2>
                            <p>Al finalizar el pago, recibirás una confirmación de la transacción. Asegúrate de tomar una captura de pantalla o una foto del comprobante para tus registros.</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadowbtn hover:scale-[1.02] hover:cursor-pointer ease-in-out duration-150">
                        <div className="w-full h-[300px] flex items-center justify-center mb-4">
                            <img src="/img/payment/paso4.jpg" alt="Imagen del paso 4" className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-semibold mb-2">Paso 4: Enviar comprobante</h2>
                            <p>Envía la captura de pantalla o foto del comprobante al WhatsApp de TodoVisa. Una vez que nuestro equipo confirme el pago, podrás proceder a completar el formulario VIPRO sin preocupaciones. También asegúrate de enviar el comprobante al correo electrónico indicado para garantizar una rápida verificación.</p>
                        </div>
                    </div>
                </div>
                <div className="w-[75%] m-auto">
                    <p className="pt-10 text-center font-semibold text-xl">¡Listo! Has completado tu pago de manera segura y eficiente con TodoVisa.</p>
                </div>
            </div>
            <Fade><Footer /></Fade>
            <FloatingWhatsApp {...WAsettings} />
        </main>
    );
}
