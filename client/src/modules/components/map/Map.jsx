import React from "react";
import GoogleMapReact from 'google-map-react';
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import lang from "../../../assets/data/lang.data";

const AnyReactComponent = ({ text }) => <div><img src="/img/VIPRO/fa-location.png" alt="text" className="h-9" /></div>;

export default function MapComponent() {
  const contactInfo = lang[0].contact.info;

  const defaultProps = {
    center: {
      lat: 13.6970016,
      lng: -89.2252546
    },
    zoom: 15
  };

  return (
    <>
      <div className="w-full h-full flex-row pb-8 mx-auto text-white flex">
        <Fade bottom className="w-full">
          <div className="w-full h-full flex flex-row mx-auto text-white">
            <div className="h-[275px] lg:h-[225px] xl:h-[250px] sm:h-[300px] w-full">
              <GoogleMapReact
                apiKey={'AIzaSyDPRY1HYtUBnqp5hKE1J7pJHCaoTjoavAo'}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                  disableDefaultUI: true,
                  draggable: false,
                  zoomControl: false,
                }}
              >
                <AnyReactComponent
                  lat={defaultProps.center.lat}
                  lng={defaultProps.center.lng}
                  text="fa-location.png"
                />
              </GoogleMapReact>
            </div>
          </div>
        </Fade>
      </div>

      <Fade>
        <div className="w-full flex lg:px-0 px-6">
          <div className="border-2 border-white p-2 rounded-full xl:w-[55px] xl:min-w-[55px] xl:h-[55px] w-[45px] min-w-[45px] h-[45px] flex justify-center items-center shadowbtn">
            <FontAwesomeIcon icon={faLocationDot} size="x lg:2x" className="w-full m-auto text-white" />
          </div>
          <a href="https://www.google.com/maps/dir//67+Avenida+Sur+Local+%231,+San+Salvador/@13.6970016,-89.2252546,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8f6331d77b1013e3:0xbfa86a56cf477af7!2m2!1d-89.2246802!2d13.6971043?entry=ttu" className="flex justify-center items-center ">
            <span className="pl-4 xl:text-xl text-lg flex items-center justify-center text-white hover:text-TVred hover:underline">
              {contactInfo.location}
            </span>
          </a>
        </div>
      </Fade>

      <Fade>
        <div className="w-full flex mt-4  lg:px-0 px-6">
          <div className="border-2 border-white p-2 rounded-full xl:w-[55px] xl:min-w-[55px] xl:h-[55px] w-[45px] min-w-[45px] h-[45px] flex justify-center items-center shadowbtn">
            <FontAwesomeIcon icon={faPhone} size="x lg:2x" className="w-full m-auto text-white" />
          </div>
          <span className="pl-4 xl:text-xl text-lg flex items-center justify-center text-white">
            +503 2245-4027
          </span>
        </div>
        <div className="w-full flex mt-4  lg:px-0 px-6">
          <div className="border-2 border-white p-2 rounded-full xl:w-[55px] xl:min-w-[55px] xl:h-[55px] w-[45px] min-w-[45px] h-[45px] flex justify-center items-center shadowbtn">
            <FontAwesomeIcon icon={faClock} size="x lg:2x" className="w-full m-auto text-white" />
          </div>
          <span className="pl-4 xl:text-xl text-lg flex items-center justify-center text-white flex-row">
            {contactInfo.schedule}
          </span>
        </div>
      </Fade>
    </>
  );
}
