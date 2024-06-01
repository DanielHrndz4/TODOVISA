import React from "react";
import {Slide, Fade} from "react-awesome-reveal"

export default function About() {
    return (
        <div className="flex flex-col h-full mb-4">
            <div className="min-h-[55%] h-[55%] absolute"></div>
            <div className="flex flex-row gap-4 h-full z-100 relative w-full lg:w-[85%] m-auto">
                <div className="w-full flex justify-center items-end flex-col py-8">
                    <Slide className="w-[90%]"><img src="/img/about/about.png" alt="" /></Slide>
                </div>
                <Fade className="w-full flex flex-col py-8 mx-auto text-black">
                <div className="w-full flex flex-col py-8 mx-auto text-black">
                    <div className="w-[90%] py-8 px-6">
                    <div className="py-4"><h1 className="text-3xl">Title</h1></div>
                    <div className="py-4"><h2 className="text-2xl">Subtitle</h2></div>
                    <div className="pb-6"><p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis vel eum laudantium eveniet sapiente! Quisquam iusto voluptatum provident eos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod suscipit animi saepe nostrum tempore magnam eaque consequatur doloremque, cum ipsum!</p></div>
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