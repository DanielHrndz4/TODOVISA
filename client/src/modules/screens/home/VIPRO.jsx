import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import { Slide, Fade } from "react-awesome-reveal"
import handleClickPopUp from "../../components/popup/PopUpPayVIPRO";
import Cookies from "js-cookie"
import handleClickPopUpSignUp from "../../components/popup/PopUpSignUp";
import lang from "../../../assets/data/lang.data"

const handlePopUp = (validate) => {
    const countries = lang[0].about.countries;
    const popupWithLoginText = lang[0].popupWithLogin;

    if (Cookies.get('jwt') && validate) {
        const html = `
            <div id="popupContainer" class="popup-container">
                <div class="w-full">
                    <h2 class="pt-4 pb-6" style="font-size: 1.5rem; font-weight: 600;" className="font-semibold">${popupWithLoginText.title}</h2>
                    <div class="w-full grid grid-cols-2 gap-4">
                        <div className="w-full bg-blue-gray-500"><input type="radio" name="option" value="estadosunidos"> ${countries.usa.name}</div>
                        <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="canada"> ${countries.canada.name}</div>
                        <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="mexico"> ${countries.mexico.name}</div>
                        <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="inglaterra"> ${countries.uk.name}</div>
                        <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="china"> ${countries.china.name}</div>
                        <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="australia"> ${countries.australia.name}</div>
                        <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="india"> ${countries.india.name}</div>
                    </div>
                    <p class="text-justify pt-8">${popupWithLoginText.description}</p>
                    <h1 class="font-bold text-3xl pt-5 PB-1">$19.99</h1>
                    <div class="relative mt-4 z-50 w-[95%] py-[7px] bg-yellow-600 shadow-xl m-auto justify-center items-center text-black">
                    Recibirás un <strong>25%</strong> de descuento en tu asesoría
                    </div>
                    <div class="flex flex-row w-full z-40">
                        <div class="h-6 -mt-4 w-[50px] py-[7px] bg-yellow-600 flex justify-center items-center"></div>
                        <div class="h-6 -mt-4 w-full py-[7px] flex justify-center items-center"></div>
                        <div class="h-6 -mt-4 w-[50px] py-[7px] bg-yellow-600 flex justify-center items-center"></div>
                    </div>
                    <h1 class="text-center font-bold text-lg pt-2 text-TVred hover:underline hover:cursor-pointer" onClick="window.open('/steps', '_blank')">¿Cómo realizo una compra?</h1>
                </div>
            </div>
        `;
        const btn = popupWithLoginText.button;
        handleClickPopUp(html, btn);
    } else {
        const popupWithoutLogin = lang[0].popupWithoutLogin;
        const html = `
            <div id="popupContainer" class="popup-container">
                <div class="w-full">
                    <h2 class="pt-2 pb-2" style="font-size: 3rem; font-weight: 600;" className="font-semibold">${popupWithoutLogin.title}</h2>
                    <p class="text-center pt-2">${popupWithoutLogin.description}</strong></p>
                </div>
            </div>
        `;
        const btn = popupWithoutLogin.button;
        handleClickPopUpSignUp('error', html, btn);
    }
};

export default function VIPRO(props) {
    const viproSection = lang[0].VIPRO
    return (
        <div className="flex flex-col h-full lg:mb-4" id="vipro">
            <div className="min-h-[55%] h-[55%] absolute"></div>
            <div className="flex flex-col lg:px-7 lg:flex-row gap-4 h-full z-100 relative w-full lg:w-full xl:w-[80%] m-auto">
                <Fade className="w-full flex flex-col lg:py-0 xl:py-0 mx-auto text-black">
                    <div className="w-full flex flex-col lg:py-0 xl:py-0 mx-auto text-black">
                        <div className="w-full lg:py-0 xl:py-8 lg:px-7 sm:px-20 px-6">
                            <div className="pb-4 lg:pb-6 pt-4"><h1 className="text-4xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold">{viproSection.title}</h1></div>
                            <div className="py-4">
                                <h2 className="text-xl lg:text-lg xl:text-2xl text-black text-center">{viproSection.subtitle.title} <strong>{viproSection.subtitle.strong}</strong></h2>
                                <img src="/img/VIPRO/theline.png" alt="" className="py-4" />
                            </div>
                            <div className="pb-6"><p className="text-justify lg:text-md xl:text-lg">{viproSection.text} <strong>{viproSection.strong} <span className="text-TVBlue hover:underline hover:cursor-pointer"><a href="https://www.facebook.com/Volamosviajes/?locale=es_LA" target="_blank">Volamos Viajes</a></span></strong>.</p></div>
                            <div className="lg:text-lg">
                                <Button className="py-4 px-6 rounded-sm shadowbtn bg-TVred" onClick={() => handlePopUp(props.validation)}>{viproSection.button}</Button>
                            </div>
                        </div>
                    </div>
                </Fade>
                <div className="w-full flex justify-center items-end flex-col lg:py-2 xl:py-8 py-8">
                    <Slide className="w-[90%] sm:w-[75%] lg:w-[90%]  m-auto lg:m-none"><img src="/img/VIPRO/viproform.png" alt="" /></Slide>
                </div>
            </div>
        </div>
    );
}