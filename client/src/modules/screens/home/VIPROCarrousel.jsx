import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Button
} from "@material-tailwind/react";
import {Fade} from "react-awesome-reveal"

function VIPROCarrousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-TVsecondaryColor py-8" id="services">
      <div className="slider-container w-[90%] mx-auto">
      <Slider {...settings} className="flex gap-4">
        <Fade><div className="mx-2">
          <div className="w-[90%] m-auto bg-white p-4 rounded-md">
            <img src="/img/VIPRO/viprobackground.png" alt="" className="max-h-[15rem] w-full h-full rounded-md"/>
            <h1 className="text-xl lg:text-2xl font-semibold pt-2">Canada</h1>
            <p className="py-2 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cupiditate accusantium fugit dolorum</p>
            <Button className="w-full">Accion</Button>
          </div>
        </div></Fade>
        <Fade><div className="mx-2">
          <div className="w-[90%] m-auto bg-white p-4 rounded-md">
            <img src="/img/VIPRO/viprobackground.png" alt="" className="max-h-[15rem] w-full h-full rounded-md"/>
            <h1 className="text-xl lg:text-2xl font-semibold pt-2">Canada</h1>
            <p className="py-2 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cupiditate accusantium fugit dolorum</p>
            <Button className="w-full">Accion</Button>
          </div>
        </div></Fade>
        <Fade><div className="mx-2">
          <div className="w-[90%] m-auto bg-white p-4 rounded-md">
            <img src="/img/VIPRO/viprobackground.png" alt="" className="max-h-[15rem] w-full h-full rounded-md"/>
            <h1 className="text-xl lg:text-2xl font-semibold pt-2">Canada</h1>
            <p className="py-2 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cupiditate accusantium fugit dolorum</p>
            <Button className="w-full">Accion</Button>
          </div>
        </div></Fade>
        <Fade><div className="mx-2">
          <div className="w-[90%] m-auto bg-white p-4 rounded-md">
            <img src="/img/VIPRO/viprobackground.png" alt="" className="max-h-[15rem] w-full h-full rounded-md"/>
            <h1 className="text-xl lg:text-2xl font-semibold pt-2">Canada</h1>
            <p className="py-2 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cupiditate accusantium fugit dolorum</p>
            <Button className="w-full">Accion</Button>
          </div>
        </div></Fade>
        <Fade><div className="mx-2">
          <div className="w-[90%] m-auto bg-white p-4 rounded-md">
            <img src="/img/VIPRO/viprobackground.png" alt="" className="max-h-[15rem] w-full h-full rounded-md"/>
            <h1 className="text-xl lg:text-2xl font-semibold pt-2">Canada</h1>
            <p className="py-2 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cupiditate accusantium fugit dolorum</p>
            <Button className="w-full">Accion</Button>
          </div>
        </div></Fade>
        <Fade><div className="mx-2">
          <div className="w-[90%] m-auto bg-white p-4 rounded-md">
            <img src="/img/VIPRO/viprobackground.png" alt="" className="max-h-[15rem] w-full h-full rounded-md"/>
            <h1 className="text-xl lg:text-2xl font-semibold pt-2">Canada</h1>
            <p className="py-2 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cupiditate accusantium fugit dolorum</p>
            <Button className="w-full">Accion</Button>
          </div>
        </div></Fade>
        <Fade><div className="mx-2">
          <div className="w-[90%] m-auto bg-white p-4 rounded-md">
            <img src="/img/VIPRO/viprobackground.png" alt="" className="max-h-[15rem] w-full h-full rounded-md"/>
            <h1 className="text-xl lg:text-2xl font-semibold pt-2">Canada</h1>
            <p className="py-2 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cupiditate accusantium fugit dolorum</p>
            <Button className="w-full">Accion</Button>
          </div>
        </div></Fade>
        <Fade><div className="mx-2">
          <div className="w-[90%] m-auto bg-white p-4 rounded-md">
            <img src="/img/VIPRO/viprobackground.png" alt="" className="max-h-[15rem] w-full h-full rounded-md"/>
            <h1 className="text-xl lg:text-2xl font-semibold pt-2">Canada</h1>
            <p className="py-2 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi cupiditate accusantium fugit dolorum</p>
            <Button className="w-full">Accion</Button>
          </div>
        </div></Fade>
        
      </Slider>
    </div>
    </div>
  );
}

export default VIPROCarrousel;
