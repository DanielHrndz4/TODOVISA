import React from "react";
import {Slide, Fade} from "react-awesome-reveal"

export default function About() {
    return (
        <div className="flex flex-col h-full mb-4" id="about">
            <div className="min-h-[55%] h-[55%] absolute"></div>
            <div className="flex flex-row gap-4 h-full z-100 relative w-full lg:w-[85%] m-auto">
                <div className="w-full flex justify-center items-end flex-col py-8">
                    <Slide className="w-[90%]"><img src="/img/about/about.png" alt="" /></Slide>
                </div>
                <Fade className="w-full flex flex-col py-8 mx-auto text-black">
                <div className="w-full flex flex-col py-8 mx-auto text-black">
                    <div className="w-full py-8 px-6">
                    <div className="py-4"><h1 className="text-3xl text-center text-TVBlue font-bold">Abre las puertas a un mundo de posibilidades</h1></div>
                    <div className="py-4"><h2 className="text-2xl text-TVred">Simplificamos el proceso de solicitud de visa para que puedas cumplir tus sueños de viajar.</h2></div>
                    <div className="pb-6"><p className="text-justify">Somos un equipo de expertos en visas con una amplia experiencia en el proceso de solicitud de visas para todo tipo de destinos. Nos apasiona ayudar a las personas a cumplir sus sueños de viajar y explorar el mundo.</p></div>
                    <div className="grid grid-cols-2">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                    </div>
                    </div>
                </div>
                </Fade>
            </div>
        </div>
    );
}