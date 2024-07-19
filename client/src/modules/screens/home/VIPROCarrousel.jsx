import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fade } from "react-awesome-reveal";
import lang from "../../../assets/data/lang.data";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function VIPROCarrousel() {
  const countries = Object.values(lang[0].about.countries);

  const carrouselData = () => {
    return countries.map((country, index) => (
      <Fade key={index}>
        <div className="mx-2">
          <div className="w-full sm:w-[90%] m-auto bg-white p-4 rounded-md shadow my-12">
            <div className="square-image-container">
              <img
                src={country.img}
                alt={country.name}
                className="square-image rounded-md"
              />
            </div>
            <h1 className="text-xl lg:text-2xl font-semibold pt-3 text-center">
              {country.name}
            </h1>
            <p className="py-2 xl:min-h-[9rem] max-h-[8rem] h-[8rem] text-justify overflow-hidden overflow-ellipsis">
              {country.description}
            </p>
            <Link to={country.uri}>
              <Button className="font-semibold w-full bg-TVred shadowbtn">
                Ver más
              </Button>
            </Link>
          </div>
        </div>
      </Fade>
    ));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-TVBlue px-4 lg:px-0 py-4 lg:py-10" id="services">
      <div className="slider-container w-[90%] mx-auto">
        <Slider {...settings} className="flex gap-4">
          {carrouselData()}
        </Slider>
      </div>
    </div>

  );
}

export default VIPROCarrousel;

