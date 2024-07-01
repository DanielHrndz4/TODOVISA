import React from "react";
import { Slide, Fade } from "react-awesome-reveal"
import ContactForm from "./ContactForm";
import Map from "../../../components/map/Map";
import lang from "../../../../assets/data/lang.data";

export default function ContactUs() {
    const contact  = lang[0].contact.title
    return (
        <div className="flex flex-col h-full bg-TVBlue py-8 text-white" id="contactus">
            <h1 className="w-full pt-4 sm:pb-12 pb-6 text-5xl lg:text-4xl xl:text-5xl font-bold text-center text-white">{contact}</h1>
            <div className="flex flex-col lg:flex-row gap-12 h-full z-100 relative w-full lg:w-[95%] m-auto">
                <div className="w-full lg:w-1/2 flex justify-center items-end lg:flex-col lg:py-8 m-auto">
                    <Slide><ContactForm></ContactForm></Slide>
                </div>
                <Fade className="w-full flex h-full flex-col xl:pb-0 lg:pb-0 pb-8 m-auto text-black">
                    <Map></Map>
                </Fade>
            </div>
        </div>
    );
}