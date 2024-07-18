import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie"
import URI from "../../../assets/data/admin/uri.api";
import { Fade, Slide } from "react-awesome-reveal";

const GuideSection = () => {
    const [isValidateDownload, setIsValidateDownload] = useState(false);

    useEffect(() => {
        if (Cookies.get('jwt')) {
            const userEmail = Cookies.get('user');
            const userDataEmail = JSON.parse(userEmail);
            const email = userDataEmail.email
            const validatePDF = async () => {
                try {
                    const response = await fetch(
                        `${URI}/validate_pdf`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email })
                        }
                    );
                    const data = await response.json();
                    if (response.ok) {
                        setIsValidateDownload(true);
                        console.log(data.message)
                    }
                    console.log(data.message)
                } catch (err) {
                    console.error(err);
                }
            };
            validatePDF()
        }
    }, [])

    const downloadPdf = () => {
        const pdfPath = './A9bC3dE4FgH5IjK6LmN7oP8QrS9TuV0WxY1Za2Bc3Dd4Ef5Gh6Ij7Kl8Mn9Op0Qr1St2Uv3Wx4Yz5A6B7C8D9E0F1G2H3I4J5K6L.pdf';
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'GUIA_TODOVISA.pdf';
        link.click();
    };

    return (
        <div className="relative text-center w-full m-auto py-4" style={{ position: 'relative' }}>
            <div
                className="absolute inset-0 z-0"
            // style={{
            //     backgroundImage: `url('./img/background/bgmain.png')`,
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center',
            //     backgroundRepeat: 'no-repeat',
            //     filter: 'blur(2px)',  // Aplica el desenfoque
            //     WebkitFilter: 'blur(2px)'
            // }}
            ></div>
            <div className="relative z-10 text-center xl:w-[85%] w-full lg:px-14 sm:px-20 px-6 m-auto">
                <Fade>
                    <h2 className="text-xl lg:text-lg xl:text-2xl text-TVBlue">Consigue nuestra guía completa para obtener tu <strong className="capitalize">visa americana</strong></h2>
                    
                    <p className="text-justify lg:text-md xl:text-lg text-black pt-6">Bienvenidos a un viaje de descubrimiento personal y oportunidad transformadora. Esta guía no es solo un manual, sino un compañero estratégico diseñado para todos aquellos que sueñan con cruzar las fronteras hacia nuevas posibilidades en los Estados Unidos. Aquí aprenderás cómo tu historia, habilidades y trayectoria pueden convertirse en tus mayores activos en este viaje. Con un enfoque personalizado y ejemplos prácticos, esta guía te ofrece el conocimiento y las herramientas necesarias para maximizar tus posibilidades de éxito al presentar tu caso ante los consulados americanos. Prepárate para empoderarte con información que te permitirá tomar decisiones informadas y estratégicas, y comienza tu camino hacia un futuro más brillante.</p>
                </Fade>
                <img src="/img/VIPRO/theline.png" alt="" className="py-5" />
                <div className="flex justify-center items-center">
                    {isValidateDownload ? (
                        <Slide>
                            <Button className="py-4 px-6 rounded-sm shadowbtn bg-TVred" onClick={downloadPdf}>
                                Descargar PDF
                            </Button>
                        </Slide>
                    ) : (
                        <Slide>
                            <Button className="py-4 px-10 rounded-sm shadowbtn bg-TVred" onClick={() => window.open('/guide', '_black')}>
                                Ver PDF
                            </Button>
                        </Slide>
                    )}
                </div>
            </div>
        </div>

    )
}

export default GuideSection