import React, { useEffect, useState } from "react";
import { Slide, Fade } from "react-awesome-reveal"
import lang from "../../../assets/data/lang.data";
import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import URI from "../../../assets/data/admin/uri.api";

export default function About() {
    const aboutText = lang[0].about
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

    const countries = () => {
        const country = Object.values(lang[0].about.countries);
        return country.map((country, index) => (
            <span key={index}><strong>{index + 1})</strong> {country.name}</span>
        ));
    }

    const downloadPdf = () => {
        const pdfPath = './A9bC3dE4FgH5IjK6LmN7oP8QrS9TuV0WxY1Za2Bc3Dd4Ef5Gh6Ij7Kl8Mn9Op0Qr1St2Uv3Wx4Yz5A6B7C8D9E0F1G2H3I4J5K6L.pdf';
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'GUIA_TODOVISA.pdf';
        link.click();
    };

    return (
        <div className="flex flex-col h-full lg:mb-4" id="about">
            <div className="min-h-[55%] h-[55%] absolute"></div>
            <div className="flex flex-col-reverse gap-4 mt-4 lg:mt-7 xl:mt-4 lg:flex-row lg:gap-4 h-full z-100 relative w-full lg:w-full lg:px-7 xl:w-[85%] m-auto">
                <div className="w-full flex justify-center items-center lg:items-end flex-col py-8 lg:py-0 xl:py-8">
                    <Slide className="w-[85%] lg:w-full xl:w-[85%] sm:w-[75%]"><img src="/img/about/about.png" alt="" /></Slide>
                </div>
                <Fade className="w-full flex flex-col pb-2 sm:py-8 lg:py-0 xl:py-0 mx-auto text-black">
                    <div className="w-full flex flex-col lg:py-0 xl:py-0 mx-auto text-black">
                        <div className="w-full lg:py-8 sm:px-20 lg:px-7 px-6">
                            <div className="pt-4"><h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold">{aboutText.title}</h1></div>
                            <div className="py-4">
                                <img src="/img/VIPRO/theline.png" alt="" className="py-4" />
                            </div>
                            <div className="pb-6"><p className="text-justify lg:text-md xl:text-lg ">{aboutText.description}</p></div>
                            {/* <div className="grid grid-cols-2 text-justify lg:text-md xl:text-lg gap-2">
                                {countries()}
                            </div> */}
                            <div className="flex justify-center items-center">
                            {
                                isValidateDownload ?
                                    (<Button className="py-4 px-6 rounded-sm shadowbtn bg-TVred" onClick={downloadPdf}>
                                        Descargar PDF
                                    </Button>) :
                                    (<Button className="py-4 px-10 rounded-sm shadowbtn bg-TVred" onClick={() => window.open('/guide', '_black')}>
                                        Ver PDF
                                    </Button>)
                            }
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    );
}