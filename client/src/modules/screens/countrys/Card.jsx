import React from "react";

export const cards = (country, img, theme, description) => {
    return (
        <div className="relative my-4 lg:my-8 m-auto bg-white rounded-lg shadowbtn overflow-hidden max-w-[370px] w-full max-h-[300px] h-screen transform transition-transform duration-500 ease-in-out">
            <div className="w-full h-full max-h-[240px] bg-cover bg-center" style={{ backgroundImage: `url(../img/countries/mexico/${img})` }}></div>
            <div className="flex flex-col justify-center items-center h-[60px]">
                <h1 className="text-center py-2 text-xl font-semibold text-gray-900">{theme}</h1>
            </div>
            <div className="px-6 pt-8 absolute top-0 left-0 w-full h-full bg-white transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100 hover:cursor-pointer">
                <h2 className="relative mb-2 text-xl font-bold tracking-widest uppercase text-gray-800">
                    {theme}
                    <span className="absolute top-1/2 right-0 transform -translate-y-1/2 w-9 h-5 bg-cover bg-right" style={{ backgroundImage: `url(../img/countries/mexico/${country})` }}></span>
                </h2>
                <p className=" text-base font-normal text-justify text-gray-700 lg:text-md xl:text-lg">
                    {description}
                </p>
            </div>
        </div>
    )
}
