import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import countrys from "../../../assets/data/carrousel.data";
import { Button } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

function VIPROCarrousel() { 

  const carrouselData = () => {
    return countrys.map((country, index) => (
      <Fade key={index}>
        <div className="mx-2">
          <div className="w-[90%] m-auto bg-white p-4 rounded-md shadow my-12">
            <img src={country.img} alt={country.country} className="max-h-[13rem] w-full h-[13rem] rounded-md" />
            <h1 className="text-xl lg:text-2xl font-semibold pt-2">{country.country}</h1>
            <p className="py-2 text-justify">{country.description}</p>
            <Link to={country.uri}><Button className="font-semibold w-full bg-TVred shadowbtn">Ver más</Button></Link>
          </div>
        </div>
      </Fade>
    ));
  }

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
    <div className="w-full bg-TVBlue py-10" id="services">
      <div className="slider-container w-[90%] mx-auto">
        <Slider {...settings} className="flex gap-4">
          {carrouselData()}
        </Slider>
      </div>
    </div>
  );
}

export default VIPROCarrousel;
