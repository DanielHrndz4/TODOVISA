import React from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

export default function MapComponent() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const position = {
    lat: 10.99835602,
    lng: 77.01502627
  };

  return (
    <>
      <div className="w-full h-full flex-row pb-8 mx-auto text-white flex">
        <Fade bottom className="w-full">
          <div className="w-full h-full flex flex-row mx-auto text-white">
            <div style={{ height: '250px', width: '100%' }}>
              <APIProvider apiKey={'AIzaSyCkW8tRmEUc7bTe9UKossrKpVb-kmxQ18g'} className="w-full">
                <Map defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
                  <Marker position={position} />
                </Map>
              </APIProvider>
            </div>
          </div>
        </Fade>

      </div>
      <Fade>
        <div className="w-full flex lg:px-0 px-6">
          <div className="border-2 border-white p-2 rounded-full lg:w-[55px] lg:min-w-[55px] lg:h-[55px] w-[45px] min-w-[45px] h-[45px] flex justify-center items-center shadowbtn">
            <FontAwesomeIcon icon={faLocationDot} size="x lg:2x" className="w-full m-auto text-white" />
          </div>
          <a href="https://www.google.com/maps/dir//67+Avenida+Sur+Local+%231,+San+Salvador/@13.6970016,-89.2252546,18z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8f6331d77b1013e3:0xbfa86a56cf477af7!2m2!1d-89.2246802!2d13.6971043?entry=ttu" className="flex justify-center items-center ">
            <span className="pl-4 lg:text-xl text-lg flex items-center justify-center text-white hover:text-TVred hover:underline">
              67 Avenida Sur Local #1, San Salvador
            </span>
          </a>
        </div>
      </Fade>
      <Fade>
        <div className="w-full flex mt-4  lg:px-0 px-6">
          <div className="border-2 border-white p-2 rounded-full lg:w-[55px] lg:min-w-[55px] lg:h-[55px] w-[45px] min-w-[45px] h-[45px] flex justify-center items-center shadowbtn">
            <FontAwesomeIcon icon={faPhone} size="x lg:2x" className="w-full m-auto text-white" />
          </div>
          <span className="pl-4 lg:text-xl text-lg flex items-center justify-center text-white">
            +503 2245-4027
          </span>
        </div>
        <div className="w-full flex mt-4  lg:px-0 px-6">
          <div className="border-2 border-white p-2 rounded-full lg:w-[55px] lg:min-w-[55px] lg:h-[55px] w-[45px] min-w-[45px] h-[45px] flex justify-center items-center shadowbtn">
            <FontAwesomeIcon icon={faClock} size="x lg:2x" className="w-full m-auto text-white" />
          </div>
          <span className="pl-4 lg:text-xl text-lg flex items-center justify-center text-white flex-row">
            Lunes a Viernes: 8:30am - 6:00pm, Sabados: 9:00am - 5:00pm, Domingos:  Cerrados
          </span>
        </div>
      </Fade>
    </>
  );
}
