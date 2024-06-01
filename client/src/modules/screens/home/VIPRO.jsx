import { Slide, Fade } from "react-awesome-reveal"
import React from "react";

export default function VIPRO() {
    return (
        <div className="w-full flex flex-col flex-grow py-8">
            <div className="flex flex-row relative bg-TVsecondaryColor gap-4">
                <Fade className="w-full flex justify-end items-center">
                    <div className="w-full flex justify-end items-center">
                        texto
                    </div>
                </Fade>
                <div className="w-full flex justify-start items-end flex-grow">
                    <Slide><img src="/img/VIPRO/VIPROimg.png" alt="" className="h-[105%] w-[65%]" /></Slide>
                </div>
            </div>
        </div>
    );
}