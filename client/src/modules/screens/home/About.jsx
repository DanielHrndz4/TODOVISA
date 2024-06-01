import React from "react";

export default function About() {
    return (
        <div className="flex flex-col h-full mb-4">
            <div className="bg-gray-400 w-full min-h-[55%] h-[55%] absolute"></div>
            <div className="flex flex-row gap-16 h-full z-100 relative">
                <div className="w-full flex justify-center items-end flex-col py-8">
                    <img src="/img/about/about.png" alt="" className="w-[75%]" />
                </div>
                <div className="w-full flex flex-col py-8 mx-auto text-black">
                    <div className="w-[75%] py-8 px-6">
                    <div className="py-4"><h1 className="text-3xl">Title</h1></div>
                    <div className="py-4"><h2 className="text-2xl">Subtitle</h2></div>
                    <div className="pb-6"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis vel eum laudantium eveniet sapiente! Quisquam iusto voluptatum provident eos.</p></div>
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
            </div>
        </div>
    );
}
