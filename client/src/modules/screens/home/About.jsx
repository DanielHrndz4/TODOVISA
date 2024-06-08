import React from "react";
import { Slide, Fade } from "react-awesome-reveal"

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
                            <div className="pb-6 pt-4"><h1 className="text-5xl text-center text-TVBlue font-bold">Abre las puertas a un mundo de posibilidades!</h1></div>
                            <div className="py-4"><h2 className="text-2xl text-black">Simplificamos el proceso de solicitud de visa. <strong>(Subtitulo opcional)</strong></h2></div>
                            <div className="pb-6"><p className="text-justify lg:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ea voluptas asperiores! Magni consequuntur nulla veniam, non suscipit, repudiandae neque quo iste reiciendis autem qui unde accusamus, tempora laudantium repellendus. <strong>(Parrafo)</strong></p></div>
                            <div className="grid grid-cols-2 text-justify lg:text-lg gap-2">
                                <span><strong>1)</strong> Estados Unidos</span>
                                <span><strong>2)</strong> Canadá</span>
                                <span><strong>3)</strong> México</span>
                                <span><strong>4)</strong> Inglaterra</span>
                                <span><strong>5)</strong> China</span>
                                <span><strong>6)</strong> Australia</span>
                                <span><strong>7)</strong> India</span>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    );
}