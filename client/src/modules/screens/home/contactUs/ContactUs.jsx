import React from "react";
import { Slide, Fade } from "react-awesome-reveal"
import ContactForm from "./ContactForm";
import Map from "../../../components/map/Map";

export default function ContactUs() {
    return (
        <div className="flex flex-col h-full bg-TVBlue py-8 text-white" id="contactus">
            <h1 className="w-full pt-4 pb-6 text-5xl font-bold text-center text-white">Contáctanos</h1>
            <div className="flex flex-row gap-12 h-full z-100 relative w-full lg:w-[85%] m-auto">
                <div className="w-full lg:w-1/2 flex justify-center items-end flex-col py-8">
                    <Slide><ContactForm></ContactForm></Slide>
                </div>
                <Fade className="w-full flex h-full flex-col py-8 m-auto text-black">
                    <Map></Map>
                </Fade>
            </div>

        </div>
    );
}