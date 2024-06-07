import React from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Slide, Fade } from "react-awesome-reveal";

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
    <div className="w-full flex-col pb-8 m-auto text-white flex justify-center">
      <div className="w-full pb-8 px-6">
        <div className="pb-4 w-full text-center">
          <h1 className="text-3xl font-bold text-center">Horarios de atención</h1>
        </div>
        <div class="grid grid-cols-2 m-auto justify-evently w-[75%] pt-4">
          <span className="m-auto">Lunes: 8:30 a.m. – 6:00 p.m.</span>
          <span className="m-auto">Martes: 8:30 a.m. – 6:00 p.m.</span>
          <span className="m-auto">Miércoles: 8:30 a.m. – 6:00 p.m.</span>
          <span className="m-auto">Jueves: 8:30 a.m. – 6:00 p.m.</span>
          <span className="m-auto">Viernes: 8:30 a.m. – 6:0  p.m.</span>
          <span className="m-auto">Sábado: 9:00 a.m. – 5:00 p.m.</span>
          <span className="m-auto">Domingo: Cerrado</span>
        </div>
      </div>

      <Fade bottom>
        <div className="w-full h-full flex flex-col mx-auto text-white">
          <h1 className="text-3xl font-bold text-center pb-4">Visítanos</h1>
          <p className="pt-4 pb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate eaque, tempore quibusdam maxime sint eum dolores laboriosam accusamus mollitia!</p>
          <div style={{ height: '300px', width: '100%' }}>
            <APIProvider apiKey={'AIzaSyCkW8tRmEUc7bTe9UKossrKpVb-kmxQ18g'} className="w-full">
              <Map defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
                <Marker position={position} />
              </Map>
            </APIProvider>
          </div>
        </div>
      </Fade>
    </div>
  );
}
