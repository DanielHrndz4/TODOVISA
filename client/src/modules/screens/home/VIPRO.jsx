import { Button } from "@material-tailwind/react";
import React from "react";
import { Slide, Fade } from "react-awesome-reveal"
import handleClickPopUp from "../../components/popup/PopUpPayVIPRO";
import Cookies from "js-cookie"
import handleClickPopUpSignUp from "../../components/popup/PopUpSignUp";
import lang from "../../../assets/data/lang.data"

const handlePopUp = () => {
    if (Cookies.get('jwt')) {
        const html = `
        <div id="popupContainer" class="popup-container">
            <div class="w-full">
                <h2 class="pt-4 pb-8" style="font-size: 1.5rem; font-weight: 600;" className="font-semibold">Selecciona una opción:</h2>
                <div class="w-full grid grid-cols-2 gap-4">
                    <div className="w-full bg-blue-gray-500"><input type="radio" name="option" value="estadosunidos"> Estados Unidos</div>
                    <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="canada"> Canadá</div>
                    <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="mexico"> México</div>
                    <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="england"> Inglaterra</div>
                    <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="china"> China</div>
                    <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="australia"> Australia</div>
                    <div className="w-full bg-blue-gray-500"><input type="radio" name="option" disabled value="india"> India</div>
                </div>
                <p class="text-justify pt-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad delectus vero blanditiis repellat aliquid nesciunt, adipisci officia minus debitis sunt? <strong>Se pueden agregar los términos y condiciones </strong></p>
                <h1 class="font-bold text-3xl pt-6">$11.99</h1>
            </div>
        </div>
    `;
    const btn = 'Proceder a la compra';
    handleClickPopUp(html, btn);
    }else{
        const html = `
        <div id="popupContainer" class="popup-container">
            <div class="w-full">
                <h2 class="pt-2 pb-2" style="font-size: 3rem; font-weight: 600;" className="font-semibold">Oops...</h2>
                <p class="text-center pt-2">Debes iniciar sesión para ejecutar esta acción.</strong></p>
            </div>
        </div>
    `;
    const btn = 'Aceptar';
        handleClickPopUpSignUp('error', html, btn)
    } 
}

export default function VIPRO(props) {
    return (
        <div className="flex flex-col h-full lg:mb-4" id="vipro">
            <div className="min-h-[55%] h-[55%] absolute"></div>
            <div className="flex flex-col lg:px-7 lg:flex-row gap-4 h-full z-100 relative w-full lg:w-full xl:w-[80%] m-auto">
                <Fade className="w-full flex flex-col lg:py-0 xl:py-8 mx-auto text-black">
                    <div className="w-full flex flex-col lg:py-8 mx-auto text-black">
                        <div className="w-full lg:py-0 xl:py-8 lg:px-7 sm:px-20 px-6">
                            <div className="pb-4 lg:pb-6 pt-4"><h1 className="text-4xl lg:text-3xl xl:text-5xl text-center text-TVBlue font-bold">VIPRO Formulario</h1></div>
                            <div className="py-4">
                                <h2 className="text-xl lg:text-lg xl:text-2xl text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. <strong>Subtitulo opcional</strong></h2>
                                <img src="/img/VIPRO/theline.png" alt="" className="py-4" />
                            </div>
                            <div className="pb-6"><p className="text-justify lg:text-md xl:text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate nulla consectetur maxime quae aliquam harum obcaecati alias dolores, assumenda natus excepturi hic iusto! Quibusdam minus repudiandae, deserunt dolore laboriosam hic eum magni numquam natus, laborum rem vero nesciunt accusantium libero. <strong>parrafo</strong></p></div>
                            <div className="lg:text-lg">
                                <Button className="py-4 px-6 rounded-sm shadowbtn bg-TVred" onClick={() => handlePopUp()}>Realizar Formulario</Button>
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